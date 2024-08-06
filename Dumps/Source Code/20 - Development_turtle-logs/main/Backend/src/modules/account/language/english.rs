use language::{domain_value::Language, material::Dictionary, tools::Register};

pub fn init(dictionary: &Dictionary) {
    dictionary.register("general.login", Language::English, "SignIn");

    dictionary.register("create.confirmation.subject", Language::English, "Confirm your account!");
    dictionary.register(
        "create.confirmation.text",
        Language::English,
        "Greetings!\n\nPlease finish the registration process by clicking on the provided url.\n\n{HOST}/confirm/create/{0}\n\nCheers!",
    );

    dictionary.register("forgot.confirmation.subject", Language::English, "Have you forgotten your password?");
    dictionary.register(
        "forgot.confirmation.text",
        Language::English,
        "Greetings!\nPlease click on the provided url in order to generate a new password.\n\n{HOST}/confirm/forgot/{0}\n\nCheers!",
    );
    dictionary.register("forgot.information.subject", Language::English, "Your new password!");
    dictionary.register("forgot.information.text", Language::English, "Greetings!\n\nThis is your new Password: {0}\n\nPlease change it immediately!\n\nCheers!");

    dictionary.register("delete.confirmation.subject", Language::English, "Confirm the deletion of your account!");
    dictionary.register(
        "delete.confirmation.text",
        Language::English,
        "Greetings!\n\nPlease confirm the deletion of your account by clicking on the provided url.\n\n{HOST}/confirm/delete/{0}\n\nCheers!",
    );

    dictionary.register("update.mail.subject", Language::English, "Confirm the update to your account mail!");
    dictionary.register(
        "update.mail.text",
        Language::English,
        "Greetings!\n\nPlease confirm the update of your account mail by clicking on the provided url.\n\n{HOST}/confirm/update_mail/{0}\n\nCheers!",
    );
}
