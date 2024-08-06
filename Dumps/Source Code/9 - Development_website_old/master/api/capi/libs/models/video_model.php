<?php

class video_model extends model
{

    public $CPP = 10;

    public function get()
    {

        include_once('getID3-1.9.21/getid3/getid3.php');
        $getID3 = new getID3;

        $path = '../videos/';
        chdir($path);
        $dir = scandir('.');

        $rd = [];

        $all_comments = $this->siteDB->select("
        SELECT video_id, count(*) as q
        FROM watch_comments
        GROUP BY video_id");

        $comments_count = [];

        foreach ($all_comments as $c) {
            $comments_count[$c['video_id']] = $c['q'];
        }

        foreach ($dir as $key => $d) {

            if (is_dir($d) && $d != '.' && $d != '..') {

                $files = scandir($d);
                $videos = [];
                foreach ($files as $key2 => $f) {

                    if (stristr($f, '.webm')) {

                        if (!file_exists($d . '/' . str_replace('webm', 'jpg', $f))) {
                            // generate thumb
                            $command = "ffmpeg.exe -i \"" . $d . "\\" . $f . "\" -ss 00:00:20 -vframes 1 \"" . $d . "\\" . str_replace('webm', 'jpg', $f) . "\" ";
                            shell_exec($command);
                        }

                        if (file_exists($d . '/' . str_replace('webm', 'meta', $f))) {
                            $meta = json_decode(file_get_contents($d . '/' . str_replace('webm', 'meta', $f)), 1);
                            if (isset($meta['duration'])) {
                                $duration = $meta['duration'];
                            } else {
                                $duration = null;
                            }
                            $views = $meta['views'];
                            if (isset($meta['downloads'])) {
                                $downloads = $meta['downloads'];
                            } else {
                                $downloads = null;
                            }
                        } else {
                            $file = $getID3->analyze($d . '/' . $f);
                            $duration = $file['playtime_string'];
                            $views = 0;
                            $downloads = 0;
                            $meta = [
                                'duration' => $duration,
                                'views' => $views,
                                'downloads' => $downloads
                            ];
                            file_put_contents($d . '/' . str_replace('webm', 'meta', $f), json_encode($meta));
                        }

                        $video_id = hash("crc32", $f);

                        $videos[] = [
                            'url' => 'videos/' . $d . '/' . $f,
                            'id' => $video_id,
                            'thumb' => addslashes('videos/' . $d . '/' . str_replace('webm', 'jpg', $f)),
                            'title' => str_replace('.webm', '', $f),
                            'duration' => $duration,
                            'stamp' => intval(date("U", filemtime($d . '/' . $f))),
                            'ago' => self::ago(date('Y-m-d H:i:s', filemtime($d . '/' . $f))),
                            'comments' => [],
                            'commentsCount' => $comments_count[$video_id] ?? 0,
                            'views' => self::formatViews($views),
                            'downloads' => $downloads
                        ];
                    }
                }

                if (count($videos) > 0) {

                    usort($videos, function ($video1, $video2) {
                        return $video2['stamp'] <=> $video1['stamp'];
                    });

                    $rd[] = [
                        'name' => $d,
                        'name_slug' => self::slugify($d),
                        'videos' => $videos
                    ];
                }
            }
        }

        $desiredCategoryName = 'Patch Trailers';

        $desiredCategoryIndex = null;
        foreach ($rd as $index => $category) {
            if ($category['name_slug'] === self::slugify($desiredCategoryName)) {
                $desiredCategoryIndex = $index;
                break;
            }
        }

        if ($desiredCategoryIndex !== null) {
            $desiredCategory = $rd[$desiredCategoryIndex];
            unset($rd[$desiredCategoryIndex]);
            array_unshift($rd, $desiredCategory);
        }

        foreach ($rd as &$category) {
            usort($category['videos'], function ($video1, $video2) {
                return $video2['stamp'] <=> $video1['stamp'];
            });
        }

        return $rd;
    }

    public function getVideo()
    {

        if (!isset($this->params->id))
            return [
                'url' => 'notFound'
            ];

        $path = '../videos/';
        chdir($path);
        $dir = scandir('.');

        $id = str_replace('\'', '', $this->params->id);

        foreach ($dir as $key => $d) {
            if (is_dir($d) && $d != '.' && $d != '..') {
                $files = scandir($d);
                foreach ($files as $key2 => $f) {
                    if (stristr($f, '.webm')) {
                        if ($id == hash("crc32", $f)) {
                            return [
                                'url' => 'videos/' . $d . '/' . $f,
                            ];
                        }
                    }
                }
            }
        }

        return [
            'url' => 'notFound'
        ];
    }

    public function ci()
    {
        return [
            'login' => isset($_SESSION['account'])
        ];
    }

    public function getChars()
    {
        return $this->gameDB->select("SELECT name, class
        FROM tw_char.characters 
        WHERE account = :account
        ORDER BY level DESC", [
            'account' => $_SESSION['account']
        ]);
    }

