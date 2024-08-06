<?php /** @noinspection SqlNoDataSourceInspection */

class ucp_model extends model
{

    public function get()
    {

        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        if (!isset($this->params->view))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'No view set.'
            ];

        if ($this->params->view == 'overview')
            return $this->overview();

        if ($this->params->view == 'characters')
            return $this->characters();

        return [];

    }

    public function overview()
    {

        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        $account = $this->gameDB->select("
        SELECT username, email, joindate, forum_username, last_ip, last_login,
               email_sub
        FROM account
        WHERE id = :username", [
            'username' => $_SESSION['account']
        ]);

        if (count($account) != 1)
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'Account not found.'
            ];

        $account = $account[0];

        // fix for console accounts
        if ($account['email'] === null)
            $account['email'] = 'console@console.account';

        $at_loc = strpos($account['email'], '@');

        $rand_asterix = '';
        for ($i = 1; $i <= rand(3, 13); $i++)
            $rand_asterix .= '*';

        $account['email'] = $account['email'][0] . $rand_asterix . substr($account['email'], $at_loc);
        $account['joindate'] = date('d/m/Y', strtotime($account['joindate']));
        $account['last_login'] = date('d/m/Y @H:i:s', strtotime($account['last_login']));

        $status = $this->gameDB->select("
        SELECT banid, unbandate, bandate
        FROM account_banned
        WHERE id = :id
        AND active = 1
        ORDER BY unbandate DESC
        LIMIT 1", [
            'id' => $_SESSION['account']
        ]);

        $account['status'] = [
            'banned' => count($status) > 0,
            'banid' => count($status) > 0 ? $status[0]['banid'] : 0,
            'tl' => 0,
            'messages' => []
        ];

        $banid = 0;
        if ($account['status']['banned']) {
            $status = $status[0];
            $seconds = $status['unbandate'] - time();

            // shouldnt get to banned & timeleft < 0 cause i think the server removes the active flag, but anyway
            if ($seconds > 0) {
                $dtF = new \DateTime('@0');
                $dtT = new \DateTime("@$seconds");
                $account['status']['tl'] = $dtF->diff($dtT)->format('%a days, %h hours and %i minutes');
            }

            // check for perma ban status
            $account['status']['perma'] = intval($status['unbandate']) <= intval($status['bandate']);

            $banid = $status['banid'];
        } else {
            // try to get prev ban id, in case of unbans
            $ban = $this->gameDB->select("
            SELECT banid
            FROM account_banned
            WHERE id = :id
            AND active = 0
            ORDER BY unbandate DESC
            LIMIT 1", [
                'id' => $_SESSION['account']
            ]);
            if (count($ban) == 1)
                $banid = $ban[0]['banid'];
        }

        if ($banid !== 0) {
            // messages
            $account['status']['messages'] = $this->siteDB->select("
            SELECT *
            FROM ban_appeal
            WHERE banid = :banid
            ORDER BY stamp", [
                'banid' => $banid
            ]);

            foreach ($account['status']['messages'] as $key => $m) {
                $account['status']['messages'][$key]['guid'] = $m['guid'] == $_SESSION['account'] ? $account['username'] : 'Turtle WoW Support';
                $account['status']['messages'][$key]['stamp'] = date('H:i d/m/Y', strtotime($m['stamp']));
            }
        }

        $coins = $this->gameDB->select("SELECT coins
                    FROM shop_coins 
                    WHERE id = :account", [
            'account' => $_SESSION['account']
        ]);
        $account['tokens'] = 0;
        if (count($coins) > 0)
            $account['tokens'] = $coins[0]['coins'];

        return $account;

    }

    public function characters()
    {
		return;

        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];


        $characters = $this->gameDB->select("SELECT name, class, race, level, gender,
        mortality_status, guid, 0 as deleted
        FROM tw_char.characters 
        WHERE account = :account
        ORDER BY level DESC", [
            'account' => $_SESSION['account']
        ]);

        // get deleted characters
        $deleted = $this->gameDB->select("
        SELECT deleteInfos_name as name, class, race, level, gender, mortality_status, guid,
               1 as deleted
        FROM tw_char.characters
        WHERE account = 0 AND name = ''
        AND deleteInfos_Account = :guid 
        ", [
            'guid' => $_SESSION['account']
        ]);

        $characters = array_merge($characters, $deleted);


        // 50004 Glyph of Exhaustion
        // 50000 Glyph of the Turtle
        // 50008 Glyph of War

        $glyphs = [50004, 50000, 50008];

        foreach ($characters as $key => $c) {

            $characters[$key]['glyphs'] = $this->gameDB->select("SELECT spell
            FROM tw_char.character_spell
            WHERE guid = :id
            AND (spell = " . $glyphs[0] . " OR spell = " . $glyphs[1] . " OR spell = " . $glyphs[2] . ") 
            AND active = 1", [
                'id' => $c['guid']
            ]);

            $characters[$key]['guid'] = null;

            $img = '';

            if ($c['race'] == 1) $img = 'human';
            if ($c['race'] == 2) $img = 'orc';
            if ($c['race'] == 3) $img = 'dwarf';
            if ($c['race'] == 4) $img = 'nightelf';
            if ($c['race'] == 5) $img = 'undead';
            if ($c['race'] == 6) $img = 'tauren';
            if ($c['race'] == 7) $img = 'gnome';
            if ($c['race'] == 8) $img = 'troll';
            if ($c['race'] == 9) $img = 'goblin';
            if ($c['race'] == 10) $img = 'highelf';

            $img .= '-';

            if ($c['gender'] == 0)
                $img .= 'male';
            else
                $img .= 'female';

            $characters[$key]['img'] = $img;

        }

        return $characters;

    }

    public function changeEmail()
    {
        if (!isset($_SESSION['account']) | !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        if (!filter_var($this->params->old, FILTER_VALIDATE_EMAIL) || !filter_var($this->params->new, FILTER_VALIDATE_EMAIL)) {
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'Invalid email address.',
            ];
        }

        // check old email
        $account = $this->gameDB->select("
        SELECT email, username
        FROM " . GAME_DB_ACCOUNT . "
        WHERE id = :id", [
            'id' => $_SESSION['account']
        ]);

        if (count($account) != 1) // shouldnt really get here but hey
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'No account found',
            ];

        // check if new email is already used
        $exists = $this->gameDB->select("
        SELECT id
        FROM " . GAME_DB_ACCOUNT . "
        WHERE lower(email) = :email", [
            'email' => strtolower($this->params->new)
        ]);

        if (count($exists) !== 0)
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'This e-mail is already in use.',
            ];

        $account = $account[0];

        if (strtolower($account['email']) !== strtolower($this->params->old))
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'Old email not recognized.',
            ];

        // end check old email

        $expirationTime = time() + 3600;

        $newEmail = strtolower($this->params->new);

        require_once("../vendor/Twilio/autoload.php"); // local

        //require_once('../../../../vendor/Twilio/autoload.php');

        $token = \Twilio\Jwt\JWT::encode(
            [
                'newEmail' => $newEmail,
                'exp' => $expirationTime,
                'accountId' => $_SESSION['account']
            ],
            JWT_SECRET_KEY,
            'HS256'
        );

        $email_address = $this->params->new;

        //require("sendgrid-php/vendor/autoload.php"); // local

        require("../../sendgrid-php/vendor/autoload.php"); // Composer version of Sendgrid API

        $email = new \SendGrid\Mail\Mail();
        $email->setFrom(EMAIL_ADDRESS, EMAIL_NAME);
        $email->setSubject('Updating your e-mail address on Turtle WoW');
        $email->addTo($email_address, $account['email']); // 2nd field is the receiver name
        $email->addHeader("X-Mailer", "SendGrid-API");

        // Plain text
        $email->addContent("text/plain", "
            Greetings, " . $account['username'] . "!

            Please click go to https://www.turtle-wow.org/#/ucp/confirm-email-change/" . $token . " to confirm your new e-mail address.

            Turtle WoW, 
            https://turtle-wow.org
            ");

        // HTML text
        $email->addContent("text/html", "
            Greetings, " . $account["username"] . "!<BR><BR>

            Please click <a clicktracking=off href='https://www.turtle-wow.org/#/ucp/confirm-email-change/" . $token . "' target='_blank'>here</a> to confirm your new e-mail address.<BR><BR>

            Turtle WoW,<BR>
            <A clicktracking=off href='https://turtle-wow.org' target='_blank'>turtle-wow.org</A><BR>
            ");

        $sendgrid = new SendGrid(SG_API_KEY);
        $response = $sendgrid->send($email);
        $sgstatus = $response->statusCode();
        error_log('UCP Email Change Sendgrid status code: ' . $sgstatus . ' to address ' . $email_address);

        if ($response->statusCode() !== 202) {
            error_log('UCP Email Change Saving status code of ' . $account['username'] . ' with email ' . $email_address . ' failed!');

            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'Internal Mail Server Error (' . $sgstatus . ')'
            ];
        }

        return [
            'err' => false,
            'loggedIn' => true,
            'details' => 'Check your email for next step.'
        ];

    }

    public function activateNewEmail()
    {
        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        if (!isset($this->params->token))
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'Missing Token'
            ];

        $token = $this->params->token;

        require_once("../vendor/Twilio/autoload.php"); // local
        //require_once('../../../../vendor/Twilio/autoload.php');

        try {
            $decoded = \Twilio\Jwt\JWT::decode($token, JWT_SECRET_KEY);

            if (isset($decoded->exp) && $decoded->exp > time()) {
                $newEmail = $decoded->newEmail;
            } else {
                return [
                    'err' => true,
                    'loggedIn' => true,
                    'details' => 'Token expired. Please try again.'
                ];
            }
        } catch (Exception $e) {
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'Invalid token!'
            ];
        }

        if ($this->gameDB->update("account",
            [
                'email' => $newEmail
            ],
            [
                'id' => $_SESSION['account']
            ])) {
            return [
                'err' => false,
                'loggedIn' => true,
                'details' => 'Your email address has been changed.'
            ];
        } else {
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'Something went wrong.'
            ];
        }

    }

    public function get_unstuck_list()
    {

        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        $chars = $this->gameDB->select("SELECT guid, name, class, race, level, online
        FROM tw_char.characters 
        WHERE account = :account
        ORDER BY level DESC", [
            'account' => $_SESSION['account']
        ]);

        foreach ($chars as $key => $c)
            $chars[$key]['cd'] = $this->get_unstuck_cooldown($c['guid']);

        return $chars;
    }

    public function get_unstuck_cooldown($guid = 0)
    {
        $cd = $this->siteDB->select("
        SELECT time
        FROM ucp_cooldown
        WHERE guid = :guid
        AND service = 'unstuck' ", [
            'guid' => $guid
        ]);

        if (count($cd) == 0) {
            return 0;
        }

        $cd = $cd[0];
        $cooldown = $cd['time'];

        $timeleft = time() - ($cooldown + 7 * 24 * 60 * 60);

        if ($timeleft < 0) {
            $seconds = $timeleft * -1;
            $dtF = new \DateTime('@0');
            $dtT = new \DateTime("@$seconds");
            return $dtF->diff($dtT)->format('%a days, %h hours, %i minutes and %s seconds');
        }

        return 0;

    }

    public function unstuck()
    {

        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        if (!isset($this->params->guid))
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'No character selected'
            ];

        $guid = $this->params->guid;

        // check if guild belongs to current logged in account
        $characters = $this->get_unstuck_list();
        $belongs = false;

        foreach ($characters as $c) {
            if ($c['guid'] == $guid) {
                $belongs = true;
                break;
            }
        }

        if (!$belongs)
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'Wrong character'
            ];


        // get homebind
        $hs_loc = $this->gameDB->select('
        SELECT map, zone, position_x, position_y, position_z
        FROM tw_char.character_homebind
        WHERE guid = :guid', [
            'guid' => $guid
        ]);

        if (count($hs_loc) !== 1)
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'No homebind location found'
            ];

        $hs_loc = $hs_loc[0];

        $this->gameDB->update('tw_char.characters', [
            'map' => $hs_loc['map'],
            'zone' => $hs_loc['zone'],
            'position_x' => $hs_loc['position_x'],
            'position_y' => $hs_loc['position_y'],
            'position_z' => $hs_loc['position_z'],
        ], [
            'guid' => $guid
        ]);

        $this->siteDB->insert("ucp_cooldown", [
            'guid' => $guid,
            'service' => 'unstuck',
            'time' => time()
        ], false, false, true);

        return [
            'err' => false,
            'loggedIn' => true,
            'details' => 'Character unstuck.'
        ];

    }

    // delete account
    public function canDeleteAccount()
    {
        return count($this->characters()) == 0;
    }

    public function deleteAccount()
    {
        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        if (!isset($this->params->email))
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'No email provided'
            ];

        if (!isset($this->params->password))
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'No password provided'
            ];

        // remove this check because banned people cant login to delete them
        //        if (!$this->canDeleteAccount())
        //            return [
        //                'err' => true,
        //                'loggedIn' => true,
        //                'details' => 'You must manually delete all your characters before deleting your account.'
        //            ];

        // check email and password

        // check ban status
        $status = $this->gameDB->select("
        SELECT banid, unbandate, bandate
        FROM account_banned
        WHERE id = :id
        AND active = 1
        ORDER BY unbandate DESC
        LIMIT 1", [
            'id' => $_SESSION['account']
        ]);

        if (count($status) > 0)
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'You cannot delete your account while it is suspended!'
            ];

        $account = $this->gameDB->select("
        SELECT email, sha_pass_hash
        FROM account
        WHERE id = :id", [
            'id' => $_SESSION['account']
        ]);

        $account = $account[0];

        if (strtolower($account['email']) !== strtolower($this->params->email))
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'The email address you provided does not match your account email.'
            ];

        if (strtoupper($account['sha_pass_hash']) !==
            strtoupper(sha1(strtoupper($_SESSION['user']) . ":" . strtoupper($this->params->password))))
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'The password you provided does not match your account password.'
            ];

        $characters = $this->gameDB->select("SELECT name, guid
        FROM tw_char.characters 
        WHERE account = :account", [
            'account' => $_SESSION['account']
        ]);

        foreach ($characters as $key => $character)
            $this->gameDB->update('tw_char.characters', [
                'account' => '0',
                'name' => '',
                'deleteInfos_Account' => $_SESSION['account'],
                'deleteInfos_Name' => $character['name']
            ], [
                'guid' => $character['guid']
            ]);

        $this->gameDB->delete('account', [
            'id' => $_SESSION['account']
        ]);

        return [
            'err' => false,
            'loggedIn' => false,
            'details' => 'Bye!'
        ];

    }

    // newsletter
    public function setEmailSub()
    {
        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        if (!isset($this->params->to))
            return [
                'err' => true,
                'loggedIn' => true,
                'details' => 'No value provided'
            ];

        if ($this->gameDB->update('account', [
            'email_sub' => $this->params->to
        ], [
            'id' => $_SESSION['account']
        ])) {
            return [
                'err' => false,
                'loggedIn' => true,
                'details' => 'Email sub option updated'
            ];

        }

        return [
            'err' => true,
            'loggedIn' => true,
            'details' => 'Email sub option not updated'
        ];

    }


    public function add_appeal()
    {
        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        if (!isset($this->params->message))
            return [
                'err' => true,
                'details' => 'No message provided'
            ];

        // get banid
        $status = $this->gameDB->select("
        SELECT banid
        FROM account_banned
        WHERE id = :id
        AND active = 1
        ORDER BY unbandate DESC
        LIMIT 1", [
            'id' => $_SESSION['account']
        ]);

        if (count($status) != 1)
            return [
                'err' => true,
                'details' => 'Ban not found'
            ];

        // check if an appeal is already submitted
        $appeal = $this->siteDB->select("
        SELECT *
        FROM ban_appeal
        WHERE banid = :banid
        ORDER BY stamp DESC
        LIMIT 1", [
            'banid' => $status[0]['banid']
        ]);

        if (count($appeal) == 1) {

            if ($appeal[0]['guid'] == $_SESSION['account'])
                return [
                    'err' => true,
                    'details' => 'Please wait for support to respond before sending another message. Responses typically arrive within a timeframe of 24 hours.'
                ];
        }

        $message = strip_tags($this->params->message);
        $message = str_replace("\n", '<br>', $message);

        $this->siteDB->insert("ban_appeal", [
            'guid' => $_SESSION['account'],
            'banid' => $status[0]['banid'],
            'message' => $message,
            'seen' => 1
        ]);

        return [
            'err' => false,
            'details' => 'Message sent.'
        ];
    }

    public function mark_read()
    {

        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        $banid = $this->gameDB->select("
        SELECT banid
        FROM account_banned
        WHERE id = :id
        ORDER BY unbandate DESC
        LIMIT 1", [
            'id' => $_SESSION['account']
        ]);

        if (count($banid) != 1)
            return [
                'err' => true,
                'details' => 'No ban found'
            ];

        $banid = $banid[0]['banid'];

        $this->siteDB->update("ban_appeal", [
            'seen' => 1
        ], [
            'banid' => $banid
        ]);

        return [
            'err' => false
        ];
    }

    public function change_password()
    {

        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        if (!isset($this->params->data))
            return [
                'err' => true,
                'details' => 'No data.'
            ];

        if (!isset($this->params->data->c_password) || !isset($this->params->data->n_password) ||
            !isset($this->params->data->n_password2))
            return [
                'err' => true,
                'details' => 'No data.'
            ];

        if ($this->params->data->n_password !== $this->params->data->n_password2)
            return [
                'err' => true,
                'details' => 'New passwords don\'t match.'
            ];

        if ($this->params->data->c_password == $this->params->data->n_password && $this->params->data->n_password === $this->params->data->n_password2)
            return [
                'err' => true,
                'details' => 'New password and old password cannot be the same.'
            ];

        //check old password
        $provided_password_hash = misc_model::password_hash($_SESSION['user'], $this->params->data->c_password);

        $old_password_check = $this->gameDB->select("
        SELECT username
        FROM " . GAME_DB_ACCOUNT . "
        WHERE upper(username) = :u AND upper(sha_pass_hash) = :pw", [
            'u' => strtoupper($_SESSION['user']),
            'pw' => strtoupper($provided_password_hash)
        ]);

        if (count($old_password_check) != 1)
            return [
                'err' => true,
                'details' => 'Old password doesnt match.'
            ];

        // new password systax check
        if (!preg_match("/^[\dA-Za-z!?%*$\-+]{4,16}$/", $this->params->data->n_password))
            return [
                'err' => true,
                'details' => 'You must provide a valid password with a length of 4-16 characters, at least 12 characters are recommended. Only general special characters such as !?%*$ are supported.'
            ];

        $this->gameDB->update(GAME_DB_ACCOUNT, [
            'sha_pass_hash' => misc_model::password_hash($_SESSION['user'], $this->params->data->n_password),
            'sessionkey' => '',
            'v' => '',
            's' => ''
        ], [
            'id' => $_SESSION['account']
        ]);

        return [
            'err' => false,
            'details' => 'Your password has been changed.'
        ];

    }

    public function restoreCharacter()
    {
        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];


        if (!isset($this->params->name))
            return [
                'err' => true,
                'details' => 'No name.'
            ];

        $deleted = $this->gameDB->select("
        SELECT deleteInfos_name as name, deleteInfos_Account as account, guid
        FROM tw_char.characters
        WHERE account = 0 AND name = ''
        AND deleteInfos_name = :name
        AND deleteInfos_Account = :original_account
        AND deleteDate IS NOT NULL
        ", [
            'name' => $this->params->name,
            'original_account' => $_SESSION['account']
        ]);

        if (count($deleted) == 0)
            return [
                'err' => true,
                'details' => 'Character not found.'
            ];

        $deleted = $deleted[0];

        $this->gameDB->update("tw_char.characters", [
            'account' => $deleted['account'],
            'name' => $deleted['name'],
            'deleteInfos_name' => null,
            'deleteInfos_Account' => null,
            'deleteDate' => null
        ], [
            'guid' => $deleted['guid']
        ]);

        return [
            'err' => false,
            'loggedIn' => true,
            'details' => 'Character ' . $this->params->name . ' restored.'
        ];

    }

    public function checkTransferStatus()
    {
        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'err' => true,
                'loggedIn' => false,
                'details' => 'Not logged in.'
            ];

        $transferComplete = false;
        $completedTransfer = $this->gameDB->select("
        SELECT *
        FROM character_transfers
        WHERE source_account_id = :id AND status != 'transferred'", [
            'id' => $_SESSION['account']
        ]);

        if (count($completedTransfer) == 0) {
            $transferComplete = true;
        }

        $transferStatus = $this->gameDB->select("
        SELECT *
        FROM character_transfers
        WHERE source_account_id = :id", [
            'id' => $_SESSION['account']
        ]);

        if (count($transferStatus) > 0) {
            return [
                'in_progress' => true,
                'transfer_complete' => $transferComplete,
                'characters' => $transferStatus
            ];
        }

        $banStatus = $this->gameDB->select("
        SELECT banid, unbandate, bandate
        FROM account_banned
        WHERE id = :id
        AND active = 1
        ORDER BY unbandate DESC
        LIMIT 1", [
            'id' => $_SESSION['account']
        ]);

        if (count($banStatus) > 0)
            return [
                'banned' => true
            ];

        $accountStatus = $this->gameDB->select("
        SELECT *
        FROM account
        WHERE id = :id", [
            'id' => $_SESSION['account']
        ]);

        if ($accountStatus[0]['online'] == 1)
            return [
                'online' => true
            ];

        $xApiKey = LARAVEL_API_KEY;

        $payload   = array('username' => $accountStatus[0]['username']);
        $options   = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n" .
                    "X-API-key: $xApiKey",
                'method' => 'POST',
                'content' => http_build_query($payload)
            )
        );

        $context  = stream_context_create($options);
        $resultLaravel = json_decode(file_get_contents(LARAVEL_API_URL . '/check/username', false, $context), true);

        if ($resultLaravel) {
            if (isset($resultLaravel['error']) && $resultLaravel['error']) {
                return [
                    'error' => true,
                    'response' => $resultLaravel['message']
                ];
            }
            if (isset($resultLaravel['username_exists'])) {
                return [
                    'username_exists' => $resultLaravel['username_exists']
                ];
            }
        }

    }

    private function is_valid_account_name($account_name)
    {
        return preg_match("/^[\dA-Za-z]{2,15}$/", $account_name);
    }

    private function is_valid_password($password)
    {
        return preg_match("/^[\dA-Za-z!?%*$\-+]{4,16}$/", $password); // at least 4 chars and only certain special chars
    }

    public function validate_transfer_form($account_name, $user_password)
    {
        if (!$this->is_valid_account_name($account_name)) {
            return 'You must provide a valid account name containing only letters and numbers with up to 15 characters.';
        }

        if (!$this->is_valid_password($user_password)) {
            return 'You must provide a valid password with a length of 4-16 characters, at least 12 characters are recommended. Only general special characters such as !?%*$ are supported.';
        }

        return '';
    }

    public function transferAccount()
    {
        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'error' => true,
                'loggedIn' => false,
                'response' => 'Not logged in.'
            ];

        $targetAccountId = null;
        $charactersStatus = null;

        if ($this->params->data->banned)
            return [
                'error' => true,
                'response' => 'You can not transfer account while your account was banned!'
            ];

        if ($this->params->data->online)
            return [
                'error' => true,
                'response' => 'You can not transfer account while your account is online!'
            ];

        if ($this->params->data->realm_id == 0)
            return [
                'error' => true,
                'response' => 'You need to select future realm!'
            ];

        $xApiKey = LARAVEL_API_KEY;

        $transferStatus = $this->gameDB->select("
        SELECT *
        FROM character_transfers
        WHERE source_account_id = :id", [
            'id' => $_SESSION['account']
        ]);

        if (count($transferStatus) > 0) {
            $targetAccountId = $transferStatus[0]['target_account_id'];
        }

        if ($targetAccountId == null) {
            if ($this->params->data->needNewAccount) {
                if (!$this->params->data->account_name)
                    return [
                        'error' => true,
                        'response' => 'You can not transfer account while your account was banned!'
                    ];

                if (!$this->params->data->user_password)
                    return [
                        'error' => true,
                        'response' => 'You can not transfer account while your account is online!'
                    ];

                $result = $this->validate_transfer_form($this->params->data->account_name, $this->params->data->user_password);

                if ($result !== '') {
                    return [
                        'error' => true,
                        'response' => $result
                    ];
                }
            }

            $account = $this->gameDB->select("
            SELECT *
            FROM account
            WHERE id = :id", [
                'id' => $_SESSION['account']
            ]);

            unset($account[0]['id']);

            $gpHistory = $this->gameDB->select("
            SELECT *
            FROM gp_history
            WHERE account_id = :id", [
                'id' => $_SESSION['account']
            ]);

            $shopCoins = $this->gameDB->select("
            SELECT *
            FROM shop_coins
            WHERE id = :id", [
                'id' => $_SESSION['account']
            ]);

            $shopCoinsHistory = $this->gameDB->select("
            SELECT *
            FROM shop_coins_history
            WHERE account_id = :id", [
                'id' => $_SESSION['account']
            ]);

            $shopLogs = $this->gameDB->select("
            SELECT *
            FROM shop_logs
            WHERE account = :id", [
                'id' => $_SESSION['account']
            ]);

            if ($charactersStatus == null) {
                $characters = $this->gameDB->select("
                SELECT guid, name
                FROM tw_char.characters 
                WHERE account = :id
                ORDER BY level DESC", [
                    'id' => $_SESSION['account']
                ]);

                if (count($characters) == 0) {
                    return [
                        'error' => true,
                        'response' => 'You dont have any characters for transfer'
                    ];
                }
            }

            if ($this->params->data->needNewAccount) {
                $newAccount = strtoupper($this->params->data->account_name);
                $account_forum = ucfirst(strtolower($this->params->data->account_name));

                $passwd = strtoupper($this->params->data->user_password);
                $passwd_hash = sha1("$newAccount:$passwd");

                $account[0]['username'] = $newAccount;
                $account[0]['sha_pass_hash'] = $passwd_hash;
                $account[0]['forum_username'] = $account_forum;
            }
            $account[0]['v'] = null;
            $account[0]['s'] = null;
            $account[0]['sessionkey'] = null;

            $payload = array(
                'account' => $account[0],
                'gp_history' => $gpHistory,
                'shop_coins' => $shopCoins,
                'shop_coins_history' => $shopCoinsHistory,
                'shop_logs' => $shopLogs,
                'source_account_id' => $_SESSION['account'],
                'target_realm_id' => $this->params->data->realm_id,
                'characters' => $characters);
            $options = array(
                'http' => array(
                    'header' => "Content-type: application/x-www-form-urlencoded\r\n" .
                        "X-API-key: $xApiKey",
                    'method' => 'POST',
                    'content' => http_build_query($payload)
                )
            );


            $context = stream_context_create($options);
            $resultLaravel = json_decode(file_get_contents(LARAVEL_API_URL . '/transfer/account', false, $context), true);

            if ($resultLaravel) {
                if (isset($resultLaravel['error']) && $resultLaravel['error']) {
                    return [
                        'error' => true,
                        'response' => $resultLaravel['message']
                    ];
                }
                foreach ($characters as $character) {
                    $this->gameDB->insert("character_transfers", [
                        'name' => $character['name'],
                        'source_realm_id' => 1,
                        'source_account_id' => $_SESSION['account'],
                        'source_character_guid' => $character['guid'],
                        'target_realm_id' => $this->params->data->realm_id,
                        'target_account_id' => $resultLaravel['target_account_id'],
                        'status' => 'pending']);
                    $this->gameDB->update('tw_char.characters', [
                        'active' => 0
                    ], [
                        'guid' => $character['guid']
                    ]);
                }
                return [
                    'error' => false,
                    'response' => $resultLaravel['message']
                ];
            }

        }
    }

    public function beginTransferCharacter()
    {
        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'error' => true,
                'loggedIn' => false,
                'response' => 'Not logged in.'
            ];

        if (!$this->params->guid)
            return [
                'error' => true,
                'response' => 'You need to provide character!!'
            ];

        $xApiKey = EU_SERVER_API_KEY;
        $apiUrl = EU_SERVER_API_URL;

        $payload = [
            'lowGuid' => $this->params->guid
        ];
        $options = array(
            'http' => array(
                'header' => "Content-type: application/json\r\n" .
                    "Accept: application/json\r\n" .
                    "X-API-key: $xApiKey",
                'method' => 'POST',
                'content' => json_encode($payload),
                'ignore_errors' => true,
            ),
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
            )
        );

        $context = stream_context_create($options);
        $resultLaravel = json_decode(file_get_contents($apiUrl . '/initiate-transfer', false, $context), true);

        if ($resultLaravel) {
            if ($resultLaravel['transferStatus']) {
                $this->gameDB->update('tw_char.characters', [
                    'active' => 0
                ], [
                    'guid' => $this->params->guid
                ]);
                if ($this->gameDB->update('character_transfers', [
                    'source_realm_id' => $resultLaravel['realmId'],
                    'data' => $resultLaravel['data'],
                    'status' => 'in_progress',
                ], [
                    'source_account_id' => $_SESSION['account'],
                    'source_character_guid' => $this->params->guid
                ]))
                    return [
                        'error' => false,
                        'response' => "Successfully exported character."
                    ];
            } else {
                return [
                    'error' => true,
                    'response' => 'Error while trying to export character!'
                ];
            }
        }
    }

    public function completeTransferCharacter()
    {
        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'error' => true,
                'loggedIn' => false,
                'response' => 'Not logged in.'
            ];

        if (!$this->params->guid)
            return [
                'error' => true,
                'response' => 'You need to provide character!!'
            ];

        $character = $this->gameDB->select("
        SELECT *
        FROM character_transfers
        WHERE source_account_id = :id AND source_character_guid = :guid", [
            'id' => $_SESSION['account'],
            'guid' => $this->params->guid
        ]);

        if (count($character) == 0)
            return [
                'error' => true,
                'response' => 'You need to provide character!'
            ];

        switch ($character[0]['target_realm_id']) {
            case 1:
                $xApiKey = REALM_1_API_KEY;
                $apiUrl = REALM_1_API_URL;
                break;
            case 2:
                $xApiKey = REALM_2_API_KEY;
                $apiUrl = REALM_2_API_URL;
                break;
            case 3:
                $xApiKey = REALM_3_API_KEY;
                $apiUrl = REALM_3_API_URL;
                break;
            case 4:
                $xApiKey = REALM_4_API_KEY;
                $apiUrl = REALM_4_API_URL;
                break;
        }

        $payload = [
            'targetAccountId' => $character[0]['target_account_id'],
            'data' => $character[0]['data']
        ];
        $options = array(
            'http' => array(
                'header' => "Content-type: application/json\r\n" .
                    "Accept: application/json\r\n" .
                    "X-API-key: $xApiKey",
                'method' => 'POST',
                'content' => json_encode($payload),
                'ignore_errors' => true,
            ),
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
            )
        );

        $context = stream_context_create($options);
        $resultLaravel = json_decode(file_get_contents($apiUrl . '/proceed-transfer', false, $context), true);


        if ($resultLaravel) {
            if ($resultLaravel['transferResult'] != 0) {
                if ($this->gameDB->update('character_transfers', [
                    'status' => 'failed',
                ], [
                    'source_account_id' => $_SESSION['account'],
                    'source_character_guid' => $this->params->guid
                ]))
                    return [
                        'error' => true,
                        'response' => 'Error while importing character!'
                    ];
            } else {
                if ($this->gameDB->update('character_transfers', [
                    'status' => 'transferred',
                ], [
                    'source_account_id' => $_SESSION['account'],
                    'source_character_guid' => $this->params->guid
                ])) {

                    $oldCharacters = $this->gameDB->select("
                    SELECT guid, name
                    FROM tw_char.characters 
                    WHERE account = :id", [
                            'id' => $_SESSION['account']
                        ]);

                    $successTransferredAllCharacters = $this->gameDB->select("
                    SELECT *
                    FROM character_transfers
                    WHERE source_account_id = :id AND status = 'transferred'", [
                        'id' => $_SESSION['account']
                    ]);

                    if (count($successTransferredAllCharacters) == count($oldCharacters)) {

                        $this->gameDB->update('account', [
                            'active' => 0
                        ], [
                            'id' => $_SESSION['account']
                        ]);

                        return [
                            'transferComplete' => true,
                            'response' => "Successfully imported all characters."
                        ];
                    }

                    return [
                        'error' => false,
                        'response' => "Successfully imported character."
                    ];
                }
            }
        }
    }

    public function get_history_shop()
    {
        if (!isset($_SESSION['account']) || !isset($_SESSION['user']))
            return [
                'error' => true,
                'loggedIn' => false,
                'response' => 'Not logged in.'
            ];

        $logsOffset = ($this->params->logsPage - 1) * $this->params->logsLimit;

        $historyOffset = ($this->params->historyPage - 1) * $this->params->historyLimit;

        $get_chars_1 = $this->gameDB->select("
        SELECT guid, name
        FROM tw_char.characters
        WHERE account = :id", [
            'id' => $_SESSION['account']
        ]);

        $get_chars_2 = $this->charactersDB2->select("
        SELECT guid, name
        FROM characters
        WHERE account = :id", [
            'id' => $_SESSION['account']
        ]);

        $shop_logs = $this->gameDB->select("
        SELECT sl.time, sl.guid, sl.item, sl.price, sl.refunded, sl.realm_id, rl.name as realm_name
        FROM shop_logs sl
        LEFT JOIN realmlist rl ON sl.realm_id = rl.id
        WHERE sl.account = :id ORDER BY sl.time DESC
        LIMIT :limit OFFSET :offset", [
            'id' => $_SESSION['account'],
            'limit' => $this->params->logsLimit,
            'offset' => $logsOffset
        ]);

        foreach ($shop_logs as &$log) {
            if ($log['realm_id'] == 1) {
                foreach ($get_chars_1 as $char) {
                    if ($char['guid'] == $log['guid']) {
                        $log['character_name'] = $char['name'];
                        break;
                    }
                }
            } elseif ($log['realm_id'] == 2) {
                foreach ($get_chars_2 as $char) {
                    if ($char['guid'] == $log['guid']) {
                        $log['character_name'] = $char['name'];
                        break;
                    }
                }
            }
        }

        $shop_logs_count = $this->gameDB->select("
        SELECT COUNT(*)
        FROM shop_logs
        WHERE account = :id", [
            'id' => $_SESSION['account']
        ]);

        $total_logs_pages = ceil($shop_logs_count[0]['COUNT(*)'] / $this->params->logsLimit);

        $shop_coins_history = $this->gameDB->select("
        SELECT points, actual_points, new_points, system, date
        FROM shop_coins_history
        WHERE account_id = :id ORDER BY date DESC
        LIMIT :limit OFFSET :offset", [
            'id' => $_SESSION['account'],
            'limit' => $this->params->historyLimit,
            'offset' => $historyOffset
        ]);

        $shop_coins_history_count = $this->gameDB->select("
        SELECT COUNT(*)
        FROM shop_coins_history
        WHERE account_id = :id", [
            'id' => $_SESSION['account']
        ]);

        $total_pages_shop_coins = ceil($shop_coins_history_count[0]['COUNT(*)'] / $this->params->historyLimit);

        return [
            'shop_logs' => $shop_logs,
            'shop_coins_history' => $shop_coins_history,
            'current_logs_page' => $this->params->logsPage,
            'current_history_page' => $this->params->historyPage,
            'total_logs_pages' => $total_logs_pages,
            'total_pages_shop_coins' => $total_pages_shop_coins
        ];
    }

}