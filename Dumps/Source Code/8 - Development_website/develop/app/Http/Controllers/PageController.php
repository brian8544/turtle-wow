<?php

namespace App\Http\Controllers;

use App\Livewire\BugReport;
use App\Models\auth\Uptime;
use App\Models\BugTracker;
use Artesaos\SEOTools\Facades\JsonLdMulti;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Vite;

class PageController extends Controller
{
    public function home(Request $request)
    {

        if (session()->get('locale') == "cn") {
            App::setLocale('zh_cn');
            session()->put('locale', 'zh_cn');
        }

        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['home']['title']);
        SEOMeta::setDescription(__('SEO')['home']['description']);
        SEOMeta::setKeywords(__('SEO')['home']['keywords']);
        SEOMeta::setRobots(__('SEO')['home']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['home']['title']);
        OpenGraph::setDescription(__('SEO')['home']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['home']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['home']['title']);
        JsonLdMulti::setDescription(__('SEO')['home']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['home']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        /*JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("FAQPage");
        JsonLdMulti::addValue('mainEntity',
            [
                '@type' => 'Question',
                'name' => __('faq')['right'][1]['title'],
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => __('faq')['right'][1]['text']
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][2]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][2]['text']
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][3]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][3]['text']
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][4]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][4]['text']
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][5]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][5]['text']
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][6]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][6]['text']
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][7]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][7]['text']
                    ]
                ]
            ]
        );*/

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('index');
    }

    public function rules(Request $request)
    {

        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['rules']['title']);
        SEOMeta::setDescription(__('SEO')['rules']['description']);
        SEOMeta::setKeywords(__('SEO')['rules']['keywords']);
        SEOMeta::setRobots(__('SEO')['rules']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['rules']['title']);
        OpenGraph::setDescription(__('SEO')['rules']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['rules']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['rules']['title']);
        JsonLdMulti::setDescription(__('SEO')['rules']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['rules']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        /*JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("FAQPage");
        JsonLdMulti::addValue('mainEntity',
            [
                '@type' => 'Question',
                'name' => __('faq')['right'][1]['title'],
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => __('faq')['right'][1]['text']
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][2]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][2]['text']
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][3]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][3]['text']
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][4]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][4]['text']
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][5]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][5]['text']
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][6]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][6]['text']
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => __('faq')['right'][7]['title'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => __('faq')['right'][7]['text']
                    ]
                ]
            ]
        );*/

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('rules');
    }

    protected function portCheck($ip, $port, $ip_2, $port_2, $slow)
    {
        $fp2 = false;

        usleep(100000);
        $fp = @fsockopen($ip, $port, $errno, $errstr, 0.25);

        if (!$fp) {
            usleep(500000);
            $fp = @fsockopen($ip, $port, $errno, $errstr, 1.00);
        }

        if (!$fp && $slow) {
            usleep(100000);
            $fp = @fsockopen($ip, $port, $errno, $errstr, 3.00);
        }

        if ($port_2 && !$fp) {
            usleep(100000);
            $fp2 = @fsockopen($ip_2, $port_2, $errno, $errstr, 0.50);
        }

        if ($fp)
            fclose($fp);

        if ($fp2)
            fclose($fp2);

        if (!$fp && !$fp2) {
            return false;
        } else {
            if ($fp2) {
                return false;
            }

            return true;
        }
    }

    protected function getUptime($uptimeInSeconds)
    {
        $days = floor($uptimeInSeconds / 86400);
        $hours = floor(($uptimeInSeconds % 86400) / 3600);
        $minutes = floor(($uptimeInSeconds % 3600) / 60);
        $seconds = $uptimeInSeconds % 60;

        return [
            'days' => $days,
            'hours' => $hours,
            'minutes' => $minutes,
            'seconds' => $seconds
        ];
    }

