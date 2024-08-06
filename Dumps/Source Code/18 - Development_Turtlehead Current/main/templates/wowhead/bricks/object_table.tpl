{strip}

{assign var="percent" value=false}
{assign var="skill" value=false}

{foreach from=$data item=curr}
	{if isset($curr.percent)}{assign var="percent" value=true}{/if}
	{if isset($curr.skill)}{assign var="skill" value=true}{/if}
{/foreach}

new Listview({ldelim}
	template:'object',
	id:'{$id}',
	{if isset($name)}name: LANG.tab_{$name},{/if}
	{if isset($tabsid)}tabs:{$tabsid},parent:'listview-generic',{/if}
	{if $percent}extraCols:[Listview.extraCols.percent],{/if}
	{if $skill}visibleCols:['skill'],{/if}
	sort: [{if $skill}'skill',{/if}{if $percent}'-percent',{/if} 'name'],
	hiddenCols:[],
	data:[
		{section name=i loop=$data}
			{ldelim}
				{* Название обекта, обязательно *}
				name: '{$data[i].name|escape:"quotes"}',
				{* Тип обекта, обязательно *}
				type: {$data[i].type},
				{* Процент дропа *}
				{if $percent}
					percent: {$data[i].percent},
				{/if}
				{* Необходимый уровень скилла *}
				{if $skill}
					skill: {$data[i].skill},
				{/if}
				{* Номер объекта, обязателен *}
					id: {$data[i].entry}
				{rdelim}
				{if $smarty.section.i.last}{else},{/if}
		{/section}
	]{rdelim}
);
{/strip}