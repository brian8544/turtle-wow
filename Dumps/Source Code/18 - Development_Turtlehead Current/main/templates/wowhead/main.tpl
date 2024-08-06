{config_load file="$conf_file"}
<html>
<head>
    {include file='head.tpl'}
    <style type="text/css">
        {literal}
        .menu-buttons a {
            border-color: black
        }

        .news {
            position: relative;
            text-align: left;
            width: 415px;
            height: 191px;
            margin: 30px auto 0 auto;
            background: url(templates/wowhead/images/mainpage-bg-news-{/literal}{$language}{literal}.jpg) no-repeat
        }

        .news-list {
            padding: 26px 0 0 26px;
            margin: 0
        }

        .news-list li {
            line-height: 2em
        }

        .news-img1 {
            position: absolute;
            left: 60px;
            top: 155px;
            width: 172px;
            height: 17px
        }

        .news-img2 {
            position: absolute;
            left: 246px;
            top: 48px;
            width: 145px;
            height: 127px
        }

        .news-talent {
            position: absolute;
            left: 240px;
            top: 29px;
            width: 152px;
            height: 146px
        }

        {/literal}
    </style>
</head>
<body>
<div id="layers"></div>
<noscript>
    <div id="noscript-bg"></div>
    <div id="noscript-text"><b>{#js_err#}</div>
</noscript>
<div id="home">
    <h1>{$title}</h1>
    <span id="menu-buttons-generic" class="menu-buttons"></span>
    <script type="text/javascript">
        // Menu.addButtons(ge('menu-buttons-generic'), mn_path);
    </script>
    <div class="pad"></div>

    {*    <div id="toplinks" class="toplinks">*}
    {*        {if $user}<a href="?user={$user.name}">{$user.name}</a>|<a href="?account=signout">{#Sign_out#}</a>{else}<a*}
    {*                href="?account=signin">{#Sign_in#}</a>{/if}|<a href="javascript:;" id="language-changer">{#Language#}*}
    {*            <small>&#9660;</small></a>*}
    {*    </div>*}

    {*    <script type="text/javascript">g_initLanguageChanger()</script>*}

    <div class="pad"></div>

{*    <h4 class="pepega">*}
{*    Like the name states, Mysteries of Azeroth brings numerous new mysteries and secrets to uncover around Azeroth.*}
{*    <BR><BR>*}
{*    In the spirit of the new expansion, we have decided to disable online DB for the first week after the launch. <br>So be*}
{*    the first to travel, explore and face the new, never before seen challenges.*}
{*    </h4>*}

    <form method="get" action="?" onsubmit="this.elements[0].value = trim(this.elements[0].value).trim(); if(trim(this.elements[0].value) == '' || trim(this.elements[0].value).length <= 2) return false">
        <input type="text" name="search" size="38" id="search-generic"/><input type="submit" value="{#search#}"/>
    </form>

{*        {if $news}*}
{*            <div class="news">*}
{*                <div class="news-list text">*}
{*                    <ul>*}
{*                        {foreach from=$news item=item}*}
{*                            <li>*}
{*                                <div>{$item.text}</div>*}
{*                            </li>*}
{*                        {/foreach}*}
{*                    </ul>*}
{*                </div>*}
{*            </div>*}
{*        {/if}*}

    <script type="text/javascript">
        var _ = ge('search-generic');
        LiveSearch.attach(_);
        _.focus()
    </script>

    {include file='footer.tpl'}

    <div id="footer">
        {*        {foreach from=$version item=item}*}
        {*            {$item.text}.*}
        {*        {/foreach}*}
        <br/>Based on <span style="color: #8dc63f;">AoWoW</span>
    </div>

</body>
</html>
