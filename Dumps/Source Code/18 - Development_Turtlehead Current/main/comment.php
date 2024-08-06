<?php

require_once('includes/game.php');

global $DB;

function urlfromtype($type, $typeid)
{
    global $types;
    return $types[$type] . '=' . $typeid . '#comments';
}

switch ($_REQUEST["comment"]):
    case 'add':

        $DB->insert(AOWOW . '.aowow_comments', [
            'type' => $_GET["type"],
            'typeid' => $_GET["typeid"],
            'userid' => empty($_SESSION["userid"]) ? 0 : $_SESSION["userid"],
            'commentbody' => stripslashes($_POST["commentbody"]),
            'post_date' => Date('Y-m-d H:i:s'),
            'replyto' => empty($_POST["replyto"]) ? 0 : $_POST["replyto"],
        ]);
        $newid = intval($DB->lastInsertId());

//        $newid = $DB->query('INSERT
//			INTO ' . AOWOW . '.aowow_comments (`type`, `typeid`, `userid`, `commentbody`, `post_date`, `replyto`)
//			VALUES (
//			        ' . $_GET["type"] . ',
//			        ' . $_GET["typeid"] . ',
//			        ' . (empty($_SESSION["userid"]) ? 0 : $_SESSION["userid"]) . ',
//			        ' . stripslashes($_POST["commentbody"]) . ',
//			        NOW(),
//			        ' . (empty($_POST["replyto"]) ? 0 : $_POST["replyto"]) . ')'
//        );
        //DBSIMPLE_SKIP
        if (empty($_POST['replyto']))
            $DB->update('' . AOWOW . '.aowow_comments', [
                'replyto' => $newid
            ], [
                'id' => $newid
            ]);
//            $DB->query('UPDATE ' . AOWOW . '.aowow_comments SET `replyto`=?d WHERE `id`=?d LIMIT 1', $newid, $newid);
        echo '<meta http-equiv="Refresh" content="0; URL=?' . urlfromtype($_GET["type"], $_GET["typeid"]) . '">';
        echo '<style type="text/css">';
        echo 'body {background-color: black;}';
        echo '</style>';
        break;
    case 'delete':
        // Удаление комментарий (Ajax)
        // Номер комментария: $_GET['id']
        // Имя пользователя, удаляющего комментарий: $_GET['username']
        if ($_SESSION['roles'] > 1) {
            $DB->delete(AOWOW . '.aowow_comments', [
                'id' => $_GET['id']
            ]);
        } else {
            $DB->delete(AOWOW . '.aowow_comments', [
                'id' => $_GET['id'],
                'userid' => $_SESSION['userid']
            ]);
        }

//        $DB->query('DELETE FROM ' . AOWOW . '.aowow_comments WHERE `id`=?d {AND `userid`=?d} LIMIT 1',
//            $_GET['id'], ($_SESSION['roles'] > 1) ? DBSIMPLE_SKIP : $_SESSION['userid']
//        );
        break;
    case 'edit':
        // Редактирование комментария
        // Номер комментария: $_GET['id']
        // Новое содержание комментария: $_POST['body']
        // Номер пользователя: $_SESSION['userid']
        if (isset($_POST['body']))
            if ($_SESSION['roles'] > 1) {
                $DB->update(AOWOW . '.aowow_comments', [
                    'commentbody' => stripslashes($_POST['body']),
                    'edit_userid' => $_GET['id'],
                    'edit_date' => Date('Y-m-d H:i:s')
                ], [
                    'id' => $_SESSION['userid'],
                    'userid' => $_SESSION['userid']
                ]);
            } else {
                $DB->update(AOWOW . '.aowow_comments', [
                    'commentbody' => stripslashes($_POST['body']),
                    'edit_userid' => $_SESSION['userid'],
                    'edit_date' => Date('Y-m-d H:i:s')
                ], [
                    'id' => $_GET['id']
                ]);
            }

//            $DB->query('UPDATE ' . AOWOW . '.aowow_comments SET
//                                `commentbody`=?, `edit_userid`=?, `edit_date`=NOW()
//WHERE `id`=?d {AND `userid`=?d} LIMIT 1', stripslashes($_POST['body']),
//                $_SESSION['userid'],
//                $_GET['id'],
//                ($_SESSION['roles'] > 1) ? DBSIMPLE_SKIP : $_SESSION['userid']
//            );
        echo $_POST['body'];
        break;
    case 'rate':
        /*
         * Установка собственоого рейтинга (модераторы и т.п.)
         * Номер комментария: $_GET['id']
         * Новое значение рейтинга: $_GET['rating']
         * Номер пользователя: $_SESSION['userid']
         */
        // Проверка на хоть какое то значение рейтинга, и на то, что пользователь за этот коммент не голосовал
        if (isset($_GET['rating']) and !($DB->selectCell('SELECT `commentid` 
            FROM ' . AOWOW . '.aowow_comments_rates 
            WHERE `userid`=?d AND `commentid`=?d LIMIT 1', $_SESSION['userid'], $_GET['id'])))
            $DB->insert(AOWOW . '.aowow_comments_rates', [
                'commentid' => $_GET['id'],
                'userid' => $_SESSION['userid'],
                'rate' => $_GET['rating']
            ]);
//            $DB->query('INSERT INTO ' . AOWOW . '.aowow_comments_rates(`commentid`, `userid`, `rate`) VALUES (?d, ?d, ?d)', $_GET['id'], $_SESSION['userid'], $_GET['rating']);
        break;
    case 'undelete':
        // Восстановление комментария
        // Номер комментария: $_GET['id']
        // Имя пользователя, удаляющего комментарий: $_GET['username']
    default:
        break;
endswitch;
