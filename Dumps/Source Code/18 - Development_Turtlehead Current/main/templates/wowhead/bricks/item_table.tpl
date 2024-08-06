{strip}

    {assign var="cost" value=true}
    {assign var="percent" value=false}
    {assign var="classs1" value=true}
    {assign var="classs2" value=true}
    {assign var="classs4" value=true}
    {assign var="group" value=false}
    {assign var="description" value=false}

    {foreach from=$data item=curr}
        {if !(isset($curr.cost))}{assign var="cost" value=false}{/if}
        {if isset($curr.percent)}{assign var="percent" value=true}{/if}
        {if !($curr.classs==1)}{assign var="classs1" value=false}{/if}
        {if !($curr.classs==2)}{assign var="classs2" value=false}{/if}
        {if !($curr.classs==4)}{assign var="classs4" value=false}{/if}
        {if ($curr.classs==15 && ($curr.subclass==2 || $curr.subclass==4))}{assign var="description" value=true}{/if}
        {if isset($curr.group)}{assign var="group" value=true}{/if}
    {/foreach}

    new Listview(
    {ldelim}template:'item',
    id:'{$id}',
    {if (isset($name))}name: LANG.tab_{$name},{/if}
    {if (isset($tabsid))}tabs:{$tabsid},parent:'listview-generic',{/if}
    extraCols:[
    {if $description}Listview.funcBox.createSimpleCol('description', 'description', '40%', 'description'),{/if}
    {if $percent}Listview.extraCols.percent{/if}
    {if $group},Listview.funcBox.createSimpleCol('group', 'group', '10%', 'group'){/if}
    {if $cost}Listview.extraCols.stock, Listview.extraCols.cost{/if}
    ],
    {if $classs1}visibleCols: ['slots'],
    {elseif $classs2}visibleCols: ['dps', 'speed'],
    {elseif $classs4}visibleCols: ['armor', 'slot'],{/if}
    hiddenCols:['source'],
    sort: [{if $percent}'-percent',{/if}'name'],
    data: [
    {section name=i loop=$data}
        {ldelim}
        {* Название/качество вещи, обязательно *}
        name: '{$data[i].quality2}{$data[i].name|escape:"quotes"}',
        description: '{$data[i].description|escape:"quotes"}',
        {* Уровень вещи *}
        {if $data[i].level}
            level: {$data[i].level},
        {/if}
        {* Требуемый уровень вещи *}
        {if $data[i].reqlevel}
            reqlevel: {$data[i].reqlevel},
        {/if}
        {* Класс вещи, обязательно *}
        classs: {$data[i].classs},
        {* Подкласс вещи, обязательно *}
        subclass: {$data[i].subclass},
        {* Кол-во вещей при дропе *}
        {if isset($data[i].maxcount)}
            {if $data[i].maxcount>1}
                stack:[{$data[i].mincount},{$data[i].maxcount}],
            {/if}
        {/if}
        {* Процент дропа *}
        {if $percent}
            percent: {$data[i].percent},
        {/if}
        {if isset($data[i].group) and isset($data[i].grouppercent)}
            group: '{$data[i].group} [{$data[i].grouppercent}%]',
        {/if}
        {* Стоимость *}
        {if $cost}
            {* Макс. кол-во на продажу *}
            stock: -1,
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
        {if $classs1==1}
            nslots: {$data[i].slots},
        {/if}
        {if $classs2}
            dps: {$data[i].dps},
            speed: {$data[i].speed},
        {/if}
        {if $classs4}
            armor: {$data[i].armor},
            slot: {$data[i].slot},
        {/if}
        {* Номер вещи, обязателен *}
        id: {$data[i].entry}
    {rdelim}{if $smarty.section.i.last}{else},{/if}
    {/section}
    ]{rdelim}
    );
{/strip}
