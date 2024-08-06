{strip}
	new Listview({ldelim}
		template: 'itemset',
		id: 'itemsets',
		{if isset($name)}name: LANG.tab_{$name},{/if}
		{if isset($tabsid)}tabs:{$tabsid},parent:'listview-generic',{/if}
		data: [
			{section name=i loop=$data}
				{ldelim}
					name: '{$data[i].quality2}{$data[i].name|escape:"quotes"}',
					{if $data[i].minlevel}minlevel: {$data[i].minlevel},{/if}
					{if $data[i].maxlevel}maxlevel: {$data[i].maxlevel},{/if}
					{if $data[i].pieces}pieces:[{section name=j loop=$data[i].pieces}{$data[i].pieces[j]}{if $smarty.section.j.last}{else},{/if}{/section}],{/if}
					{if isset($data[i].type)}type: {$data[i].type},{/if}
					id: {$data[i].entry}
				{rdelim}
				{if $smarty.section.i.last}{else},{/if}
			{/section}
		]
	{rdelim});
{/strip}