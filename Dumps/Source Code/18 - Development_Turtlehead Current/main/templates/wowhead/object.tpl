{config_load file="$conf_file"}

{include file='header.tpl'}

<div id="main">

    <div id="main-precontents"></div>
    <div id="main-contents" class="main-contents">

        <script type="text/javascript">
            {include file='bricks/allcomments.tpl'}
            var g_pageInfo = {
                ldelim}type: {$page.type},
                typeId: {$page.typeid},
                name: '{$object.name|escape:"quotes"}'{rdelim};
            g_initPath({$page.path});
        </script>

{*        {if isset($object.key) or isset($object.lockpicking) or isset($object.mining) or isset($object.herbalism)}*}
            <table class="infobox">
                <tr>
                    <th>{#Quick_Facts#}</th>
                </tr>
                <tr>
                    <td>
                        <div class="infobox-spacer"></div>
                        <ul>
                            {if isset($object.key)}
                                <li>
                                <div>{#Key#}: <a class="q{$object.key.quality}"
                                                 href="?item={$object.key.id}">[{$object.key.name}]</a></div></li>{/if}
                            {if isset($object.lockpicking)}
                                <li>
                                <div>{#Lockpickable#} (<span class="tip"
                                                             onmouseover="Tooltip.showAtCursor(event, '{#Required_lockpicking_skill#}', 0, 0, 'q')"
                                                             onmousemove="Tooltip.cursorUpdate(event)"
                                                             onmouseout="Tooltip.hide()">{$object.lockpicking}</span>)
                                </div></li>{/if}
                            {if isset($object.mining)}
                                <li>
                                <div>{#Mining#} (<span class="tip"
                                                       onmouseover="Tooltip.showAtCursor(event, '{#Required_mining_skill#}', 0, 0, 'q')"
                                                       onmousemove="Tooltip.cursorUpdate(event)"
                                                       onmouseout="Tooltip.hide()">{$object.mining}</span>)
                                </div></li>{/if}
                            {if isset($object.herbalism)}
                                <li>
                                <div>{#Herb#} (<span class="tip"
                                                     onmouseover="Tooltip.showAtCursor(event, '{#Required_herb_skill#}', 0, 0, 'q')"
                                                     onmousemove="Tooltip.cursorUpdate(event)"
                                                     onmouseout="Tooltip.hide()">{$object.herbalism}</span>)
                                </div></li>{/if}
                            <li>
                                <div>DisplayId: {$object.displayId}</div>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
{*        {/if}*}

        <div class="text">

            <a href="http://classic.wowhead.com/?{$query}" class="button-red">
                <div>
                    <blockquote><i>Wowhead</i></blockquote>
                    <span>Wowhead</span></div>
            </a>
            <h1>{$object.name}</h1>

            {if $zonedata}
                {#This_Object_can_be_found_in#}
            {strip}
                <span id="locations">
					{foreach from=$zonedata item=zone_c name=zone_f}
                    <a href="javascript:;" onclick="
                            myMapper.update(
                            {ldelim}
                            zone: {$zone_c.zone},
                            coords: [
                    {foreach from=$exdata[$smarty.foreach.zone_f.index] item=exdata_c name=exdata_f}
                        {if ($exdata_c.x and $exdata_c.y)}
                            [{$exdata_c.x},{$exdata_c.y},
                            {ldelim}
                                label:'$<br>
                                <div class=q0>
                                    <small>{#Respawn#}:
                                        {if isset($exdata_c.r.h)} {$exdata_c.r.h}{#hr#}{/if}
                                        {if isset($exdata_c.r.m)} {$exdata_c.r.m}{#min#}{/if}
                                        {if isset($exdata_c.r.s)} {$exdata_c.r.s}{#sec#}{/if}
                                    </small>
                                </div>',type:'0'
                            {rdelim}]
                        {if $smarty.foreach.exdata_f.last}{else},{/if}
                        {/if}
                    {/foreach}
                            ]
                    {rdelim});
                            g_setSelectedLink(this, 'mapper'); return false" onmousedown="return false">
                        {$zone_c.name}</a>{if $zone_c.count>1}&nbsp;({$zone_c.count}){/if}{if $smarty.foreach.zone_f.last}.{else}, {/if}
                    {/foreach}
				</span>
            {/strip}
                <div id="mapper-generic"></div>
                <div class="clear"></div>
            {literal}
                <script type="text/javascript">
                    var myMapper = new Mapper({parent: 'mapper-generic', zone: '{$zonedata[0].zone}'});
                    gE(ge('locations'), 'a')[0].onclick();
                </script>
            {/literal}

            {else}
                {#This_Object_cant_be_found#}
            {/if}

            {if isset($object.pagetext)}
                <h3>Content</h3>
                <div id="book-generic"></div>
            {strip}
                <script>
                    new Book({ldelim} parent: 'book-generic', pages: [
                            {foreach from=$object.pagetext item=pagetext name=j}
                            '{$pagetext|escape:"javascript"}'
                            {if $smarty.foreach.j.last}{else},{/if}
                            {/foreach}
                        ]{rdelim})
                </script>
            {/strip}
            {/if}
            <h2>{#Related#}</h2>

        </div>

        <div id="tabs-generic"></div>
        <div id="listview-generic" class="listview"></div>

        <script type="text/javascript">
            {if isset($allitems)}{include file='bricks/allitems_table.tpl' data=$allitems}{/if}
            var tabsRelated = new Tabs({ldelim}parent: ge('tabs-generic'){rdelim});
            {if isset($object.drop)}{include file='bricks/item_table.tpl' id='contains' name='contains' tabsid='tabsRelated' data=$object.drop}{/if}
            {if isset($object.starts)}{include file='bricks/quest_table.tpl' id='starts' name='starts' tabsid='tabsRelated' data=$object.starts}{/if}
            {if isset($object.ends)}{include file='bricks/quest_table.tpl' id='ends' name='ends' tabsid='tabsRelated' data=$object.ends}{/if}
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

    </div>
</div>
</div>

{include file='footer.tpl'}