    public function getViews()
    {
        return self::formatViews($this->incViews($this->params->id));
    }

    public function incViews($id)
    {
        // find video path
        $channels = $this->get();
        $path = '..';
        chdir($path);
        $meta_file = '';
        foreach ($channels as $key => $c) {
            foreach ($c['videos'] as $key2 => $v) {
                if ($v['id'] == $id) {
                    $meta_file = str_replace('webm', 'meta', $v['url']);
                    break;
                }
            }
        }

        if ($meta_file == '')
            return 0;

        $meta = json_decode(file_get_contents($meta_file), 1);

        // dont inc
        if (isset($_SESSION['view_' . $id]))
            return $meta['views'];

        $meta['views']++;
        file_put_contents($meta_file, json_encode($meta));

        $_SESSION['view_' . $id] = true;

        return $meta['views'];

    }

    public function commentsAdmin()
    {
        if (!isset($_SESSION['tv_administrator']))
            return [
                'nothing' => 'here'
            ];
        if (!$_SESSION['tv_administrator'])
            return [
                'nothing' => 'here'
            ];

        $comments = $this->siteDB->select("
        SELECT id, `char`, comment, stamp, parent, account, class, video_id
        FROM watch_comments
        WHERE moderated = 0
        ORDER BY stamp DESC
        LIMIT 100");

        return $comments;

    }

    public function moderate()
    {
        if (!isset($_SESSION['tv_administrator']))
            return [];
        if (!$_SESSION['tv_administrator'])
            return [];
        if (!isset($this->params->id))
            return [];
        if (!isset($this->params->i))
            return [];

        if ($this->params->i === -1) {
            $this->siteDB->delete('watch_comments', [
                'id' => $this->params->id
            ]);
        } elseif ($this->params->i === 1) {
            $this->siteDB->update('watch_comments', [
                'moderated' => 1
            ], [
                'id' => $this->params->id
            ]);
        }
        return [
            'moderated' => 'ok'
        ];
    }

    public function getComments()
    {

        if (!isset($this->params->id))
            return [];
        if (!isset($this->params->lid))
            return [];

        $comments = $this->siteDB->select("
        SELECT id, `char`, comment, stamp, parent, account, class
        FROM watch_comments
        WHERE video_id = :id
        AND parent is null
        AND id < :lid
        ORDER BY stamp DESC
        LIMIT " . $this->CPP, [
            'id' => $this->params->id,
            'lid' => $this->params->lid
        ]);

        foreach ($comments as $key => $c) {
            $comments[$key]['mine'] = (isset($_SESSION['account']) && $c['account'] == $_SESSION['account']) ||
                (isset($_SESSION['tv_administrator']) && $_SESSION['tv_administrator']);
            $comments[$key]['account'] = null;

            $comments[$key]['char'] = ucfirst($c['char']);
            $comments[$key]['stamp'] = self::ago($c['stamp']);
            $comments[$key]['repliesCount'] = count($this->siteDB->select("
                SELECT *
                FROM watch_comments
                WHERE parent = :parent", [
                'parent' => $c['id']
            ]));
            $comments[$key]['replies'] = [];
        }


