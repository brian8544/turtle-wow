{*
		ШАБЛОН ТАБЛИЦ
	Переменные, передаваемые шаблону:
	id     - идентификатор/тип табл
	name   - название табл
	tabsid - идентификатор вкладок
	data   - данные для табл

	Пример вставки модуля в текст:
	{include file='bricks/table.tpl' id='dropped-by' tabsid='tabsRelated' data=$droppedby name=#droppedby#}
*}

<div id="tabs-generic"></div>
<div id="listview-generic" class="listview"></div>
<script type="text/javascript">
	var {$tabsid} = new Tabs({ldelim}parent: ge('tabs-generic'){rdelim});
	{section name=k loop=$data}
		{include file=$data[k].file id=$data[k].id tabsid=$tabsid data=$data[k].data name=$data[k].name}
	{/section}
	tabsRelated.flush();
</script>