    public function serverAlert()
    {
        $realms = Cache::remember('serveralert_realms', 60, function () {
            $realms = [];

            foreach (config('customs.realms') as $key => $realm) {
                if ($realm['name'] != "") {
                    $realms[$key]['name'] = $realm['name'];
                    $realms[$key]['ip0'] = $realm['ip0'];
                    $realms[$key]['port0'] = $realm['port0'];
                    $realms[$key]['ip1'] = $realm['ip1'];
                    $realms[$key]['port1'] = $realm['port1'];
                }
            }

            try {
                foreach ($realms as $key => $realm) {
                    $queryRealm = Uptime::where('realmid', $key)->orderBy('starttime', 'DESC')->first();
                    $realms[$key]['online_players'] = $queryRealm ? $queryRealm->onlineplayers : 0;
                    $realms[$key]['queue'] = $queryRealm ? $queryRealm->queue : 0;
                    $realms[$key]['online'] = $this->portCheck($realm['ip0'], $realm['port0'], $realm['ip1'], $realm['port1'], true);
                    $realms[$key]['uptime'] = $this->getUptime($queryRealm ? $queryRealm->uptime : 0);
                }
            } catch (QueryException $e) {

            }

            return $realms;
        });

        return view('alert', ['realms' => $realms]);
    }