        return [
            'commentsCount' => count($this->siteDB->select("
            SELECT *
            FROM watch_comments
            WHERE video_id = :vid
            and parent is null", [
                'vid' => $this->params->id
            ])),
            'comments' => $comments
        ];
    }

    public function getReplies()
    {
        if (!isset($this->params->parent))
            return [];
        if (!isset($this->params->lid))
            return [];

        if (isset($this->params->previous)) {
            $replies = $this->siteDB->select("
                SELECT id, `char`, comment as reply, stamp, account, class
                FROM watch_comments
                WHERE parent =:parent
                AND id < :lid
                ORDER BY stamp DESC
                LIMIT " . $this->CPP, [
                'parent' => $this->params->parent,
                'lid' => $this->params->lid
            ]);
        } else {
            $replies = $this->siteDB->select("
            SELECT id, `char`, comment as reply, stamp, account, class
            FROM watch_comments
            WHERE parent = :parent
            and id > :lid
            ORDER BY stamp ASC
            LIMIT " . $this->CPP, [
                'parent' => $this->params->parent,
                'lid' => $this->params->lid
            ]);
        }

        foreach ($replies as $key => $c) {
            $replies[$key]['mine'] = (isset($_SESSION['account']) && $c['account'] == $_SESSION['account']) ||
                (isset($_SESSION['tv_administrator']) && $_SESSION['tv_administrator']);
            $replies[$key]['account'] = null;
            $replies[$key]['char'] = ucfirst($c['char']);
            $replies[$key]['stamp'] = self::ago($c['stamp']);
        }

        return [
            'repliesCount' => count($this->siteDB->select("
            SELECT *
            FROM watch_comments
            WHERE parent = :parent", [
                'parent' => $this->params->parent
            ])),
            'replies' => $replies
        ];
    }

    public function comment()
    {

        if (!isset($_SESSION['account']))
            return [];
        if (!isset($this->params->id))
            return [];
        if (!isset($this->params->comment))
            return [];
        if (!isset($this->params->char))
            return [];

        $characters = $this->gameDB->select("SELECT name
        FROM tw_char.characters 
        WHERE account = :account
        AND level >= 15
        ", [
            'account' => $_SESSION['account']
        ]);

        if (count($characters) == 0) {
            return [
                'minlvl15' => true
            ];
        }

        if (isset($this->params->parent)) {
            // limit replying to 1 / 5m
            $last = $this->siteDB->select("
            SELECT stamp
            FROM watch_comments
            WHERE account = :account
            and parent = :parent
            AND stamp > ADDTIME(:now, '-00:01')", [
                'account' => $_SESSION['account'],
                'now' => date('Y-m-d H:i:s'),
                'parent' => $this->params->parent
            ]);
            if (count($last) != 0) {
                return [
                    'limit' => true
                ];
            }
        } else {
            // limit commenting to 1 / 5m
            $last = $this->siteDB->select("
            SELECT stamp
            FROM watch_comments
            WHERE account = :account
            AND stamp > ADDTIME(:now, '-00:01')", [
                'account' => $_SESSION['account'],
                'now' => date('Y-m-d H:i:s')
            ]);
            if (count($last) != 0) {
                return [
                    'limit' => true
                ];
            }
        }

        $chars = $this->getChars();
        $found = false;
        $found_class = 1;
        foreach ($chars as $key => $c) {
            if ($c['name'] == $this->params->char) {
                $found = true;
                $found_class = $c['class'];
                break;
            }
        }
        if (!$found)
            return [];

        $comment = $this->params->comment;
        $id = $this->params->id;

        $comment = self::sanComment($comment);

        $this->siteDB->insert("watch_comments", [
            'account' => $_SESSION['account'],
            'char' => ucfirst($this->params->char),
            'class' => $found_class,
            'parent' => $this->params->parent ?? null,
            'video_id' => $id,
            'comment' => $comment,
            'stamp' => date('Y-m-d H:i:s')
        ]);


        if (isset($this->params->parent)) {

            $replies = $this->siteDB->select("
            SELECT id, `char`, comment as reply, stamp, account, class
            FROM watch_comments
            WHERE parent =:parent
            ORDER BY stamp DESC
            LIMIT 5", [
                'parent' => $this->params->parent
            ]);
            $replies = array_reverse($replies);


            foreach ($replies as $key => $c) {
                $replies[$key]['mine'] = (isset($_SESSION['account']) && $c['account'] == $_SESSION['account']) ||
                    (isset($_SESSION['tv_administrator']) && $_SESSION['tv_administrator']);
                $replies[$key]['account'] = null;
                $replies[$key]['char'] = ucfirst($c['char']);
                $replies[$key]['stamp'] = self::ago($c['stamp']);
            }

            return [
                'replies' => $replies,
                'repliesCount' => count($this->siteDB->select("SELECT *
                FROM watch_comments
                WHERE parent = :parent", [
                    'parent' => $this->params->parent
                ]))
            ];

        } else {
            return [
                'comment' => [
                    'id' => $this->siteDB->lid(),
                    'comment' => $comment,
                    'class' => $found_class,
                    'mine' => true,
                    'char' => ucfirst($this->params->char),
                    'stamp' => self::ago(date('Y-m-d H:i:s')),
                    'repliesCount' => 0,
                    'replies' => [],
                ],
                'commentsCount' => count($this->siteDB->select("
                SELECT *
                FROM watch_comments
                WHERE video_id = :vid
                and parent is null", [
                    'vid' => $id
                ]))
            ];
        }

    }

    public function editComment()
    {
        if (!isset($_SESSION['account']))
            return [];
        if (!isset($this->params->id))
            return [];
        if (!isset($this->params->comment))
            return [];
        if (!isset($this->params->char))
            return [];

        $chars = $this->getChars();
        $found = false;
        $found_class = 1;
        foreach ($chars as $key => $c) {
            if ($c['name'] == $this->params->char) {
                $found = true;
                $found_class = $c['class'];
                break;
            }
        }
        if (!$found)
            return [];

        $comment = $this->params->comment;
        $id = $this->params->id;

        $comment = self::sanComment($comment);

        $this->siteDB->update("watch_comments", [
            'char' => ucfirst($this->params->char),
            'class' => $found_class,
            'comment' => $comment,
            'edited' => 1
        ], [
            'id' => $id,
            'account' => $_SESSION['account']
        ]);

        return [
            'char' => ucfirst($this->params->char),
            'class' => $found_class
        ];
    }

    public function deleteComment()
    {

        if (!isset($this->params->id))
            return [];
        if (!isset($_SESSION['account']))
            return [];

        $comment = $this->siteDB->select("
        SELECT *
        FROM watch_comments
        WHERE id = :id
        AND account = :me", [
            'id' => $this->params->id,
            'me' => $_SESSION['account']
        ]);

        if (count($comment) == 0)
            return [];

        // delete comment
        $this->siteDB->delete('watch_comments', [
            'id' => $this->params->id,
            'account' => $_SESSION['account']
        ]);

        return [];
    }

    public function like()
    {
        if (!isset($this->params->id))
            return [];
        if (!isset($this->params->l))
            return [];

        if (!isset($_SESSION['account']))
            return [
                'login' => 0
            ];

        // check current like
        $like = $this->siteDB->select("
        SELECT *
        FROM watch_likes
        WHERE video_id = :vid and account = :me", [
            'vid' => $this->params->id,
            'me' => $_SESSION['account']
        ]);

        if (count($like) == 1) {

            if ($this->params->l != $like[0]['ld']) {
                // replace if different
                $this->siteDB->update("watch_likes", [
                    'ld' => $this->params->l
                ], [
                    'id' => $like[0]['id']
                ]);
            } else {
                // remove if same
                $this->siteDB->delete("watch_likes", [
                    'id' => $like[0]['id']
                ]);
            }
        } else {
            // insert new like
            $this->siteDB->insert("watch_likes", [
                'account' => $_SESSION['account'],
                'ld' => $this->params->l,
                'video_id' => $this->params->id
            ]);
        }

        return $this->likes();
    }

    public function likes()
    {

        if (!isset($this->params->id))
            return [];

        $wl = $this->siteDB->select("
        SELECT *
        FROM watch_likes
        WHERE video_id = :vid", [
            'vid' => $this->params->id
        ]);

        $likes = 0;
        $dislikes = 0;
        $liked = 0;

        // interract check
        $ci = isset($_SESSION['account']);

        foreach ($wl as $key => $l) {
            if ($l['ld'] > 0)
                $likes++;
            else
                $dislikes++;
            if ($ci && $l['account'] == $_SESSION['account'])
                $liked = $l['ld'];
        }

        return [
            'likes' => $likes,
            'dislikes' => $dislikes,
            'liked' => $liked,
            'ci' => $ci
        ];
    }

    static public function slugify($text)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);

        // transliterate
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

        // remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);

        // trim
        $text = trim($text, '-');

        // remove duplicate -
        $text = preg_replace('~-+~', '-', $text);

        // lowercase
        $text = strtolower($text);

        if (empty($text)) {
            return '';
        }

        return $text;
    }

    public static function ago($ptime)
    {
        $estring = '';
        $ptime = strtotime($ptime);
        $ctime = strtotime(date('Y-m-d H:i:s'));
        $etime = $ctime - $ptime;

        if ($etime < 1)
            return 'now';

        $a = array(365 * 24 * 60 * 60 => 'year',
            30 * 24 * 60 * 60 => 'month',
            24 * 60 * 60 => 'day',
            60 * 60 => 'hour',
            60 => 'minute',
            1 => 'second'
        );

        $a_plural = array('year' => 'years',
            'month' => 'months',
            'day' => 'days',
            'hour' => 'hours',
            'minute' => 'minutes',
            'second' => 'seconds'
        );

        $index = 0;

        foreach ($a as $secs => $str) {
            // Divide elapsed time by seconds
            $d = $etime / $secs;

            if ($d >= 1) {

                $r = floor($d);
                $rtime = $r * $secs;

                if (($etime - $rtime) < 0)
                    $etime -= ($r - 1) * $secs;
                else
                    $etime -= $rtime;

                $estring = $estring . ' ' . $r . ' ' . ($r > 1 ? $a_plural[$str] : $str) . ' ';

                $index++;
            }

            if ($index > 0) {
                break;
            }
        }

        return $estring . ' ago';

    }

    public static function formatViews($views)
    {
        if ($views >= 1000 && $views < 1000000)
            return number_format($views / 1000, 1) . 'K';
        if ($views >= 1000000)
            return number_format($views / 1000000, 1) . 'M'; // i know!
        return $views;
    }

    public function sanComment($c)
    {
        $c = strip_tags($c);
        $c = trim($c);
        return $c;
    }

    public function clearMeta()
    {

        // delete meta and jpg
        $path = '../videos/';
        chdir($path);
        $dir = scandir('.');

        foreach ($dir as $key => $d) {

            if (is_dir($d) && $d != '.' && $d != '..') {

                $files = scandir($d);
                foreach ($files as $key2 => $f) {

                    if (stristr($f, '.meta') || stristr($f, '.jpg'))
                        unlink($d . '\\' . $f);
                }
            }
        }

        echo "Meta cleared<br>";
        echo "Thumbs cleared<br><br>";
        echo "Generating new meta + thumbs<br>";

        chdir('../api');
        $this->get();

        echo "Done<Br>";
    }
}
