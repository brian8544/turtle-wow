<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => ':attribute 必须填写',
    'accepted_if'          => ':attribute 在 :other 是 :value. 的时候必须填写',
    'active_url'           => ':attribute 必须是一个合法的URL',
    'after'                => ':attribute 必须是 :date 之后的一个日期',
    'after_or_equal'       => ':attribute 必须是 :date 或之后的一个日期',
    'alpha'                => ':attribute 只能包含字母',
    'alpha_dash'           => ':attribute 只能包含字母、数字、中划线或下划线',
    'alpha_num'            => ':attribute 只能包含字母或数字',
    'array'                => ':attribute 必须是一个数组',
    'before'               => ':attribute 必须是 :date 之前的一个日期',
    'before_or_equal'      => ':attribute 必须是 :date 或之前的一个日期',
    'between' => [
        'numeric' => ':attribute 必须在 :min 和 :max 之间',
        'file'    => ':attribute 必须在 :min 和 :max KB 之间',
        'string'  => ':attribute 必须在 :min 和 :max 个字符之间',
        'array'   => ':attribute 必须在 :min 和 :max 项之间',
    ],
    'boolean'              => ':attribute 字符必须是 true 或 false',
    'confirmed'            => ':attribute 二次确认不匹配',
    'current_password'     => '密码不正确.',
    'date'                 => ':attribute 必须是一个合法的日期',
    'date_equals'          => ':attribute 必须是一个日期且等于 :date.',
    'date_format'          => ':attribute 与给定的格式 :format 不一致',
    'declined'             => ':attribute 必须被拒绝.',
    'declined_if'          => ':attribute 当 :other 是 :value 时必须被拒绝',
    'different'            => ':attribute 和 :other 必须不同',
    'digits'               => ':attribute 必须是 :digits 位',
    'digits_between'       => ':attribute 必须在 :min 至 :max 位之间',
    'dimensions'           => ':attribute 无效的图片尺寸',
    'distinct'             => ':attribute 字段具有重复址',
    'email'                => ':attribute 必须是一个合法的电子邮件地址',
    'ends_with'            => ':attribute 必须以此结尾: :values.',
    'exists'               => '选定的 :attribute 是无效的',
    'file'                 => ':attribute 必须是一个文件',
    'filled'               => ':attribute 字段是必填项',
    'gt' => [
        'numeric'          => ':attribute 必须大于 :value.',
        'file'             => ':attribute 必须大于 :value 千字节.',
        'string'           => ':attribute 必须大于 :value 字符.',
        'array'            => ':attribute 必须大于 :value 项目.',
    ],
    'gte' => [
        'numeric'          => ':attribute 必须大于等于 :value.',
        'file'             => ':attribute 必须大于等于 :value 千字节.',
        'string'           => ':attribute 必须大于等于 :value 字符.',
        'array'            => ':attribute 必须包含 :value 项目或更多.',
    ],
    'image'                => ':attribute 必须是 jpeg, png, bmp, 或者 gif 格式图像',
    'in'                   => '选定的 :attribute 是无效的',
    'in_array'             => ':attribute 字段在 :other 中不存在',
    'integer'              => ':attribute 必须是整数',
    'ip'                   => ':attribute 必须是一个合法的IP地址',
    'ipv4'                 => ':attribute 必须是一个合法的 IPv4 地址',
    'ipv6'                 => ':attribute 必须是一个合法的 IPv6 地址',
    'json'                 => ':attribute 必须是一个合法的 JSON 字符串',
    'lt' => [
        'numeric'          => ':attribute 必须小于 :value.',
        'file'             => ':attribute 必须小于 :value 千字节.',
        'string'           => ':attribute 必须小于 :value characters.',
        'array'            => ':attribute 必须包含少于 :value 项目.',
    ],
    'lte' => [
        'numeric'          => ':attribute 必须小于等于 to :value.',
        'file'             => ':attribute 必须小于等于 to :value 千字节.',
        'string'           => ':attribute 必须小于等于 to :value characters.',
        'array'            => ':attribute 必须包含不多于 :value 项目.',
    ],
    'max' => [
        'numeric'          => ':attribute 的最大长度为 :max.',
        'file'             => ':attribute 大小至少为 :max ',
        'string'           => ':attribute 的长度至少为 :max 字符',
        'array'            => ':attribute 至少为 :max 项',
    ],
    'mimes'                => ':attribute 的文件类型必须为 type: :values.',
    'mimetypes'            => ':attribute 的文件类型必须为 type: :values.',
    'min'                  => [
        'numeric'          => ':attribute 的最小长度为 :min 位',
        'file'             => ':attribute 大小至少为 :min ',
        'string'           => ':attribute 的最小长度为 :min 字符',
        'array'            => ':attribute 至少有 :min 项',
    ],
    'multiple_of'          => ':attribute 必须为倍数 :value.',
    'not_in'               => '选定的 :attribute 是无效的',
    'not_regex'            => ':attribute 格式不正确.',
    'numeric'              => ':attribute 必须是数字',
    'password'             => '密码不正确.',
    'present'              => ':attribute 字段必须展现.',
    'prohibited'           => ':attribute 字段是被禁止的.',
    'prohibited_if'        => ':attribute 字段是被禁止的在 :other 是 :value.',
    'prohibited_unless'    => ':attribute 字段是被禁止的除非 :other 是在 :values.',
    'prohibits'            => ':attribute 字段是被禁止的如果 :other 被展现.',
    'regex'                => ':attribute 格式是无效的',
    'required'             => ':attribute 字段是必须的',
    'required_if'          => ':attribute 字段是必须的当 :other 是 :value.',
    'required_unless'      => ':attribute 字段是必须的除非 :other 是在 :values.',
    'required_with'        => ':attribute 字段是必须的当 :values 存在时',
    'required_with_all'    => ':attribute 字段是必须的当 :values 存在时',
    'required_without'     => ':attribute 字段是必须的当 :values 存在时',
    'required_without_all' => ':attribute 字段是必须的当没有一个 :values 存在时',
    'same'                 => ':attribute 和 :other 必须',
    'size' => [
        'numeric'          => ':attribute 必须是 :size 位',
        'file'             => ':attribute 必须是 :size ',
        'string'           => ':attribute 必须是 :size 个字符',
        'array'            => ':attribute 必须包括 :size 项',
    ],
    'starts_with'          => ':attribute 必须以以下内容开头: :values.',
    'string'               => ':attribute 必须是一个字符串',
    'timezone'             => ':attribute 必须是一个有效的时区',
    'unique'               => ':attribute 已存在',
    'uploaded'             => ':attribute 上传失败',
    'url'                  => ':attribute 无效的格式',
    'uuid'                 => ':attribute 必须是一个有效的 UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'forumUsername' => "论坛用户名",
        'forumEmail' => "论坛邮箱"
    ],

];
