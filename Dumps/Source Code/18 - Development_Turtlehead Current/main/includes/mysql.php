<?php
/**
 * Copyright (c) Cosmin POP 2019
 */

class MYSQL_Database extends PDO
{

    var $_identPrefix = '';
    var $_cacher = null;
    var $_logger = null;
    var $link = null;
    var $_statistics = [
        'time' => 0,
        'count' => 0
    ];
    var $error = null;
    var $errmsg = null;
    var $errorHandler = null;

    var $_lastQuery = '';

    var $ignoresInTraceRe = 'DbSimple_.*::.* | call_user_func.*';

    public function __construct($DB_TYPE, $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS)
    {
        parent::__construct($DB_TYPE . ':host=' . $DB_HOST . ';dbname=' . $DB_NAME, $DB_USER, $DB_PASS);

        parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        parent::setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        parent::exec("set names utf8");

        $this->link = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

    }

    public function rowCount($id_filiala, $table, $hidden = -1, $where = false)
    {
       return 0;
    }

    function _performTransformQuery(&$queryMain, $how)
    {
        // If we also need to calculate total number of found rows...
        switch ($how) {
            // Prepare total calculation (if possible)
            case 'CALC_TOTAL':
                $m = null;
                if (preg_match('/^(\s* SELECT)(.*)/six', $queryMain[0], $m)) {
                    if ($this->_calcFoundRowsAvailable()) {
                        $queryMain[0] = $m[1] . ' SQL_CALC_FOUND_ROWS' . $m[2];
                    }
                }
                return true;

            // Perform total calculation.
            case 'GET_TOTAL':
                // Built-in calculation available?
                if ($this->_calcFoundRowsAvailable()) {
                    $queryMain = array('SELECT FOUND_ROWS()');
                }
                // Else use manual calculation.
                // TODO: GROUP BY ... -> COUNT(DISTINCT ...)
                $re = '/^
                    (?> -- [^\r\n]* | \s+)*
                    (\s* SELECT \s+)                                      #1     
                    (.*?)                                                 #2
                    (\s+ FROM \s+ .*?)                                    #3
                        ((?:\s+ ORDER \s+ BY \s+ .*?)?)                   #4
                        ((?:\s+ LIMIT \s+ \S+ \s* (?:, \s* \S+ \s*)? )?)  #5
                $/six';
                $m = null;
                if (preg_match($re, $queryMain[0], $m)) {
                    $query[0] = $m[1] . $this->_fieldList2Count($m[2]) . " AS C" . $m[3];
                    $skipTail = substr_count($m[4] . $m[5], '?');
                    if ($skipTail) array_splice($query, -$skipTail);
                }
                return true;
        }

        return false;
    }

    function _expandPlaceholders(&$queryAndArgs, $useNative = false)
    {
        $cacheCode = null;
        if ($this->_logger) {
            // Serialize is much faster than placeholder expansion. So use caching.
            $cacheCode = md5(serialize($queryAndArgs) . '|' . $useNative . '|' . $this->_identPrefix);
            if (isset($this->_placeholderCache[$cacheCode])) {
                $queryAndArgs = $this->_placeholderCache[$cacheCode];
                return;
            }
        }

        if (!is_array($queryAndArgs)) {
            $queryAndArgs = array($queryAndArgs);
        }

        $this->_placeholderNativeArgs = $useNative ? array() : null;
        $this->_placeholderArgs = array_reverse($queryAndArgs);

        $query = array_pop($this->_placeholderArgs); // array_pop is faster than array_shift

        // Do all the work.
        $this->_placeholderNoValueFound = false;
        $query = $this->_expandPlaceholdersFlow($query);

        if ($useNative) {
            array_unshift($this->_placeholderNativeArgs, $query);
            $queryAndArgs = $this->_placeholderNativeArgs;
        } else {
            $queryAndArgs = array($query);
        }

        if ($cacheCode) {
            $this->_placeholderCache[$cacheCode] = $queryAndArgs;
        }
    }

