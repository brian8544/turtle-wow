{*
		ШАБЛОН ИНФОРМАЦИИ О ВЕЩЯХ
	Переменные, передаваемые шаблону:
	data   - данные для табл

	Пример вставки модуля в текст:
		{include file='bricks/allitems_table.tpl' data=$allitems}
*}
var _ = g_items;
{strip}
	{foreach from=$data key=id item=item}
		_[{$id}]={ldelim}icon: '{$item.icon}'{rdelim};
	{/foreach}
{/strip}