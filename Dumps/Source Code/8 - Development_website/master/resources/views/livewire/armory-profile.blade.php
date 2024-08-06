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
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="placeholder ammo {{ $character['equipment'][19]->qualityColor ?? ''  }}">
                                @if (isset($character['equipment'][19]))
                                <a target="_blank"
                                   href="https://database.turtle-wow.org/?item={{ $character['equipment'][19]->itemEntry ?? ''  }}"
                                   data-wowhead="item={{ $character['equipment'][19]->itemEntry ?? ''  }}&amp;domain=classic;">
                                    <img style="width:24px; margin-left: -2px; margin-top: -7px; height: 21px" src="{{ $character['equipment'][19]->icon ?? ''  }}">
                                </a>
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
</div>
