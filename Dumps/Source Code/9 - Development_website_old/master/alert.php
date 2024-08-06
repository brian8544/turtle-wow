<?php

require "admin/api/capi/config/config.php";
include_once 'api/capi/libs/database/mysql.php';

$serverOnline = true;
$uptime = null;
$onlinePlayers = null;
$maxPlayers = null;
$onlineQueue = null;
$maxQueue = null;

function getUptime($uptimeInSeconds) {
    $days = floor($uptimeInSeconds / (60 * 60 * 24));
    $hours = floor(($uptimeInSeconds % (60 * 60 * 24)) / (60 * 60));
    $minutes = floor(($uptimeInSeconds % (60 * 60)) / 60);
    $seconds = $uptimeInSeconds % 60;

    return array(
        'days' => $days,
        'hours' => $hours,
        'minutes' => $minutes,
        'seconds' => $seconds
    );
}

$auth = new MYSQL_Database(DB_TYPE, DB_HOST_LAN, GAME_DB_NAME, GAME_DB_USER, GAME_DB_PASS);
/*$characters = new MYSQL_Database(DB_TYPE, DB_HOST_LAN, GAME_DB_NAME, GAME_DB_USER, GAME_DB_PASS);

$online = $auth->select("SELECT online FROM characters WHERE online = 1 LIMIT 1");

if (count($online) == 0) {
    $serverOnline = false;
}*/

$server1 = $auth->select("SELECT uptime, onlineplayers, maxplayers, queue, maxqueue FROM uptime WHERE realmid = 1 ORDER BY starttime DESC LIMIT 1");
$server2 = $auth->select("SELECT uptime, onlineplayers, maxplayers, queue, maxqueue FROM uptime WHERE realmid = 2 ORDER BY starttime DESC LIMIT 1");

if (count($server1) != 0) {
    $uptime1 = $server1[0]['uptime'];
    $onlinePlayers1 = $server1[0]['onlineplayers'];
    $maxPlayers1 = $server1[0]['maxplayers'];
    $uptime1 = getUptime($server1[0]['uptime']);
    $onlineQueue1 = $server1[0]['queue'];
    $maxQueue1 = $server1[0]['maxqueue'];
}

if (count($server2) != 0) {
    $uptime2 = $server2[0]['uptime'];
    $onlinePlayers2 = $server2[0]['onlineplayers'];
    $maxPlayers2 = $server2[0]['maxplayers'];
    $uptime2 = getUptime($server2[0]['uptime']);
    $onlineQueue2 = $server2[0]['queue'];
    $maxQueue2 = $server2[0]['maxqueue'];
}

?>
SERVERALERT:<html><body>
<p align="left">Our new realm Tel'Abim PvP is now live! Start your journey alongside thousands of others and dominate the opposing faction. This realm includes all Turtle WoW content except glyph challenges.</p><br/>
<p align="left">If any connection issues arise on any of the realms consider using a VPN for the time being.</p><br/>
<?php if ($serverOnline) {
    ?>
<p align="left">Turtle WoW (PvE): |cff8dc63fONLINE|r</p>
<p align="left">Players in the world: <?php echo $onlinePlayers1; ?></p>
<p align="left"><?php echo "Uptime: {$uptime1['days']} days, {$uptime1['hours']} hours, {$uptime1['minutes']} minutes";?></p><br/>
<?php
} else {
    ?>
<p align="left">Turtle WoW (PvE): |cffe6cc80OFFLINE|r</p><br/>
<?php
}
?>
<p align="left">Tel'Abim (PvP): |cff8dc63fONLINE|r</p>
<p align="left">Players in the world: <?php echo $onlinePlayers2; ?></p>
<p align="left"><?php echo "Uptime: {$uptime2['days']} days, {$uptime2['hours']} hours, {$uptime2['minutes']} minutes";?></p>
</body></html>
