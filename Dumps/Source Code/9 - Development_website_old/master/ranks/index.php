<!--<!doctype html>-->

<?php

require "../admin/api/capi/config/config.php";
include_once '../api/capi/libs/database/mysql.php';

$db = new MYSQL_Database(DB_TYPE, DB_HOST, 'tw_world', GAME_DB_USER, GAME_DB_PASS);
$db->exec("set names utf8");

$ranks = $db->select("select * from tw_world.staff_ranks");

foreach ($ranks as $key => $r) {
    $ranks[$key]['commands'] = $db->select("select * from command where `rank` = :r", [
        'r' => $r['name']
    ]);
}

?>
<html lang="en" ng-app="tw">
<head>

    <meta charset="utf-8"/>
    <title>Staff Ranks</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="../css/vendor/bootstrap.min.css"/>

    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="-1">


</head>
<body>
<div class="container-fluid">
    <div class="row">
        <?php foreach ($ranks as $key => $rank) { ?>
            <div style="width: calc(95% / <?= count($ranks) ?>) !important; margin-right: 10px">

                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th><?= $rank['name'] ?></th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($rank['commands'] as $key2 => $c) { ?>
                        <tr>
                            <td>
                                <?= $c['name'] ?>
                            </td>
                        </tr>
                    <?php } ?>
                    </tbody>
                </table>

            </div>
        <?php } ?>
    </div>

</div>

</body>

</html>

