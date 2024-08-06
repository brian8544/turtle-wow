extern crate dotenv;
extern crate lettre;
extern crate lettre_email;

use std::env;

use dotenv::dotenv;
use lettre::smtp::SmtpClient;
use lettre::ClientSecurity;
use lettre::Transport;
use lettre_email::EmailBuilder;

pub fn send(recipient: &str, username: &str, subject: String, text: String, test: bool) -> bool {
    if test {
        return true;
    }

    dotenv().ok();

    let email = EmailBuilder::new().to((recipient, username)).from("mail@legacyplayers.com").subject(subject).text(text).build().unwrap().into();

    let mut mailer = SmtpClient::new(env::var("SMTP_DNS").unwrap(), ClientSecurity::None).unwrap().transport();
    let result = mailer.send(email);

    result.is_ok()
}