    function _performGetPlaceholderIgnoreRe()
    {
        return '
            "   (?> [^"\\\\]+|\\\\"|\\\\)*    "   |
            \'  (?> [^\'\\\\]+|\\\\\'|\\\\)* \'   |
            `   (?> [^`]+ | ``)*              `   |   # backticks
            /\* .*?                          \*/      # comments
        ';
    }

    function _expandPlaceholdersFlow($query)
    {
        $re = '{
            (?>
                # Ignored chunks.
                (?>
                    # Comment.
                    -- [^\r\n]*
                )
                  |
                (?>
                    # DB-specifics.
                    ' . trim($this->_performGetPlaceholderIgnoreRe()) . '
                )
            )
              |
            (?>
                # Optional blocks
                \{
                    # Use "+" here, not "*"! Else nested blocks are not processed well.
                    ( (?> (?>[^{}]+)  |  (?R) )* )             #1
                \}
            )
              |
            (?>
                # Placeholder
                (\?) ( [_dsafn\#]? )                           #2 #3
            )
        }sx';
        $query = preg_replace_callback(
            $re,
            array(&$this, '_expandPlaceholdersCallback'),
            $query
        );
        return $query;
    }

    function escape($s, $isIdent = false)
    {
        return $this->_performEscape($s, $isIdent);
    }

    function _performEscape($s, $isIdent = false)
    {
        if (!$isIdent) {
            return "'" . mysqli_real_escape_string($this->link, $s) . "'";
        } else {
            return "`" . str_replace('`', '``', $s) . "`";
        }
    }

    function _expandPlaceholdersCallback($m)
    {
        // Placeholder.
        if (!empty($m[2])) {
            $type = $m[3];

            // Idenifier prefix.
            if ($type == '_') {
                return $this->_identPrefix;
            }

            // Value-based placeholder.
            if (!$this->_placeholderArgs) return 'DBSIMPLE_ERROR_NO_VALUE';
            $value = array_pop($this->_placeholderArgs);

            // Skip this value?
            if ($value === DBSIMPLE_SKIP) {
                $this->_placeholderNoValueFound = true;
                return '';
            }

            // First process guaranteed non-native placeholders.
            switch ($type) {
                case 'a':
                    if (!$value) $this->_placeholderNoValueFound = true;
                    if (!is_array($value)) return 'DBSIMPLE_ERROR_VALUE_NOT_ARRAY';
                    $parts = array();
                    foreach ($value as $k => $v) {
                        $v = $v === null ? 'NULL' : $this->escape($v);
                        if (!is_int($k)) {
                            $k = $this->escape($k, true);
                            $parts[] = "$k=$v";
                        } else {
                            $parts[] = $v;
                        }
                    }
                    return join(', ', $parts);
                case "#":
                    // Identifier.
                    if (!is_array($value)) return $this->escape($value, true);
                    $parts = array();
                    foreach ($value as $table => $identifier) {
                        if (!is_string($identifier)) return 'DBSIMPLE_ERROR_ARRAY_VALUE_NOT_STRING';
                        $parts[] = (!is_int($table) ? $this->escape($table, true) . '.' : '') . $this->escape($identifier, true);
                    }
                    return join(', ', $parts);
                case 'n':
                    // NULL-based placeholder.
                    return empty($value) ? 'NULL' : intval($value);
            }

            // Native arguments are not processed.
            if ($this->_placeholderNativeArgs !== null) {
                $this->_placeholderNativeArgs[] = $value;
                return $this->_performGetNativePlaceholderMarker(count($this->_placeholderNativeArgs) - 1);
            }

            // In non-native mode arguments are quoted.
            if ($value === null) return 'NULL';
            switch ($type) {
                case '':
                    if (!is_scalar($value)) return 'DBSIMPLE_ERROR_VALUE_NOT_SCALAR';
                    return $this->escape($value);
                case 'd':
                    return intval($value);
                case 'f':
                    return str_replace(',', '.', floatval($value));
            }
            // By default - escape as string.
            return $this->escape($value);
        }

        // Optional block.
        if (isset($m[1]) && strlen($block = $m[1])) {
            $prev = @$this->_placeholderNoValueFound;
            $block = $this->_expandPlaceholdersFlow($block);
            $block = $this->_placeholderNoValueFound ? '' : ' ' . $block . ' ';
            $this->_placeholderNoValueFound = $prev; // recurrent-safe
            return $block;
        }

        // Default: skipped part of the string.
        return $m[0];
    }

    function _logQueryStat($queryTime, $fetchTime, $firstFetchTime, $rows)
    {
        // Always increment counters.
        $this->_statistics['time'] += $queryTime;
        $this->_statistics['count']++;

        // If no logger, economize CPU resources and actually log nothing.
        if (!$this->_logger) return;

        $dt = round($queryTime * 1000);
        $firstFetchTime = round($firstFetchTime * 1000);
        $tailFetchTime = round($fetchTime * 1000) - $firstFetchTime;
        $log = "  -- ";
        if ($firstFetchTime + $tailFetchTime) {
            $log = sprintf("  -- %d ms = %d+%d" . ($tailFetchTime ? "+%d" : ""), $dt, $dt - $firstFetchTime - $tailFetchTime, $firstFetchTime, $tailFetchTime);
        } else {
            $log = sprintf("  -- %d ms", $dt);
        }
        $log .= "; returned ";

        if (!is_array($rows)) {
            $log .= $this->escape($rows);
        } else {
            $detailed = null;
            if (count($rows) == 1) {
                $len = 0;
                $values = array();
                foreach ($rows[0] as $k => $v) {
                    $len += strlen($v);
                    if ($len > $this->MAX_LOG_ROW_LEN) {
                        break;
                    }
                    $values[] = $v === null ? 'NULL' : $this->escape($v);
                }
                if ($len <= $this->MAX_LOG_ROW_LEN) {
                    $detailed = "(" . preg_replace("/\r?\n/", "\\n", join(', ', $values)) . ")";
                }
            }
            if ($detailed) {
                $log .= $detailed;
            } else {
                $log .= count($rows) . " row(s)";
            }
        }

        $this->_logQuery($log, true);
    }

    function _transformResult($rows)
    {
        // Process ARRAY_KEY feature.
        if (is_array($rows) && $rows) {
            // Find ARRAY_KEY* AND PARENT_KEY fields in field list.
            $pk = null;
            $ak = array();
            foreach (current($rows) as $fieldName => $dummy) {
                if (0 == strncasecmp($fieldName, DBSIMPLE_ARRAY_KEY, strlen(DBSIMPLE_ARRAY_KEY))) {
                    $ak[] = $fieldName;
                } else if (0 == strncasecmp($fieldName, DBSIMPLE_PARENT_KEY, strlen(DBSIMPLE_PARENT_KEY))) {
                    $pk = $fieldName;
                }
            }
            natsort($ak); // sort ARRAY_KEY* using natural comparision

            if ($ak) {
                // Tree-based array? Fields: ARRAY_KEY, PARENT_KEY
                if ($pk !== null) {
                    return $this->_transformResultToForest($rows, $ak[0], $pk);
                }
                // Key-based array? Fields: ARRAY_KEY.
                return $this->_transformResultToHash($rows, $ak);
            }
        }
        return $rows;
    }

    function _performQuery($queryMain)
    {
        $this->_lastQuery = $queryMain;
        $this->_expandPlaceholders($queryMain, false);


        $result = @mysqli_query($this->link, $queryMain[0]);

        $rd = [];

        if (mysqli_error($this->link) != "") {
            echo "<pre>";
            var_dump($queryMain);
            var_dump(mysqli_error($this->link));
            echo "</pre>";
        }

        while ($row = $result->fetch_assoc()) {
            $rd[] = $row;
        }



        return $rd;
//        return $result;

        if ($result === false) return $this->_setDbError($queryMain[0]);
        if (!is_resource($result)) {
            if (preg_match('/^\s* INSERT \s+/six', $queryMain[0])) {
                // INSERT queries return generated ID.
                return @mysqli_insert_id($this->link);
            }
            // Non-SELECT queries return number of affected rows, SELECT - resource.
            return @mysqli_affected_rows($this->link);
        }
        return $result;
    }

    function _logQuery($query, $noTrace = false)
    {
        if (!$this->_logger) return;
        $this->_expandPlaceholders($query, false);
        $args = array();
        $args[] =& $this;
        $args[] = $query[0];
        $args[] = $noTrace ? null : $this->findLibraryCaller();
        return call_user_func_array($this->_logger, $args);
    }

    function _microtime()
    {
        $t = explode(" ", microtime());
        return $t[0] + $t[1];
    }

    function _resetLastError()
    {
        $this->error = $this->errmsg = null;
    }

    function _transformQuery(&$query, $how)
    {
        // Do overriden transformation.
        $result = $this->_performTransformQuery($query, $how);
        if ($result === true) return $result;
        // Common transformations.
        switch ($how) {
            case 'GET_ATTRIBUTES':
                // Extract query attributes.
                $options = array();
                $q = $query[0];
                $m = null;
                while (preg_match('/^ \s* -- [ \t]+ (\w+): ([^\r\n]+) [\r\n]* /sx', $q, $m)) {
                    $options[$m[1]] = trim($m[2]);
                    $q = substr($q, strlen($m[0]));
                }
                return $options;
            case 'UNIQ_KEY':
                $q = $this->attributes['CACHE'];
                $i = 0;
                $query = "  -- UNIQ_KEY\n";
                while (preg_match('/(\w+)\.\w+/sx', $q, $m)) {
                    if ($i > 0) $query .= "\nUNION\n";
                    $query .= 'SELECT MAX(' . $m[0] . ') AS M, COUNT(*) AS C FROM ' . $m[1];
                    $q = substr($q, strlen($m[0]));
                    $i++;
                }
                return true;
        }
        // No such transform.
        $this->_setLastError(-1, "No such transform type: $how", $query);
    }

    function setCacher($cacher)
    {
        $prev = $this->_cacher;
        $this->_cacher = $cacher;
        return $prev;
    }

    function _cache($hash, $result = null)
    {
        if (is_callable($this->_cacher)) {
            return call_user_func($this->_cacher, $hash, $result);
        } else if (is_object($this->_cacher) && method_exists($this->_cacher, 'get') && method_exists($this->_cacher, 'save')) {
            if (null === $result)
                return $this->_cacher->get($hash);
            else
                $this->_cacher->save($result, $hash);
        } else return false;
    }

    function _shrinkLastArrayDimensionCallback(&$v)
    {
        if (!$v) return;
        reset($v);
        if (!is_array($firstCell = current($v))) {
            $v = $firstCell;
        } else {
            array_walk($v, array(&$this, '_shrinkLastArrayDimensionCallback'));
        }
    }

    function getStatistics()
    {
        return $this->_statistics;
    }

    function selectCol()
    {
        $args = func_get_args();
        $total = false;
        $rows = $this->_query($args, $total);
        if (!is_array($rows)) return $rows;
        $this->_shrinkLastArrayDimensionCallback($rows);
        return $rows;
    }

    function selectCell()
    {
        $args = func_get_args();
        $total = false;
        $rows = $this->_query($args, $total);
        if (!is_array($rows)) return $rows;
        if (!count($rows)) return null;
        reset($rows);
        $row = current($rows);
        if (!is_array($row)) return $row;
        reset($row);
        return current($row);
    }

    function selectRow()
    {
        $args = func_get_args();
        $total = false;
        $rows = $this->_query($args, $total);
        if (!is_array($rows)) return $rows;
        if (!count($rows)) return array();
        reset($rows);
        return current($rows);
    }

    function _performFetch($result)
    {
        $row = @mysqli_fetch_assoc($result);
        if (mysqli_error($this->link)) return $this->_setDbError($this->_lastQuery);
        if ($row === false) return null;
        return $row;
    }

    function _query($query, &$total)
    {
        $this->_resetLastError();

        // Fetch query attributes.
        $this->attributes = $this->_transformQuery($query, 'GET_ATTRIBUTES');

        // Modify query if needed for total counting.
        if ($total) {
            $this->_transformQuery($query, 'CALC_TOTAL');
        }
        $is_cacher_callable = (is_callable($this->_cacher) || (method_exists($this->_cacher, 'get') && method_exists($this->_cacher, 'save')));
        $rows = null;
        $cache_it = false;
        if (!empty($this->attributes['CACHE']) && $is_cacher_callable) {

            $hash = $this->_cachePrefix . md5(serialize($query));
            // Getting data from cache if possible
            $fetchTime = $firstFetchTime = 0;
            $qStart = $this->_microtime();
            $cacheData = $this->_cache($hash);
            $queryTime = $this->_microtime() - $qStart;

            $storeTime = isset($cacheData['storeTime']) ? $cacheData['storeTime'] : null;
            $invalCache = isset($cacheData['invalCache']) ? $cacheData['invalCache'] : null;
            $result = isset($cacheData['result']) ? $cacheData['result'] : null;
            $rows = isset($cacheData['rows']) ? $cacheData['rows'] : null;


            $cache_params = $this->attributes['CACHE'];

            // Calculating cache time to live
            $re = '/
                (
                    ([0-9]+)           #2 - hours
                h)? [ \t]*
                (
                    ([0-9]+)           #4 - minutes
                m)? [ \t]*
                (
                    ([0-9]+)           #6 - seconds
                s?)? (,)?
            /sx';
            $m = null;
            preg_match($re, $cache_params, $m);
            $ttl = @$m[6] + @$m[4] * 60 + @$m[2] * 3600;
            // Cutting out time param - now there are just fields for uniqKey or nothing
            $cache_params = trim(preg_replace($re, '', $cache_params, 1));

            $uniq_key = null;

            // UNIQ_KEY calculation
            if (!empty($cache_params)) {
                $dummy = null;
                // There is no need in query, cos' needle in $this->attributes['CACHE']
                $this->_transformQuery($dummy, 'UNIQ_KEY');
                $uniq_key = call_user_func_array(array(&$this, 'select'), $dummy);
                $uniq_key = md5(serialize($uniq_key));
            }
            // Check TTL?
            $ttl = empty($ttl) ? true : (int)$storeTime > (time() - $ttl);

            // Invalidate cache?
            if ($ttl && $uniq_key == $invalCache) {
                $this->_logQuery($query);
                $this->_logQueryStat($queryTime, $fetchTime, $firstFetchTime, $rows);

            } else $cache_it = true;
        }

        if (null === $rows || true === $cache_it) {
            $this->_logQuery($query);

            // Run the query (counting time).
            $qStart = $this->_microtime();
            $result = $this->_performQuery($query);

            $fetchTime = $firstFetchTime = 0;

            if (is_resource($result)) {
                $rows = array();
                // Fetch result row by row.
                $fStart = $this->_microtime();
                $row = $this->_performFetch($result);
                $firstFetchTime = $this->_microtime() - $fStart;
                if ($row !== null) {
                    $rows[] = $row;
                    while ($row = $this->_performFetch($result)) {
                        $rows[] = $row;
                    }
                }
                $fetchTime = $this->_microtime() - $fStart;
            } else {
                $rows = $result;
            }
            $queryTime = $this->_microtime() - $qStart;

            // Log query statistics.
            $this->_logQueryStat($queryTime, $fetchTime, $firstFetchTime, $rows);

            // Prepare BLOB objects if needed.
            if (is_array($rows) && !empty($this->attributes['BLOB_OBJ'])) {
                $blobFieldNames = $this->_performGetBlobFieldNames($result);
                foreach ($blobFieldNames as $name) {
                    for ($r = count($rows) - 1; $r >= 0; $r--) {
                        $rows[$r][$name] =& $this->_performNewBlob($rows[$r][$name]);
                    }
                }
            }

            // Transform resulting rows.
            $result = $this->_transformResult($rows);

            // Storing data in cache
            if ($cache_it && $is_cacher_callable) {
                $this->_cache(
                    $hash,
                    array(
                        'storeTime' => time(),
                        'invalCache' => $uniq_key,
                        'result' => $result,
                        'rows' => $rows
                    )
                );
            }

        }
        // Count total number of rows if needed.
        if (is_array($result) && $total) {
            $this->_transformQuery($query, 'GET_TOTAL');
            $total = call_user_func_array(array(&$this, 'selectCell'), $query);
        }

        return $result;
    }

    function _setDbError($query)
    {
        if ($this->link) {
            return $this->_setLastError(mysqli_errno($this->link), mysqli_error($this->link), $query);
        } else {
            return $this->_setLastError(mysqli_errno($this->link), mysqli_error($this->link), $query);
        }
    }

    function _setLastError($code, $msg, $query)
    {
        if (is_array($query)) {
            $this->_expandPlaceholders($query, false);
            $query = $query[0];
        }
        return $this->_setLastError2($code, $msg, $query);
    }

    function _setLastError2($code, $msg, $query)
    {
        $context = "unknown";
        if ($t = $this->findLibraryCaller()) {
            $context = (isset($t['file'])? $t['file'] : '?') . ' line ' . (isset($t['line'])? $t['line'] : '?');
        }
        $this->error = array(
            'code'    => $code,
            'message' => rtrim($msg),
            'query'   => $query,
            'context' => $context,
        );
        $this->errmsg = rtrim($msg) . ($context? " at $context" : "");

        $this->_logQuery("  -- error #".$code.": ".preg_replace('/(\r?\n)+/s', ' ', $this->errmsg));

        if (is_callable($this->errorHandler)) {
            call_user_func($this->errorHandler, $this->errmsg, $this->error);
        }

        return null;
    }

    function findLibraryCaller()
    {
        $caller = call_user_func(
            array(&$this, 'debug_backtrace_smart'),
            $this->ignoresInTraceRe,
            true
        );
        return $caller;
    }

    function debug_backtrace_smart($ignoresRe=null, $returnCaller=false)
    {
        if (!is_callable($tracer='debug_backtrace')) return array();
        $trace = $tracer();

        if ($ignoresRe !== null) $ignoresRe = "/^(?>{$ignoresRe})$/six";
        $smart = array();
        $framesSeen = 0;
        for ($i=0, $n=count($trace); $i<$n; $i++) {
            $t = $trace[$i];
            if (!$t) continue;

            // Next frame.
            $next = isset($trace[$i+1])? $trace[$i+1] : null;

            // Dummy frame before call_user_func* frames.
            if (!isset($t['file'])) {
                $t['over_function'] = $trace[$i+1]['function'];
                $t = $t + $trace[$i+1];
                $trace[$i+1] = null; // skip call_user_func on next iteration
            }

            // Skip myself frame.
            if (++$framesSeen < 2) continue;

            // 'class' and 'function' field of next frame define where
            // this frame function situated. Skip frames for functions
            // situated in ignored places.
            if ($ignoresRe && $next) {
                // Name of function "inside which" frame was generated.
                $frameCaller = (isset($next['class'])? $next['class'].'::' : '') . (isset($next['function'])? $next['function'] : '');
                if (preg_match($ignoresRe, $frameCaller)) continue;
            }

            // On each iteration we consider ability to add PREVIOUS frame
            // to $smart stack.
            if ($returnCaller) return $t;
            $smart[] = $t;
        }
        return $smart;
    }

    public function select($sql, $array = array(), $debug = false, $fetchMode = PDO::FETCH_ASSOC)
    {

        $args = func_get_args();
        $total = false;
        return $this->_query($args, $total);

    }

    /**
     * insert
     * @param string $table A name of table to insert into
     * @param array $data An associative array
     * @param boolean $ignore if one found
     * @param bool $debug
     * @param bool $replace_on_duplicate
     * @return bool
     */
    public function insert($table, $data, $ignore = false, $debug = false, $replace_on_duplicate = false)
    {
        ksort($data);

        $fieldNames = implode('`, `', array_keys($data));
        $fieldValues = ':' . implode(', :', array_keys($data));

        if ($ignore) {
            $ignore = "IGNORE";
        } else {
            $ignore = " ";
        }

        if ($replace_on_duplicate) {

            $update_data = '';
            foreach ($data as $key => $value)
                $update_data .= '`' . $key . '` = :' . $key . '_replace, ';

            $update_data = rtrim($update_data, ', ');

            $query = "INSERT " . $ignore . " INTO $table (`$fieldNames`) VALUES ($fieldValues)" .
                " ON DUPLICATE KEY UPDATE " . $update_data;

        } else {
            $query = "INSERT " . $ignore . " INTO $table (`$fieldNames`) VALUES ($fieldValues)";
        }

        if ($debug) {
            var_dump($query);
            var_dump($data);
        }

        $sth = $this->prepare($query);

        foreach ($data as $key => $value) {
            $sth->bindValue(":$key", is_string($value) ? trim($value) : $value);
            if ($replace_on_duplicate)
                $sth->bindValue(":" . $key . "_replace", is_string($value) ? trim($value) : $value);
        }

        try {

            return $sth->execute();

        } catch (Exception $e) {

            $this->insert('_erori', [
                'level' => 0,
                'level_string' => 'pdo_insert',
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'context' => json_encode([
                    'table' => $table,
                    'data' => $data
                ])
            ]);

            $lid = intval($this->lastInsertId());

            $this->update('_erori', [
                'id_hash' => phash_model::hash($lid)
            ], [
                'id' => $lid
            ]);

            exit(json_encode([
                'error' => true,
                'motiv' => 'S-a produs o eroare. Încercați mai târziu sau contactați SUPPORT. (COD: ' . phash_model::hash($lid) . ')'
            ]));

        }
    }


    public function insert_transaction($table, $data, $ignore = false, $debug = false)
    {

        if ($ignore) {
            $ignore = "IGNORE";
        } else {
            $ignore = " ";
        }

        try {
            $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->beginTransaction();

            foreach ($data as $d) {

                $dd = json_decode(json_encode($d), 1);

                ksort($dd);

                $fieldNames = implode('`, `', array_keys($dd));
                $fieldValues = ':' . implode(', :', array_keys($dd));

                $sth = $this->prepare("INSERT " . $ignore . " INTO $table (`$fieldNames`) VALUES ($fieldValues)");

                foreach ($dd as $key => $value) {
                    $sth->bindValue(":$key", $value);
                }

                $sth->execute();

            }

            $this->commit();

        } catch (Exception $e) {
            $this->rollBack();
            var_dump("Failed: " . $e->getMessage());
            exit;
        }


    }

    public function fieldType($table, $field, $fetchMode = PDO::FETCH_ASSOC)
    {

        $sth = $this->prepare("SHOW FIELDS FROM " . $table . " WHERE `Field` = :f");
        $sth->bindValue(":f", $field);

        $sth->execute();
        $types = $sth->fetchAll($fetchMode);

        if (count($types) > 0) {
            return $this->filterFieldTypes($types[0]['Type']);
        } else {
            return false;
        }

    }

    public function isId($field)
    {
        return $field[0] === 'i' && $field[1] === 'd';
    }

    public function filterFieldTypes($type)
    {

        if (stristr($type, "int")) return "int";
        if (stristr($type, "string")) return "string";

    }

    /**
     * update
     * @param string $table A name of table to insert into
     * @param array $data An associative array
     * @param array $where the WHERE query part
     * @param bool $bind bind params, pentru update cu pret_ron = pret_euro * val_euro
     * @param bool $replace
     * @return boolean update result
     */
    public function update($table, $data, $where, $bind = true, $replace = false)
    {


        ksort($data);
        ksort($where);

        $fieldDetails = NULL;
        foreach ($data as $key => $value) {
            if ($bind)
                $fieldDetails .= "`$key`=:$key,";
            else
                $fieldDetails .= "`$key`=$value,";
        }

        $whereDetails = NULL;
        foreach ($where as $key => $value) {
            if ($value === 'NOT_NULL') {
                $where[$key] = NULL;
                $whereDetails .= "`$key` IS NOT NULL AND ";
            } elseif ($value === 'NULL') {
                $where[$key] = NULL;
                $whereDetails .= "`$key` IS NULL AND ";
            } else
                $whereDetails .= "`$key`=:$key AND ";
        }

        $fieldDetails = rtrim($fieldDetails, ',');
        $whereDetails = rtrim($whereDetails, ' AND ');

        $sth = $this->prepare("UPDATE $table SET $fieldDetails WHERE $whereDetails");

        foreach ($data as $key => $value) {
            if ($bind)
                $sth->bindValue(":$key", is_string($value) ? trim($value) : $value);
        }
//        $sth->bindValue(":$key", null, PDO::PARAM_INT);
        foreach ($where as $key => $value) {
            if ($value !== NULL)
                $sth->bindValue(":$key", $value);
        }


        try {

            return $sth->execute();

        } catch (Exception $e) {

            $this->insert('_erori', [
                'level' => 0,
                'level_string' => 'pdo_update',
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'context' => json_encode([
                    'table' => $table,
                    'data' => $data,
                    'where' => $where
                ])
            ]);

            $lid = intval($this->lastInsertId());

            $this->update('_erori', [
                'id_hash' => phash_model::hash($lid)
            ], [
                'id' => $lid
            ]);

            exit(json_encode([
                'error' => true,
                'motiv' => 'S-a produs o eroare. Încercați mai târziu sau contactați SUPPORT. (COD: ' . phash_model::hash($lid) . ')'
            ]));
        }

    }

    /**
     * delete
     *
     * @param string $table
     * @param array $where
     * @param integer $limit
     * @return integer Affected Rows
     */
    public function delete($table, $where, $limit = 1)
    {

        ksort($where);

        $whereDetails = NULL;
        foreach ($where as $key => $value) {
            if ($value === 'NULL') {
                $where[$key] = NULL;
                $whereDetails .= "`$key` IS NULL AND";
            } else {
                $whereDetails .= "`$key`=:$key AND ";
            }
        }
        $whereDetails = rtrim($whereDetails, ' AND ');

        if ($limit === false) {
            $sth = $this->prepare("DELETE FROM $table WHERE $whereDetails");
        } else {
            $sth = $this->prepare("DELETE FROM $table WHERE $whereDetails LIMIT $limit");
        }

        foreach ($where as $key => $value) {
            if ($value !== NULL)
                $sth->bindValue(":$key", $value);
        }

        try {
            return $sth->execute();
        } catch (Exception $e) {

            $this->insert('_erori', [
                'level' => 0,
                'level_string' => 'pdo_delete',
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'context' => json_encode([
                    'table' => $table,
                    'where' => $where
                ])
            ]);

            $lid = intval($this->lastInsertId());

            $this->update('_erori', [
                'id_hash' => phash_model::hash($lid)
            ], [
                'id' => $lid
            ]);

            exit(json_encode([
                'error' => true,
                'motiv' => 'S-a produs o eroare. Încercați mai târziu sau contactați SUPPORT. (COD: ' . phash_model::hash($lid) . ')'
            ]));

        }

    }

    public function lid()
    {
        return intval($this->lastInsertId());
    }

}
