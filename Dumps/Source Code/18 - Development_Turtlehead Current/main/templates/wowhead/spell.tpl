{include file='header.tpl'}
{assign var="iconlist1" value="1"}
{assign var="iconlist2" value="1"}
<div id="main">
    <div id="main-precontents"></div>
    <div id="main-contents" class="main-contents">

        <script type="text/javascript">
            {include file='bricks/allcomments.tpl'}
            var g_pageInfo = {
                ldelim}type: {$page.type},
                typeId: {$page.typeid},
                name: '{$spell.name|escape:"javascript"}'{rdelim};
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
                        <li>
                            <div>{#Level#}: {$spell.level}</div>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="infobox-spacer"></div>
                    <div id="infobox-sticky"></div>
                </td>
            </tr>

        </table>
        <script type="text/javascript">ss_appendSticky()</script>

        <div class="text">
            <a href="http://classic.wowhead.com/?{$query}" target="_blank" class="button-red">
                <div>
                    <blockquote><i>Wowhead</i></blockquote>
                    <span>Wowhead</span></div>
            </a>
            <h1>{$spell.name}</h1>

            <div id="icon{$spell.entry}-generic" style="float: left"></div>
            <div id="tooltip{$spell.entry}-generic" class="tooltip" style="float: left; padding-top: 1px">
                <table>
                    <tr>
                        <td>{$spell.info}</td>
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
                ge('icon{$spell.entry}-generic').appendChild(Icon.create('{$spell.icon}', 2, 0, 0, 0));
                Tooltip.fix(ge('tooltip{$spell.entry}-generic'), 1, 1);
            </script>

            {if isset($spell.btt)}
                <h3>Buff</h3>
                <div id="btt{$spell.entry}" class="tooltip">
                    <table>
                        <tr>
                            <td>{$spell.btt}</td>
                            <th style="background-position: top right"></th>
                        </tr>
                        <tr>
                            <th style="background-position: bottom left"></th>
                            <th style="background-position: bottom right"></th>
                        </tr>
                    </table>
                </div>
                <script type="text/javascript">
                    Tooltip.fixSafe(ge('btt{$spell.entry}'), 1, 1)
                </script>
            {/if}

            {* Информация о спеллах для тултипов *}
            <script type="text/javascript">
                {if $allspells}
                {include file='bricks/allspells_table.tpl' data=$allspells}
                {/if}
                {if $allitems}
                {include file='bricks/allitems_table.tpl' data=$allitems}
                {/if}
            </script>

            {if $spell.reagents}
                {if $spell.tools}<div style="float: left; margin-right: 75px">{/if}
                <h3>{#Reagents#}</h3>
                <table class="iconlist">
                    {section name=i loop=$spell.reagents}
                        <tr>
                            <th align="right" id="iconlist-icon{$iconlist1++}"></th>
                            <td><span class="q{$spell.reagents[i].quality}"><a
                                            href="?item={$spell.reagents[i].entry}">{$spell.reagents[i].name}</a></span>
                            </td>
                        </tr>
                    {/section}
                </table>
                <script type="text/javascript">
                    {section name=i loop=$spell.reagents}
                    ge('iconlist-icon{$iconlist2++}').appendChild(g_items.createIcon({$spell.reagents[i].entry}, 0, {$spell.reagents[i].count}));
                    {/section}
                </script>
                {if $spell.tools}</div>{/if}
            {/if}
            {if $spell.tools}
                {if $spell.reagents}<div style="float: left">{/if}
                <h3>{#Tools#}</h3>
                <table class="iconlist">
                    {section name=i loop=$spell.tools}
                        <tr>
                            <th align="right" id="iconlist-icon{$iconlist1++}"></th>
                            <td><span class="q1"><a
                                            href="?item={$spell.tools[i].entry}">{$spell.tools[i].name}</a></span></td>
                        </tr>
                    {/section}
                </table>
                <script type="text/javascript">
                    {section name=i loop=$spell.tools}
                    ge('iconlist-icon{$iconlist2++}').appendChild(g_items.createIcon({$spell.tools[i].entry}, 0, 1));
                    {/section}
                </script>
                {if $spell.reagents}</div>{/if}
            {/if}

            <div class="clear"></div>
            <h3>{#Spell_Details#}</h3>

            <table class="grid" id="spelldetails">
                <colgroup>
                    <col width="8%"/>
                    <col width="42%"/>
                    <col width="50%"/>
                </colgroup>
                <tr>
                    <td colspan="2" style="padding: 0; border: 0; height: 1px"></td>
                    <td rowspan="5" style="padding: 0; border-left: 3px solid #404040">
                        <table class="grid" style="border: 0">
                            <tr>
                                <td style="height: 0; padding: 0; border: 0" colspan="2"></td>
                            </tr>
                            <tr>
                                <th style="border-left: 0; border-top: 0">{#Duration#}</th>
                                <td width="100%" style="border-top: 0">{$spell.duration}</td>
                            </tr>
                            <tr>
                                <th style="border-left: 0">{#school#}</th>
                                <td>{$spell.school}</td>
                            </tr>
                            <tr>
                                <th style="border-left: 0">{#Mechanic#}</th>
                                <td>{if isset($spell.mechanic)}{$spell.mechanic}{else}<span class="q0">n/a</span>{/if}
                                </td>
                            </tr>
                            <tr>
                                <th style="border-bottom: 0; border-left: 0">{#Dispel_type#}</th>
                                <td>{if isset($spell.dispel)}{$spell.dispel}{else}<span class="q0">n/a</span>{/if}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <th style="border-top: 0">{#cost#}</th>
                    <td style="border-top: 0">{if isset($spell.manacost)}{$spell.manacost} {#manas#}{else}{#None#}{/if}</td>
                </tr>
                <tr>
                    <th>{#range#}</th>
                    <td>{$spell.range} {#yards#} <small>({$spell.rangename})</small></td>
                </tr>
                <tr>
                    <th>{#Cast_time#}</th>
                    <td>{$spell.casttime}</td>
                </tr>
                <tr>
                    <th>{#Cooldown#}</th>
                    <td>{if isset($spell.cooldown)}{$spell.cooldown} {#seconds#}{else}<span class="q0">n/a</span>{/if}
                    </td>
                </tr>
                <tr>
                    <th>{#Category_Cooldown#}</th>
                    <td>{if isset($spell.categoryCooldown)}{$spell.categoryCooldown} {#seconds#}{else}<span class="q0">n/a</span>{/if}
                    </td>
                </tr>
                {section name=i loop=$spell.effect}
                    <tr>
                        <th>{#Effect#} #{$smarty.section.i.index+1}</th>
                        <td colspan="3" style="line-height: 17px">

                            ({$spell.effect[i].id})
                            {$spell.effect[i].name}

                            <small>
                                {if isset($spell.effect[i].object)}
                                    <br>
                                    {#Object#}: <a
                                    href=?object={$spell.effect[i].object.entry}>{$spell.effect[i].object.name}</a>{/if}
                                {if isset($spell.effect[i].value)}<br>{#Value#}: {$spell.effect[i].value}{/if}
                                {if isset($spell.effect[i].radius)}
                                    <br>
                                    {#Radius#}: {$spell.effect[i].radius} {#yards#}{/if}
                                {if isset($spell.effect[i].interval)}
                                    <br>
                                    {#Interval#}: {$spell.effect[i].interval} {#seconds#}{/if}
                            </small>
                            {if isset($spell.effect[i].spell)}
                                <table class="icontab">
                                    <tr>
                                        <th id="icontab-icon1"></th>
                                        <td>
                                            <a href="?spell={$spell.effect[i].spell.entry}">{$spell.effect[i].spell.name}</a>
                                        </td>
                                        <th></th>
                                        <td></td>
                                    </tr>
                                </table>
                                <script type="text/javascript">
                                    ge('icontab-icon1').appendChild(g_spells.createIcon({$spell.effect[i].spell.entry}, 1, 0));
                                </script>
                            {/if}
                            {if isset($spell.effect[i].item)}
                                <table class="icontab">
                                    <tr>
                                        <th id="icontab-icon1"></th>
                                        <td><span class="q{$spell.effect[i].item.quality}"><a
                                                        href="?item={$spell.effect[i].item.entry}">{$spell.effect[i].item.name}</a></span>
                                        </td>
                                        <th></th>
                                        <td></td>
                                    </tr>
                                </table>
                                <script type="text/javascript">
                                    ge('icontab-icon1').appendChild(g_items.createIcon({$spell.effect[i].item.entry}, 1, {$spell.effect[i].item.count}));
                                </script>
                            {/if}
                        </td>
                    </tr>
                {/section}
            </table>

            {* Для ослика *}
            <script type="text/javascript">
                if (Browser.ie6)
                    array_walk(gE(ge('spelldetails'), 'tr'), function (x) {ldelim} if (x.parentNode.parentNode.className != 'icontab') {ldelim} x.onmouseover = Listview.itemOver;
                        x.onmouseout = Listview.itemOut {rdelim}{rdelim});
            </script>

            <h2>{#Related#}</h2>

        </div>

        <div id="tabs-generic"></div>
        <div id="listview-generic" class="listview"></div>
        <script type="text/javascript">
            {if $allitems}{include file='bricks/allitems_table.tpl' data=$allitems}{/if}
            {if $allspells}{include file='bricks/allspells_table.tpl' data=$allspells}{/if}
            var tabsRelated = new Tabs({ldelim}parent: ge('tabs-generic'){rdelim});
            {if isset($spell.taughtbynpc)}{include            file='bricks/creature_table.tpl'        id='taught-by-npc'        tabsid='tabsRelated' data=$spell.taughtbynpc        name='taughtby'        }{/if}
            {if isset($spell.taughtbyitem)}{include            file='bricks/item_table.tpl'            id='taught-by-item'        tabsid='tabsRelated' data=$spell.taughtbyitem        name='taughtby'        }{/if}
            {if isset($spell.taughtbyquest)}{include        file='bricks/quest_table.tpl'            id='taught-by-quest'    tabsid='tabsRelated' data=$spell.taughtbyquest        name='taughtby'        }{/if}
            {if isset($spell.questreward)}{include            file='bricks/quest_table.tpl'            id='reward-for-quest'    tabsid='tabsRelated' data=$spell.questreward        name='rewardfrom'    }{/if}
            {if isset($spell.usedbynpc)}{include            file='bricks/creature_table.tpl'        id='used-by-npc'        tabsid='tabsRelated' data=$spell.usedbynpc            name='usedby'        }{/if}
            {if isset($spell.usedbyitem)}{include            file='bricks/item_table.tpl'            id='used-by-item'        tabsid='tabsRelated' data=$spell.usedbyitem            name='usedby'        }{/if}
            {if isset($spell.usedbyitemset)}{include        file='bricks/itemset_table.tpl'            id='itemsets'            tabsid='tabsRelated' data=$spell.usedbyitemset        name='usedby'        }{/if}
            {if isset($spell.seealso)}{include                file='bricks/spell_table.tpl'            id='see-also-ability'    tabsid='tabsRelated' data=$spell.seealso            name='seealso'        }{/if}
            {*new Listview({*}
            {*    ldelim}template: 'comment',*}
            {*    id: 'comments',*}
            {*    name: LANG.tab_comments,*}
            {*    tabs: tabsRelated,*}
            {*    parent: 'listview-generic',*}
            {*    data: lv_comments{rdelim});*}
            tabsRelated.flush();
        </script>
        {include file='bricks/contribute.tpl'}
        <div class="clear"></div>
    </div>
</div>

{include file='footer.tpl'}