    public function logos()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['logotypes']['title']);
        SEOMeta::setDescription(__('SEO')['logotypes']['description']);
        SEOMeta::setKeywords(__('SEO')['logotypes']['keywords']);
        SEOMeta::setRobots(__('SEO')['logotypes']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['logotypes']['title']);
        OpenGraph::setDescription(__('SEO')['logotypes']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['logotypes']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['logotypes']['title']);
        JsonLdMulti::setDescription(__('SEO')['logotypes']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['logotypes']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('logos');
    }

    public function clientInterfaceImprovements()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['client_ui_page']['title']);
        SEOMeta::setDescription(__('SEO')['client_ui_page']['description']);
        SEOMeta::setKeywords(__('SEO')['client_ui_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['client_ui_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['client_ui_page']['title']);
        OpenGraph::setDescription(__('SEO')['client_ui_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['client_ui_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['client_ui_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['client_ui_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['client_ui_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('client-interface-improvements');
    }

    public function additionalTransportRoutes()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['additional_transport_routes_page']['title']);
        SEOMeta::setDescription(__('SEO')['additional_transport_routes_page']['description']);
        SEOMeta::setKeywords(__('SEO')['additional_transport_routes_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['additional_transport_routes_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['additional_transport_routes_page']['title']);
        OpenGraph::setDescription(__('SEO')['additional_transport_routes_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['additional_transport_routes_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['additional_transport_routes_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['additional_transport_routes_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['additional_transport_routes_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('additional-transport-routes');
    }

    public function roleplay()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['roleplay_page']['title']);
        SEOMeta::setDescription(__('SEO')['roleplay_page']['description']);
        SEOMeta::setKeywords(__('SEO')['roleplay_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['roleplay_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['roleplay_page']['title']);
        OpenGraph::setDescription(__('SEO')['roleplay_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['roleplay_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['roleplay_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['roleplay_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['roleplay_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('roleplay');
    }

    public function newFactionsAndQuests()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['new_factions_and_quests_page']['title']);
        SEOMeta::setDescription(__('SEO')['new_factions_and_quests_page']['description']);
        SEOMeta::setKeywords(__('SEO')['new_factions_and_quests_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['new_factions_and_quests_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['new_factions_and_quests_page']['title']);
        OpenGraph::setDescription(__('SEO')['new_factions_and_quests_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['new_factions_and_quests_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['new_factions_and_quests_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['new_factions_and_quests_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['new_factions_and_quests_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('new-factions-and-quests');
    }

    public function characterCustomization()
    {
        return view('character-customization');
    }

    public function classRaceCombinations()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['class_race_combinations_page']['title']);
        SEOMeta::setDescription(__('SEO')['class_race_combinations_page']['description']);
        SEOMeta::setKeywords(__('SEO')['class_race_combinations_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['class_race_combinations_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['class_race_combinations_page']['title']);
        OpenGraph::setDescription(__('SEO')['class_race_combinations_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['class_race_combinations_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['class_race_combinations_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['class_race_combinations_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['class_race_combinations_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('class-race-combinations');
    }

    public function banAppeals()
    {
        if ((Auth::guard('account')->check() && Auth::guard('account')->user()->rank >= 3)) {

            SEOMeta::setTitle(__('SEO')['ban_appeals']['title']);

            return view('ban-appeals');
        } else {
            return redirect()->route('home');
        }
    }

    public function guildBanks()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['guild_banks_page']['title']);
        SEOMeta::setDescription(__('SEO')['guild_banks_page']['description']);
        SEOMeta::setKeywords(__('SEO')['guild_banks_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['guild_banks_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['guild_banks_page']['title']);
        OpenGraph::setDescription(__('SEO')['guild_banks_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['guild_banks_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['guild_banks_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['guild_banks_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['guild_banks_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('guild-banks');
    }

    public function dynamicMountSpeed()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['dynamic_mount_speed_page']['title']);
        SEOMeta::setDescription(__('SEO')['dynamic_mount_speed_page']['description']);
        SEOMeta::setKeywords(__('SEO')['dynamic_mount_speed_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['dynamic_mount_speed_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['dynamic_mount_speed_page']['title']);
        OpenGraph::setDescription(__('SEO')['dynamic_mount_speed_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['dynamic_mount_speed_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['dynamic_mount_speed_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['dynamic_mount_speed_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['dynamic_mount_speed_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('dynamic-mount-speed');
    }

    public function survivalAndGardening()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['survival_and_gardening_page']['title']);
        SEOMeta::setDescription(__('SEO')['survival_and_gardening_page']['description']);
        SEOMeta::setKeywords(__('SEO')['survival_and_gardening_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['survival_and_gardening_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['survival_and_gardening_page']['title']);
        OpenGraph::setDescription(__('SEO')['survival_and_gardening_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['survival_and_gardening_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['survival_and_gardening_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['survival_and_gardening_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['survival_and_gardening_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('survival-and-gardening');
    }

    public function transmogrification()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['transmogrification_page']['title']);
        SEOMeta::setDescription(__('SEO')['transmogrification_page']['description']);
        SEOMeta::setKeywords(__('SEO')['transmogrification_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['transmogrification_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['transmogrification_page']['title']);
        OpenGraph::setDescription(__('SEO')['transmogrification_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['transmogrification_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['transmogrification_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['transmogrification_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['transmogrification_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('transmogrification');
    }

    public function chronoboonDisplacer()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['chronoboon_displacer_page']['title']);
        SEOMeta::setDescription(__('SEO')['chronoboon_displacer_page']['description']);
        SEOMeta::setKeywords(__('SEO')['chronoboon_displacer_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['chronoboon_displacer_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['chronoboon_displacer_page']['title']);
        OpenGraph::setDescription(__('SEO')['chronoboon_displacer_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['chronoboon_displacer_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['chronoboon_displacer_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['chronoboon_displacer_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['chronoboon_displacer_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('chronoboon-displacer');
    }

    public function achievementTitles()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['achievement_titles_page']['title']);
        SEOMeta::setDescription(__('SEO')['achievement_titles_page']['description']);
        SEOMeta::setKeywords(__('SEO')['achievement_titles_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['achievement_titles_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['achievement_titles_page']['title']);
        OpenGraph::setDescription(__('SEO')['achievement_titles_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['achievement_titles_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['achievement_titles_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['achievement_titles_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['achievement_titles_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('achievement-titles');
    }

    public function slowAndSteady()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['slow_and_steady_page']['title']);
        SEOMeta::setDescription(__('SEO')['slow_and_steady_page']['description']);
        SEOMeta::setKeywords(__('SEO')['slow_and_steady_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['slow_and_steady_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['slow_and_steady_page']['title']);
        OpenGraph::setDescription(__('SEO')['slow_and_steady_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['slow_and_steady_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['slow_and_steady_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['slow_and_steady_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['slow_and_steady_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('slow-and-steady');
    }

    public function vagrantsEndeavor()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['vagrants_endeavor_page']['title']);
        SEOMeta::setDescription(__('SEO')['vagrants_endeavor_page']['description']);
        SEOMeta::setKeywords(__('SEO')['vagrants_endeavor_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['vagrants_endeavor_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['vagrants_endeavor_page']['title']);
        OpenGraph::setDescription(__('SEO')['vagrants_endeavor_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['vagrants_endeavor_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['vagrants_endeavor_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['vagrants_endeavor_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['vagrants_endeavor_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('vagrants-endeavor');
    }

    public function druid()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['druid_page']['title']);
        SEOMeta::setDescription(__('SEO')['druid_page']['description']);
        SEOMeta::setKeywords(__('SEO')['druid_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['druid_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['druid_page']['title']);
        OpenGraph::setDescription(__('SEO')['druid_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['druid_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['druid_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['druid_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['druid_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('druid');
    }

    public function hunter()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['hunter_page']['title']);
        SEOMeta::setDescription(__('SEO')['hunter_page']['description']);
        SEOMeta::setKeywords(__('SEO')['hunter_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['hunter_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['hunter_page']['title']);
        OpenGraph::setDescription(__('SEO')['hunter_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['hunter_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['hunter_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['hunter_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['hunter_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('hunter');
    }

    public function mage()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['mage_page']['title']);
        SEOMeta::setDescription(__('SEO')['mage_page']['description']);
        SEOMeta::setKeywords(__('SEO')['mage_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['mage_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['mage_page']['title']);
        OpenGraph::setDescription(__('SEO')['mage_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['mage_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['mage_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['mage_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['mage_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('mage');
    }

    public function paladin()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['paladin_page']['title']);
        SEOMeta::setDescription(__('SEO')['paladin_page']['description']);
        SEOMeta::setKeywords(__('SEO')['paladin_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['paladin_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['paladin_page']['title']);
        OpenGraph::setDescription(__('SEO')['paladin_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['paladin_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['paladin_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['paladin_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['paladin_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('paladin');
    }

    public function priest()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['priest_page']['title']);
        SEOMeta::setDescription(__('SEO')['priest_page']['description']);
        SEOMeta::setKeywords(__('SEO')['priest_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['priest_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['priest_page']['title']);
        OpenGraph::setDescription(__('SEO')['priest_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['priest_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['priest_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['priest_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['priest_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('priest');
    }

    public function rogue()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['rogue_page']['title']);
        SEOMeta::setDescription(__('SEO')['rogue_page']['description']);
        SEOMeta::setKeywords(__('SEO')['rogue_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['rogue_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['rogue_page']['title']);
        OpenGraph::setDescription(__('SEO')['rogue_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['rogue_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['rogue_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['rogue_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['rogue_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('rogue');
    }

    public function newRaces()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['new_races_page']['title']);
        SEOMeta::setDescription(__('SEO')['new_races_page']['description']);
        SEOMeta::setKeywords(__('SEO')['new_races_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['new_races_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['new_races_page']['title']);
        OpenGraph::setDescription(__('SEO')['new_races_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['new_races_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['new_races_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['new_races_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['new_races_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('new-races');
    }

    public function characterCustomizations()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['character_customizations_page']['title']);
        SEOMeta::setDescription(__('SEO')['character_customizations_page']['description']);
        SEOMeta::setKeywords(__('SEO')['character_customizations_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['character_customizations_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['character_customizations_page']['title']);
        OpenGraph::setDescription(__('SEO')['character_customizations_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['character_customizations_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['character_customizations_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['character_customizations_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['character_customizations_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('character-customizations');
    }

    public function soundDesign()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['sound_design_page']['title']);
        SEOMeta::setDescription(__('SEO')['sound_design_page']['description']);
        SEOMeta::setKeywords(__('SEO')['sound_design_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['sound_design_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['sound_design_page']['title']);
        OpenGraph::setDescription(__('SEO')['sound_design_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['sound_design_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['sound_design_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['sound_design_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['sound_design_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('sound-design');
    }

    public function newLocations()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['new_locations_and_maps_page']['title']);
        SEOMeta::setDescription(__('SEO')['new_locations_and_maps_page']['description']);
        SEOMeta::setKeywords(__('SEO')['new_locations_and_maps_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['new_locations_and_maps_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['new_locations_and_maps_page']['title']);
        OpenGraph::setDescription(__('SEO')['new_locations_and_maps_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['new_locations_and_maps_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['new_locations_and_maps_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['new_locations_and_maps_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['new_locations_and_maps_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('new-locations-and-maps');
    }

    public function bugTracker()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['bug_tracker_page']['title']);
        SEOMeta::setDescription(__('SEO')['bug_tracker_page']['description']);
        SEOMeta::setKeywords(__('SEO')['bug_tracker_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['bug_tracker_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['bug_tracker_page']['title']);
        OpenGraph::setDescription(__('SEO')['bug_tracker_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['bug_tracker_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['bug_tracker_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['bug_tracker_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['bug_tracker_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('bug-tracker');
    }

    public function newReport()
    {
        return view('new-report');
    }

    public function bugReport(Request $request)
    {
        $current_locale = app()->getLocale();

        $id = $request->query('id');

        $bugReport = BugTracker::find($id);

        if (!$bugReport) {
            return redirect()->route('bug-tracker');
        }

        SEOMeta::setTitle($bugReport->title . ' Turtle  WoW — Bug Reports');
        SEOMeta::setDescription($bugReport->description);
        SEOMeta::setKeywords(__('SEO')['bug_tracker_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['bug_tracker_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());//SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle($bugReport->title . ' Turtle  WoW — Bug Reports');
        OpenGraph::setDescription($bugReport->description);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName($bugReport->title . ' Turtle  WoW — Bug Reports');
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle($bugReport->title . ' Turtle  WoW — Bug Reports');
        JsonLdMulti::setDescription($bugReport->description);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite($bugReport->title . ' Turtle  WoW — Bug Reports');
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('bug-report');
    }

    public function raidsAndDungeons()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['raids_and_dungeons_page']['title']);
        SEOMeta::setDescription(__('SEO')['raids_and_dungeons_page']['description']);
        SEOMeta::setKeywords(__('SEO')['raids_and_dungeons_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['raids_and_dungeons_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['raids_and_dungeons_page']['title']);
        OpenGraph::setDescription(__('SEO')['raids_and_dungeons_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['raids_and_dungeons_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['raids_and_dungeons_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['raids_and_dungeons_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['raids_and_dungeons_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('raids-and-dungeons');
    }

    public function playerVsPlayer()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['player_versus_player_page']['title']);
        SEOMeta::setDescription(__('SEO')['player_versus_player_page']['description']);
        SEOMeta::setKeywords(__('SEO')['player_versus_player_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['player_versus_player_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['player_versus_player_page']['title']);
        OpenGraph::setDescription(__('SEO')['player_versus_player_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['player_versus_player_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['player_versus_player_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['player_versus_player_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['player_versus_player_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('player-versus-player-content');
    }

    public function seasonalEvents()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['seasonal_events_page']['title']);
        SEOMeta::setDescription(__('SEO')['seasonal_events_page']['description']);
        SEOMeta::setKeywords(__('SEO')['seasonal_events_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['seasonal_events_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['seasonal_events_page']['title']);
        OpenGraph::setDescription(__('SEO')['seasonal_events_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['seasonal_events_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['seasonal_events_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['seasonal_events_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['seasonal_events_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('seasonal-events');
    }

    public function hardcoreMode()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['hardcore_mode_page']['title']);
        SEOMeta::setDescription(__('SEO')['hardcore_mode_page']['description']);
        SEOMeta::setKeywords(__('SEO')['hardcore_mode_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['hardcore_mode_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['hardcore_mode_page']['title']);
        OpenGraph::setDescription(__('SEO')['hardcore_mode_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['hardcore_mode_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['hardcore_mode_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['hardcore_mode_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['hardcore_mode_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('hardcore-mode');
    }

    public function communityArtworks()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['community_artworks_page']['title']);
        SEOMeta::setDescription(__('SEO')['community_artworks_page']['description']);
        SEOMeta::setKeywords(__('SEO')['community_artworks_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['community_artworks_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['community_artworks_page']['title']);
        OpenGraph::setDescription(__('SEO')['community_artworks_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['community_artworks_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['community_artworks_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['community_artworks_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['community_artworks_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('community-artworks');
    }

    public function petsAndMounts()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['pets_and_mounts_page']['title']);
        SEOMeta::setDescription(__('SEO')['pets_and_mounts_page']['description']);
        SEOMeta::setKeywords(__('SEO')['pets_and_mounts_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['pets_and_mounts_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['pets_and_mounts_page']['title']);
        OpenGraph::setDescription(__('SEO')['pets_and_mounts_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['pets_and_mounts_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['pets_and_mounts_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['pets_and_mounts_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['pets_and_mounts_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('pets-and-mounts');
    }

    public function everlookBroadcast()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['everlook_broadcasting_page']['title']);
        SEOMeta::setDescription(__('SEO')['everlook_broadcasting_page']['description']);
        SEOMeta::setKeywords(__('SEO')['everlook_broadcasting_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['everlook_broadcasting_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['everlook_broadcasting_page']['title']);
        OpenGraph::setDescription(__('SEO')['everlook_broadcasting_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['everlook_broadcasting_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['everlook_broadcasting_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['everlook_broadcasting_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['everlook_broadcasting_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('everlook-broadcasting');
    }

    public function shaman()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['shaman_page']['title']);
        SEOMeta::setDescription(__('SEO')['shaman_page']['description']);
        SEOMeta::setKeywords(__('SEO')['shaman_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['shaman_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['shaman_page']['title']);
        OpenGraph::setDescription(__('SEO')['shaman_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['shaman_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['shaman_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['shaman_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['shaman_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('shaman');
    }

    public function warlock()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['warlock_page']['title']);
        SEOMeta::setDescription(__('SEO')['warlock_page']['description']);
        SEOMeta::setKeywords(__('SEO')['warlock_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['warlock_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['warlock_page']['title']);
        OpenGraph::setDescription(__('SEO')['warlock_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['warlock_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['warlock_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['warlock_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['warlock_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('warlock');
    }

    public function warrior()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['warrior_page']['title']);
        SEOMeta::setDescription(__('SEO')['warrior_page']['description']);
        SEOMeta::setKeywords(__('SEO')['warrior_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['warrior_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['warrior_page']['title']);
        OpenGraph::setDescription(__('SEO')['warrior_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['warrior_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['warrior_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['warrior_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['warrior_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('warrior');
    }

    public function hardcore()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['hardcore_page']['title']);
        SEOMeta::setDescription(__('SEO')['hardcore_page']['description']);
        SEOMeta::setKeywords(__('SEO')['hardcore_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['hardcore_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['hardcore_page']['title']);
        OpenGraph::setDescription(__('SEO')['hardcore_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['hardcore_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['hardcore_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['hardcore_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['hardcore_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('hardcore');
    }

    public function shopAppeals()
    {
        if ((Auth::guard('account')->check() && Auth::guard('account')->user()->rank >= 3)) {

            SEOMeta::setTitle(__('SEO')['shop_appeals']['title']);

            return view('shop-appeals');
        } else {
            return redirect()->route('home');
        }
    }


    public function shopHistory()
    {
        if ((Auth::guard('account')->check() && Auth::guard('account')->user()->rank >= 3)) {
            SEOMeta::setTitle(__('SEO')['shop_history']['title']);

            return view('shop-history');
        } else {
            return redirect()->route('home');
        }
    }

    public function shopHistory2()
    {
        if ((Auth::guard('account')->check() && Auth::guard('account')->user()->rank >= 3)) {
            SEOMeta::setTitle(__('SEO')['shop_history']['title']);

            return view('shop-history2');
        } else {
            return redirect()->route('home');
        }
    }

    public function populationGraph()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['population_graph_page']['title']);
        SEOMeta::setDescription(__('SEO')['population_graph_page']['description']);
        SEOMeta::setKeywords(__('SEO')['population_graph_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['population_graph_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['population_graph_page']['title']);
        OpenGraph::setDescription(__('SEO')['population_graph_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['population_graph_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['population_graph_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['population_graph_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['population_graph_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('population-graph');
    }

    public function shellcoin()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['shellcoin_page']['title']);
        SEOMeta::setDescription(__('SEO')['shellcoin_page']['description']);
        SEOMeta::setKeywords(__('SEO')['shellcoin_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['shellcoin_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['shellcoin_page']['title']);
        OpenGraph::setDescription(__('SEO')['shellcoin_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['shellcoin_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['shellcoin_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['shellcoin_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['shellcoin_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('shellcoin');
    }

    public function patch()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['patch-1.17.2_page']['title']);
        SEOMeta::setDescription(__('SEO')['patch-1.17.2_page']['description']);
        SEOMeta::setKeywords(__('SEO')['patch-1.17.2_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['patch-1.17.2_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['patch-1.17.2_page']['title']);
        OpenGraph::setDescription(__('SEO')['patch-1.17.2_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['patch-1.17.2_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['patch-1.17.2_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['patch-1.17.2_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['patch-1.17.2_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('patch');
    }

    public function watch()
    {
        return view('watch');
    }

    public function video()
    {
        $video = VideoController::watchVideo(request()->video);
        $thumb = $video['thumb'];
        $title = $video['title'];
        $duration = $video['duration'];
        $stamp = $video['stamp'];
        $ago = $video['ago'];
        $views = $video['views'];
        $downloads = $video['downloads'];
        $commentsCount = $video['commentsCount'];
        $comments = $video['comments'];
        $otherVideos = $video['otherVideos'];
        $id = $video['id'];
        $likes = $video['likes'];
        $dislikes = $video['dislikes'];
        $liked = $video['liked'];
        $disliked = $video['disliked'];

        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle($video['title'] . ' - Turtle TV');
        SEOMeta::setDescription($video['title'] . ' - Turtle TV');
        SEOMeta::setKeywords($video['title'] . ' - Turtle TV');
        SEOMeta::setRobots('all');
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        SEOMeta::setNext($video['thumb']);
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle($video['title'] . ' - Turtle TV');
        OpenGraph::setDescription($video['title'] . ' - Turtle TV');
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName($video['title']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage($video['thumb']);
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle($video['title'] . ' - Turtle TV');
        JsonLdMulti::setDescription($video['title'] . ' - Turtle TV');
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite($video['title']);
        JsonLdMulti::addImage($video['thumb']);

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('watch-video', [
            'id' => $id,
            'name' => request()->video,
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
            'disliked' => $disliked
        ]);
    }

    public function radio()
    {
        if (!Auth::guard('account')->check()) {
            return redirect()->route('login');
        }

        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['radio_page']['title']);
        SEOMeta::setDescription(__('SEO')['radio_page']['description']);
        SEOMeta::setKeywords(__('SEO')['radio_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['radio_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['radio_page']['title']);
        OpenGraph::setDescription(__('SEO')['radio_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['radio_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['radio_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['radio_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['radio_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('radio');
    }

    public function boaringAdventure()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['boaring_adventure_page']['title']);
        SEOMeta::setDescription(__('SEO')['boaring_adventure_page']['description']);
        SEOMeta::setKeywords(__('SEO')['boaring_adventure_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['boaring_adventure_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['boaring_adventure_page']['title']);
        OpenGraph::setDescription(__('SEO')['boaring_adventure_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['boaring_adventure_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['boaring_adventure_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['boaring_adventure_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['boaring_adventure_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('boaring-adventure');
    }

    public function jewelcrafting()
    {
        $current_locale = app()->getLocale();
        //SEOMeta
        SEOMeta::setTitle(__('SEO')['jewelcrafting_page']['title']);
        SEOMeta::setDescription(__('SEO')['jewelcrafting_page']['description']);
        SEOMeta::setKeywords(__('SEO')['jewelcrafting_page']['keywords']);
        SEOMeta::setRobots(__('SEO')['jewelcrafting_page']['robots']);
        SEOMeta::setCanonical(url()->current());
        SEOMeta::setPrev(url()->previous());
        //SEOMeta::setNext(asset('assets/img/logo180x180.png'));
        //SEOMeta::addMeta($meta, $value = null, $name = 'name');

        //OpenGraph
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('SEO')['jewelcrafting_page']['title']);
        OpenGraph::setDescription(__('SEO')['jewelcrafting_page']['description']);
        OpenGraph::setUrl(url()->current());
        OpenGraph::setSiteName(__('SEO')['jewelcrafting_page']['name']);
        OpenGraph::addProperty('locale', $current_locale);
        OpenGraph::addImage(asset('web_logo.png'));
        //OpenGraph::addProperty($key, $value); // value can be string or array

        //JsonLd
        //JsonLd::addValue($key, $value); // value can be string or array
        JsonLdMulti::setTitle(__('SEO')['jewelcrafting_page']['title']);
        JsonLdMulti::setDescription(__('SEO')['jewelcrafting_page']['description']);
        JsonLdMulti::setUrl(url()->current());
        JsonLdMulti::setSite(__('SEO')['jewelcrafting_page']['name']);
        JsonLdMulti::addImage(asset('web_logo.png'));

        JsonLdMulti::newJsonLd();
        JsonLdMulti::isEmpty();
        JsonLdMulti::setType("Organization");
        JsonLdMulti::addValue('url', url()->current());
        JsonLdMulti::addValue('logo', asset('web_logo.png'));

        return view('jewelcrafting');
    }

    public function worldConfig()
    {
        if ((Auth::guard('account')->check() && Auth::guard('account')->user()->rank >= 5) || (Auth::guard(app('VoyagerGuard'))->check() && Auth::guard(app('VoyagerGuard'))->user()->can('browse_admin'))) {

            SEOMeta::setTitle(__('world_config')['title']);
            OpenGraph::setType('website');
            OpenGraph::setTitle(__('world_config')['title']);
            JsonLdMulti::setTitle(__('world_config')['title']);

            return view('world-config');
        } else {
            return redirect()->route('home');
        }
    }

    public function armory()
    {
        return view('armory');
    }

    public function armoryCharacter()
    {
        return view('armory-character');
    }

    public function reset2FaCode()
    {
        SEOMeta::setTitle(__('reset_2_fa_code_form')['title']);
        OpenGraph::setType('website');
        OpenGraph::setTitle(__('reset_2_fa_code_form')['title']);
        JsonLdMulti::setTitle(__('reset_2_fa_code_form')['title']);

        return view('reset-fa-code');
    }
}
