<?php

use App\Events\OrderShipped;
use App\Http\Controllers\auth\AccountController;
use App\Http\Controllers\auth\PasswordController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\VerificationController;
use App\Models\BanAppeal;
use App\Models\BugTrackerImage;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Intervention\Image\Facades\Image;
use Carbon\Carbon;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('home', [PageController::class, 'home'])->name('home2');

Route::get('new-races', [PageController::class, 'newRaces'])->name('new-races');
Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');
Route::get('/email/change/{token}', [VerificationController::class, 'change'])->name('verification.change.email');
Route::get('subscribe', [SubscribeController::class, 'subscribe'])->name('subscribe');
Route::get('unsubscribe', [SubscribeController::class, 'unsubscribe'])->name('unsubscribe');
//Route::get('unsub.php', [SubscribeController::class, 'unsubscribeOld'])->name('unsubscribeOld');
Route::get('reset-password', [PasswordController::class, 'reset'])->name('password.reset');
Route::post('reset-password', [PasswordController::class, 'submit'])->name('password.submit');
Route::post('logout', [AccountController::class, 'logout'])->name('logout');
Route::get('profile', [AccountController::class, 'profile'])->name('profile');
Route::get('login', function () {
    return view('login');
})->name('login');
Route::get('rules', [PageController::class, 'rules'])->name('rules');
Route::get('donate', function () {
    if (Auth::guard('account')->check()) {
        return view('donate');
    } else {
        return redirect()->route('login');
    }
})->name('donate');

Route::get('logos', [PageController::class, 'logos'])->name('logos');

Route::get('client-interface-improvements', [PageController::class, 'clientInterfaceImprovements'])->name('client-interface-improvements');

Route::get('additional-transport-routes', [PageController::class, 'additionalTransportRoutes'])->name('additional-transport-routes');

Route::get('roleplay', [PageController::class, 'roleplay'])->name('roleplay');

Route::get('new-factions-and-quests', [PageController::class, 'newFactionsAndQuests'])->name('new-factions-and-quests');

Route::get('character-customization', [PageController::class, 'characterCustomization'])->name('character-customization');

Route::get('class-race-combinations', [PageController::class, 'classRaceCombinations'])->name('class-race-combinations');

Route::get('guild-banks', [PageController::class, 'guildBanks'])->name('guild-banks');

Route::get('dynamic-mount-speed', [PageController::class, 'dynamicMountSpeed'])->name('dynamic-mount-speed');

Route::get('survival-and-gardening', [PageController::class, 'survivalAndGardening'])->name('survival-and-gardening');

Route::get('transmogrification', [PageController::class, 'transmogrification'])->name('transmogrification');

Route::get('chronoboon-displacer', [PageController::class, 'chronoboonDisplacer'])->name('chronoboon-displacer');

Route::get('achievement-titles', [PageController::class, 'achievementTitles'])->name('achievement-titles');

Route::get('ban-appeals', [PageController::class, 'banAppeals'])->name('ban-appeals');

if (config('customs.bug_tracker.enabled')) {
    Route::get('bug-tracker', [PageController::class, 'bugTracker'])->name('bug-tracker');

    Route::get('new-report', [PageController::class, 'newReport'])->name('new-report');

    Route::get('bug-report', [PageController::class, 'bugReport'])->name('bug-report');
}

Route::get('raids-and-dungeons', [PageController::class, 'raidsAndDungeons'])->name('raids-and-dungeons');

Route::get('player-versus-player-content', [PageController::class, 'playerVsPlayer'])->name('player-versus-player-content');

Route::get('seasonal-events', [PageController::class, 'seasonalEvents'])->name('seasonal-events');

Route::get('hardcore-mode', [PageController::class, 'hardcoreMode'])->name('hardcore-mode');

Route::get('community-artworks', [PageController::class, 'communityArtworks'])->name('community-artworks');

Route::get('pets-and-mounts', [PageController::class, 'petsAndMounts'])->name('pets-and-mounts');

Route::get('slow-and-steady', [PageController::class, 'slowAndSteady'])->name('slow-and-steady');

Route::get('vagrants-endeavor', [PageController::class, 'vagrantsEndeavor'])->name('vagrants-endeavor');

Route::get('druid', [PageController::class, 'druid'])->name('druid');

Route::get('hunter', [PageController::class, 'hunter'])->name('hunter');

Route::get('mage', [PageController::class, 'mage'])->name('mage');

Route::get('paladin', [PageController::class, 'paladin'])->name('paladin');

Route::get('priest', [PageController::class, 'priest'])->name('priest');

Route::get('rogue', [PageController::class, 'rogue'])->name('rogue');

Route::get('character-customizations', [PageController::class, 'characterCustomizations'])->name('character-customizations');

Route::get('sound-design', [PageController::class, 'soundDesign'])->name('sound-design');

