<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use PHPMailer\PHPMailer\PHPMailer;
use SendGrid;
use SendGrid\Mail\Mail;

class Email implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $email;

    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct($email)
    {
        $this->email = $email;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        switch ($this->email['type']) {
            case "NewAccount":
                $subject = __('email_template')['verify']['welcome'];
                break;
            case "EmailVerify":
                $subject = __('email_template')['verify']['title'];
                break;
            case "EmailResetPassword":
                $subject = __('email_template')['reset_password']['title'];
                break;
            case "EmailChange":
                $subject = __('email_template')['change_email']['title'];
                break;
            default:
                $subject = '';
        }

        if (config('customs.mail.system') == "PhpMailer") {
            $phpMailer = new PHPMailer(true);

            try {
                $phpMailer->SMTPDebug = config('customs.mail.phpmailer_smtp_debug');
                $phpMailer->CharSet = "UTF-8";
                $phpMailer->isSMTP();
                $phpMailer->Host = config('customs.mail.phpmailer_host');
                $phpMailer->SMTPAuth = config('customs.mail.phpmailer_smtp_auth');
                $phpMailer->Username = config('customs.mail.phpmailer_username');
                $phpMailer->Password = config('customs.mail.phpmailer_password');
                $phpMailer->SMTPSecure = config('customs.mail.phpmailer_smtp_secure');
                $phpMailer->Port = config('customs.mail.phpmailer_port');
                $phpMailer->isHTML(config('customs.mail.phpmailer_is_html'));
                $phpMailer->setFrom(config('customs.mail.phpmailer_set_from_email'), config('customs.mail.phpmailer_set_from_name'));
                $phpMailer->addReplyTo(config('customs.mail.phpmailer_add_replay_to_email'), config('customs.mail.phpmailer_add_replay_to_name'));

                $phpMailer->Subject = $subject;

                $phpMailer->addAddress($this->email['email'], $this->email['username']);
                $phpMailer->Body = $this->email['body'];

                $phpMailer->send();
            } catch (phpmailerException $e) {
                echo $e->getMessage();
            }

        }

        if (config('customs.mail.system') == "SendGrid") {
            $sendgrid = new SendGrid(config('customs.sendgrid.api_key'));

            $mail = new Mail();

            $mail->setFrom(config('customs.mail.phpmailer_set_from_email'), config('customs.mail.phpmailer_set_from_name'));
            $mail->setSubject($subject);

            $personalization = new SendGrid\Mail\Personalization();
            $personalization->addTo(new SendGrid\Mail\To($this->email['email'], $this->email['username']));

            $content = new SendGrid\Mail\Content("text/html", $this->email['body']);
            $mail->addContent($content);

            $mail->addPersonalization($personalization);

            try {
                $sendgrid->send($mail);
            } catch (Exception $e) {
                $e->getMessage();
            }
        }
    }
}
