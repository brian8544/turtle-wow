{strip}
new Listview({ldelim}template: 'faction', id: 'factions', data: [
{section name=i loop=$data}
{ldelim}
	id: {$data[i].entry},
	name: '{$data[i].name|escape:"quotes"}'
	{if isset($data[i].group)},group: '{$data[i].group|escape:"quotes"}'{/if}
	{if isset($data[i].side)},side: '{$data[i].side|escape:"quotes"}'{/if}
{rdelim}{if $smarty.section.i.last}{else},{/if}
{/section}
]{rdelim});
{/strip}