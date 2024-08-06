{*
		ШАБЛОН ТАБЛИЦЫ СОЗДАНИЙ
	Переменные, передаваемые шаблону:
	id     - идентификатор/тип табл
	name   - название табл
	tabsid - идентификатор вкладок
	data   - данные для табл

	Пример вставки модуля в текст:
		Со вкладками:
	{include file='bricks/creature_table.tpl' id='dropped-by' tabsid='tabsRelated' data=$droppedby name=#droppedby#}
		Без вкладок:
	{include file='bricks/creature_table.tpl' id='items' data=$items}
*}

{strip}

    {assign var="cost" value=false}
    {assign var="stack" value=false}
    {assign var="group" value=false}
    {assign var="percent" value=false}

    {foreach from=$data item=curr}
        {if isset($curr.cost)}{assign var="cost" value=true}{/if}
        {if isset($curr.stack)}{assign var="stack" value=true}{/if}
        {if isset($curr.percent)}{assign var="percent" value=true}{/if}
        {if isset($curr.group)}{assign var="group" value=true}{/if}
    {/foreach}

{*    {$data|@print_r}*}

    new Listview(
    {ldelim}template:'npc',
    id:'{$id}',
    {if isset($name)}name: LANG.tab_{$name},{/if}
    {if isset($tabsid)}tabs:{$tabsid},parent: 'listview-generic',{/if}
    extraCols:[
    {if $percent}Listview.extraCols.percent{/if}
    {if $cost}Listview.extraCols.stock, {if $stack}Listview.funcBox.createSimpleCol('stack', 'stack', '10%', 'stack'),{/if} Listview.extraCols.cost{/if}
    ],
{*    		hiddenCols:[{if $cost}'type'{else}'location'{/if}],*}
    sort: [{if $percent}'-percent',{/if} 'name'],
    data:[
    {section name=i loop=$data}
        {ldelim}
        name: '{$data[i].name|escape:"quotes"}',
        {if $data[i].subname}
            tag: '{$data[i].subname|escape:"quotes"}',
        {/if}
        minlevel: {$data[i].level_min},
        maxlevel: {$data[i].level_max},
        type: {$data[i].type},
        classification: {$data[i].classification},
        location: {$data[i].location},
        react: [{$data[i].react}],
        {if $percent}
            percent: {$data[i].percent},
        {/if}
        {if $cost}
            stock: {$data[i].stock},
            {if isset($data[i].stack)}
                stack: {$data[i].stack},
            {/if}
            cost: [
            {if isset($data[i].cost.money)}{$data[i].cost.money}{/if}
            {if isset($data[i].cost.honor) or isset($data[i].cost.arena) or isset($data[i].cost.items)}
                ,{if isset($data[i].cost.honor)}{$data[i].cost.honor}{/if}
                {if isset($data[i].cost.arena) or isset($data[i].cost.items)}
                    ,{if isset($data[i].cost.arena)}{$data[i].cost.arena}{/if}
                    {if isset($data[i].cost.items)}
                        ,[
                        {foreach from=$data[i].cost.items item=curitem name=c}
                            [{$curitem.item},{$curitem.count}]
                            {if $smarty.foreach.c.last}{else},{/if}
                        {/foreach}
                        ]
                    {/if}
                {/if}
            {/if}
            ],
        {/if}
        id: {$data[i].entry}
    {rdelim}
        {if $smarty.section.i.last}{else},{/if}
    {/section}
    ]
{rdelim}
    );
{/strip}
