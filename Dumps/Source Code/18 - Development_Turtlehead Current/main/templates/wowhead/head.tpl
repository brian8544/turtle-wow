	<title>{if $page.Title}{$page.Title|escape:"html"} - {/if}{$app_name}</title>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
{*	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">*}
	<link rel="SHORTCUT ICON" href="templates/wowhead/images/favicon.ico">

	<script src="templates/wowhead/js/locale_{$language}.js" type="text/javascript"></script>

	<link href="templates/wowhead/css/locale_{$language}.css" type="text/css" rel="stylesheet">
	<link href="templates/wowhead/css/global.css" type="text/css" rel="stylesheet">
{if $page.Mapper}
	<link href="templates/wowhead/css/Mapper.css" type="text/css" rel="stylesheet">
{/if}
{if $page.Book}<link rel="stylesheet" type="text/css" href="templates/wowhead/css/Book.css">{/if}

	<script src="templates/wowhead/js/global.js" type="text/javascript"></script>
	<script src="templates/wowhead/js/Markup.js" type="text/javascript"></script>
{if $page.Mapper}
	<script src="templates/wowhead/js/Mapper.js" type="text/javascript"></script>
{/if}
{if $page.Book}
	<script src="templates/wowhead/js/Book.js" type="text/javascript"></script>
{/if}
	<script type="text/javascript">
		var g_serverTime = new Date('{$smarty.now|date_format:"%Y/%m/%d %H:%M:%S"}');
		g_locale = {ldelim} id: {$locale}, name: '{$language}' {rdelim};
{if $user}
		g_user = {ldelim} id: {$user.id}, name: '{$user.name|escape:quotes}', roles: {$user.roles}, permissions: {$user.perms} {rdelim};
{/if}
	</script>
