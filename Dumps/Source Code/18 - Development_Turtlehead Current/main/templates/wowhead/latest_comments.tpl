{config_load file="$conf_file"}
{include file='header.tpl'}

<div id="main">
	<div id="main-precontents"></div>
	<div id="main-contents" class="main-contents">
		<script type="text/javascript">
			g_initPath({$page.path})
		</script>
		<div class="text">
			<div class="h1-links"></div>
			<h1>{#Latest_Comments#}</h1>
		</div>
		<div id="lv-comments" class="listview"></div>
		<script type="text/javascript">
			{strip}
			new Listview({ldelim}template: 'commentpreview', id: 'comments', data: [
			{foreach name=foo from=$comments key=number item=comment}
				{ldelim}
					id:{$comment.id},
					type:{$comment.type},
					typeId:{$comment.typeID},
					subject:'{$comment.subject|escape:"javascript"}',
					preview:'{$comment.preview|escape:"javascript"}',
					user:'{$comment.user|escape:"javascript"}',
					rating: {$comment.rating},
					date:'{$comment.date|date_format:"%Y/%m/%d %H:%M:%S"}',
					elapsed:{$comment.elapsed},
					purged: {$comment.purged},
					deleted:0
				{rdelim}
				{if $smarty.foreach.foo.last}{else},{/if}
			{/foreach}
			]{rdelim});
			{/strip}
		</script>
		<div class="clear"></div>
	</div>
</div>

{include file='footer.tpl'}
