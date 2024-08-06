{strip}
	new Listview({ldelim}
		template:'quest',
		id:'{$id}',
		{if isset($name)}name: LANG.tab_{$name},{/if}
		{if isset($tabsid)}tabs:{$tabsid},parent:'listview-generic',{/if}
		data:[
			{section name=i loop=$data}
				{ldelim}
					id: '{$data[i].id}',
					name: '{$data[i].Title|escape:"quotes"}',
					level: '{$data[i].QuestLevel}',
					{if ($data[i].MinLevel)}
						reqlevel:{$data[i].MinLevel},
					{/if}
					side: '{$data[i].side.side}'
					{if isset($data[i].itemrewards)}
						,itemrewards:[
							{section name=j loop=$data[i].itemrewards}
								[{$data[i].itemrewards[j][0].entry},{$data[i].itemrewards[j].count}]
								{if $smarty.section.j.last}{else},{/if}
							{/section}
						]
					{/if}
					{if isset($data[i].itemchoices)}
						,itemchoices:[
							{section name=j loop=$data[i].itemchoices}
								[{$data[i].itemchoices[j][0].entry},{$data[i].itemchoices[j].count}]
								{if $smarty.section.j.last}{else},{/if}
							{/section}
						]
					{/if}
					{if isset($data[i].xp)}
						,xp:{$data[i].xp|round}
					{/if}
					{if isset($data[i].money)}
						,money:{$data[i].money}
					{/if}
					{if isset($data[i].category)}
						,category:{$data[i].category}
					{/if}
					{if isset($data[i].maincat)}
						,category2:{$data[i].maincat}
					{/if}
					{if isset($data[i].type)}
						,type:{$data[i].type}
					{/if}
					{if isset($data[i].Daily)}
						,daily: 1
					{/if}
				{rdelim}
				{if $smarty.section.i.last}{else},{/if}
			{/section}
		]
	{rdelim});
{/strip}
