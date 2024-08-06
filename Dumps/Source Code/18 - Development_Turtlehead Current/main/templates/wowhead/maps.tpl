{config_load file="$conf_file" section="maps"}

{include file='header.tpl'}

<div id="main">
    <div id="main-precontents"></div>
    <div id="main-contents">
        <div class="text">
            <div style="text-align: center">

                <select onchange="mapperChooseZone(this)" class="zone-picker" style="margin: 0">
                    <option value="0">Eastern Kingdoms</option>
                    <option value="36">Alterac Mountains</option>
                    <option value="45">Arathi Highlands</option>

                    <option value="3">Badlands</option>
                    <option value="4">Blasted Lands</option>
                    <option value="46">Burning Steppes</option>
                    <option value="41">Deadwind Pass</option>
                    <option value="1">Dun Morogh</option>
                    <option value="10">Duskwood</option>
                    <option value="139">Eastern Plaguelands</option>
                    <option value="12">Elwynn Forest</option>

                    <option value="267">Hillsbrad Foothills</option>
                    <option value="1537">Ironforge</option>
                    <option value="38">Loch Modan</option>
                    <option value="44">Redridge Mountains</option>
                    <option value="51">Searing Gorge</option>
                    <option value="130">Silverpine Forest</option>

                    <option value="1519">Stormwind City</option>
                    <option value="33">Stranglethorn Vale</option>
                    <option value="8">Swamp of Sorrows</option>
                    <option value="47">The Hinterlands</option>
                    <option value="85">Tirisfal Glades</option>
                    <option value="1497">Undercity</option>
                    <option value="28">Western Plaguelands</option>
                    <option value="40">Westfall</option>
                    <option value="11">Wetlands</option>

                </select><select onchange="mapperChooseZone(this)" class="zone-picker">
                    <option value="0">Kalimdor</option>
                    <option value="331">Ashenvale</option>
                    <option value="16">Azshara</option>
                    <option value="148">Darkshore</option>
                    <option value="1657">Darnassus</option>
                    <option value="405">Desolace</option>

                    <option value="14">Durotar</option>
                    <option value="15">Dustwallow Marsh</option>
                    <option value="361">Felwood</option>
                    <option value="357">Feralas</option>
                    <option value="493">Moonglade</option>
                    <option value="215">Mulgore</option>
                    <option value="1637">Orgrimmar</option>
                    <option value="1377">Silithus</option>
                    <option value="406">Stonetalon Mountains</option>

                    <option value="440">Tanaris</option>
                    <option value="141">Teldrassil</option>
                    <option value="17">The Barrens</option>
                    <option value="400">Thousand Needles</option>
                    <option value="1638">Thunder Bluff</option>
                    <option value="490">Un'Goro Crater</option>
                    <option value="618">Winterspring</option>
                </select>
                <div style="padding-bottom: 4px"></div>

                <select onchange="mapperChooseZone(this)" class="zone-picker">
                    <option value="0">Instances</option>
                    <optgroup label="Dungeons">
                        <option value="719">Blackfathom Deeps</option>
                        <option value="1584">Blackrock Depths</option>

                        <option value="1583b">Blackrock Spire (Upper)</option>
                        <option value="2557">Deadmines</option>
                        <option value="2557">Dire Maul</option>
                        <option value="2557e">&nbsp;- East</option>
                        <option value="2557n">&nbsp;- North</option>
                        <option value="2557w">&nbsp;- West</option>

                        <option value="133">Gnomeregan</option>
                        <option value="2100">Maraudon</option>
                        <option value="2437">Ragefire Chasm</option>
                        <option value="722">Razorfen Downs</option>

                        <option value="491">Razorfen Kraul</option>
                        <option value="796">Scarlet Monastery</option>
                        <option value="796c">&nbsp;- Armory</option>
                        <option value="796d">&nbsp;- Cathedral</option>
                        <option value="796a">&nbsp;- Graveyard</option>
                        <option value="796b">&nbsp;- Library</option>
                        <option value="2057">Scholomance</option>
                        <option value="2017">Stratholme</option>
                        <option value="1417">Sunken Temple</option>

                        <option value="717">The Stockade</option>
                        <option value="718">Wailing Caverns</option>
                        <option value="978">Zul'Farrak</option>
                    </optgroup>
                    <optgroup label="Raids">

                        <option value="2717">Molten Core</option>
                        <option value="2159">Onyxia's Lair</option>
                        <option value="19">Zul'Gurub</option>
                        <option value="2677">Blackwing Lair</option>
                        <option value="3429">Ruins of Ahn'Qiraj</option>
                        <option value="3428">Temple of Ahn'Qiraj</option>
                        <option value="3456">Naxxramas</option>
                    </optgroup>
                </select>
                <select onchange="mapperChooseZone(this)" class="zone-picker">
                    <option value="0">More</option>
                    <optgroup label="Battlegrounds">
                        <option value="2597">Alterac Valley</option>
                        <option value="3358">Arathi Basin</option>
                        <option value="3277">Warsong Gulch</option>
                    </optgroup>
                    <optgroup label="Miscellaneous">
                        <option value="-1">Azeroth</option>
                        <option value="-3">Eastern Kingdoms</option>
                        <option value="457">Kalimdor</option>
                    </optgroup>
                </select>

            </div>

            <div id="mapper" style="display: none; width: 778px; margin: 0 auto">
                <div id="mapper-generic"></div>
                <div class="pad"></div>
                <div style="text-align: center; font-size: 13px">
                    <a href="javascript:;" style="margin-right: 2em" id="link-to-this-map">{#Link_to_this_map#}</a>
                    <a href="javascript:;" onclick="myMapper.setCoords([])" onmousedown="return false">{#Clear#}</a>
                </div>
            </div>

            {literal}
                <script type="text/javascript">
                    function mapperChooseZone(s) {
                        if (myMapper.getZone() == 0)
                            ge('mapper').style.display = '';

                        myMapper.setZone(s.value);

                        s.selectedIndex = 0;
                    }

                    function mapperUpdateLink(_) {
                        var b = '?maps', l = _.getLink();
                        if (l) b += '=' + l;
                        ge('link-to-this-map').href = b;
                    }

                    var myMapper = new Mapper({
                        parent: 'mapper-generic',
                        editable: true,
                        zoom: 1,
                        onPinUpdate: mapperUpdateLink,
                        onMapUpdate: mapperUpdateLink
                    });

                    var _ = location.href.indexOf('maps=');
                    if (_ != -1) {
                        _ = location.href.substr(_ + 5);
                        if (myMapper.setLink(_))
                            ge('mapper').style.display = '';
                    }
                </script>
            {/literal}
        </div>
    </div>
</div>
</div>
{include file='footer.tpl'}
