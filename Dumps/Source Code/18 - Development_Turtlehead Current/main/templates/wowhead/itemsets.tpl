{config_load file="$conf_file"}
{include file='header.tpl'}

		<div id="main">
			<div id="main-precontents"></div>
			<div id="main-contents" class="main-contents">

				<script type="text/javascript">
					g_initPath({$page.path});
				</script>

				<div id="lv-itemsets" class="listview"></div>
				<script type="text/javascript">
					{include file='bricks/allitems_table.tpl'	data=$allitems}
					{include file='bricks/itemset_table.tpl'	data=$itemsets}
				</script>

				<div class="clear"></div>
			</div>
		</div>

{include file='footer.tpl'}
