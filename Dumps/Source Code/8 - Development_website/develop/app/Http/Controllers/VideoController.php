<?php

namespace App\Http\Controllers;

use App\Models\VideoComment;
use App\Models\VideoLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Owenoj\LaravelGetId3\GetId3;

class VideoController extends Controller
{
    public static function formatViews($views)
    {
        if ($views >= 1000 && $views < 1000000)
            return number_format($views / 1000, 1) . 'K';
        if ($views >= 1000000)
            return number_format($views / 1000000, 1) . 'M'; // i know!
        return $views;
    }

    static public function slugify($text)
    {
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);

        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

        $text = preg_replace('~[^-\w]+~', '', $text);

        $text = trim($text, '-');

        $text = preg_replace('~-+~', '-', $text);

        $text = strtolower($text);

        if (preg_match('/-(\d+)$/', $text, $matches)) {
            $text = preg_replace('/-\d+$/', '', $text);
        }

        if (empty($text)) {
            return '';
        }

        return $text;
    }

    public static function ago($pTime)
    {
        $eString = '';
        $pTime = strtotime($pTime);
        $cTime = strtotime(date('Y-m-d H:i:s'));
        $eTime = $cTime - $pTime;

        if ($eTime < 1)
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
            $d = $eTime / $secs;

            if ($d >= 1) {

                $r = floor($d);
                $rTime = $r * $secs;

                if (($eTime - $rTime) < 0)
                    $eTime -= ($r - 1) * $secs;
                else
                    $eTime -= $rTime;

                $eString = $eString . ' ' . $r . ' ' . ($r > 1 ? $a_plural[$str] : $str) . ' ';

                $index++;
            }

            if ($index > 0) {
                break;
            }
        }

        return $eString . ' ago';

    }

    public function getVideos()
    {
        ini_set('memory_limit', '256M');

        $channel = request()->channel;

        $foundChannel = false;

        if ($channel) {

            $dir = scandir(public_path('storage/turtle_tv'));
            $dir = array_slice($dir, 2);

            foreach ($dir as $d) {
                if (self::slugify($d) == $channel) {
                    $channel = $d;
                    $foundChannel = true;
                    break;
                }
            }

            $path = public_path('storage/turtle_tv/' . $channel);
            if (!file_exists($path)) {
                $path = public_path('storage/turtle_tv');
                $foundChannel = false;
            }
        } else {
            $path = public_path('storage/turtle_tv');
        }

        chdir($path);
        $dir = scandir('.');
        $dir = array_slice($dir, 2);

        $rd = [];

        $all_comments = VideoComment::select('video_id', DB::raw('count(*) as q'))
            ->groupBy('video_id')
            ->get();

        $comments_count = [];

        foreach ($all_comments as $c) {
            $comments_count[$c->video_id] = $c->q;
        }


        if (!$foundChannel) {
            foreach ($dir as $key => $d) {
                if (is_dir($d) && $d != '.' && $d != '..') {
                    $files = scandir($d);
                    $files = array_slice($files, 2);

                    $videos = [];

                    foreach ($files as $key2 => $f) {
                        if (strstr($f, '.webm')) {
                            if (!file_exists($path . '/' . $d . '/' . str_replace('webm', 'jpg', $f))) {
                                if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                                    $command = public_path('storage/turtle_tv/ffmpeg.exe') . " -i \"" . $path . "\\" . $d . "\\" . $f . "\" -ss 00:00:20 -vframes 1 \"" . $path . "\\" . $d . "\\" . str_replace('webm', 'jpg', $f) . "\" ";
                                } else {
                                    $command = "ffmpeg -i \"" . $path . "/" . $d . "/" . $f . "\" -ss 00:00:20 -vframes 1 \"" . $path . "/" . $d . "/" . str_replace('webm', 'jpg', $f) . "\"";
                                }
                                exec($command);
                            }

                            if (file_exists($path . '/' . $d . '/' . str_replace('webm', 'meta', $f))) {
                                $meta = json_decode(file_get_contents($path . '/' . $d . '/' . str_replace('webm', 'meta', $f)), true);
                                $duration = $meta['duration'] ?? GetId3::fromDiskAndPath('public', '/turtle_tv/' . $d . '/' . $f)->getPlaytime();
                                $views = $meta['views'] ?? 0;
                                $downloads = $meta['downloads'] ?? 0;
                            } else {
                                $file = GetId3::fromDiskAndPath('public', '/turtle_tv/' . $d . '/' . $f);
                                $duration = $file->getPlaytime();
                                $views = 0;
                                $downloads = 0;
                                $meta = [
                                    'duration' => $duration,
                                    'views' => $views,
                                    'downloads' => $downloads
                                ];
                                file_put_contents($path . '/' . $d . '/' . str_replace('webm', 'meta', $f), json_encode($meta));
                            }

                            $video_id = hash("crc32", $f);

                            $videos[] = [
                                'url' => url('/watch') . '/' . self::slugify(str_replace('.webm', '', $f)),
                                'id' => $video_id,
                                'thumb' => asset('storage/turtle_tv/' . $d . '/' . str_replace('webm', 'jpg', $f)),
                                'title' => str_replace('.webm', '', $f),
                                'duration' => $duration,
                                'stamp' => intval(date("U", filemtime($path . '/' . $d . '/' . $f))),
                                'ago' => self::ago(date('Y-m-d H:i:s', filemtime($path . '/' . $d . '/' . $f))),
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
                            'videos' => $videos,
                        ];

                    }
                }
            }
        } else {
            $videos = [];
            foreach ($dir as $key => $f) {
                if (strstr($f, '.webm')) {
                    if (!file_exists($path  . '/' . str_replace('webm', 'jpg', $f))) {
                        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                            $command = public_path('storage/turtle_tv/ffmpeg.exe') . " -i \"" . $path  . "\\" . $f . "\" -ss 00:00:20 -vframes 1 \"" . $path . "\\" . str_replace('webm', 'jpg', $f) . "\" ";
                        } else {
                            $command = "ffmpeg -i \"" . $path  . "/" . $f . "\" -ss 00:00:20 -vframes 1 \"" . $path . "/" . str_replace('webm', 'jpg', $f) . "\"";
                        }
                        exec($command);
                    }

                    if (file_exists($path . '/' . str_replace('webm', 'meta', $f))) {
                        $meta = json_decode(file_get_contents($path . '/' . str_replace('webm', 'meta', $f)), true);
                        $duration = $meta['duration'] ?? GetId3::fromDiskAndPath('public', '/turtle_tv/' . $channel . '/' . $f)->getPlaytime();
                        $views = $meta['views'] ?? 0;
                        $downloads = $meta['downloads'] ?? 0;
                    } else {
                        $file = GetId3::fromDiskAndPath('public', '/turtle_tv/' . $channel . '/' . $f);
                        $duration = $file->getPlaytime();
                        $views = 0;
                        $downloads = 0;
                        $meta = [
                            'duration' => $duration,
                            'views' => $views,
                            'downloads' => $downloads
                        ];
                        file_put_contents($path . '/' . str_replace('webm', 'meta', $f), json_encode($meta));
                    }

                    $video_id = hash("crc32", $f);

                    $videos[] = [
                        'url' => url('/watch') . '/' . self::slugify(str_replace('.webm', '', $f)),
                        'id' => $video_id,
                        'thumb' => asset('storage/turtle_tv/' . $channel . '/' . str_replace('webm', 'jpg', $f)) ,
                        'title' => str_replace('.webm', '', $f),
                        'duration' => $duration,
                        'stamp' => intval(date("U", filemtime($path . '/' . $f))),
                        'ago' => self::ago(date('Y-m-d H:i:s', filemtime($path . '/' . $f))),
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
                    'videos' => $videos,
                ];

            }
        }

        foreach ($rd as $key => $category) {
            preg_match('/_(\d+)$/', $category['name'], $matches);
            $categoryNumber = $matches[1] ?? null;

            $rd[$key]['name'] = preg_replace('/_\d+$/', '', $category['name']);

            $rd[$key]['number'] = $categoryNumber;
        }

        usort($rd, function ($a, $b) {
            return $a['number'] <=> $b['number'];
        });

        return ['data' => $rd, 'view' => $channel ? 'channel' : 'all'];
    }

    public static function getVideo($id)
    {

        if (!isset($id))
            return [
                'url' => 'notFound'
            ];

        $path = public_path('storage/turtle_tv');
        chdir($path);
        $dir = scandir('.');

        $id = str_replace('\'', '', $id);

        foreach ($dir as $key => $d) {
            if (is_dir($d) && $d != '.' && $d != '..') {
                $files = scandir($d);
                foreach ($files as $key2 => $f) {
                    if (stristr($f, '.webm')) {
                        if ($id == hash("crc32", $f)) {
                            return [
                                'url' => 'storage/turtle_tv/' . $d . '/' . $f,
                                'thumb' => 'storage/turtle_tv/' . $d . '/' . str_replace('webm', 'jpg', $f),
                            ];
                        }
                    }
                }
            }
        }

        return [
            'url' => 'notFound',
            'thumb' => 'notFound'
        ];
    }

    public static function watchVideo($name)
    {
        if (!isset($name))
            return [
                'video' => 'notFound'
            ];

        ini_set('memory_limit', '256M');

        $path = public_path('storage/turtle_tv');
        chdir($path);
        $dir = scandir('.');
        $dir = array_slice($dir, 2);

        $foundVideo = false;
        $foundThumb = false;
        $foundMeta = false;
        $file = '';
        $dest = '';

        $otherVideos = [];

        foreach ($dir as $key => $d) {
            if (is_dir($d) && $d != '.' && $d != '..') {
                $files = scandir($d);
                $files = array_slice($files, 2);


                foreach ($files as $key2 => $f) {
                    $f_webm = str_replace('.webm', '', $f);
                    $f_jpg = str_replace('.jpg', '', $f);
                    $f_meta = str_replace('.meta', '', $f);
                    if (self::slugify($f_webm) == $name) {
                        $foundVideo = true;
                        $file = $f;
                        $dest = $d;
                    }

                    if (self::slugify($f_jpg) == $name) {
                        $foundThumb = true;
                    }

                    if (self::slugify($f_meta) == $name) {
                        $foundMeta = true;
                    }
                }
            }
        }

        if (!$foundVideo) {
            return [
                'video' => 'notFound'
            ];
        }

        $id = hash('crc32', $file);

        if (!$foundThumb) {
            if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                $command = public_path('storage/turtle_tv/ffmpeg.exe') . " -i \"" . $path . "\\" . $dest . "\\" . $file . "\" -ss 00:00:20 -vframes 1 \"" . $path . "\\" . $dest . "\\" . str_replace('webm', 'jpg', $file) . "\" ";
            } else {
                $command = "ffmpeg -i \"" . $path . "/" . $dest . "/" . $file . "\" -ss 00:00:20 -vframes 1 \"" . $path . "/" . $dest . "/" . str_replace('webm', 'jpg', $file) . "\"";
            }
            exec($command);
        }

        if ($foundMeta) {
            $meta = json_decode(file_get_contents($path . '/' . $dest . '/' . str_replace('webm', 'meta', $file)), true);
            $duration = $meta['duration'] ?? 0;
            $downloads = $meta['downloads'] ?? 0;

            if (session('video_watched_' . $id) != 'true') {
                $meta['views']++;
                file_put_contents($path . '/' . $dest . '/' . str_replace('webm', 'meta', $file), json_encode($meta));

                session(['video_watched_' . $id => 'true']);
            }

            $views = $meta['views'] ?? 0;
        } else {
            $fileSpec = GetId3::fromDiskAndPath('public', '/turtle_tv/' . $dest . '/' . $file);
            $duration = $fileSpec->getPlaytime();
            $views = 1;
            $downloads = 0;
            $meta = [
                'duration' => $duration,
                'views' => $views,
                'downloads' => $downloads
            ];
            file_put_contents($path . '/' . $dest . '/' . str_replace('webm', 'meta', $file), json_encode($meta));

            session(['video_watched_' . $id => 'true']);
        }

        $thumb = asset('storage/turtle_tv/' . $dest . '/' . str_replace('webm', 'jpg', $file));
        $title = str_replace('.webm', '', $file);
        $stamp = intval(date("U", filemtime($path . '/' . $dest . '/' . $file)));
        $ago = self::ago(date('Y-m-d H:i:s', filemtime($path . '/' . $dest . '/' . $file)));
        $views = self::formatViews($views);

        $all_comments = VideoComment::select('video_id', DB::raw('count(*) as q'))
            ->where('video_id', $id)
            ->groupBy('video_id');

        $likes = VideoLike::select('video_id', DB::raw('count(*) as q'))
            ->where('video_id', $id)
            ->where('type', 'like')
            ->groupBy('video_id')
            ->count();

        $dislikes = VideoLike::select('video_id', DB::raw('count(*) as q'))
            ->where('video_id', $id)
            ->where('type', 'dislike')
            ->groupBy('video_id')
            ->count();

        $liked = false;
        $disliked = false;

        if (auth('account')->check()) {
            $liked = VideoLike::where('video_id', $id)
                ->where('type', 'like')
                ->where('account_id', auth('account')->user()->id)
                ->first();

            $disliked = VideoLike::where('video_id', $id)
                ->where('type', 'dislike')
                ->where('account_id', auth('account')->user()->id)
                ->first();
        }

        $commentsCount = $all_comments->count() ?? 0;
        $comments = $all_comments->get()->toArray();

        if ($dest != '') {
            $path = public_path('storage/turtle_tv/' . $dest);
            chdir($path);
            $dir = scandir('.');
            $dir = array_slice($dir, 2);
            foreach ($dir as $key => $f) {
                if (strstr($f, '.webm') && $f != $file) {
                    $otherDuration = 0;
                    $otherViews = 0;

                    if (file_exists($path . '/' . str_replace('webm', 'meta', $f))) {
                        $meta = json_decode(file_get_contents($path . '/' . str_replace('webm', 'meta', $f)), true);
                        $otherDuration = $meta['duration'] ?? GetId3::fromDiskAndPath('public', '/turtle_tv/' . $dest . '/' . $f)->getPlaytime();;
                        $otherViews = $meta['views'] ?? 0;
                    }
                    $other_comments = VideoComment::select('video_id', DB::raw('count(*) as q'))
                        ->where('video_id', hash("crc32", $f))
                        ->groupBy('video_id')->count();
                    $otherVideos[] = [
                        'url' => url('/watch') . '/' . self::slugify(str_replace('.webm', '', $f)),
                        'thumb' => asset('storage/turtle_tv/' . $dest . '/' . str_replace('webm', 'jpg', $f)),
                        'title' => str_replace('.webm', '', $f),
                        'duration' => $otherDuration ?? 0,
                        'comments' => $other_comments ?? 0,
                        'views' => self::formatViews($otherViews) ?? 0,
                    ];
                }
            }
        }

        return [
            'id' => $id,
            'thumb' => $thumb,
            'title' => $title,
            'duration' => $duration,
            'stamp' => $stamp,
            'ago' => $ago,
            'views' => $views,
            'downloads' => $downloads,
            'commentsCount' => $commentsCount,
            'comments' => $comments,
            'otherVideos' => $otherVideos,
            'likes' => $likes,
            'dislikes' => $dislikes,
            'liked' => $liked,
            'disliked' => $disliked,
        ];
    }
}
