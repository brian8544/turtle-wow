{config_load file="$conf_file"}

{include file='header.tpl'}

<div id="main">
    <div id="main-precontents"></div>
    <div id="main-contents" class="main-contents">
        <script type="text/javascript">
            g_initPath({$page.path});
        </script>

        <span class="menuarrow hand" onclick="toggle_filters()">Filters</span>
        <form method="POST" id="filters_form" class="{if !$page.filters.shown }filters_hidden{/if}">
            <input type="hidden" name="filters" value="{if $page.filters.shown }on{else}off{/if}" id="filters">
            <BR><BR>
            <table>

                <tbody>
                <tr>
                    <td>
                        Item Level:
                    </td>
                    <td style="text-align: right">
                        <input type="number" name="item_level_min" value="{$page.filters.item_level[0]}" style="width: 50px;"> -
                        <input type="number" name="item_level_max" value="{$page.filters.item_level[1]}" style="width: 50px;">
                    </td>
                </tr>
                <tr>
                    <td>
                        Req Level:
                    </td>
                    <td style="text-align: right">
                        <input type="number" name="req_level_min" value="{$page.filters.req_level[0]}" style="width: 50px;"> -
                        <input type="number" name="req_level_max" value="{$page.filters.req_level[1]}" style="width: 50px;">
                    </td>
                </tr>
                <tr>
                    <td>
                        Quality:
                    </td>
                    <td>
                        <select name="item_quality_min" id="item_quality_min" style="width: 100%;">
                            <option class="q q0" value="0" {if $page.filters.quality_min == 0 }selected{/if}>Poor</option>
                            <option class="q q1" value="1" {if $page.filters.quality_min == 1 }selected{/if}>Common</option>
                            <option class="q q2" value="2" {if $page.filters.quality_min == 2 }selected{/if}>Uncommon</option>
                            <option class="q q3" value="3" {if $page.filters.quality_min == 3 }selected{/if}>Rare</option>
                            <option class="q q4" value="4" {if $page.filters.quality_min == 4 }selected{/if}>Epic</option>
                            <option class="q q5" value="5" {if $page.filters.quality_min == 5 }selected{/if}>Legendary
                            </option>
                            <option class="q q6" value="6" {if $page.filters.quality_min == 6 }selected{/if}>Artifact</option>
                        </select>
                        </label>

                    </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        Stats
                    </td>
                    <Td>

                        <label>
                            <select name="stat_1" id="stat_1">
                                <option value="0" {if $page.filters.stats[1][0] == 0 }selected{/if}>-Select-</option>
                                <option value="4" {if $page.filters.stats[1][0] == 4 }selected{/if}>Strength</option>
                                <option value="7" {if $page.filters.stats[1][0] == 7 }selected{/if}>Stamina</option>
                                <option value="5" {if $page.filters.stats[1][0] == 5 }selected{/if}>Intelect</option>
                                <option value="6" {if $page.filters.stats[1][0] == 6 }selected{/if}>Spirit</option>
                                <option value="3" {if $page.filters.stats[1][0] == 3 }selected{/if}>Agility</option>
                            </select>
                        </label>
                        <label>
                            <input type="number" name="value_1" value="{$page.filters.stats[1][1]}" style="width: 50px;">
                        </label>
                        <BR>
                        <label>
                            <select name="stat_2" id="stat_2">
                                <option value="0" {if $page.filters.stats[2][0] == 0 }selected{/if}>-Select-</option>
                                <option value="4" {if $page.filters.stats[2][0] == 4 }selected{/if}>Strength</option>
                                <option value="7" {if $page.filters.stats[2][0] == 7 }selected{/if}>Stamina</option>
                                <option value="5" {if $page.filters.stats[2][0] == 5 }selected{/if}>Intelect</option>
                                <option value="6" {if $page.filters.stats[2][0] == 6 }selected{/if}>Spirit</option>
                                <option value="3" {if $page.filters.stats[2][0] == 3 }selected{/if}>Agility</option>
                            </select>
                        </label>
                        <label>
                            <input type="number" name="value_2" value="{$page.filters.stats[2][1]}" style="width: 50px;">
                        </label>
                        <BR>
                        <label>
                            <select name="stat_3" id="stat_3">
                                <option value="0" {if $page.filters.stats[2][0] == 0 }selected{/if}>-Select-</option>
                                <option value="4" {if $page.filters.stats[2][0] == 4 }selected{/if}>Strength</option>
                                <option value="7" {if $page.filters.stats[2][0] == 7 }selected{/if}>Stamina</option>
                                <option value="5" {if $page.filters.stats[2][0] == 5 }selected{/if}>Intelect</option>
                                <option value="6" {if $page.filters.stats[2][0] == 6 }selected{/if}>Spirit</option>
                                <option value="3" {if $page.filters.stats[2][0] == 3 }selected{/if}>Agility</option>
                            </select>
                        </label>
                        <label>
                            <input type="number" name="value_3" value="{$page.filters.stats[3][1]}" style="width: 50px;">
                        </label>


                    </Td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>Other Stats</td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <select name="other_stat_1" id="other_stat_1">
                                <option value="0" {if $page.filters.other_stats[1][0] == 0 }selected{/if}>-Select-</option>
                                <option value="1" {if $page.filters.other_stats[1][0] == 1 }selected{/if}>Melee Hit (%)</option>
                                <option value="2" {if $page.filters.other_stats[1][0] == 2 }selected{/if}>Spell Hit (%)</option>
                                <option value="3" {if $page.filters.other_stats[1][0] == 3 }selected{/if}>Melee Crit (%)</option>
                                <option value="33" {if $page.filters.other_stats[1][0] == 33 }selected{/if}>Ranged Crit (%)</option>
                                <option value="4" {if $page.filters.other_stats[1][0] == 4 }selected{/if}>Spell Crit (%)</option>
                                <option value="5" {if $page.filters.other_stats[1][0] == 5 }selected{/if}>Parry (%)</option>
                                <option value="6" {if $page.filters.other_stats[1][0] == 6 }selected{/if}>Dodge (%)</option>
                                <option value="66" {if $page.filters.other_stats[1][0] == 66 }selected{/if}>Block (%)</option>
                                <option value="67" {if $page.filters.other_stats[1][0] == 67 }selected{/if}>Block Value</option>
                                <option value="7" {if $page.filters.other_stats[1][0] == 7 }selected{/if}>Defense</option>

                                <option value="8" {if $page.filters.other_stats[1][0] == 8 }selected{/if}>Armor Penetration</option>
                                <option value="9" {if $page.filters.other_stats[1][0] == 9 }selected{/if}>Spell Penetration</option>

                                <option value="10" {if $page.filters.other_stats[1][0] == 10 }selected{/if}>Spell Power</option>
                                <option value="11" {if $page.filters.other_stats[1][0] == 11 }selected{/if}>Arcane Spell Power</option>
                                <option value="12" {if $page.filters.other_stats[1][0] == 12 }selected{/if}>Holy Spell Power</option>
                                <option value="13" {if $page.filters.other_stats[1][0] == 13 }selected{/if}>Nature Spell Power</option>
                                <option value="14" {if $page.filters.other_stats[1][0] == 14 }selected{/if}>Shadow Spell Power</option>
                                <option value="144" {if $page.filters.other_stats[1][0] == 144 }selected{/if}>Fire Spell Power</option>
                                <option value="145" {if $page.filters.other_stats[1][0] == 145 }selected{/if}>Frost Spell Power</option>

                                <option value="15" {if $page.filters.other_stats[1][0] == 15 }selected{/if}>Healing Power</option>
                                <option value="16" {if $page.filters.other_stats[1][0] == 16 }selected{/if}>MP5</option>
                                <option value="17" {if $page.filters.other_stats[1][0] == 17 }selected{/if}>HP5</option>

                                <option value="18" {if $page.filters.other_stats[1][0] == 18 }selected{/if}>Melee Attack Power</option>
                                <option value="19" {if $page.filters.other_stats[1][0] == 19 }selected{/if}>Ranged Attack Power</option>
                                <option value="20" {if $page.filters.other_stats[1][0] == 20 }selected{/if}>Attack Speed</option>