Route::get('new-locations-and-maps', [PageController::class, 'newLocations'])->name('new-locations-and-maps');

Route::get('everlook-broadcasting', [PageController::class, 'everlookBroadcast'])->name('everlook-broadcasting');

Route::get('shaman', [PageController::class, 'shaman'])->name('shaman');

Route::get('warlock', [PageController::class, 'warlock'])->name('warlock');

Route::get('warrior', [PageController::class, 'warrior'])->name('warrior');

Route::get('alert.html', [PageController::class, 'serverAlert']);

Route::get('hardcore', [PageController::class, 'hardcore'])->name('hardcore');

Route::get('jewelcrafting', [PageController::class, 'jewelcrafting'])->name('jewelcrafting');

Route::get('armory', [PageController::class, 'armory'])->name('armory');

Route::get('armory/{realmName}/{name}', [PageController::class, 'armoryCharacter'])->name('armory.character');

Route::get('shop-appeals', [PageController::class, 'shopAppeals'])->name('shop-appeals');

Route::get('shop-history', [PageController::class, 'shopHistory'])->name('shop-history');
Route::get('shop-history2', [PageController::class, 'shopHistory2'])->name('shop-history2');

Route::get('population-graph', [PageController::class, 'populationGraph'])->name('population-graph');

if (config('customs.shellcoin.enabled')) {
    Route::get('shellcoin', [PageController::class, 'shellcoin'])->name('shellcoin');
}

Route::get('classic-dungeons-update', [PageController::class, 'patch'])->name('classic-dungeons-update');

Route::get('radio', [PageController::class, 'radio'])->name('radio');

Route::get('radio-stream', function () {
    return response()->stream(function () {
        $file = fopen('http://radiodirect.turtle-music.org/stream', 'r');
        fpassthru($file);
        fclose($file);
    }, 200, [
        'Content-Type' => 'audio/mpeg',
    ]);
})->middleware('radio.cors');

Route::get('boaring-adventure', [PageController::class, 'boaringAdventure'])->name('boaring-adventure');

Route::get('watch', [PageController::class, 'watch'])->name('watch');
Route::get('watch/channel/{channel}', [PageController::class, 'watch'])->name('watch.channel');
Route::get('watch/{video}', [PageController::class, 'video'])->name('watch.video');

Route::get('world-config', [PageController::class, 'worldConfig'])->name('world-config');
//Route::get('reset-2-fa-code', [PageController::class, 'reset2FaCode'])->name('reset-2-fa-code');

Route::get('language/{locale}', function ($locale) {
    App::setLocale($locale);
    session()->put('locale', $locale);

    return redirect()->back();
})->name('language');

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

/*Route::get('armory/{realm_id}/{name}', [\App\Http\Controllers\armory\CharacterController::class, 'getCharacter'])->name('armory.character');*/

/*Route::get('test', function () {
    set_time_limit(6000);
    $query = DB::select("SELECT ba.id, ab.id AS account_id, ba.guid AS sender_id, ba.banid AS ban_id, ba.stamp AS created_at, ba.message, ba.seen, ba.denied, ab.active, ac.rank FROM turtle_web.ban_appeal AS ba
        LEFT JOIN turtle_server_auth.account AS ac ON ba.guid = ac.id
        LEFT JOIN turtle_server_auth.account_banned AS ab ON ba.banid = ab.banid
        ORDER BY ba.id");

    $bans = [];

    foreach ($query as $key => $value) {
        if (!isset($value->rank)) {
           $value->rank = 0;
        }

        if ($value->denied == 1) {
            $value->rank = 1;
        }
        $bans[$value->ban_id]['active'] = $value->active;
        $bans[$value->ban_id]['ban_appeal_id'] = null;
        $bans[$value->ban_id]['account_id'] = $value->account_id;
        $bans[$value->ban_id]['status'] = 'pending';
        if (!isset($bans[$value->ban_id]['created_at'])) {
            $bans[$value->ban_id]['created_at'] = $value->created_at;
        }
        $bans[$value->ban_id]['updated_at'] = $value->created_at;
        $bans[$value->ban_id]['edited_by'] = null;
        $bans[$value->ban_id]['messages'][] = [
            'account_id' => $value->sender_id,
            'message' => $value->message,
            'seen' => $value->seen,
            'support' => $value->rank > 0 ? true : false,
            'denied' => $value->denied,
            'created_at' => $value->created_at,
            'updated_at' => $value->created_at,
        ];
    }

    $count = 1;

    foreach ($bans as $key => $value) {
        $bans[$key]['ban_appeal_id'] = $count++;
        if ($value['account_id'] == null) {
            $bans[$key]['account_id'] = $value['messages'][0]['account_id'];
        }

        if ($value['active'] == 0 || $value['active'] == null) {
            $bans[$key]['status'] = 'approved';
        }

        if ($value['messages'][count($value['messages']) -1]['support']) {
            $bans[$key]['edited_by'] = $value['messages'][count($value['messages']) -1]['account_id'];
        }

        if ($value['messages'][count($value['messages']) -1]['denied'] == 1) {
            $bans[$key]['status'] = 'closed';
        }

        $banAppeal = BanAppeal::create([
            'id' => $bans[$key]['ban_appeal_id'],
            'account_id' => $bans[$key]['account_id'],
            'ban_id' => $key,
            'status' => $bans[$key]['status'],
            'edited_by' => $bans[$key]['edited_by'],
        ]);


        if ($banAppeal) {
            foreach ($value['messages'] as $message) {
                $banAppeal->messages()->create([
                    'account_id' => $message['account_id'],
                    'message' => $message['message'],
                    'seen' => $message['seen'],
                    'support' => $message['support'],
                    'denied' => $message['denied'],
                    'created_at' => $message['created_at'],
                    'updated_at' => $message['updated_at'],
                ]);
            }
        }
    }



    dd($bans);
});*/

