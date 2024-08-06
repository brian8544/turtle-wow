<?php

class register_model extends model
{
    public function checkCaptcha($cf_response)
    {
        $cf_verify_url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

        $cf_params = [
            'secret' => CF_TURNSTILE_SECRET_KEY,
            'response' => $cf_response,
            'remoteip' => $this->get_ip(),
        ];

        $options = [
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/json',
                'content' => json_encode($cf_params)
            ]
        ];

        $stream = stream_context_create($options);

        $response = file_get_contents($cf_verify_url, false, $stream);

        $cf_verify_response = json_decode($response, true);

        return $cf_verify_response['success'] === true;
    }

    public function register()
    {
        $account_name = $this->params->data->account_name;
        $email_address = $this->params->data->email_address;
        $user_password = $this->params->data->user_password;
        $forum_name = $this->params->data->forum_name;

        $forbiddenEmails = [
            'qq.com',
            'foxmail.com',
            '126.com',
            '163.com',
            'sina.com',
            'sohu.com',
            'yeah.net',
            'tom.com',
            '188.com',
            'sina.cn'
        ];

        $forbiddenCountries = [
            'CN',
            'HK',
            'IN',
            'SG',
            'TW'
        ];

        foreach ($forbiddenEmails as $forbiddenEmail) {
            if (strpos($email_address, "@" . $forbiddenEmail) !== false) {
                return ['response' => "Forbidden email!"];
            }
        }

        foreach ($forbiddenCountries as $forbiddenCountry) {
            if ($_SERVER["HTTP_CF_IPCOUNTRY"] == $forbiddenCountry) {
                return ['response' => "Forbidden country!"];
            }
        }

        if (!isset($this->params->data->captchaInput)) {
            return ['response' => "Captcha expired. Reload the page and try again."];
        }

        $ignore_captcha = $this->checkCaptcha($this->params->data->captchaInput);

        if ($ignore_captcha) {

            // Verify all the account registration input
            $result = $this->validate_register_form($account_name, $email_address, $user_password, $forum_name);

            // If everything is ok, create an account or output the error
            if ($result !== '') {
                return ['response' => $result];
            } else {
                return ['response' => $this->create_account(
                    $account_name,
                    $email_address,
                    $user_password,
                    $forum_name
                )];
            }
        } else {
            return ['response' => "Captcha verification failed, please try again."];
        }

    }

    public function logout()
    {
        unset($_SESSION['user']);
        unset($_SESSION['account']);
        unset($_SESSION['tv_administrator']);
        @session_destroy();
    }

    public function login()
    {

        // not used anymore
        return [];

        if (!isset($this->params->data))
            return [];
        if (!isset($this->params->data->username) || !isset($this->params->password))
            return [];

        $username = strtoupper($this->params->data->username);
        $password = strtoupper($this->params->data->password);


        $ip = $this->get_ip();
        // unset($_SESSION[$ip . '_attempts']);
        // exit;

        if (isset($_SESSION[$ip . '_attempts'])) {

            $data = json_decode($_SESSION[$ip . '_attempts'], 1);
            if ($data['locked']) {

                $diff = ($data['end'] - strtotime('now')) / 60;

                if ($diff <= 0) {
                    unset($_SESSION[$ip . '_attempts']);
                } else {
                    return ['result' => 1, 'msg' => "Too many attempts. Please try again in " . ceil($diff) . " minute(s)."];
                }
            }
        }
        if (isset($_SESSION[$username . '_attempts'])) {

            $data = json_decode($_SESSION[$username . '_attempts'], 1);
            if ($data['locked']) {

                $diff = ($data['end'] - strtotime('now')) / 60;

                if ($diff <= 0) {
                    unset($_SESSION[$username . '_attempts']);
                } else {
                    return ['result' => 1, 'msg' => "Too many attempts. Please try again in " . ceil($diff) . " minute(s)."];
                }
            }
        }

        $account = $this->_get_account_from_username($username);
        if (count($account) <= 0 || count($account) > 1)
            return ['result' => 1, 'msg' => "No valid account found"];

        $account = (object)$account[0];
        if (strtoupper($account->sha_pass_hash) == strtoupper(sha1("$username:$password"))) {

            unset($_SESSION[$ip . '_attempts']);
            unset($_SESSION[$username . '_attempts']);

            $coins = $this->gameDB->select("SELECT * 
                    FROM shop_coins 
                    WHERE id = :account", [
                'account' => $account->id
            ]);
            $totalCoins = 0;
            if (count($coins) > 0) {
                $coins = (object)$coins[0];
                $totalCoins = $coins->coins;
            }

            /// Login Successfull
            $_SESSION['user'] = $account->username;
            $_SESSION['account'] = $account->id;
            // for deleting tw watch comments
            $_SESSION['tv_administrator'] = $account->rank >= 3;
            return [
                'result' => 0,
                'datas' => [
                    'user_id' => $account->id,
                    'username' => $account->username,
                    'email' => $account->email,
                    'tokens' => $totalCoins
                ]
            ];
        } else {

            if (isset($_SESSION[$ip . '_attempts'])) {
                $data = json_decode($_SESSION[$ip . '_attempts'], 1);
                $data['attempts']++;
                $data['last_attempt'] = date('Y-m-d H:i:s');

                if ($data['attempts'] >= MAX_LOGIN_ATTEMPTS) {

                    if (round((strtotime('now') - strtotime($data['first_attempt'])) / 60, 2) <= MAX_MINUTES_ATTEMPTS) {
                        $data['locked'] = true;
                        $data['end'] = strtotime('+' . MAX_MINUTES_ATTEMPTS . ' minutes', strtotime('now'));
                        $_SESSION[$ip . '_attempts'] = json_encode($data);
                        return ['result' => 1, 'msg' => "Too many attempts. Please try again in " . TIMEOUT_MINUTES . " minutes."];
                    } else {
                        $data['first_attempt'] = date('Y-m-d H:i:s');
                        $data['attempts'] = 1;
                    }
                }
            } else {
                $data = [];
                $data['first_attempt'] = date('Y-m-d H:i:s');
                $data['attempts'] = 1;
                $data['locked'] = false;
            }

            $_SESSION[$ip . '_attempts'] = json_encode($data);

            if (isset($_SESSION[$username . '_attempts'])) {
                $data = json_decode($_SESSION[$username . '_attempts'], 1);
                $data['attempts']++;
                $data['last_attempt'] = date('Y-m-d H:i:s');

                if ($data['attempts'] >= MAX_LOGIN_ATTEMPTS) {

                    if (round((strtotime('now') - strtotime($data['first_attempt'])) / 60, 2) <= MAX_MINUTES_ATTEMPTS) {
                        $data['locked'] = true;
                        $data['end'] = strtotime('+' . MAX_MINUTES_ATTEMPTS . ' minutes', strtotime('now'));
                        $_SESSION[$username . '_attempts'] = json_encode($data);
                        return ['result' => 1, 'msg' => "Too many attempts. Please try again in " . TIMEOUT_MINUTES . " minutes."];
                    } else {
                        $data['first_attempt'] = date('Y-m-d H:i:s');
                        $data['attempts'] = 1;
                    }
                }
            } else {
                $data = [];
                $data['first_attempt'] = date('Y-m-d H:i:s');
                $data['attempts'] = 1;
                $data['locked'] = false;
            }

            $_SESSION[$username . '_attempts'] = json_encode($data);

            return ['result' => 1, 'msg' => "Invalid credentials"];

        }
    }

    public function loginStatus()
    {

        if (isset($_SESSION['account']) && isset($_SESSION['user'])) {

            $account = $this->_get_account_from_username($_SESSION['user']);

            if (count($account) <= 0 || count($account) > 1)
                return [
                    'result' => 0,
                    'loggedIn' => false,
                    'datas' => []
                ];

            $account = (object)$account[0];

            $coins = $this->gameDB->select("SELECT * 
                    FROM shop_coins 
                    WHERE id = :account", [
                'account' => $account->id
            ]);
            $totalCoins = 0;
            if (count($coins) > 0) {
                $coins = (object)$coins[0];
                $totalCoins = $coins->coins;
            }

            return [
                'result' => 0,
                'loggedIn' => true,
                'datas' => [
                    'user_id' => $account->id,
                    'username' => $account->username,
                    'email' => $account->email,
                    'tokens' => $totalCoins,
                    'rank' => $account->rank
                ]
            ];
        }

        return [
            'result' => 0,
            'loggedIn' => false,
            'datas' => []
        ];

    }

    public function getPoints()
    {
        $userID = $this->params->user_id;
        $account = $this->_get_account_from_user_id($userID);
        if (count($account) <= 0 || count($account) > 1)
            return ['result' => 1, 'error' => "No valid account found"];

        $account = (object)$account[0];
        $coins = $this->gameDB->select("SELECT * FROM shop_coins where id = :u", [
            'u' => $userID
        ]);

        if (count($coins) <= 0 || count($coins) > 1)
            return ['result' => 1, 'error' => "No valid account found"];

        $coins = (object)$coins[0];
        return ['result' => 0, 'tokens' => $coins->coins];
    }

    private function _get_account_from_username($username)
    {
        return $this->gameDB->select("SELECT * FROM " . GAME_DB_ACCOUNT . " where username = :u AND active = 1", [
            'u' => $username
        ]);
    }

    private function _get_account_from_user_id($userID)
    {
        return $this->gameDB->select("SELECT * FROM " . GAME_DB_ACCOUNT . " where id = :u AND active = 1", [
            'u' => $userID
        ]);
    }

    private function is_valid_account_name($account_name)
    {
        return preg_match("/^[\dA-Za-z]{2,15}$/", $account_name);
    }

    private function is_valid_password($password)
    {
        return preg_match("/^[\dA-Za-z!?%*$\-+]{4,16}$/", $password); // at least 4 chars and only certain special chars
    }

    private function is_valid_forum_account_name($forum_name)
    {
        return preg_match("/^[\dA-Za-z]{2,15}$/", $forum_name);
    }

    public function validate_register_form($account_name, $email_address, $user_password, $forum_name)
    {
        if (!$this->is_valid_account_name($account_name)) {
            return 'You must provide a valid account name containing only letters and numbers with up to 15 characters.';
        }

        if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
            return 'You must provide a valid email address.';
        }

        if (!$this->is_valid_password($user_password)) {
            return 'You must provide a valid password with a length of 4-16 characters, at least 12 characters are recommended. Only general special characters such as !?%*$ are supported.';
        }

        if (!$this->is_valid_forum_account_name($forum_name)) {
            return 'You must provide a valid forum account name containing only letters and numbers with up to 15 characters.';
        }

        return '';
    }

    public function get_ip()
    {
        //Just get the headers if we can or else use the SERVER global.
        if (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
        } else {
            $headers = $_SERVER;
        }

        //Get the forwarded IP if it exists.
        if (array_key_exists('X-Forwarded-For', $headers) && filter_var($headers['X-Forwarded-For'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
            $the_ip = $headers['X-Forwarded-For'];
        } elseif (array_key_exists('HTTP_X_FORWARDED_FOR', $headers) && filter_var($headers['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
            $the_ip = $headers['HTTP_X_FORWARDED_FOR'];
        } elseif (array_key_exists('Cf-Pseudo-IPv4', $headers) && filter_var($headers['Cf-Pseudo-IPv4'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
            $the_ip = $headers['Cf-Pseudo-IPv4'];
        } else {
            $the_ip = filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4);
        }

        // Might be useful
        $regex_ip = "^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}.([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";

        // Ensure we got a valid IP, else simply set 1.1.1.1
        if (!filter_var($the_ip, FILTER_VALIDATE_IP)) {
            $the_ip = "1.1.1.1";
        }

        return $the_ip;
    }

    public function is_account_name_unique($account_name)
    {
        return count($this->gameDB->select("SELECT * FROM " . GAME_DB_ACCOUNT . " where username = :u ", [
                'u' => $account_name
            ])) == 0;
    }

    public function is_email_address_unique($email_address)
    {
        return count($this->gameDB->select("select * FROM " . GAME_DB_ACCOUNT . " where email = :e", [
                'e' => $email_address
            ])) == 0;
    }

    public function is_forum_name_unique($account_forum_clean)
    {
        return count($this->forumDB->select("select * from " . FORUM_DB_USERS . " WHERE username_clean = :u", [
                'u' => $account_forum_clean
            ])) === 0;
    }

    public function can_register_more_today($ip): bool
    {
        $ip_ex = explode('.', $ip);
        $ip_range = $ip_ex[0] . '.' . $ip_ex[1] . '.' . $ip_ex[2] . '.%';

        $range = $this->gameDB->select("
        SELECT * 
        FROM " . GAME_DB_ACCOUNT . " 
        WHERE last_ip LIKE '" . $ip_range . "' 
        AND joindate > DATE_SUB(NOW(), INTERVAL 24 HOUR)
        AND joindate <= NOW()");

        $per_ip = $this->gameDB->select("
        SELECT * 
        FROM " . GAME_DB_ACCOUNT . " 
        WHERE last_ip = :ip 
        AND joindate > DATE_SUB(NOW(), INTERVAL 24 HOUR)
        AND joindate <= NOW()", [
            'ip' => $ip
        ]);

        return (count($per_ip) < 10) || (count($range) < 20);

    }

    public function create_account($account_name, $email_address, $password, $forum_name)
    {
        $account = strtoupper($account_name);
        $account_forum = ucfirst(strtolower($forum_name)); // TeSt -> Test
        $account_forum_clean = strtolower($forum_name); // TeSt -> test

        $userip = $this->get_ip();

        if (strtolower($account_name) === strtolower($forum_name)) {
            return 'There was a problem creating your account, please use separate forum and account names.';
        }

        if (!$this->is_account_name_unique($account_name)) {
            return 'The account name you provided is already in use.';
        }

        if (!$this->is_email_address_unique($email_address)) {
            return 'The email address you provided is already in use.';
        }

        if (!$this->is_forum_name_unique($account_forum_clean)) {
            return 'The forum name you provided is already in use.';
        }

//        if (!$this->can_register_more_today($userip)) {
//            return 'You must wait at least 24 hours until you can create additional accounts.';
//        }

        $passwd = strtoupper($password);
        $passwd_hash = sha1("$account:$passwd");

        $keyword = "Default1234";
        $keyword_name = $this->generate_name();
        $keyword_rand = intval("0" . rand(1, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9)); // random 4 digit int
        $keyword = $keyword_name . $keyword_rand;

        if (!$this->gameDB->insert(GAME_DB_ACCOUNT, [
            'username' => $account,
            'sha_pass_hash' => $passwd_hash,
            'email' => $email_address,
            'last_ip' => $userip,
            'forum_username' => $account_forum,
            'email_keyword' => $keyword
        ])) {
            return 'There was a problem creating your account. Please check the information you have provided.';
        }

        unset($_SESSION["captcha"]);

//        require("sendgrid-php/vendor/autoload.php"); // local
        require("../../sendgrid-php/vendor/autoload.php"); // Composer version of Sendgrid API

        $accdate = date('l jS \of F Y h:i:s A');

        $email = new \SendGrid\Mail\Mail();
        $email->setFrom(EMAIL_ADDRESS, EMAIL_NAME);
        $email->setSubject(EMAIL_SUBJECT);
        $email->addTo($email_address, $account); // 2nd field is the receiver name
        $email->addHeader("X-Mailer", "SendGrid-API");

        $activation_token = md5('ALiCzsbjkN03nZatYFpmYij9_k08eH2h6w%3A1657722131343' .
            strtolower($account) .
            'E9XOYvOpFICrxc8P44GbuAs');

        // Plain text
        $email->addContent("text/plain", "
            Account creation successfull! Welcome, young turtle. We wish you the best of luck on your adventures, but always remember, slow and steady wins the race!
            \n\n
            Your account name: $account\n
            Your account recovery keyword is: $keyword <- Note it down!\n
            Account created on: $accdate
            \n\n
            Your account needs to be activated before you can login. Please visit https://turtle-wow.org/#/activate/" . $email_address . "/" . $activation_token . " to activate your account.
            \n\n
            Please read our Terms of Use, if you have any questions about these terms, or anything related to our server, feel free to ask us via our Discord or the support section of our Forums.
            \n\n");

        // HTML text
        $email->addContent("text/html", '
            Account creation successfull! Welcome, young turtle. We wish you the best of luck on your adventures, but always remember, slow and steady wins the race!
            <br><br>
            Your account name: ' . $account . '<br>
            Your account recovery keyword is: ' . $keyword . ' <i><- Note it down!</i><br>
            Account created on: ' . $accdate . '
            <BR><BR>
            Your account needs to be activated before you can login. Please visit https://turtle-wow.org/#/activate/' . $email_address . '/' . $activation_token . ' 
            or click <a href="https://turtle-wow.org/#/activate/' . $email_address . '/' . $activation_token . '" target="_blank">here</a> to activate your account.            
            <br><br>
            Please read our <a href="https://turtle-wow.org/#/rules">Terms of Use</a>, if you have any questions about these terms, or anything related to our server, feel free to ask us via our <a href="https://discord.gg/mBGxmHy">Discord channel</a> or the support section of our <a href="https://forum.turtle-wow.org/">Forums</a>.
            ');


        $sendgrid = new SendGrid(SG_API_KEY);
        $response = $sendgrid->send($email);
        $sgstatus = $response->statusCode();
        error_log('Sendgrid status code: ' . $sgstatus . ' to address ' . $email_address);

        $this->gameDB->update(GAME_DB_ACCOUNT, [
            'email_status' => $sgstatus
        ], [
            'username' => $account,
            'email' => $email_address
        ]);

        $passwd_forum = password_hash("$password", PASSWORD_DEFAULT);
        $unixtime = time();
        $style = 1;
        $forumlang = "en";

        if (!$this->forumDB->insert(FORUM_DB_USERS, [
            'user_regdate' => $unixtime,
            'username' => $account_forum,
            'username_clean' => $account_forum_clean,
            'user_permissions' => '',
            'user_sig' => '',
            'user_password' => $passwd_forum,
            'user_email' => $email_address,
            'user_lang' => $forumlang,
            'user_style' => $style
        ]))
            return 'There was a problem creating your forum account. However, your game account has been created successfully.';

        if (!$this->forumDB->insert(FORUM_DB_GROUP, [
            'user_id' => $this->forumDB->select("SELECT user_id from " . FORUM_DB_USERS . " where username = :u", ['u' => $account_forum])[0]['user_id'],
            'group_id' => 2,
            'user_pending' => 0
        ]))
            return 'There was a problem creating your forum account, please ask a staff member to assign you to a valid usergroup.';


//        if (!$this->forumDB->simpleQuery("update " . FORUM_DB_USERS . " set user_email_hash = concat(crc32(lower(user_email)), length(user_email)) WHERE username = '" . $account_forum . "'"))
//            return 'There was a problem creating your forum account and you won\'t be able to recover your password. Contact a staff member.';

        return 'Your account was created successfully, check your email inbox for further information.';
    }

    public function activate()
    {
        if (!$this->params->email or !$this->params->token) {
            exit();
        }

        $email_address = trim($this->params->email);

        $accounts = $this->gameDB->select("SELECT * 
            FROM " . GAME_DB_ACCOUNT . " 
            WHERE email = :e", [
            'e' => $email_address
        ]);

        $rd = 'This email doesn\'t exist.';

        if (count($accounts) == 0) {
            return ['response' => 'This email doesn\'t exist.'];
        }

        foreach ($accounts as $key => $account) {

            if ($this->params->token == md5('ALiCzsbjkN03nZatYFpmYij9_k08eH2h6w%3A1657722131343' .
                    strtolower($account['username']) .
                    'E9XOYvOpFICrxc8P44GbuAs')) {

            } else {
                $rd = 'Token mismatch.';
                break;
            }

            if (intval($account['email_verif']) == 1) {
                $rd = 'Your account is already activated!';
                break;
            }

            $this->gameDB->update(GAME_DB_ACCOUNT, [
                'email_verif' => 1
            ], [
                'username' => $account['username'],
                'email' => $email_address
            ]);

            $rd = 'Thank you for activating your account. You can now log in!';
        }

        return ['response' => $rd];

    }

    public function generate_name()
    {
        //PHP array containing forenames.
        $names = array(
            'Gat',
            'Rok',
            'Tak',
            'Kel',
            'Bog',
            'Itr',
            'Des',
            'Umi',
            'Uda',
            'Gla',
            'Zul',
            'Mav',
            'Fid',
            'Gri',
            'Ruz',
            'Ald',
            'Dro',
            'Vin',
            'Sis',
            'Zas',
            'Blo',
            'Nam',
            'Lur',
            'Ala',
            'Tho',
            'Apo',
            'Hal',
            'Sha',
            'Cer',
            'Syl',
            'Ges',
            'Zen'
        );

        //PHP array containing surnames.
        $surnames = array(
            'ard',
            'olf',
            'pon',
            'kon',
            'elf',
            'mat',
            'das',
            'raa',
            'iss',
            'uss',
            'taa',
            'koh',
            'moh',
            'dat',
            'ull',
            'rat',
            'hat'
        );

        //Generate a random forename.
        $random_name = $names[mt_rand(0, sizeof($names) - 1)];

        //Generate a random surname.
        $random_surname = $surnames[mt_rand(0, sizeof($surnames) - 1)];

        //Combine them together and print out the result.
        return $random_name . $random_surname;
    }

    public function reset()
    {

        if (!$this->params->email)
            exit();

        $email_address = trim($this->params->email);

        $accounts = $this->gameDB->select("SELECT * 
            FROM " . GAME_DB_ACCOUNT . " 
            WHERE email = :e", [
            'e' => $email_address
        ]);

        if (count($accounts) == 0) {
            return ['response' => 'This email doesn\'t exist.'];
        }

        $rd = [];

        $mail_stuff_disabled = false;

        foreach ($accounts as $key => $account) {
            $password = bin2hex(random_bytes(4));
            $token_key = md5($password);

            $this->gameDB->update(GAME_DB_ACCOUNT, [
                'token_key' => $token_key
            ], [
                'username' => $account['username'],
                'email' => $email_address
            ]);

            if ($mail_stuff_disabled) {

                $this->gameDB->update(GAME_DB_ACCOUNT, [
                    'email_status' => 202
                ], [
                    'username' => $account['username'],
                    'email' => $email_address
                ]);

                $rd = 'We\'ve sent you a letter. Please check your mailbox!';

            } else {

                require("../../sendgrid-php/vendor/autoload.php"); // Composer version of Sendgrid API

                $email = new \SendGrid\Mail\Mail();
                $email->setFrom(EMAIL_ADDRESS, EMAIL_NAME);
                $email->setSubject("Account recovery on Turtle WoW");
                $email->addTo($email_address, $account['username']); // 2nd field is the receiver name
                $email->addHeader("X-Mailer", "SendGrid-API");

                // HTML text
                $email->addContent("text/html", '
                Greetings! ' . $account['username'] . ' <br />
                Someone used your e-mail to reset Turtle WoW password.<br />
                If you haven\'t done this, ignore this letter.<br />
                <hr>
                Your account: <br />
                Username : <b>' . $account['username'] . '</b><br />
                Password : <b>' . $password . '</b><br />
        
                To confirm password reset, <a href="https://turtle-wow.org/#/reset/' . $token_key . '/' . $password . '" target="_blank">click here</a>.
                ');

                $sendgrid = new SendGrid(SG_API_KEY);

                $response = $sendgrid->send($email);
                error_log('Sendgrid status code: ' . $response->statusCode() . ' to address ' . $email_address);

                $this->gameDB->update(GAME_DB_ACCOUNT, [
                    'email_status' => $response->statusCode()
                ], [
                    'username' => $account['username'],
                    'email' => $email_address
                ]);


                if ($response->statusCode() !== 202) {
                    error_log('Saving status code of ' . $account['username'] . ' with email ' . $email_address . ' failed!');
                    $rd = 'Error. Please, enter valid account name and username.';
                } else
                    $rd = 'We\'ve sent you a letter. Please check your mailbox!';

            }
        }

        return ['response' => $rd];

    }

    public function token_key()
    {

        if (isset($this->params->token_key) && isset($this->params->pass)) {

            $token_key = trim($this->params->token_key);
            $password = trim($this->params->pass);

            $username = $this->gameDB->select("
            SELECT email, username FROM " . GAME_DB_ACCOUNT . " WHERE
            token_key  = :t", [
                't' => $token_key
            ]);

            if (count($username) != 1)
                return ['response' => 'nousername'];

            $normalised_username = strtoupper($username[0]['username']);
            $normalised_password = strtoupper($password);

            $secret_key = sha1("$normalised_username:$normalised_password");
            $token_key = null;

            $this->gameDB->update(GAME_DB_ACCOUNT, [
                'token_key' => $token_key,
                'sha_pass_hash' => $secret_key,
                'v' => '',
                's' => '',
                'sessionkey' => ''
            ], [
                'username' => $username[0]['username'],
                'email' => $username[0]['email'],
            ]);

            return ['response' => 'ok'];

        } else {
            return ['response' => 'noparams'];
        }


    }

    function generateRandomString($length = 6)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }

    function generateCaptchaImage()
    {

        $captcha = $this->generateRandomString();

        $_SESSION["captcha"] = $captcha;

        $width = 450;
        $height = 55;

        $im = imagecreatetruecolor($width, $height);

        $bg = imagecolorallocate($im, 34, 30, 28);
        $fg = imagecolorallocate($im, 248, 157, 65);

        imagefill($im, 0, 0, $bg);

        $font = getcwd() . '/../fonts/DINPro.ttf';

        if (!imagettftext($im, 20, 0, rand(10, 350), rand(25, 45), $fg, $font, $captcha)) {
            exit;
        }

        header("Cache-Control: no-store, no-cache, must-revalidate");
        header('Content-type: image/png');

        imagepng($im);
        imagedestroy($im);
        exit;
    }


    public function d_status()
    {
        return file_get_contents('pp_status.txt');
    }

}