{*                                <option value="19" {if $page.filters.other_stats[1][0] == 19 }selected{/if}>Weapon Skills...</option>*}

                            </select>
                        </label>
                    </td>
                    <td>
                        <label>
                            <input type="number" name="other_value_1" value="{$page.filters.other_stats[1][1]}" style="width: 50px;">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <select name="other_stat_2" id="other_stat_2">
                                <option value="0" {if $page.filters.other_stats[2][0] == 0 }selected{/if}>-Select-</option>
                                <option value="1" {if $page.filters.other_stats[2][0] == 1 }selected{/if}>Melee Hit (%)</option>
                                <option value="2" {if $page.filters.other_stats[2][0] == 2 }selected{/if}>Spell Hit (%)</option>
                                <option value="3" {if $page.filters.other_stats[2][0] == 3 }selected{/if}>Melee Crit (%)</option>
                                <option value="33" {if $page.filters.other_stats[2][0] == 33 }selected{/if}>Ranged Crit (%)</option>
                                <option value="4" {if $page.filters.other_stats[2][0] == 4 }selected{/if}>Spell Crit (%)</option>
                                <option value="5" {if $page.filters.other_stats[2][0] == 5 }selected{/if}>Parry (%)</option>
                                <option value="6" {if $page.filters.other_stats[2][0] == 6 }selected{/if}>Dodge (%)</option>
                                <option value="66" {if $page.filters.other_stats[2][0] == 66 }selected{/if}>Block (%)</option>
                                <option value="67" {if $page.filters.other_stats[2][0] == 67 }selected{/if}>Block Value</option>
                                <option value="7" {if $page.filters.other_stats[2][0] == 7 }selected{/if}>Defense</option>

                                <option value="8" {if $page.filters.other_stats[2][0] == 8 }selected{/if}>Armor Penetration</option>
                                <option value="9" {if $page.filters.other_stats[2][0] == 9 }selected{/if}>Spell Penetration</option>

                                <option value="10" {if $page.filters.other_stats[2][0] == 10 }selected{/if}>Spell Power</option>
                                <option value="11" {if $page.filters.other_stats[2][0] == 11 }selected{/if}>Arcane Spell Power</option>
                                <option value="12" {if $page.filters.other_stats[2][0] == 12 }selected{/if}>Holy Spell Power</option>
                                <option value="13" {if $page.filters.other_stats[2][0] == 13 }selected{/if}>Nature Spell Power</option>
                                <option value="14" {if $page.filters.other_stats[2][0] == 14 }selected{/if}>Shadow Spell Power</option>
                                <option value="144" {if $page.filters.other_stats[2][0] == 144 }selected{/if}>Fire Spell Power</option>
                                <option value="145" {if $page.filters.other_stats[2][0] == 145 }selected{/if}>Frost Spell Power</option>

                                <option value="15" {if $page.filters.other_stats[2][0] == 15 }selected{/if}>Healing Power</option>
                                <option value="16" {if $page.filters.other_stats[2][0] == 16 }selected{/if}>MP5</option>
                                <option value="17" {if $page.filters.other_stats[2][0] == 17 }selected{/if}>HP5</option>

                                <option value="18" {if $page.filters.other_stats[2][0] == 18 }selected{/if}>Melee Attack Power</option>
                                <option value="19" {if $page.filters.other_stats[2][0] == 19 }selected{/if}>Ranged Attack Power</option>
                                <option value="20" {if $page.filters.other_stats[2][0] == 20 }selected{/if}>Attack Speed</option>

                                {*                                <option value="19" {if $page.filters.other_stats[1][0] == 19 }selected{/if}>Weapon Skills...</option>*}

                            </select>
                        </label>
                    </td>
                    <td>
                        <label>
                            <input type="number" name="other_value_2" value="{$page.filters.other_stats[2][1]}" style="width: 50px;">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>
                            <select name="other_stat_3" id="other_stat_3">
                                <option value="0" {if $page.filters.other_stats[3][0] == 0 }selected{/if}>-Select-</option>
                                <option value="1" {if $page.filters.other_stats[3][0] == 1 }selected{/if}>Melee Hit (%)</option>
                                <option value="2" {if $page.filters.other_stats[3][0] == 2 }selected{/if}>Spell Hit (%)</option>
                                <option value="3" {if $page.filters.other_stats[3][0] == 3 }selected{/if}>Melee Crit (%)</option>
                                <option value="33" {if $page.filters.other_stats[3][0] == 33 }selected{/if}>Ranged Crit (%)</option>
                                <option value="4" {if $page.filters.other_stats[3][0] == 4 }selected{/if}>Spell Crit (%)</option>
                                <option value="5" {if $page.filters.other_stats[3][0] == 5 }selected{/if}>Parry (%)</option>
                                <option value="6" {if $page.filters.other_stats[3][0] == 6 }selected{/if}>Dodge (%)</option>
                                <option value="66" {if $page.filters.other_stats[3][0] == 66 }selected{/if}>Block (%)</option>
                                <option value="67" {if $page.filters.other_stats[3][0] == 67 }selected{/if}>Block Value</option>
                                <option value="7" {if $page.filters.other_stats[3][0] == 7 }selected{/if}>Defense</option>

                                <option value="8" {if $page.filters.other_stats[3][0] == 8 }selected{/if}>Armor Penetration</option>
                                <option value="9" {if $page.filters.other_stats[3][0] == 9 }selected{/if}>Spell Penetration</option>

                                <option value="10" {if $page.filters.other_stats[3][0] == 10 }selected{/if}>Spell Power</option>
                                <option value="11" {if $page.filters.other_stats[3][0] == 11 }selected{/if}>Arcane Spell Power</option>
                                <option value="12" {if $page.filters.other_stats[3][0] == 12 }selected{/if}>Holy Spell Power</option>
                                <option value="13" {if $page.filters.other_stats[3][0] == 13 }selected{/if}>Nature Spell Power</option>
                                <option value="14" {if $page.filters.other_stats[3][0] == 14 }selected{/if}>Shadow Spell Power</option>
                                <option value="144" {if $page.filters.other_stats[3][0] == 144 }selected{/if}>Fire Spell Power</option>
                                <option value="145" {if $page.filters.other_stats[3][0] == 145 }selected{/if}>Frost Spell Power</option>

                                <option value="15" {if $page.filters.other_stats[3][0] == 15 }selected{/if}>Healing Power</option>
                                <option value="16" {if $page.filters.other_stats[3][0] == 16 }selected{/if}>MP5</option>
                                <option value="17" {if $page.filters.other_stats[3][0] == 17 }selected{/if}>HP5</option>

                                <option value="18" {if $page.filters.other_stats[3][0] == 18 }selected{/if}>Melee Attack Power</option>
                                <option value="19" {if $page.filters.other_stats[3][0] == 19 }selected{/if}>Ranged Attack Power</option>
                                <option value="20" {if $page.filters.other_stats[3][0] == 20 }selected{/if}>Attack Speed</option>

                                {*                                <option value="19" {if $page.filters.other_stats[1][0] == 19 }selected{/if}>Weapon Skills...</option>*}

                            </select>
                        </label>
                    </td>
                    <td>
                        <label>
                            <input type="number" name="other_value_3" value="{$page.filters.other_stats[3][1]}" style="width: 50px;">
                        </label>
                    </td>
                </tr>
                </tbody>
            </table>

            <BR><BR>
            <button type="submit">Search</button>
            <button type="button" onclick="reset_filters()">Reset</button>
        </form>
        <BR><BR>

        <div id="lv-items" class="listview"></div>

        <script type="text/javascript">
            {if $allitems}{include    file='bricks/allitems_table.tpl'        data=$allitems}{/if}
            {include        file='bricks/item_table.tpl' id='items'    data=$items}
        </script>

        <div class="clear"></div>
    </div>
</div>

{include file='footer.tpl'}
