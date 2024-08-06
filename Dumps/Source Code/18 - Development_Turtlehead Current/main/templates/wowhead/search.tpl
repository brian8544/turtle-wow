{include file='header.tpl'}
<div id="main">
	<div id="main-precontents"></div>
	<div class="main-contents" id="main-contents">
{if $found}
		<div class="text">
			<a href="http://classic.wowhead.com/?{$query}" class="button-red"><div><blockquote><i>Wowhead</i></blockquote><span>Wowhead</span></div></a>
			<h1>{#Search_results_for#} <i>{$search|escape:"html"}</i></h1>
		</div>
		<div id="tabs-generic"></div>
		<div id="listview-generic" class="listview"></div>
<script type="text/javascript">
{if $allitems}{include		file='bricks/allitems_table.tpl'	data=$allitems}{/if}
{if $allspells}{include		file='bricks/allspells_table.tpl'	data=$allspells}{/if}
var myTabs = new Tabs({ldelim}parent: ge('tabs-generic'){rdelim});
{if $found.item}{include	file='bricks/item_table.tpl'		id='items'		name='items'				tabsid='myTabs' data=$found.item	}{/if}
{if $found.npc}{include		file='bricks/creature_table.tpl'	id='npcs'		name='npcs'					tabsid='myTabs' data=$found.npc		}{/if}
{if $found.object}{include	file='bricks/object_table.tpl'		id='objects'	name='objects'				tabsid='myTabs' data=$found.object	}{/if}
{if $found.quest}{include	file='bricks/quest_table.tpl'		id='quests'		name='quests'				tabsid='myTabs' data=$found.quest	}{/if}
{if $found.itemset}{include	file='bricks/itemset_table.tpl'		id='itemsets'	name='itemsets'				tabsid='myTabs' data=$found.itemset	}{/if}
{if $found.spell}{include	file='bricks/spell_table.tpl'		id='spells'		name='uncategorizedspells'	tabsid='myTabs' data=$found.spell	}{/if}
myTabs.flush();
</script>
		<div class="clear"></div>
	{else}
		<div class=text>
			<a href="http://www.wowhead.com/?{$query}" class="button-red"><div><blockquote><i>Wowhead</i></blockquote><span>Wowhead</span></div></a>
			<h1>{#Search_results_for#} <i>{$search|escape:"html"}</i></h1>
		</div>
		{/if}
		</div>
	</div>
{include file='footer.tpl'}
