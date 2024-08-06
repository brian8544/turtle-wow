<?php
ini_set('session.gc_maxlifetime', 24 * 60 * 60);
ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 1);

$sessionCookieExpireTime = 24 * 60 * 60;
session_set_cookie_params($sessionCookieExpireTime);
@session_start();


//error_reporting(0);
//ini_set('display_errors', 0);


if (!isset($_SESSION['tv_administrator']) || !$_SESSION['tv_administrator'])
    return;
?>

<html lang="en">

<head>

   <meta charset="utf-8"/>
   <title>Ban Appeal</title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
   <link rel="icon" type="image/x-icon" href="favicon.ico">

   <link rel="stylesheet" href="../node_modules/font-awesome/css/font-awesome.min.css"/>

   <link rel="stylesheet" href="../dist/css/vendor.min.css?ver=<?= time() ?>">
   <link rel="stylesheet" href="../dist/css/turtle.min.css?ver=<?= time() ?>">

    <script src="../node_modules/chart.js/dist/chart.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-annotation/1.0.2/chartjs-plugin-annotation.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.6/ui-bootstrap-tpls.min.js"></script>

   <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
   <META HTTP-EQUIV="Expires" CONTENT="-1">

   <script>
       function changeBan() {

           var days = document.getElementById('change_ban_duration').value;

           if (days == 0)
               return;

           var text = days + " Days";
           if (days >= 7 && days <= 21)
               text = days / 7 + " Week(s)";
           if (days >= 30)
               text = days / 30 + " Month(s)";

           if (confirm("Change ban duration to " + text + " from today ?")) {
               document.getElementById('changeBanForm').submit()
           }
       }

       function toggleBanReasonAlter() {
           var x = document.getElementById("ban_reason_original");
           if (x.style.display === "none")
               x.style.display = "block";
           else
               x.style.display = "none";

           var y = document.getElementById("alter_ban_reason");
           if (y.style.display === "none")
               y.style.display = "block";
           else
               y.style.display = "none";


       }
   </script>

   <style>
       select option {
           color: grey;
       }

        .custom-button {
            border-radius: 20px !important;
        }

       .btn-success {
           background-color: #28a745 !important;
           border-color: #28a745 !important;
       }

       .btn-warning {
           background-color: #ffc107 !important;
           border-color: #ffc107 !important;
       }

       .btn-danger {
           background-color: #dc3545 !important;
           border-color: #dc3545 !important;
       }

       th, td{
           padding: 0.5rem;
       }

       #ban_reason_original{
           display: flex;
           flex-direction: column;
           align-items: flex-start;
       }

       @media (max-width: 1440px) {
            td{
                max-width: 33rem;
            }
       }

   </style>

</head>

<body>

<?php

include_once 'api/capi/config/config.php';
include_once '../api/capi/libs/database/mysql.php';

$siteDB = new MYSQL_Database(DB_TYPE, DB_HOST, SITE_DB_NAME, SITE_DB_USER, SITE_DB_PASS);
$siteDB->exec("set names utf8");

$gameDB = new MYSQL_Database(DB_TYPE, DB_HOST_LAN, GAME_DB_NAME, GAME_DB_USER, GAME_DB_PASS);
$gameDB->exec("set names utf8");

?>

