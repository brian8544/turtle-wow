<?php

// file used in /watch download video feature

$file = $_REQUEST['file'];

if (!stristr($file, 'webm'))
    return [];

$filename = basename($file);
$file = getcwd() . '/' . $file;

// inc downloads
$meta = json_decode(file_get_contents(str_replace('webm', 'meta', $file)), 1);
$meta['downloads']++;
file_put_contents(str_replace('webm', 'meta', $file), json_encode($meta));



header("Content-Type: video/webm");
header('Content-Transfer-Encoding: binary');
header("Content-Disposition: attachment; filename=$filename;");

$options = array(
    "ssl" => array(
        "verify_peer" => false,
        "verify_peer_name" => false,
    ),
);

$context = stream_context_create($options);

$handle = fopen($file, 'rb', false, $context);

ob_end_clean();

$chunkSize = 8 * 1024 * 1024;

ob_start();
while (!feof($handle)) {
    $buffer = fread($handle, $chunkSize);
    echo $buffer;
    ob_flush();
    flush();
}

fclose($handle);
