<?php

return [

    'url' => [
        'youtube' => env('YOUTUBE_URL'),
        'discord' => env('DISCORD_URL'),
        'instagram' => env('INSTAGRAM_URL'),
        'twitter' => env('TWITTER_URL'),
        'github' => env('GITHUB_URL'),
        'soundcloud' => env('SOUNDCLOUD_URL'),
        'spotify' => env('SPOTIFY_URL'),
        'apple_music' => env('APPLE_MUSIC_URL'),
        'download_client' => env('DOWNLOAD_CLIENT_URL'),
        'armory' => env('ARMORY_URL'),
        'talents' => env('TALENTS_URL'),
        'database' => env('DATABASES_URL'),
        'forum' => env('FORUM_URL'),
        'changelog' => env('CHANGELOG_URL'),
        'wiki' => env('WIKI_URL'),
        'development_tools' => env('DEVELOPMENT_TOOLS_URL'),
        'bilibili' => env('BILIBILI_URL'),
    ],

    'donation' => [
        'gamepoints' => [
            'url' => env('GAMEPOINTS_URL'),
            'offer_url' => env('GAMEPOINTS_OFFER_URL'),
            'enabled' => env('GAMEPOINTS_ENABLED', false),
        ],
        'paymentwall' => [
            'secret' => env('PAYMENTWALL_SECRET'),
            'key' => env('PAYMENTWALL_KEY'),
            'widget' => env('PAYMENTWALL_WIDGET'),
            'sign_version' => env('PAYMENTWALL_SIGN_VERSION'),
            'enabled' => env('PAYMENTWALL_ENABLED', false),
        ],
        'enot' => [
            'secret' => env('ENOT_SECRET'),
            'merchant_id' => env('ENOT_MERCHANT_ID'),
            'enabled' => env('ENOT_ENABLED', false),
        ],
        'paypal' => [
            'enabled' => env('PAYPAL_ENABLED', false),
        ],
        'boosty' => [
            'enabled' => env('BOOSTY_ENABLED', false),
        ],
        'btcPay' => [
            'enabled' => env('BTCPAY_ENABLED', false),
            'apiKey' => env('BTCPAY_API_KEY'),
            'hostApi' => env('BTCPAY_HOST_API'),
            'hostPublic' => env('BTCPAY_HOST_PUBLIC'),
            'storeId' => env('BTCPAY_STORE_ID'),
            'secret' => env('BTCPAY_SECRET'),
            'bonusPercent' => env('BTCPAY_BONUS_PERCENT'),
        ],
    ],

    'matomo' => [
        'url' => env('MATOMO_URL'),
        'id' => env('MATOMO_ID')
    ],

    'google_tag_manager' => [
        'enabled' => env('GOOGLE_TAG_MANAGER_ENABLED', false),
        'id' => env('GOOGLE_TAG_MANAGER_ID')
    ],

    'cloudflare' => [
        'turnstile_site_key' => env('TURNSTILE_SITE_KEY'),
        'turnstile_secret_key' => env('TURNSTILE_SECRET_KEY')
    ],

    'mail' => [
        'system' => env('MAILER_SYSTEM'),
        'phpmailer_smtp_debug' => env('PHPMAILER_SMTP_DEBUG'),
        'phpmailer_host' => env('PHPMAILER_HOST'),
        'phpmailer_smtp_auth' => env('PHPMAILER_SMTP_AUTH'),
        'phpmailer_username' => env('PHPMAILER_USERNAME'),
        'phpmailer_password' => env('PHPMAILER_PASSWORD'),
        'phpmailer_smtp_secure' => env('PHPMAILER_SMTP_SECURE'),
        'phpmailer_port' => env('PHPMAILER_PORT'),
        'phpmailer_is_html' => env('PHPMAILER_IS_HTML'),
        'phpmailer_set_from_email' => env('PHPMAILER_SET_FROM_EMAIL'),
        'phpmailer_set_from_name' => env('PHPMAILER_SET_FROM_NAME'),
        'phpmailer_add_replay_to_email' => env('PHPMAILER_ADD_REPLAY_TO_EMAIL'),
        'phpmailer_add_replay_to_name' => env('PHPMAILER_ADD_REPLAY_TO_NAME')
    ],

    'sendgrid' => [
        'api_key' => env('SENDGRID_API_KEY')
    ],

    'external' => [
        'api_key' => env('EXTERNAL_API_KEY_ACCESS'),
        'turtle_eu' => [
            'url' => env('TURTLE_EU_API_URL'),
            'api_key' => env('TURTLE_EU_API_KEY')
        ]
    ],

    'realms' => [
        '1' => [
            'name' => env('REALM_1_NAME'),
            'id' => env('REALM_1'),
            'replication' => env('REALM_1_REPLICATION'),
            'hardcore' => env('REALM_1_HARDCORE'),
            'ip0' => env('REALM_1_IP0'),
            'port0' => env('REALM_1_PORT0'),
            'ip1' => env('REALM_1_IP1'),
            'port1' => env('REALM_1_PORT1'),
        ],
        '2' => [
            'name' => env('REALM_2_NAME'),
            'id' => env('REALM_2'),
            'replication' => env('REALM_2_REPLICATION'),
            'hardcore' => env('REALM_2_HARDCORE'),
            'ip0' => env('REALM_2_IP0'),
            'port0' => env('REALM_2_PORT0'),
            'ip1' => env('REALM_2_IP1'),
            'port1' => env('REALM_2_PORT1'),
        ],
        '3' => [
            'name' => env('REALM_3_NAME'),
            'id' => env('REALM_3'),
            'replication' => env('REALM_3_REPLICATION'),
            'hardcore' => env('REALM_3_HARDCORE'),
            'ip0' => env('REALM_3_IP0'),
            'port0' => env('REALM_3_PORT0'),
            'ip1' => env('REALM_3_IP1'),
            'port1' => env('REALM_3_PORT1'),
        ],
        '4' => [
            'name' => env('REALM_4_NAME'),
            'id' => env('REALM_4'),
            'replication' => env('REALM_4_REPLICATION'),
            'hardcore' => env('REALM_4_HARDCORE'),
            'ip0' => env('REALM_4_IP0'),
            'port0' => env('REALM_4_PORT0'),
            'ip1' => env('REALM_4_IP1'),
            'port1' => env('REALM_4_PORT1'),
        ],
        '5' => [
            'name' => env('REALM_5_NAME'),
            'id' => env('REALM_5'),
            'replication' => env('REALM_5_REPLICATION'),
            'hardcore' => env('REALM_5_HARDCORE'),
            'ip0' => env('REALM_5_IP0'),
            'port0' => env('REALM_5_PORT0'),
            'ip1' => env('REALM_5_IP1'),
            'port1' => env('REALM_5_PORT1'),
        ],
        '6' => [
            'name' => env('REALM_6_NAME'),
            'id' => env('REALM_6'),
            'replication' => env('REALM_6_REPLICATION'),
            'hardcore' => env('REALM_6_HARDCORE'),
            'ip0' => env('REALM_6_IP0'),
            'port0' => env('REALM_6_PORT0'),
            'ip1' => env('REALM_6_IP1'),
            'port1' => env('REALM_6_PORT1'),
        ]
    ],

    'bug_tracker' => [
        'enabled' => env('BUG_TRACKER_SYSTEM'),
    ],

    'transfer' => [
        'enabled' => env('TRANSFER_ENABLED', false),
        'account_level' => env('TRANSFER_ACCOUNT_LEVEL', 1),
        'api_key' => env('TRANSFER_API_KEY'),
        'api_url' => env('TRANSFER_API_URL'),
        'api_eu_key' => env('TRANSFER_API_EU_KEY'),
        'api_eu_url' => env('TRANSFER_API_EU_URL'),
        'realm_id_1' => env('TRANSFER_REALM_ID_1'),
        'realm_id_2' => env('TRANSFER_REALM_ID_2'),
        'realm_id_3' => env('TRANSFER_REALM_ID_3'),
        'realm_id_4' => env('TRANSFER_REALM_ID_4'),
        'realm_id_5' => env('TRANSFER_REALM_ID_5'),
        'realm_id_6' => env('TRANSFER_REALM_ID_6'),
        'realm_name_1' => env('TRANSFER_REALM_NAME_1'),
        'realm_name_2' => env('TRANSFER_REALM_NAME_2'),
        'realm_name_3' => env('TRANSFER_REALM_NAME_3'),
        'realm_name_4' => env('TRANSFER_REALM_NAME_4'),
        'realm_name_5' => env('TRANSFER_REALM_NAME_5'),
        'realm_name_6' => env('TRANSFER_REALM_NAME_6'),
        'realm_api_url_1' => env('TRANSFER_REALM_API_URL_1'),
        'realm_api_url_2' => env('TRANSFER_REALM_API_URL_2'),
        'realm_api_url_3' => env('TRANSFER_REALM_API_URL_3'),
        'realm_api_url_4' => env('TRANSFER_REALM_API_URL_4'),
        'realm_api_url_5' => env('TRANSFER_REALM_API_URL_5'),
        'realm_api_url_6' => env('TRANSFER_REALM_API_URL_6'),
        'realm_api_key_1' => env('TRANSFER_REALM_API_KEY_1'),
        'realm_api_key_2' => env('TRANSFER_REALM_API_KEY_2'),
        'realm_api_key_3' => env('TRANSFER_REALM_API_KEY_3'),
        'realm_api_key_4' => env('TRANSFER_REALM_API_KEY_4'),
        'realm_api_key_5' => env('TRANSFER_REALM_API_KEY_5'),
        'realm_api_key_6' => env('TRANSFER_REALM_API_KEY_6'),
        'shop_logs_range_from' => env('SHOP_LOGS_RANGE_FROM', 0),
        'shop_logs_range_to' => env('SHOP_LOGS_RANGE_TO', 0),
    ],

    'shop_appeals' => [
        'enabled' => env('SHOP_APPEALS_ENABLED', false),
    ],

    'profile' => [
        'change_email' => [
            'enabled' => env('CHANGE_EMAIL_ENABLED', false),
        ]
    ],

    'mattermost' => [
        'bug_tracker' => [
            'enabled' => env('MATTERMOST_BUG_TRACKER_ENABLED', false),
            'webhook_url' => env('MATTERMOST_BUG_TRACKER_WEBHOOK_URL'),
        ],
        'dynamic_content' => [
            'enabled' => env('MATTERMOST_DYNAMIC_CONTENT_ENABLED', false),
            'webhook_url' => env('MATTERMOST_DYNAMIC_CONTENT_WEBHOOK_URL'),
        ],
    ],

    'radio' => [
        'stream_url' => env('RADIO_STREAM_URL'),
    ],

    'shellcoin' => [
        'enabled' => env('SHELLCOIN_ENABLED', false),
    ],

    'population_graph' => [
        'enabled' => env('POPULATION_GRAPH_ENABLED', false),
    ],

    'armory' => [
        'enabled' => env('ARMORY_ENABLED', false),
    ]
];