<div class="container ucp" style="padding: 0">

    <?php

    $err = '';

    if (isset($_REQUEST['send_message']) ||
        isset($_REQUEST['send_message_and_deny_appeal']) ||
        isset($_REQUEST['deny_appeal']) ||
        isset($_REQUEST['send_message_and_unban'])) {

        if (!filter_var($_REQUEST['banid'], FILTER_VALIDATE_INT))
            exit('wrong banid');

        $lid = -1;

        if (isset($_REQUEST['message']) && !isset($_REQUEST['deny_appeal'])) {

            if ($_REQUEST['message'] == '') {
                $err = 'Please type a response message.';
            } else {

                // insert the message
                $message = strip_tags($_REQUEST['message']);
                $message = str_replace("\n", "<br>", $message);

                $denied = isset($_REQUEST['denied']) ? intval($_REQUEST['denied']) : 0;

                $siteDB->insert("ban_appeal", [
                    'guid' => $_SESSION['account'],
                    'banid' => $_REQUEST['banid'],
                    'message' => $message,
                    'denied' => $denied
                ]);

                $lid = $siteDB->lastInsertId();
            }
        }

        if (isset($_REQUEST['send_message']) && $lid != -1) {
            $err = 'Message Sent';
        }

        if (isset($_REQUEST['send_message_and_unban'])) {

            if ($_REQUEST['message'] == '') {
                $err = 'Please type a response message.';
            } else {

                // $unbanReason = isset($_REQUEST['unbanReason']) ? $_REQUEST['unbanReason'] : '';
                // $unbanReason = strip_tags($unbanReason);

                $banInfo = $gameDB->select("
                SELECT *
                FROM account_banned
                WHERE banid = :banid
                AND active = 1
                ", [
                    'banid' => $_REQUEST['banid']
                ]);

                if (count($banInfo) == 0) {
                    echo "something went wrong, cant find this ban.";
                    exit;
                }

                $gameDB->update("account_banned", [
                    'active' => 0,
                    'unbandate' => intval($banInfo[0]['unbandate']) + 1,
                    // 'banreason' => $banInfo[0]['banreason'] . ' ' . $unbanReason
                ], [
                    'banid' => $_REQUEST['banid']
                ]);

                // delete fingerprint bans too
                $fingerprints = $gameDB->select("
                SELECT fingerprint
                FROM system_fingerprint_usage
                WHERE account = :account", [
                    'account' => $banInfo[0]['id']
                ]);

                foreach ($fingerprints as $key => $fp)
                    $gameDB->delete('fingerprint_autoban', [
                        'fingerprint' => $fp['fingerprint']
                    ]);

                $err = 'Message Sent and Account Unbanned';

                // DELETE FROM fingerprint_autoban WHERE fingerprint IN (SELECT fingerprint FROM system_fingerprint_usage WHERE account = 1 )
            }
        }

        if (isset($_REQUEST['send_message_and_deny_appeal'])) {
            if ($lid !== -1) {
                $siteDB->update("ban_appeal", [
                    'denied' => 1
                ], [
                    'id' => $lid
                ]);
                $err = 'Message send and Appeal Denied';
            }
        }

        if (isset($_REQUEST['deny_appeal'])) {

            $lastMessage = $siteDB->select("
            SELECT id
            FROM ban_appeal
            WHERE banid = :banid
            ORDER BY stamp DESC
            LIMIT 1", [
                'banid' => $_REQUEST['banid']
            ]);

            if (count($lastMessage) != 1)
                exit('something went wrong, cant find banid/appeal');

            $id = $lastMessage[0]['id'];

            $siteDB->update("ban_appeal", [
                'denied' => 1
            ], [
                'id' => $id
            ]);

            $err = 'Appeal Denied.';
        }

    }


    if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'respond') {

        // ban details

        if (!filter_var($_REQUEST['banid'], FILTER_VALIDATE_INT))
            exit('wrong banid');

        $ban = $siteDB->select("
        SELECT *
        FROM ban_appeal
        WHERE banid = :banid
        ORDER BY stamp ASC", [
            'banid' => $_REQUEST['banid']
        ]);

        if (count($ban) == 0)
            exit("Something went wrong, wrong appeal id");

        $ban_status = $ban[count($ban) - 1];
        $ban = $ban[0];

        if (isset($_REQUEST['change_ban_duration']) && $_REQUEST['change_ban_duration'] != 0) {
            $now = date('U');
            $new_duration = $now + $_REQUEST['change_ban_duration'] * 24 * 60 * 60;

            $gameDB->update("account_banned", [
                'unbandate' => $new_duration
            ], [
                'banid' => $_REQUEST['banid']
            ]);
        }

        if (isset($_REQUEST['banreason']) && $_REQUEST['banreason'] != '') {
            $gameDB->update("account_banned", [
                'banreason' => $_REQUEST['banreason']
            ], [
                'banid' => $_REQUEST['banid']
            ]);
        }

        // get account details because site and game dbs run on different machines and cant join in one query
        $details = $gameDB->select("
            SELECT l.username, ab.bandate, ab.bannedby, ab.banreason, ab.active, ab.unbandate
            FROM " . GAME_DB_ACCOUNT . " l
            LEFT JOIN account_banned ab on l.id = ab.id
            WHERE l.id = :id
            ORDER BY ab.bandate DESC
            LIMIT 1", [
            'id' => $ban['guid']
        ]);

        //if (count($details) != 1)
           // exit('something went wrong, cant find account');

        $details = $details[0];

        $ban['username'] = $details['username'];
        $ban['bandate'] = $details['bandate'];
        $ban['unbandate'] = $details['unbandate'];
        $ban['bannedby'] = $details['bannedby'];
        $ban['banreason'] = $details['banreason'];
        $ban['active'] = $details['active'];

