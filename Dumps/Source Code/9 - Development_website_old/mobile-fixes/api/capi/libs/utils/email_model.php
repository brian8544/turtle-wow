<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class email_model extends model
{

    public function send()
    {

        $mail = new PHPMailer(true);

        try {

            $mail->SMTPDebug = 0; // 2 to enable verbose debug output

            $mail->CharSet = 'UTF-8'; //charset
            $mail->Encoding = 'base64'; //encoding

            $mail->isSMTP(); // Set mailer to use SMTP

            $mail->Host = EMAIL_HOST; // smtp.gmail.com - for gmail
            $mail->SMTPAuth = EMAIL_AUTH; // Enable SMTP authentication

            $mail->Username = EMAIL_USERNAME;
            $mail->Password = EMAIL_PASSWORD;
            $mail->SMTPSecure = EMAIL_SECURITY; // Enable TLS encryption, `ssl` also accepted
            $mail->Port = EMAIL_PORT; // TCP port to connect to

            //Recipients

            $mail->setFrom(EMAIL_ADDRESS, EMAIL_NAME);

            $mail->addAddress(EMAIL_TO);


            //Content
            $mail->isHTML(true);
            $mail->Subject = EMAIL_SUBJECT;

            $data = $this->params->data;

            $body = "<br>" .
                "Von : " . $data->name . "<br>" .
                "Email : " . $data->email . "<br>" .
                "Betreff : " . $data->betreff . "<br>" .
                "Nachricht : " . $data->nachricht;


            $mail->Body = $body;

            if ($mail->send()) {
                return ['sent' => 'ok'];
            } else {
                return ['sent' => 'error'];
            }

        } catch (Exception $e) {
            return ['sent' => $mail->ErrorInfo ];
        }

    }

}
