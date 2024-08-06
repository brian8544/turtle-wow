<div class="container with_frame mb-5 pb-3" style="margin-top:25px;">
    @if (!empty($character))
        <div
            class="row @switch ($character['race']) @case (2) @case (5) @case (6) @case (8) @case(9) horde @break @default alliance @endswitch">

            <div class="col-lg-1">
                {{--<img src="{{ Vite::asset('resources/images/armory/avatars/' . $character['avatar'] . '.gif') }}">--}}
                <div class="level @if ($character['level'] < 10) lessThan10 @endif">{{ $character['level'] }}</div>
            </div>

            <div class="col-lg-11">
                @if ($character['ignore_titles'] != 1)
                    <p class="character_title">
                        @if ($character['rank_number'] != '00')
                            <img style="width:16px; margin-right: 5px;"
                                 src="{{ Vite::asset('resources/images/armory/ranks/PvPRank' . $character['rank_number'] . '.png') }}">
                            @endif
                        {{ $character['rank'] }}
                    </p>
                @endif

                @if ($character['ignore_titles'] != 0)
                    <p class="character_title">&nbsp;</p>
                @endif
                <p class="character_name">{{ $character['name'] }}</p>
                <p class="character_guild">{{ $character['guild_name'] }}</p>
            </div>

        </div>
        <div class="row" style="margin-top:15px;">
            <div class="col-lg-5">
                <table class="character_sheet">
                    <tbody>
                    <tr>
                        <td>
                            <div class="placeholder head {{ $character['equipment'][0]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][0]))
                                    <a href="https://database.turtle-wow.org/?item={{ $character['equipment'][0]->itemEntry ?? ''  }}"
                                       target="_blank"
                                       data-wowhead="item={{ $character['equipment'][0]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][0]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][0]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][0]->quality }}">{{ $character['equipment'][0]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Head
                                                        </td>
                                                        <th>{{ $character['equipment'][0]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][0]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][0]->durability }} / {{ $character['equipment'][0]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][0]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][0]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][0]->sell_price  !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td colspan="7" rowspan="7">
                            {{--<div class="model ng-hide" ng-show="model3d"></div>
                            <!-- ngIf: !model3d -->
                            <div ng-if="!model3d" class="text-center ng-scope">
                                <p class="character_guild">
                                    3D models are currently an experimental feature.</p><br>
                                <button class="btn btn-primary" ng-click="show3dModel()">Show 3D Model</button>
                            </div><!-- end ngIf: !model3d -->--}}

                        </td>
                        <td>
                            <div class="placeholder hands {{ $character['equipment'][9]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][9]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][9]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][9]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][9]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][9]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][9]->quality }}">{{ $character['equipment'][9]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Hands
                                                        </td>
                                                        <th>{{ $character['equipment'][9]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][9]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][9]->durability }} / {{ $character['equipment'][9]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][9]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][9]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][9]->sell_price  !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="placeholder neck {{ $character['equipment'][1]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][1]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][1]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][1]->itemEntry ?? ''  }}&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][1]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][1]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][1]->quality }}">{{ $character['equipment'][1]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Neck
                                                        </td>
                                                        <th>{{ $character['equipment'][1]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][1]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][1]->durability }} / {{ $character['equipment'][1]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][1]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][1]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][1]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="placeholder waist {{ $character['equipment'][5]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][5]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][5]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][5]->itemEntry ?? ''  }}&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][5]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][5]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][5]->quality }}">{{ $character['equipment'][5]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Waist
                                                        </td>
                                                        <th>{{ $character['equipment'][5]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][5]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][5]->durability }} / {{ $character['equipment'][5]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][5]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][5]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][5]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="placeholder shoulder {{ $character['equipment'][2]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][2]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][2]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][2]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][2]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][2]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][2]->quality }}">{{ $character['equipment'][2]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Shoulder
                                                        </td>
                                                        <th>{{ $character['equipment'][2]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][2]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][2]->durability }} / {{ $character['equipment'][2]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][2]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][2]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][2]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="placeholder pants {{ $character['equipment'][6]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][6]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][6]->itemEntry ?? ''  }}}"
                                       data-wowhead="item={{ $character['equipment'][6]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][6]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][6]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][6]->quality }}">{{ $character['equipment'][6]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Pants
                                                        </td>
                                                        <th>{{ $character['equipment'][6]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][6]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][6]->durability }} / {{ $character['equipment'][6]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][6]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][6]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][6]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="placeholder back {{ $character['equipment'][14]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][14]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][14]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][14]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][14]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][14]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][14]->quality }}">{{ $character['equipment'][14]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Back
                                                        </td>
                                                        <th>{{ $character['equipment'][14]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][14]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][14]->durability }} / {{ $character['equipment'][14]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][14]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][14]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][14]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="placeholder feet {{ $character['equipment'][7]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][7]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][7]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][7]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][7]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][7]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][7]->quality }}">{{ $character['equipment'][7]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Feet
                                                        </td>
                                                        <th>{{ $character['equipment'][7]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][7]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][7]->durability }} / {{ $character['equipment'][7]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][7]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][7]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][7]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="placeholder chest {{ $character['equipment'][4]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][4]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][4]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][4]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][4]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][4]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][4]->quality }}">{{ $character['equipment'][4]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Chest
                                                        </td>
                                                        <th>{{ $character['equipment'][4]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][4]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][4]->durability }} / {{ $character['equipment'][4]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][4]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][4]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][4]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="placeholder ring {{ $character['equipment'][10]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][10]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][10]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][10]->itemEntry ?? ''  }}&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][10]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][10]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][10]->quality }}">{{ $character['equipment'][10]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Ring
                                                        </td>
                                                        <th>{{ $character['equipment'][10]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][10]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][10]->durability }} / {{ $character['equipment'][10]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][10]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][10]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][10]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="placeholder shirt {{ $character['equipment'][3]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][3]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][3]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][3]->itemEntry ?? ''  }}&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][3]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][3]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][3]->quality }}">{{ $character['equipment'][3]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Shirt
                                                        </td>
                                                        <th>{{ $character['equipment'][3]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][3]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][3]->durability }} / {{ $character['equipment'][3]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][3]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][3]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][3]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="placeholder ring {{ $character['equipment'][11]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][11]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][11]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][11]->itemEntry ?? ''  }}&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][11]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][11]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][11]->quality }}">{{ $character['equipment'][11]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Ring
                                                        </td>
                                                        <th>{{ $character['equipment'][11]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][11]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][11]->durability }} / {{ $character['equipment'][11]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][11]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][11]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][11]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="placeholder tabard {{ $character['equipment'][18]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][18]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][18]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][18]->itemEntry ?? ''  }}&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][18]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][18]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][18]->quality }}">{{ $character['equipment'][18]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Tabard
                                                        </td>
                                                        <th>{{ $character['equipment'][18]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][18]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][18]->durability }} / {{ $character['equipment'][18]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][18]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][18]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][18]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="placeholder trinket {{ $character['equipment'][12]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][12]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][12]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][12]->itemEntry ?? ''  }}&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][12]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][12]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][12]->quality }}">{{ $character['equipment'][12]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Trinket
                                                        </td>
                                                        <th>{{ $character['equipment'][12]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][12]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][12]->durability }} / {{ $character['equipment'][12]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][12]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][12]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][12]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="placeholder wrist {{ $character['equipment'][8]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][8]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][8]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][8]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][8]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][8]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][8]->quality }}">{{ $character['equipment'][8]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Wrist
                                                        </td>
                                                        <th>{{ $character['equipment'][8]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][8]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][8]->durability }} / {{ $character['equipment'][8]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][8]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][8]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][8]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td></td>
                        <td>
                            <div class="placeholder mainhand {{ $character['equipment'][15]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][15]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][15]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][15]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][15]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][15]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][15]->quality }}">{{ $character['equipment'][15]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Mainhand
                                                        </td>
                                                        <th>{{ $character['equipment'][15]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][15]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][15]->durability }} / {{ $character['equipment'][15]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][15]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][15]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][15]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="placeholder offhand {{ $character['equipment'][16]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][16]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][16]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][16]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][16]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][16]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][16]->quality }}">{{ $character['equipment'][16]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Offhand
                                                        </td>
                                                        <th>{{ $character['equipment'][16]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][16]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][16]->durability }} / {{ $character['equipment'][16]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][16]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][16]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][16]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="placeholder ranged {{ $character['equipment'][17]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][17]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][17]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][17]->itemEntry ?? ''  }}&amp;ench=0&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][17]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][17]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][17]->quality }}">{{ $character['equipment'][17]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Ranged
                                                        </td>
                                                        <th>{{ $character['equipment'][17]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][17]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][17]->durability }} / {{ $character['equipment'][17]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][17]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][17]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][17]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="placeholder ammo {{ $character['equipment'][19]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][19]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][19]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][19]->itemEntry ?? ''  }}&amp;domain=classic;">
                                        <img style="width:24px; margin-left: -2px; margin-top: -7px; height: 21px"
                                             src="{{ $character['equipment'][19]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][19]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][19]->quality }}">{{ $character['equipment'][19]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Ammo
                                                        </td>
                                                        <th>{{ $character['equipment'][19]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][19]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][19]->durability }} / {{ $character['equipment'][19]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                @if (isset($character['equipment'][19]->required_level))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Requires Level {{ $character['equipment'][19]->required_level }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][19]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][19]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                            <div class="placeholder trinket {{ $character['equipment'][13]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][13]))
                                    <a target="_blank"
                                       href="https://database.turtle-wow.org/?item={{ $character['equipment'][13]->itemEntry ?? ''  }}"
                                       data-wowhead="item={{ $character['equipment'][13]->itemEntry ?? ''  }}&amp;domain=classic;">
                                        <img src="{{ $character['equipment'][13]->icon ?? ''  }}">
                                    </a>
                                    <table class="" id="{{ $character['equipment'][13]->itemEntry  }}" style="display: none">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <b class="q{{ $character['equipment'][13]->quality }}">{{ $character['equipment'][13]->name }}</b>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Trinket
                                                        </td>
                                                        <th>{{ $character['equipment'][13]->subclass }}</th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                {{--<table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td><span class="q2">Use: <a href="?spell=46499" class="q2">Adds a mount to the player's mount collection.</a></span><br><span
                                                                class="q">"The wolves of the Horde are befriended, not domesticated."</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>--}}
                                                @if (isset($character['equipment'][13]->durability))
                                                    <table style="width: 100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                Durability {{ $character['equipment'][13]->durability }} / {{ $character['equipment'][13]->max_durability }}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                @endif
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Requires Level {{ $character['equipment'][13]->required_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Item Level {{ $character['equipment'][13]->item_level }}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table style="width: 100%;">
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            Sell Price: {!! $character['equipment'][13]->sell_price !!}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <th style="background-position: right top;"></th>
                                        </tr>
                                        <tr>
                                            <th style="background-position: left bottom;"></th>
                                            <th style="background-position: right bottom;"></th>
                                        </tr>
                                        </tbody>
                                    </table>
                                @endif
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br><br>
            </div>

            <div class="col-lg-7">
                <div class="row">
                    <div class="col-lg-12">
                        <p class="yellowish-text ml-2">{{ __('armory')['talents'] }}:</p>
                    </div>
                    <div class="col-md-6">
                        <div class="row profession">
                            <div class="col-lg-2" style="vertical-align: center">
                                @if ($character['talents'][0] > $character['talents'][1] && $character['talents'][0] > $character['talents'][2])
                                    <img
                                        src="{{ Vite::asset('resources/images/armory/specialisations/' . $character['class'] . '_1.png') }}"
                                        style="margin-top:5px; margin-bottom:5px;"/>
                                @endif
                                @if ($character['talents'][1] > $character['talents'][0] && $character['talents'][1] > $character['talents'][2])
                                    <img
                                        src="{{ Vite::asset('resources/images/armory/specialisations/' . $character['class'] . '_2.png') }}"
                                        style="margin-top:5px; margin-bottom:5px;"/>
                                @endif
                                @if ($character['talents'][2] > $character['talents'][0] && $character['talents'][2] > $character['talents'][1])
                                    <img
                                        src="{{ Vite::asset('resources/images/armory/specialisations/' . $character['class'] . '_3.png') }}"
                                        style="margin-top:5px; margin-bottom:5px;"/>
                                @endif
                            </div>
                            <div class="col-lg-10" style="padding-top: 7px;">
                                {{--<span class="character_guild">
                                   <a href="https://classic.wowhead.com/talent-calc/warrior/333200203020000000-00000000000000000-00000000000000000"
                                      target="_blank">Arms
                                   <div class="pull-right ng-binding">18 / 0 / 0</div>
                                   </a>
                                </span>--}}

                            </div>
                        </div>
                    </div>

                </div>

                <br><br>

                <div class="row">
                    <div class="col-lg-12">
                        <p class="yellowish-text ml-2">{{ __('armory')['professions'] }}:</p>
                    </div>
                    @forelse($character['skills'] as $skill)
                        @switch($skill->skill)
                            @case(164)
                            @case(165)
                            @case(171)
                            @case(182)
                            @case(186)
                            @case(197)
                            @case(202)
                            @case(333)
                            @case(393)
                                <div class="col-md-6 ng-scope">
                                    <div class="row profession">
                                        <div class="col-lg-2" style="padding-top:8px;">
                                            <img
                                                src="{{ Vite::asset('resources/images/armory/professions/' . $skill->image .'.png') }}"
                                                style="margin-bottom: 5px;">
                                        </div>
                                        <div class="col-lg-10" style="padding-top: 9px;">
                                            <span class="character_guild">{{ $skill->image }}
                                                <div class="pull-right">
                                                   {{ $skill->value }}
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                @break
                        @endswitch
                    @empty
                    @endforelse
                </div>

                <br><br>

                <div class="row">
                    <div class="col-lg-12">
                        <p class="yellowish-text ml-2">{{ __('armory')['secondary_skills'] }}:</p>
                    </div>
                    @forelse($character['skills'] as $skill)
                        @switch($skill->skill)
                            @case(129)
                            @case(185)
                            @case(356)
                            @case(142)
                                <div class="col-md-6">
                                    <div class="row profession">
                                        <div class="col-lg-2" style="padding-top:8px;">
                                            <img
                                                src="{{ Vite::asset('resources/images/armory/professions/' . $skill->image .'.png') }}"
                                                style="margin-bottom: 5px;">
                                        </div>
                                        <div class="col-lg-10" style="padding-top:9px;">
                                      <span class="character_guild ng-binding">{{ $skill->image }}
                                        <div class="pull-right ng-binding">
                                           {{ $skill->value }}
                                        </div>
                                     </span>
                                        </div>
                                    </div>
                                </div>
                                @break
                        @endswitch
                    @empty
                    @endforelse
                </div>
                <br><br>

                <div class="row">
                    <div class="col-lg-12">
                        <img src="{{--{{ Vite::asset('resources/images/armory/reputation.png') }}--}}"
                             style="margin-bottom:5px;"/>
                    </div>
                    <div class="col-lg-12">
                        @if ($ha)
                            <div class="row profession">
                                <div class="col-lg-10" style="padding-top:6px; padding-bottom:6px;">
                                     <span class="character_guild hand" ng-click="ha = !ha">
                                         @switch ($character['race'])
                                             @case (2)
                                             @case (5)
                                             @case (6)
                                             @case (8)
                                             @case (9)
                                                 <span>
                                                    <span>@if ($ha)
                                                            [-]
                                                        @else
                                                            [+]
                                                        @endif</span>
                                                    Horde
                                                </span>
                                                 @break
                                             @default
                                                 <span>
                                                    <span>@if ($ha)
                                                            [-]
                                                        @else
                                                            [+]
                                                        @endif</span>
                                                    Alliance
                                                </span>
                                         @endswitch
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        Darnassus
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        Gnomeregan Exiles
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        Ironforge
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        Stormwind
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                        @endif

                        @if ($pvp)
                            <div class="row profession">
                                <div class="col-lg-10" style="padding-top:6px; padding-bottom:6px;">
                                     <span class="character_guild hand" ng-click="pvp = !pvp">
                                         @switch ($character['race'])
                                             @case (2)
                                             @case (5)
                                             @case (6)
                                             @case (8)
                                             @case (9)
                                                 <span>
                                                    <span>@if ($pvp)
                                                            [-]
                                                        @else
                                                            [+]
                                                        @endif</span>
                                                    Horde Forces
                                                </span>
                                                 @break
                                             @default
                                                 <span>
                                                    <span>@if ($pvp)
                                                            [-]
                                                        @else
                                                            [+]
                                                        @endif</span>
                                                    Alliance Forces
                                                </span>
                                         @endswitch
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        Silverwing Sentinels
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        Stormpike Guard
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        The League of Arathor
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                        @endif

                        @if ($sc)
                            <div class="row profession" style="padding-top:6px; padding-bottom:6px;">
                                <div class="col-lg-12">
                                     <span className="character_guild hand" ng-click="sc = !sc">
                                        <span>@if ($sc)
                                                [-]
                                            @else
                                                [+]
                                            @endif</span>
                                        Steamwheedle Cartel
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        Booty Bay
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        Everlook
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        Gadgetzan
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">
                                        Ratchet
                                        <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                        @endif

                        @if ($other)
                            <div class="row profession" style="padding-top:6px; padding-bottom:6px;">
                                <div class="col-lg-12">
                                     <span class="character_guild hand" ng-click="other = !other">
                                         <span>@if ($other)
                                                 [-]
                                             @else
                                                 [+]
                                             @endif</span>
                                        Other
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Argent Dawn
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Bloodsail Buccaneers
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Brood of Nozdormu
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Cenarion Circle
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Darkmoon Faire
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Gelkis Clan Centaur
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Hydraxian Waterlords
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Magram Clan Centaur
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Ravenholdt
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Shen'dralar
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Syndicate
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Thorium Brotherhood
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Timbermaw Hold
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Wildhammer Clan
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Wintersaber Trainers
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                            <div class="row profession">
                                <div class="col-lg-12">
                                     <span class="character_guild">Zalndalar Tribe
                                         <div class="pull-right"></div>
                                     </span>
                                </div>
                            </div>
                        @endif


                    </div>
                </div>
                <br><br>

            </div>

        </div>
    @endif
        <div id="tooltip" class="tooltip">
            <p></p>
        </div>
</div>


<script>
    document.addEventListener('DOMContentLoaded', (event) => {
        const tooltip = document.getElementById('tooltip');

        document.querySelectorAll('.placeholder img').forEach(item => {
            item.addEventListener('mouseover', (event) => {
                const tableElement = item.closest('td').querySelector('table');
                const itemEntry = tableElement ? tableElement.id : null;

                if (itemEntry) {
                    const tooltipContent = document.getElementById(itemEntry).outerHTML;
                    tooltip.innerHTML = tooltipContent;
                    tooltip.style.visibility = 'visible';
                    tooltip.firstElementChild.style.display = 'block';
                    tooltip.style.opacity = '1';
                }
            });

            item.addEventListener('mousemove', (event) => {
                tooltip.style.top = `${event.clientY + 35}px`;
                tooltip.style.left = `${event.clientX + 5}px`;
            });

            item.addEventListener('mouseout', (event) => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            });
        });
    });

</script>