/*Route::get('test3', function () {

    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    \App\Models\BugTrackerMessage::truncate();
    \App\Models\BugTrackerMessageStatus::truncate();
    \App\Models\BugTracker::truncate();
    \App\Models\BugTrackerCategory::truncate();
    \App\Models\BugTrackerImage::truncate();
    \App\Models\BugTrackerStatus::truncate();
    DB::table('pivot_bug_tracker_categories')->truncate();

    \App\Models\BugTrackerCategory::insert([[
        'name_en' => 'Battlegrounds',
        'name_zh_cn' => '可以翻译为"战场"',
        'description_en' => '',
        'description_zh_cn' => '',
        'color' => '#063953',
    ],[
        'name_en' => 'Bundled AddOn',
        'name_zh_cn' => '可以翻译为"捆绑插件"',
        'description_en' => 'Issues related to one of the addons included in the TWoW Client itself.',
        'description_zh_cn' => '与TWoW客户端本身包含的插件之一相关的问题.',
        'color' => '#00BA20',
    ],[
        'name_en' => 'Can\'t Fix',
        'name_zh_cn' => '可以翻译为"无法修复"',
        'description_en' => 'These issues cannot be fixed :(',
        'description_zh_cn' => '这些问题无法解决 :(',
        'color' => '#B6070D',
    ],[
        'name_en' => 'Client',
        'name_zh_cn' => '可以翻译为"客户端"',
        'description_en' => 'Issue is in the client. These issues cannot be fixed until a new patch is released.',
        'description_zh_cn' => '问题在客户端。在发布新补丁之前，这些问题无法解决。',
        'color' => '#D93F15',
    ], [
        'name_en' => 'Continents Instanciate',
        'name_zh_cn' => '可以翻译为"大陆实例化"',
        'description_en' => 'Side effects occuring due to the Continents.Instanciate VMaNGOS multithreadding feature.',
        'description_zh_cn' => '由于Continents.Instanciate VMaNGOS多线程功能而发生的副作用。',
        'color' => '#CC7472',
    ],[
        'name_en' => 'Core',
        'name_zh_cn' => '可以翻译为"核心"',
        'description_en' => 'Location for the code with the issue is in the Core.',
        'description_zh_cn' => '问题所在的代码位置在核心中。',
        'color' => '#D93F15',
    ],[
        'name_en' => 'Correct on VMaNGOS',
        'name_zh_cn' => '可以翻译为"在VMaNGOS上正确"',
        'description_en' => 'This issue has confirmed to be not a problem upstream and is only affecting TWoW.',
        'description_zh_cn' => '此问题已确认在上游不是问题，仅影响TWoW。',
        'color' => '#D80C58',
    ],[
        'name_en' => 'Couldn\'t reproduce',
        'name_zh_cn' => '可以翻译为"无法复制"',
        'description_en' => 'Could not reproduce this bug, it\'s working as intended.',
        'description_zh_cn' => '无法复制此错误，它按预期工作。',
        'color' => '#000000',
    ],[
        'name_en' => 'Crossfaction',
        'name_zh_cn' => '可以翻译为"跨阵营"',
        'description_en' => 'Bugs as consequence of the PVE realm crossfaction feature.',
        'description_zh_cn' => 'PVE领域跨阵营功能的后果。',
        'color' => '#5319E7',
    ],[
        'name_en' => 'Custom Content Polish',
        'name_zh_cn' => '可以翻译为"自定义内容抛光"',
        'description_en' => 'Oversights and Polish issues with TWoW Custom Content.',
        'description_zh_cn' => 'TWoW自定义内容的疏忽和抛光问题。',
        'color' => '#0E8A16',
    ],[
        'name_en' => 'Dialogue',
        'name_zh_cn' => '可以翻译为"对话"',
        'description_en' => 'Issues specifically with the text content of npcs and their quests.',
        'description_zh_cn' => '特定于npc的文本内容及其任务的问题。',
        'color' => '#5404F7',
    ],[
        'name_en' => 'Druid',
        'name_zh_cn' => '可以翻译为"德鲁伊"',
        'description_en' => 'Issues related to the Druid class.',
        'description_zh_cn' => '与德鲁伊职业相关的问题。',
        'color' => '#FF7D20',
    ],[
        'name_en' => 'Dungeon & Raids',
        'name_zh_cn' => '可以翻译为"地下城和团队副本"',
        'description_en' => 'Issues related to Dungeons and Raids.',
        'description_zh_cn' => '与地下城和团队副本相关的问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Event',
        'name_zh_cn' => '可以翻译为"事件"',
        'description_en' => 'Issues related to Events.',
        'description_zh_cn' => '与事件相关的问题。',
        'color' => '#53776B',
    ],[
        'name_en' => 'Faction',
        'name_zh_cn' => '可以翻译为"阵营"',
        'description_en' => 'Issues related to Factions.',
        'description_zh_cn' => '与阵营相关的问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Fishing',
        'name_zh_cn' => '可以翻译为"钓鱼"',
        'description_en' => 'Issues related to Fishing.',
        'description_zh_cn' => '与钓鱼相关的问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Further informations required',
        'name_zh_cn' => '可以翻译为"需要更多信息"',
        'description_en' => 'Too few informations! Further explaination needed.',
        'description_zh_cn' => '信息太少！需要进一步解释。',
        'color' => '#FBCA2C',

    ],[
        'name_en' => 'Gameplay Balance',
        'name_zh_cn' => '可以翻译为"游戏平衡"',
        'description_en' => 'These bugs if resolved will have an effect on the balancing of items or spells and so may be denied.',
        'description_zh_cn' => '如果解决了这些错误，将会影响物品或法术的平衡，因此可能会被拒绝。',
        'color' => '#FBCA2C',
    ],[
        'name_en' => 'General',
        'name_zh_cn' => '可以翻译为"一般"',
        'description_en' => 'General issues that don\'t fit in any other category.',
        'description_zh_cn' => '不适合任何其他类别的一般问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Ghost in the Machine',
        'name_zh_cn' => '可以翻译为"机器中的幽灵"',
        'description_en' => 'We believe the issue exists, but there are currently no solid replication steps.',
        'description_zh_cn' => '我们相信问题存在，但目前没有坚实的复制步骤。',
        'color' => '#E99695',
    ],[
        'name_en' => 'Goblin',
        'name_zh_cn' => '可以翻译为"地精"',
        'description_en' => 'Issues related to the Goblin race.',
        'description_zh_cn' => '与地精种族相关的问题。',
        'color' => '#74CA50',
    ],[
        'name_en' => 'Hardcore',
        'name_zh_cn' => '可以翻译为"硬核"',
        'description_en' => 'Issues directly affecting customizations made to accomidate Hardcore and Inferno players.',
        'description_zh_cn' => '直接影响对硬核和地狱玩家进行定制的问题。',
        'color' => '#B6070D',
    ],[
        'name_en' => 'High Elf',
        'name_zh_cn' => '可以翻译为"高等精灵"',
        'description_en' => 'Issues related High Elf race.',
        'description_zh_cn' => '与高等精灵种族相关的问题。',
        'color' => '#4CD54D',
    ],[
        'name_en' => 'Hunter',
        'name_zh_cn' => '可以翻译为"猎人"',
        'description_en' => 'Issues related to the Hunter class.',
        'description_zh_cn' => '与猎人职业相关的问题。',
        'color' => '#ABD473',
    ],[
        'name_en' => 'Item',
        'name_zh_cn' => '可以翻译为"物品"',
        'description_en' => 'Issues related to Items.',
        'description_zh_cn' => '与物品相关的问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Loot Table',
        'name_zh_cn' => '可以翻译为"战利品表"',
        'description_en' => 'An NPC or container item\'s loot tables are out of wack.',
        'description_zh_cn' => 'NPC或容器物品的战利品表不正常。',
        'color' => '#FBCA2C',
    ],[
        'name_en' => 'Low Prio',
        'name_zh_cn' => '可以翻译为"低优先级"',
        'description_en' => 'These will be addressed only if we have spare time.',
        'description_zh_cn' => '只有在我们有空闲时间时才会解决这些问题。',
        'color' => '#666666',
    ],[
        'name_en' => 'Mage',
        'name_zh_cn' => '可以翻译为"法师"',
        'description_en' => 'Issues related to the Mage class.',
        'description_zh_cn' => '与法师职业相关的问题。',
        'color' => '#69CCF0',
    ],[
        'name_en' => 'Map Dev',
        'name_zh_cn' => '可以翻译为"地图开发"',
        'description_en' => 'Handled by the world editing development team.',
        'description_zh_cn' => '由世界编辑开发团队处理。',
        'color' => '#02B843',
    ],[
        'name_en' => 'Mechanic',
        'name_zh_cn' => '可以翻译为"机械师"',
        'description_en' => 'Mechanic Issues.',
        'description_zh_cn' => '机械师问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'MMAP',
        'name_zh_cn' => '可以翻译为"MMAP"',
        'description_en' => 'Pathing Issues.',
        'description_zh_cn' => '路径问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Modeling',
        'name_zh_cn' => '可以翻译为"建模"',
        'description_en' => '3D Modeling issues.',
        'description_zh_cn' => '3D建模问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Need Help from the Community :)',
        'name_zh_cn' => '可以翻译为"需要社区的帮助 :)"',
        'description_en' => 'These issues are hard to pin down and replicate. We ask our community\'s help to elaborate the ticket.',
        'description_zh_cn' => '这些问题很难确定和复制。我们请求社区帮助详细说明票。',
        'color' => '#739FF8',
    ],[
        'name_en' => 'Need Replication on VMaNGOS',
        'name_zh_cn' => '可以翻译为"需要在VMaNGOS上复制"',
        'description_en' => 'Possibly an upstream bug, need to test and see if this issue appears there.',
        'description_zh_cn' => '可能是上游错误，需要测试并查看此问题是否出现在那里。',
        'color' => '#006B75',
    ],[
        'name_en' => 'Needs Blizzlike Proof',
        'name_zh_cn' => '可以翻译为"需要暴雪证明"',
        'description_en' => 'Someone needs to do some digging to find out what was actually the 2006 behavior and share the proof.',
        'description_zh_cn' => '有人需要进行一些挖掘，以找出实际上是2006年的行为，并分享证据。',
        'color' => '#1591EF',
    ],[
        'name_en' => 'Needs Replication',
        'name_zh_cn' => '可以翻译为"需要复制"',
        'description_en' => 'It\'s not clear whether the Steps to Reproduce will demonstrate the problem or not. Needs testing.',
        'description_zh_cn' => '不清楚复制步骤是否会显示问题。需要测试。',
        'color' => '#9C28C0',
    ],[
        'name_en' => 'NPC',
        'name_zh_cn' => '可以翻译为"NPC"',
        'description_en' => 'Issues related to NPCs.',
        'description_zh_cn' => '与NPC相关的问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Object',
        'name_zh_cn' => '可以翻译为"对象"',
        'description_en' => 'Issues related to Objects.',
        'description_zh_cn' => '与对象相关的问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Paladin',
        'name_zh_cn' => '可以翻译为"圣骑士"',
        'description_en' => 'Issues related to the Paladin class.',
        'description_zh_cn' => '与圣骑士职业相关的问题。',
        'color' => '#F58BBA',
    ],[
        'name_en' => 'Priest',
        'name_zh_cn' => '可以翻译为"牧师"',
        'description_en' => 'Issues related to the Priest class.',
        'description_zh_cn' => '与牧师职业相关的问题。',
        'color' => '#FFFFFF',
    ],[
        'name_en' => 'Profession',
        'name_zh_cn' => '可以翻译为"专业"',
        'description_en' => 'Issues related to Professions.',
        'description_zh_cn' => '与专业相关的问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Proof Requested',
        'name_zh_cn' => '可以翻译为"请求证明"',
        'description_en' => '',
        'description_zh_cn' => '',
        'color' => '#FBCA2C',
    ],[
        'name_en' => 'PvP',
        'name_zh_cn' => '可以翻译为"PvP"',
        'description_en' => 'Issues related to PvP.',
        'description_zh_cn' => '与PvP相关的问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Quest',
        'name_zh_cn' => '可以翻译为"任务"',
        'description_en' => 'Issues related to Quests.',
        'description_zh_cn' => '与任务相关的问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Reproduced on VMaNGOS',
        'name_zh_cn' => '可以翻译为"在VMaNGOS上复制"',
        'description_en' => 'Bug is confirmed to happen not just on turtle but also upstream.',
        'description_zh_cn' => '错误已确认不仅在turtle上发生，而且在上游也发生。',
        'color' => '#43A3A6',
    ],[
        'name_en' => 'Reproduced',
        'name_zh_cn' => '可以翻译为"已复制"',
        'description_en' => 'QA or others on staff have replicated the problem and confirmed it is an issue.',
        'description_zh_cn' => 'QA或其他员工已复制了问题并确认它是一个问题。',
        'color' => '#19727F',
    ],[
        'name_en' => 'Requires a client update',
        'name_zh_cn' => '可以翻译为"需要客户端更新"',
        'description_en' => '',
        'description_zh_cn' => '',
        'color' => '#000000',
    ],[
        'name_en' => 'Rogue',
        'name_zh_cn' => '可以翻译为"盗贼"',
        'description_en' => 'Issues related to the Rogue class.',
        'description_zh_cn' => '与盗贼职业相关的问题。',
        'color' => '#FFF469',
    ],[
        'name_en' => 'SEA',
        'name_zh_cn' => '可以翻译为"SEA"',
        'description_en' => 'Issue only seems to appear on SEA realms.',
        'description_zh_cn' => '问题似乎只出现在SEA领域。',
        'color' => '#F9D0C4',
    ],[
        'name_en' => 'Seasonal',
        'name_zh_cn' => '可以翻译为"季节性"',
        'description_en' => 'Issues related to Seasonal Events.',
        'description_zh_cn' => '与季节性活动相关的问题。',
        'color' => '#1BE67C',
    ],[
        'name_en' => 'Shaman',
        'name_zh_cn' => '可以翻译为"萨满"',
        'description_en' => 'Issues related to the Shaman class.',
        'description_zh_cn' => '与萨满职业相关的问题。',
        'color' => '#0070DE',
    ],[
        'name_en' => 'Spell',
        'name_zh_cn' => '可以翻译为"法术"',
        'description_en' => 'Issues related to Spells.',
        'description_zh_cn' => '与法术相关的问题。',
        'color' => '#BFD4F2',
    ],[
        'name_en' => 'Transmog',
        'name_zh_cn' => '可以翻译为"幻化"',
        'description_en' => 'Issues related to Transmogrification.',
        'description_zh_cn' => '与幻化相关的问题。',
        'color' => '#15FE6F',
    ],[
        'name_en' => 'Warlock',
        'name_zh_cn' => '可以翻译为"术士"',
        'description_en' => 'Issues related to the Warlock class.',
        'description_zh_cn' => '与术士职业相关的问题。',
        'color' => '#9482C9',
    ],[
        'name_en' => 'Warrior',
        'name_zh_cn' => '可以翻译为"战士"',
        'description_en' => 'Issues related to the Warrior class.',
        'description_zh_cn' => '与战士职业相关的问题。',
        'color' => '#C79C6E',
    ],[
        'name_en' => 'Website',
        'name_zh_cn' => '可以翻译为"网站"',
        'description_en' => 'Issues related to the Website.',
        'description_zh_cn' => '与网站相关的问题。',
        'color' => '#F072B9',
    ],[
        'name_en' => 'Wont\'t Fix',
        'name_zh_cn' => '可以翻译为"不会修复"',
        'description_en' => 'These issues will not be fixed.',
        'description_zh_cn' => '这些问题将不会被解决。',
        'color' => '#F072B9',
    ]]);

    \App\Models\BugTrackerStatus::insert([
        [
            'name_en' => 'Open',
            'name_zh_cn' => '可以翻译为"打开"',
            'description_en' => 'The issue is open and ready to be worked on.',
            'description_zh_cn' => '问题已打开，准备好进行处理。',
            'color' => '#1F883D',
        ],[
            'name_en' => 'Closed',
            'name_zh_cn' => '可以翻译为"关闭"',
            'description_en' => 'The issue is closed and no further action is required.',
            'description_zh_cn' => '问题已关闭，无需进一步操作。',
            'color' => '#8150DF',
        ]
    ]);

    DB::statement('SET FOREIGN_KEY_CHECKS=1;');

});*/

