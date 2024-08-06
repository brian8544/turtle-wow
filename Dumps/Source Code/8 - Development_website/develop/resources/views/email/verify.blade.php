{!! __('custom.email_template.welcome_body' , [
            'username' => $data['username'],
            'joinDate' => $data['joinDate'],
            'keyword' => $data['keyword'],
            'verificationUrl' => $data['verificationUrl'],
            'rulesUrl' => route('rules')
        ]
     ) !!}