//        $messages = $siteDB->select("SELECT s.guid, s.message, s.stamp,
//           l.username, s.denied
//           FROM ban_appeal s
//           LEFT JOIN " . GAME_DB_NAME . ".account l ON s.guid = l.id
//           WHERE s.banid = :banid
//           ORDER BY stamp", [
//            'banid' => $ban['banid']
//        ]);

        $messages = $siteDB->select("SELECT s.guid, s.message, s.stamp,
           s.denied
           FROM ban_appeal s 
           WHERE s.banid = :banid
           ORDER BY stamp", [
            'banid' => $ban['banid']
        ]);

        // get guids of the accounts in this conversation
        $guids = [];
        foreach ($messages as $key => $m)
            if (!in_array($m['guid'], $guids))
                $guids[] = $m['guid'];

        //LEFT JOIN " . GAME_DB_NAME . ".account l ON s.guid = l.id
        $gm_names_result = $gameDB->select("SELECT id, username from " . GAME_DB_NAME . ".account 
        WHERE id IN (" . implode(",", $guids) . ")");
        $gm_names = [];
        foreach ($gm_names_result as $key => $res)
            $gm_names[$res['id']] = $res['username'];

        foreach ($messages as $key => $m)
            $messages[$key]['stamp'] = date('H:i d/m/Y', strtotime($m['stamp']));
        $messages[$key]['username'] = $gm_names[$m['guid']];
        ?>

       <Br>
       <a class="small m-3" href="ban_appeals.php"> <i class="fa fa-fw fa-arrow-left"></i> Back to list</a>
       <a class="small m-3" href=""> <i class="fa fa-fw fa-refresh"></i> Refresh</a>

       <h3 class="m-3 text-white">Ban Info</h3>


       <table class="table table-striped text-white">
          <thead>
          <tr>
             <th>Account Name</th>
             <th>Ban Date</th>
             <th>Banned By</th>
             <th>Ban Reason</th>
             <th>Duration</th>
             <th>Status</th>
          </tr>
          </thead>
          <tbody>
          <?php

          echo "<tr>";
          echo "<td>" . $ban['username'] . "</td>";
          echo "<td>" . Date('H:i:s d/m/Y', $ban['bandate']) . "</td>";
          echo "<td>" . $ban['bannedby'] . "</td>";
          echo "<td><span id='ban_reason_original'>" . $ban['banreason'] . "
               <button class='btn btn-primary' style='margin-top: 0.5rem' onclick='toggleBanReasonAlter()'>Edit</button></span>
            <form method='POST' id='alter_ban_reason' style='display: none;'>
            <input type='text' name='banreason' value='" . $ban['banreason'] . "' class='form-control'>
            <button type='submit' class='btn btn-primary'>Save</button>
            <button type='button' class='btn btn-outline-light' onclick='toggleBanReasonAlter()'>Cancel</button>
            </form>
          </td>";

          $tl = '';
          $status = '';

          if ($ban['active'] == 1) {

              $seconds = $ban['unbandate'] - time();

              if ($seconds > 0) {
                  $dtF = new \DateTime('@0');
                  $dtT = new \DateTime("@$seconds");
                  $tl = $dtF->diff($dtT)->format('%a days, %h hours and %i minutes') . "<br>";
              } else {
                  $tl = 'Permanent';
              }

              if ($ban_status['denied'] == 1)
                  $status = "<span class='text-danger'>Denied</span>";
          } else {
              $status = "<span class='text-green'>Unbanned</span>";
          }

          echo "<td>(" . $ban['unbandate'] . "/" . $ban['active'] . ")<br>";

          echo "<span class='text-danger'>" . $tl . "</span>";

          if ($ban['active'] == 1) {
              ?>
             <Br>

             <form method="POST" id="changeBanForm">
                <select class="form-control" id="change_ban_duration" name="change_ban_duration">
                   <option value="0">Change ban duration to:</option>
                   <option value="1">1 Days</option>
                   <option value="3">3 Days</option>
                   <option value="7">1 Week</option>
                   <option value="14">2 Weeks</option>
                   <option value="21">3 Weeks</option>
                   <option value="30">1 Month</option>
                   <option value="60">2 Months</option>
                </select>
                <button type="button" class="btn btn-sm btn-primary"
                        onclick="changeBan()">Change
                </button>
             </form>

              <?php
          }

          echo "</td>";
          echo "<td class='text-danger'>" . $status . "</td></tr>";

          ?>

          </tbody>
       </table>


             <h3 class="text-gray mb-3">Message history</h3>
          <?php
          foreach ($messages as $key => $m) {
              ?>
                    <?php

                    if ($m['guid'] != $ban['guid'])

                        echo "<div class='msg-right'><div class='mb-2 message-container text-right'><span class='text-green'>" . $m['username'] . " (Turtle WoW Support)</span>";
                    else
                        echo "<div class='msg-left'><div class='mb-2 message-container text-left'><span class='text-white'>" . $m['username'] . "</span>";
                    ?>
                   <small class="text-gray"><?= $m['stamp'] ?></small>
                   <Br>
                   <span class="text-gray">
                   <?= $m['message'] ?>
                   </span>
              <?php echo "</div></div>" ?>
              <?php
          }
          ?>
       <table>
          <tbody>
          <tr>
             <td class="col-lg-7">
                <form method="POST">

                    <?php
                    if ($err != '') {
                        ?>
                       <div class="alert alert-warning"><?= $err ?></div>
                        <?php
                    }
                    ?>

                   <input type="hidden" name="denied" value="<?= $messages[count($messages) - 1]['denied'] ?>">

                    <label class="text-gray w-100">
                        Your response:
                        <textarea class="form-control mt-2" id="m" name="message" placeholder="Reply" rows="4"></textarea>
                    </label>

                    <div class="mt-3">
                        <button class="btn custom-button btn-success mr-2 mb-2" name="send_message" type="submit">
                            <i class="fa fa-fw fa-send"></i> Send Message
                        </button>
                        <button class="btn custom-button btn-warning mr-2 mb-2" name="send_message_and_deny_appeal" type="submit">
                            <i class="fa fa-fw fa-send"></i> Send Message & Deny Appeal
                        </button>
                        <button class="btn custom-button btn-danger mr-2 mb-2" name="deny_appeal" type="submit">
                            <i class="fa fa-fw fa-send"></i> Deny Appeal
                        </button>
                        <button class="btn custom-button btn-success mr-2 mb-2" name="send_message_and_unban" type="submit">
                            <i class="fa fa-fw fa-check"></i> Send Message & Unban
                        </button>
                    </div>
                </form>
             </td>
             <td style="vertical-align: initial;">
                <label class="text-gray">
                   Template Response:
                   <select class="form-control" style="margin-top: 0.5rem" onchange="document.getElementById('m').innerText = this.value">
                      <option value="">-Select-</option>
                      <option value="Greetings! Please remember that both selling and buying gold for real money will result in a
                            ban on Turtle WoW. Please do not support individuals that are actively harming our project.">
                         [Appeal Denied] RMT is Forbidden
                      </option>
                      <option value="Greetings! Please review our Terms of Service, found at https://turtle-wow.org/#/rules,
                            and confirm your understanding. We will then review the appeal further.">
                         Read and Accept our ToS.
                      </option>
                      <option value="Greetings! As you have demonstrated you will not follow our Terms of Service,
                            your ban will not be revoked.">
                         [Appeal Denied] Failed Appeal.
                      </option>
                      <option value="Greetings! We have completed the investigation of your ban and concluded that it was issued
                            by incorrectly. The ban has been lifted. Welcome back!">
                         [Unbanned] Unbanned, Our Fault.
                      </option>
                      <option value="Greetings! Thank you for committing to follow our Terms of Service.
                            Please remember future offenses will result in stricter punishments! You have been unbanned.">
                         [Unbanned] Appeal Success.
                      </option>
                   </select>
                </label>
             </td>
          </tr>
          </tbody>
       </table>

        <?php

    } else {

        // home
        $all = $siteDB->select("
        SELECT *
        FROM ban_appeal
        ORDER BY stamp DESC");

        $appeals = [];
        foreach ($all as $key => $a) {
            $appeals[$a['banid']] = $a;
        }

        $stats = [
            'unbanned' => 0,
            'denied' => 0,
            'new' => 0,
            'responded' => 0
        ];

        foreach ($appeals as $key => $ap) {

            // get account details because site and game dbs run on different machines and cant join in one query
            $details = $gameDB->select("
            SELECT l.username, ab.bandate, ab.bannedby, ab.banreason, ab.active
            FROM " . GAME_DB_ACCOUNT . " l
            LEFT JOIN account_banned ab on l.id = ab.id
            WHERE l.id = :id
            ORDER BY ab.bandate DESC
            LIMIT 1", [
                'id' => $ap['guid']
            ]);

            //if (count($details) != 1) {
              //  unset($appeals[$key]);
              //  continue;
            //}

            $details = $details[0];
            $appeals[$key]['username'] = $details['username'];
            $appeals[$key]['bandate'] = $details['bandate'];
            $appeals[$key]['bannedby'] = $details['bannedby'];
            $appeals[$key]['banreason'] = $details['banreason'];
            $appeals[$key]['active'] = $details['active'];

            $appeals[$key]['messages'] = $siteDB->select("SELECT guid, message, stamp, denied
            FROM ban_appeal ba
            WHERE banid = :banid
            ORDER BY stamp DESC
            LIMIT 1", [
                'banid' => $ap['banid']
            ]);

            $responder = $gameDB->select("
            SELECT username
            FROM " . GAME_DB_ACCOUNT . "
            WHERE id = :id", [
                'id' => $appeals[$key]['messages'][0]['guid']
            ])[0];

            $appeals[$key]['messages'][0]['responder'] = $responder['username'];

            $appeals[$key]['denied'] = $appeals[$key]['messages'][0]['denied'];

        }

        foreach ($appeals as $key => $ap) {

            if ($ap['active'] == 0)
                $stats['unbanned']++;
            else
                if ($ap['denied'] == 1)
                    $stats['denied']++;
                else
                    if ($ap['messages'][0]['guid'] == $ap['guid'])
                        $stats['new']++;
                    else
                        $stats['responded']++;
        }
        ?>

        <?php
        $filter_text = '';
        if (isset($_REQUEST['filter']))
            if ($_REQUEST['filter'] != 'all')
                $filter_text = "&ndash; " . $_REQUEST['filter'];
        ?>
       <h3 class="m-3 text-white">
          Ban Appeals <?= $filter_text ?>
       </h3>


       <div class="text-gray" style="font-size: 1.3rem">
          <a class="small m-3" href="?filter=all"> <i class="fa fa-fw fa-list" style='color: #1ce598'></i>
             Total: <?= count($appeals) ?></a>
          <a class="small m-3" href="?filter=unbanned"> <i class="fa fa-fw text-green fa-check-circle"></i>
             Unbanned: <?= $stats['unbanned'] ?></a>
          <a class="small m-3" href="?filter=denied"> <i class="fa fa-fw fa-times" style="color: #e52d1c;"></i>
             Denied: <?= $stats['denied'] ?></a>
          <a class="small m-3" href="?filter=new"> <i class="fa fa-fw fa-envelope" style='color: #1ca9e5'></i> New
             Message: <?= $stats['new'] ?></a>
          <a class="small m-3" href="?filter=responded"> <i class="fa fa-fw fa-check-square"
                                                            style='color: #e5b51c'></i>
             Responded: <?= $stats['responded'] ?></a>
       </div>

       <div class="pull-right">
          <a class="small m-3" href=""> <i class="fa fa-fw fa-refresh text-green"></i> Refresh</a>
       </div>

    <div ng-app="banApp" ng-controller="BanCtrl">
       <table class="table-responsive table-striped text-white" style="height: 45rem">
          <thead>
          <tr>
             <th>#</th>
             <th>Account</th>
             <th>Message</th>
             <th>Ban Date</th>
             <th>By/Reason</th>
             <th>Date</th>
             <th>Status</th>
             <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <?php
          foreach ($appeals as $key => $ap) {

              if (isset($_REQUEST['filter'])) {
                  if ($_REQUEST['filter'] == 'unbanned')
                      if ($ap['active'] != 1)
                          continue;
                  if ($_REQUEST['filter'] == 'denied')
                      if ($ap['denied'] != 1)
                          continue;
                  if ($_REQUEST['filter'] == 'new')
                      if ($ap['messages'][0]['guid'] != $ap['guid'] || $ap['denied'] == 1)
                          continue;
                  if ($_REQUEST['filter'] == 'responded')
                      if ($ap['messages'][0]['guid'] == $ap['guid'])
                          continue;
              }

              echo "<tr>";
              echo "<td class='text-muted small'>" . ($key + 1) . "</td>";
              echo "<td class='small'>" . $ap['username'] . "</td>";
              echo "<td><small class='text-gray'>" . date('H:i:s d/m/Y', strtotime($ap['messages'][0]['stamp'])) . "</small><Br>";
              if ($ap['messages'][0]['guid'] == $ap['guid'])
                  echo "<span class='text-white'>";
              else
                  echo "<span class='text-green'>";
              echo $ap['messages'][0]['message'] . "</span>";
              echo "</td>";
              echo "<td class='small'>" . Date('H:i:s d/m/Y', $ap['bandate']) . "</tdcla>";
              echo "<td class='small'>" . $ap['bannedby'] . "<Br><span class='text-gray'>" . $ap['banreason'] . "</span></td>";
              echo "<td class='small'>" . Date('H:i:s d/m/Y', strtotime($ap['stamp'])) . "</td>";
              echo "<td>";

              if ($ap['active'] == 0)
                  echo "<span class='text-green'>Unbanned";
              else {

                  if ($ap['denied'] == 1) {
                      echo "<span style='color: #e52d1c'>Denied<br>
                           <span class='small text-gray'>" . $ap['messages'][0]['responder'];
                  } else {
                      if ($ap['messages'][0]['guid'] == $ap['guid'])
                          echo "<span style='color: #1ca9e5'>New message!"; // last message is from player
                      else
                          echo "<span style='color: #e5b51c'>Responded</span><br>
                           <span class='small text-gray'>" . $ap['messages'][0]['responder']; // last message is from support
                  }
                  echo "</span>";
              }
              echo "</td>";

              echo "<td><a href='?action=respond&banid=" . $ap['banid'] . "'>Respond</a></td>";
              echo "</tr>";

          }
          ?>
          </tbody>
       </table>
        <ul uib-pagination total-items="1000" ng-model="bansPage" items-per-page="10" max-size="10" boundary-link-numbers="true" rotate="true"  class="mb-3"></ul>
    </div>

        <?php

    }

    ?>

</div>

<script src="../js/vendor/jquery-3.5.1.min.js"></script>
<script src="../js/vendor/bootstrap.bundle.min.js"></script>
<script>
    var myApp = angular.module('banApp', ['ui.bootstrap']);

    myApp.controller('BanCtrl', ['$scope', function($scope) {
        $scope.bansPage = 1;

    }]);
</script>


</body>

</html>