/*Route::get('test2', function () {

    $problems = [];

    ini_set('max_execution_time', '6000');

    $allCategories = \App\Models\BugTrackerCategory::all();
    $closedStatusId = \App\Models\BugTrackerStatus::where('name_en', 'Closed')->first()->id;
    $openStatusId = \App\Models\BugTrackerStatus::where('name_en', 'Open')->first()->id;
    $jsonData = [];

    for ($i = 1; $i <= 8; $i++) {
        $filePath = public_path("test_$i.json");
        $jsonContent = file_get_contents($filePath);
        $jsonContent = ltrim($jsonContent, "\xEF\xBB\xBF");
        $data = json_decode(utf8_encode($jsonContent), true);

        if ($data !== null) {
            $jsonData = array_merge($jsonData, $data);
        }
    }

    $allImages = [];

    foreach ($jsonData as $key => $value) {

        $bugTracker = \App\Models\BugTracker::where('id', $value['number'])->first();

        if ($bugTracker)
            continue;

        if ($value['state'] == 'CLOSED') {
            $status = $closedStatusId;
        } else {
            $status = $openStatusId;
        }


        $author = data_get($value, 'author.login', 'Unknown');

        $createdAt = $value['createdAt'];
        $id = $value['number'];
        $title = $value['title'];
        $body = $value['body'];
        $updatedAt = $value['updatedAt'];

        $images = [];

        $start = 0;

        $hasImage = false;


        while (($start = strpos($value['body'], 'https://github.com/slowtorta/turtlewow-bug-tracker/assets/', $start)) !== false) {
            if ($start !== false && $start < strlen($body)) {
                $substring = substr($body, $start);
                $end = strpos($substring, ')');
                $imageUrl = substr($substring, 0, $end);

                $pattern = "/!.*?" . preg_quote($imageUrl, '/') . "\)/";
                $body = preg_replace($pattern, '', $body, 1);

                preg_match_all('/https:\/\/github\.com\/slowtorta\/turtlewow-bug-tracker\/assets\/\w+\/[\w-]+/', $imageUrl, $matches);

                if (isset($matches[0][0])) {
                    $imageUrl = $matches[0][0];
                    if (count($images) < 3) {
                        if (!in_array($imageUrl, $images)) {
                            $images[] = $imageUrl;
                            $allImages[] = $imageUrl;
                        }
                    }
                }

                $hasImage = true;

                $start = $start + $end + 1;
            } else {
                break; // Prekinuti petlju ako je $start van granica stringa
            }
        }

        $start = 0;

        while (($start = strpos($value['body'], 'https://user-images.githubusercontent.com/', $start)) !== false) {
            if ($start !== false && $start < strlen($body)) {
                $substring = substr($body, $start);
                $end = strpos($substring, ')');
                $imageUrl = substr($substring, 0, $end);

                $pattern = "/!.*?" . preg_quote($imageUrl, '/') . "\)/";
                $body = preg_replace($pattern, '', $body, 1);

                preg_match_all('/https:\/\/user-images\.githubusercontent\.com\/\w+\/[\w-]+/', $imageUrl, $matches);

                if (isset($matches[0][0])) {
                    $imageUrl = $matches[0][0];
                    if (count($images) < 3) {
                        if (!in_array($imageUrl, $images)) {
                            $images[] = $imageUrl;
                            $allImages[] = $imageUrl;
                        }
                    }
                }

                $hasImage = true;

                $start = $start + $end + 1;
            } else {
                break; // Prekinuti petlju ako je $start van granica stringa
            }
        }

        $start = 0;

        while (($start = strpos($value['body'], 'https://github.com/slowtorta/turtlewow-bug-tracker/assets/', $start)) !== false) {
            if ($start !== false && $start < strlen($body)) {
                $substring = substr($body, $start);
                $end = strpos($substring, ')');

                if ($end !== false) {
                    $imageUrl = substr($substring, 0, $end);
                } else {
                    $imageUrl = $substring;
                }

                if ($end !== false) {
                    $pattern = "/!.*?" . preg_quote($imageUrl, '/') . "\)/";
                    $body = preg_replace($pattern, '', $body, 1);

                    $pattern = "/.*?" . preg_quote($imageUrl, '/') . "\)/";
                    $body = preg_replace($pattern, '', $body, 1);

                    preg_match_all('/https:\/\/github\.com\/slowtorta\/turtlewow-bug-tracker\/assets\/\w+\/[\w-]+\.\w+(?=\/|$)/', $imageUrl, $matches);

                    if (isset($matches[0][0])) {
                        $imageUrl = $matches[0][0];
                        if (count($images) < 3) {
                            if (!in_array($imageUrl, $images)) {
                                $images[] = $imageUrl;
                                $allImages[] = $imageUrl;
                            }
                        }
                    }

                    $start = $start + $end + 1;
                }

                if ($end === false) {
                    $pattern = preg_quote($imageUrl, '/');;
                    $body = preg_replace("/$pattern/", '', $body, 1);

                    preg_match_all('/https:\/\/github\.com\/slowtorta\/turtlewow-bug-tracker\/assets\/\w+\/[\w-]+\.\w+/', $imageUrl, $matches);

                    foreach ($matches[0] as $imageUrl) {
                        if (count($images) < 3) {
                            if (!in_array($imageUrl, $images)) {
                                $images[] = $imageUrl;
                                $allImages[] = $imageUrl;
                            }
                        }
                    }

                }
            } else {
                break;
            }
        }

        $start = 0;

        while (($start = strpos($value['body'], 'https://user-images.githubusercontent.com/', $start)) !== false) {
            if ($start !== false && $start < strlen($body)) {
                $substring = substr($body, $start);
                $end = strpos($substring, ')');

                if ($end !== false) {
                    $imageUrl = substr($substring, 0, $end);
                } else {
                    $imageUrl = $substring;
                }

                if ($end !== false) {
                    $pattern = "/!.*?" . preg_quote($imageUrl, '/') . "\)/";
                    $body = preg_replace($pattern, '', $body, 1);

                    $pattern = "/.*?" . preg_quote($imageUrl, '/') . "\)/";
                    $body = preg_replace($pattern, '', $body, 1);

                    preg_match_all('/https:\/\/user-images\.githubusercontent\.com\/\w+\/[\w-]+\.\w+(?=\/|$)/', $imageUrl, $matches);

                    if (isset($matches[0][0])) {
                        $imageUrl = $matches[0][0];
                        if (count($images) < 3) {
                            if (!in_array($imageUrl, $images)) {
                                $images[] = $imageUrl;
                                $allImages[] = $imageUrl;
                            }
                        }
                    }

                    $start = $start + $end + 1;
                }

                if ($end === false) {
                    $pattern = preg_quote($imageUrl, '/');;
                    $body = preg_replace("/$pattern/", '', $body, 1);

                    preg_match_all('/https:\/\/user-images\.githubusercontent\.com\/\w+\/[\w-]+\.\w+/', $imageUrl, $matches);

                    foreach ($matches[0] as $imageUrl) {
                        if (count($images) < 3) {
                            if (!in_array($imageUrl, $images)) {
                                $images[] = $imageUrl;
                                $allImages[] = $imageUrl;
                            }
                        }
                    }

                }
            } else {
                break;
            }
        }

        try {
            $bugTracker = \App\Models\BugTracker::create([
                'id' => $id,
                'account_id' => 0,
                'author' => $author,
                'created_at' => Carbon::parse($createdAt)->toDateTimeString(),
                'status_id' => $status,
                'vote' => 0,
                'title' => $title,
                'description' => $body,
                'updated_at' => Carbon::parse($updatedAt)->toDateTimeString(),
            ]);
        } catch (Exception $e) {
            $problems[] = $id;
            continue;
        }
        $bugTracker = \App\Models\BugTracker::create([
            'id' => $id,
            'account_id' => 0,
            'author' => $author,
            'created_at' => Carbon::parse($createdAt)->toDateTimeString(),
            'status_id' => $status,
            'vote' => 0,
            'title' => $title,
            'description' => $body,
            'updated_at' => Carbon::parse($updatedAt)->toDateTimeString(),
        ]);

        if ($bugTracker) {

            if (!empty($value['labels'])) {
                $value['labels'] = explode(', ', $value['labels']);

                foreach ($value['labels'] as $label) {
                    foreach ($allCategories as $category) {
                        if ($category->name_en == $label) {
                            $bugTracker->categories()->attach($category->id);
                        }
                    }
                }
            }

            if (!empty($value['comments'])) {
                $comments = [];
                foreach ($value['comments'] as $comment) {
                    $comments[] = [
                        'account_id' => 0,
                        'message' => $comment['body'],
                        'author' => data_get($comment, 'author.login', 'Unknown'),
                        'seen' => 1,
                        'support' => 0,
                        'denied' => 0,
                        'created_at' => Carbon::parse($comment['createdAt'])->toDateTimeString(),
                        'updated_at' => data_get($comment, 'updatedAt', Carbon::parse($comment['createdAt'])->toDateTimeString()),
                    ];
                }

                $bugTracker->messages()->createMany($comments);
            }

            foreach ($images as $imageUrl) {

                $path1000x700 = 'bug_tracker_images/1000x700/' . basename($imageUrl) . '.png';
                $path600x400 = 'bug_tracker_images/600x400/' . basename($imageUrl) . '.png';
                $path150x150 = 'bug_tracker_images/150x150/' . basename($imageUrl) . '.png';

                if (File::exists(public_path($path1000x700)) && File::exists(public_path($path600x400)) && File::exists(public_path($path150x150))) {
                    $bugTrackerImage = new BugTrackerImage([
                        'large' => $path1000x700,
                        'medium' => $path600x400,
                        'thumbnail' => $path150x150,
                        'bug_tracker_id' => $bugTracker->id,
                    ]);

                    $bugTrackerImage->save();
                }


                try {
                    $imageContent = file_get_contents($imageUrl);

                    $img = Image::make($imageContent)->encode('png');

                    $img->resize(1000, 700)->save(public_path($path1000x700));
                    $img->resize(600, 400)->save(public_path($path600x400));
                    $img->resize(150, 150)->save(public_path($path150x150));


                    $bugTrackerImage = new BugTrackerImage([
                        'large' => $path1000x700,
                        'medium' => $path600x400,
                        'thumbnail' => $path150x150,
                        'bug_tracker_id' => $bugTracker->id,
                    ]);

                    $bugTrackerImage->save();
                } catch (Exception $e) {

                    continue;
                }

            }


        }
    }


    $totalCount = count($jsonData);

    dd($allImages, $totalCount);
});*/
