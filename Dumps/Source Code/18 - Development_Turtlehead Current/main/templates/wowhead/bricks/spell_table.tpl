{strip}

{assign var="level" value=false}
{assign var="skill" value=false}
{assign var="reagents" value=false}

{foreach from=$data item=curr}
	{if $curr.level}{assign var="level" value=true}{/if}
	{if $curr.skill}{assign var="skill" value=true}{/if}
	{if $curr.reagents}{assign var="reagents" value=true}{/if}
{/foreach}

	new Listview({ldelim}
		template:'spell',
		id:'{$id}',
		{if isset($name)}name: LANG.tab_{$name},{/if}
		visibleCols: [{if $level}'level'{/if}],
		hiddenCols: [{if !$reagents}'reagents',{/if}{if !$skill}'skill',{/if}'school'],
		sort: [{if isset($sort)}{$sort}{else}'name'{/if}],
		{if $script}note: sprintf(LANG.lvnote_scripttype, '{$script|escape:"quotes"}'),{/if}
		{if isset($tabsid)}tabs:{$tabsid}, parent: 'listview-generic',{/if}
		data:[
			{section name=i loop=$data}
				{ldelim}
					name: '{$data[i].quality}{$data[i].name|escape:"quotes"}',
					{if $level}level: {$data[i].level},{/if}
					school: {$data[i].school},
					{if isset($data[i].rank)}
						rank: '{$data[i].rank|escape:"quotes"}',
					{/if}
					{if isset($data[i].skill)}
						skill: [{$data[i].skill}],
					{/if}
					{if $data[i].reagents}
						reagents:[
							{section name=j loop=$data[i].reagents}
								[{$data[i].reagents[j].entry},{$data[i].reagents[j].count}]
								{if $smarty.section.j.last}{else},{/if}
							{/section}
						],
					{/if}
					{if isset($data[i].creates)}
						creates:[
							{section name=j loop=$data[i].creates}
								{$data[i].creates[j].entry},
								{$data[i].creates[j].count}
								{if $smarty.section.j.last}{else},{/if}
							{/section}
						],
					{/if}
					{if isset($data[i].learnedat)}
						learnedat: {$data[i].learnedat},
					{/if}
					{if isset($data[i].colors)}
						colors:[
							{section name=j loop=$data[i].colors}
								{$data[i].colors[j]}
								{if $smarty.section.j.last}{else},{/if}
							{/section}
						],
					{/if}
					id: {$data[i].entry}
				{rdelim}
				{if $smarty.section.i.last}{else},{/if}
			{/section}
		]
	{rdelim});
{/strip}