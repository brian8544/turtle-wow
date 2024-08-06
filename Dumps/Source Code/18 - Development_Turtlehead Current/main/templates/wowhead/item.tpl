{include file='header.tpl'}

<div id="main">

    <div id="main-precontents"></div>
    <div id="main-contents" class="main-contents">

        <script type="text/javascript">
            {include file='bricks/allcomments.tpl'}
            var g_pageInfo = {
                ldelim
            }
            type: {$page.type},
            typeId: {$page.typeid},
            name: '{$item.name|escape:"quotes"}'{rdelim}
            ;
            g_initPath({$page.path});
        </script>

        <table class="infobox">
            <tr>
                <th>{#Quick_Facts#}</th>
            </tr>
            <tr>
                <td>
                    <div class="infobox-spacer"></div>
                    <ul>
                        {* Уровень вещи *}
                        {if $item.level}
                            <li>
                            <div>{#level#}: {$item.level}</div></li>{/if}
                        {* Стоимость вещи *}
                        {if $item.buygold or $item.buysilver or $item.buycopper}
                            <li>
                                <div>
                                    {#Buy_for#}:
                                    {if $item.buygold}<span class="moneygold">{$item.buygold}</span>{/if}
                                    {if $item.buysilver}<span class="moneysilver">{$item.buysilver}</span>{/if}
                                    {if $item.buycopper}<span class="moneycopper">{$item.buycopper}</span>{/if}
                                </div>
                            </li>
                        {/if}
                        {if $item.sellgold or $item.sellsilver or $item.sellcopper}
                            <li>
                                <div>
                                    {#Sells_for#}:
                                    {if $item.sellgold}<span class="moneygold">{$item.sellgold}</span>{/if}
                                    {if $item.sellsilver}<span class="moneysilver">{$item.sellsilver}</span>{/if}
                                    {if $item.sellcopper}<span class="moneycopper">{$item.sellcopper}</span>{/if}
                                </div>
                            </li>
                        {/if}
                        {if isset($item.disenchantskill)}
                            <li>
                            <div>{#Disenchantable#} (<span class="tip"
                                                           onmouseover="Tooltip.showAtCursor(event, LANG.tooltip_reqenchanting, 0, 0, 'q')"
                                                           onmousemove="Tooltip.cursorUpdate(event)"
                                                           onmouseout="Tooltip.hide()">{$item.disenchantskill}</span>)
                            </div></li>{/if}
                        {if isset($item.key)}
                            <li>
                            <div>{#Can_be_placed_in_the_keyring#}</div></li>{/if}
                        <li>
                            <div>Display ID: {$item.display_id}</div>
                        </li>
                        <li>
                            <div>Disenchant ID: {$item.disenchant_id}</div>
                        </li>
                        <li>
                            <div>Allowable Races: {$item.nice_races}</div>
                        </li>
                        <li>
                            <div>Race Mask: {$item.allowable_race}</div>
                        </li>
                        <li>
                            <div>Allowable Classes: {$item.nice_classes}</div>
                        </li>
                        <li>
                            <div>Class Mask: {$item.allowable_class}</div>
                        </li>
                        <li>
                            <div>Script Name: {$item.script_name}</div>
                        </li>
                    </ul>
                </td>
            </tr>
        </table>

        <div class="text">

            <a onclick="g_getIngameLink('{$item.color}', '{$item.entry}', '{$item.name}')" class="button-red">
                <div>
                    <blockquote><i>In-Game Link</i></blockquote>
                    <span>In-Game Link</span></div>
            </a>

            <a href="http://classic.wowhead.com/?{$query}" class="button-red">
                <div>
                    <blockquote><i>Wowhead</i></blockquote>
                    <span>Wowhead</span></div>
            </a>

            <h1>{$item.name}</h1>

            <div id="icon{$item.entry}-generic" style="float: left"></div>
            <div id="tooltip{$item.entry}-generic" class="tooltip" style="float: left; padding-top: 1px">
                <table>
                    <tr>
                        <td>{$item.info}
                            {if ($item.spellcharges_1 > 0)} {$item.spellcharges_1}  Charges{/if}
                        </td>
                        <th style="background-position: top right"></th>
                    </tr>
                    <tr>
                        <th style="background-position: bottom left"></th>
                        <th style="background-position: bottom right"></th>
                    </tr>
                </table>
            </div>

            <div style="clear: left"></div>

            <script type="text/javascript">
                ge('icon{$item.entry}-generic').appendChild(Icon.create('{$item.iconname}', 2, 0, 0, {$item.stackable}));
                Tooltip.fix(ge('tooltip{$item.entry}-generic'), 1, 1);
            </script>

            <h2>{#Related#}</h2>

        </div>

        <div id="tabs-generic"></div>
        <div id="listview-generic" class="listview"></div>

        <script type="text/javascript">

            {if isset($allitems)}{include    file='bricks/allitems_table.tpl'    data=$allitems}{/if}
            {if isset($allspells)}{include    file='bricks/allspells_table.tpl'    data=$allspells}{/if}
            var tabsRelated = new Tabs({ldelim}parent: ge('tabs-generic'){rdelim});
            {if isset($item.unlocks)}{include                file='bricks/object_table.tpl'            id='unlocks'                tabsid='tabsRelated' data=$item.unlocks                name='unlocks'            }{/if}
            {if isset($item.fishedin)}{include                file='bricks/zone_table.tpl'            id='fished-in'                tabsid='tabsRelated' data=$item.fishedin            name='fishedin'            }{/if}
            {if isset($item.droppedby)}{include                file='bricks/creature_table.tpl'        id='dropped-by'                tabsid='tabsRelated' data=$item.droppedby            name='droppedby'        }{/if}
            {if isset($item.soldby)}{include                file='bricks/creature_table.tpl'        id='sold-by'                tabsid='tabsRelated' data=$item.soldby                name='soldby'            }{/if}
            {if isset($item.teaches)}{include                file='bricks/spell_table.tpl'            id='teaches-recipe'            tabsid='tabsRelated' data=$item.teaches                name='teaches'            }{/if}
            {if isset($item.containedinobject)}{include        file='bricks/object_table.tpl'            id='contained-in-object'    tabsid='tabsRelated' data=$item.containedinobject    name='containedin'        }{/if}
            {if isset($item.minedfromobject)}{include        file='bricks/object_table.tpl'            id='mined-from-object'        tabsid='tabsRelated' data=$item.minedfromobject        name='minedfrom'        }{/if}
            {if isset($item.gatheredfromobject)}{include    file='bricks/object_table.tpl'            id='gathered-from-object'    tabsid='tabsRelated' data=$item.gatheredfromobject    name='gatheredfrom'        }{/if}
            {if isset($item.containedinitem)}{include        file='bricks/item_table.tpl'            id='contained-in-item'        tabsid='tabsRelated' data=$item.containedinitem        name='containedin'        }{/if}
            {if isset($item.contains)}{include                file='bricks/item_table.tpl'            id='contains'                tabsid='tabsRelated' data=$item.contains            name='contains'            }{/if}
            {if isset($item.pickpocketingloot)}{include        file='bricks/creature_table.tpl'        id='pick-pocketed-from'        tabsid='tabsRelated' data=$item.pickpocketingloot    name='pickpocketedfrom'    }{/if}
            {if isset($item.skinnedfrom)}{include            file='bricks/creature_table.tpl'        id='skinned-from'            tabsid='tabsRelated' data=$item.skinnedfrom            name='skinnedfrom'        }{/if}
            {if isset($item.prospectingloot)}{include        file='bricks/item_table.tpl'            id='prospected-from'        tabsid='tabsRelated' data=$item.prospectingloot        name='prospectedfrom'    }{/if}
            {if isset($item.canbeplacedin)}{include            file='bricks/item_table.tpl'            id='can-be-placed-in'        tabsid='tabsRelated' data=$item.canbeplacedin        name='canbeplacedin'    }{/if}
            {if isset($item.objectiveof)}{include            file='bricks/quest_table.tpl'            id='objective-of'            tabsid='tabsRelated' data=$item.objectiveof            name='objectiveof'        }{/if}
            {if isset($item.starts)}{include                file='bricks/quest_table.tpl'            id='starts'                    tabsid='tabsRelated' data=$item.starts                name='starts'            }{/if}
            {if isset($item.rewardof)}{include                file='bricks/quest_table.tpl'            id='reward-of'                tabsid='tabsRelated' data=$item.rewardof            name='rewardfrom'        }{/if}
            {if isset($item.reagentfor)}{include            file='bricks/spell_table.tpl'            id='reagent-for'            tabsid='tabsRelated' data=$item.reagentfor            name='reagentfor'        }{/if}
            {if isset($item.createdfrom)}{include            file='bricks/spell_table.tpl'            id='created-by'                tabsid='tabsRelated' data=$item.createdfrom            name='createdby'        }{/if}
            {if isset($item.disenchanting)}{include            file='bricks/item_table.tpl'            id='disenchanting'            tabsid='tabsRelated' data=$item.disenchanting        name='disenchanting'    }{/if}
            {if isset($item.disenchantedfrom)}{include        file='bricks/item_table.tpl'            id='disenchanting'            tabsid='tabsRelated' data=$item.disenchantedfrom    name='disenchantedfrom'    }{/if}
            {*new Listview({ldelim}*}
            //     template: 'comment',
            //     id: 'comments',
            //     name: LANG.tab_comments,
            //     tabs: tabsRelated,
            //     parent: 'listview-generic',
            {*    data: lv_comments{rdelim});*}
            tabsRelated.flush();
        </script>

        {include file='bricks/contribute.tpl'}
    </div>
</div>

{include file='footer.tpl'}
