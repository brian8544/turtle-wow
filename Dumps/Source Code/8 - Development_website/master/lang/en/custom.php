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
        'welcome_body' => 'Account creation successful! Welcome, young turtle. We wish you the best of luck on your adventures, but always remember, slow and steady wins the race!
                            <br>
                            <br>
                            Your account name: :username<br>
                            Your account recovery keyword is: :keyword <i><- Note it down!</i><br>
                            Account created on: :joinDate
                            <br>
                            <br>
                            Your account needs to be activated before you can login. Please visit :verificationUrl
                            or click <a href=":verificationUrl" target="_blank">here</a> to activate your account.
                            <br>
                            <br>
                            Please read our <a href=":rulesUrl">Terms of
                                Use</a>, if you have any questions about these terms, or anything related to our server, feel free to ask us via our
                            <a href=":discordUrl">Discord channel</a> or the support section of our <a href=":forumUrl">Forums</a>.',
        'change_email_body' => 'Greetings, :username!
                                <br>
                                <br>

                                Please click <a clicktracking=off href=":changeEmailUrl" target="_blank">here</a> to confirm your new e-mail address.
                                <br>
                                <br>

                                Turtle WoW,
                                <br>
                                <a clicktracking=off href=":homeUrl" target="_blank">:homeUrl</a><br>',
        'reset_password_body' => 'Greetings! :username<br/>
                                    Someone used your e-mail to reset Turtle WoW password.<br/>
                                    If you haven\'t done this, ignore this letter.<br/>
                                    <hr>
                                    <br/>

                                    To confirm password reset, <a href=":resetPasswordUrl" target="_blank">click here</a>.'
    ],
    'login_modal' => [
        'welcome' => 'Welcome :username, please enter your password.',
        'welcome2fa' => 'Welcome :username, please enter your One Time Code.',
        'change_username' => 'Not :username? Change username.'
    ],
    'donate_modal' => [
        'thank_you' => '<h2 class="orange-text font-weight-bold">THANK YOU</h2>
                        <h4 class="orange-text font-weight-bold">FOR</h4>
                        <h3 class="orange-text font-weight-bold">supporting Turtle WoW!</h3>'
    ],
    'hearthstone_cd' => '(Hearthstone cooldown: :cd)',
    'hc_table_label' => '(Showing :current of :total)',
    'shop_appeal_unseen_messages' => 'Unseen :count messages',
    'shop_appeal_delivered_messages' => 'Delivered :count messages',
    'ban_appeal_unseen_messages' => 'Unseen :count messages',
    'locked_request' => 'Your request is currently locked. Please try again after :time seconds.',
    'success_edit_world_config' => 'Successfully updated variable :variable from :oldValue to :newValue',
    'success_reload_config' => 'Successfully reloaded configuration for realm :realm',
    'invalid_email' => 'The :email you entered is invalid. Please ensure it follows the format: username@example.com.',
    'unknown_provider' => 'The :email address you provided has an unknown or unsupported :domain domain. Please check the domain and try again.',
    'too_many_reports' => 'You have reached the maximum number of reports you can submit. Please try again after :time .',
];
