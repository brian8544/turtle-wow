<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'email_template' => [
        'welcome_body' => '帐户创建成功！欢迎，年轻的乌龟魔兽玩家。祝你在冒险中好运，但请记住，慢而稳定赢得比赛！
                            <br>
                            <br>
                            您的帐户名称：:username<br>
                            您的帐户恢复关键字是：:keyword <i><- 请记下！</i><br>
                            帐户创建日期：:joinDate
                            <br>
                            <br>
                            您的帐户需要在登录之前激活。请访问 :verificationUrl
                            或点击 <a href=":verificationUrl" target="_blank">这里</a> 激活您的帐户。
                            <br>
                            <br>
                            请阅读我们的 <a href=":rulesUrl">使用条款</a>，如果您对这些条款或与我们的服务器相关的任何事情有任何问题，请随时通过我们的 <a href=":discordUrl">Discord 渠道</a> 或我们的 <a href=":forumUrl">论坛</a> 的支持部分向我们提问。',
        'change_email_body' => '您好，:username！
                                <br>
                                <br>
                                请点击 <a clicktracking=off href=":changeEmailUrl" target="_blank">这里</a> 确认您的新电子邮件地址。
                                <br>
                                <br>
                                乌龟 WoW，
                                <br>
                                <a clicktracking=off href=":homeUrl" target="_blank">:homeUrl</a><br>',
        'reset_password_body' => '您好！:username<br/>
                                    有人使用您的电子邮件重置了乌龟魔兽的密码。<br/>
                                    如果您没有这样做，请忽略此封信件。<br/>
                                    <hr>
                                    <br/>
                                    为确认重置密码，请<a href=":resetPasswordUrl" target="_blank">点击这里</a>。'
    ],
    'login_modal' => [
        'welcome' => '欢迎 :username，请输入您的密码。',
        'welcome2fa' => '欢迎 :username，请输入您的一次性验证码。',
        'change_username' => '不是 :username？更改用户名。'
    ],
    'donate_modal' => [
        'thank_you' => '<h2 class="orange-text font-weight-bold">谢谢</h2>
                        <h4 class="orange-text font-weight-bold">支持</h4>
                        <h3 class="orange-text font-weight-bold">乌龟魔兽！</h3>'
    ],
    'hearthstone_cd' => '(炉石冷却 (Lúshí lěngquè): :cd)',
    'hc_table_label' => '(显示 :current 共 :total)',
    'shop_appeal_unseen_messages' => '未读 :count 条信息',
    'shop_appeal_delivered_messages' => '已发送 :count 条信息',
    'ban_appeal_unseen_messages' => '已发送 :count 条信息',
    'locked_request' => '您的请求当前已锁定。请在 :time 秒后重试。',
    'success_edit_world_config' => '成功将变量 :variable 从 :oldValue 更新为 :newValue',
    'success_reload_config' => '成功重新加载了领域 :realm 的配置',
    'invalid_email' => '您输入的 :email 无效。请确保它符合以下格式：username@example.com。',
    'unknown_provider' => '您提供的 :email 地址的 :domain 域名未知或不受支持。请检查域名并重试。',
    'too_many_reports' => '您已达到可以提交的报告最大数量。请在 :time 后再试。',
];
