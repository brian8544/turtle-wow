{strip}
	new Listview({ldelim}
		template:'zone',
		id:'fished-in',
		{if $name}name: LANG.tab_{$name}{/if},
		tabs:tabsRelated,
		parent:'listview-generic',
		hiddenCols: ['instancetype', 'level', 'territory', 'category'],
		extraCols: [Listview.extraCols.percent],
		sort:['-percent', 'name'],
		data:[
			{section name=i loop=$data}
				{ldelim}
					id: '{$data[i].id}',
					name: '{$data[i].name|escape:"quotes"}',
					percent: {$data[i].percent}
				{rdelim}
				{if $smarty.section.i.last}{else},{/if}
			{/section}
		]
	{rdelim});
{/strip}