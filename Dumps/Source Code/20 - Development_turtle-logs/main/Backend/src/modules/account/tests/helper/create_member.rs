use crate::modules::account::dto::{CreateMember, Credentials};

pub fn get_create_member(nickname: &str, mail: &str, password: &str) -> CreateMember {
    CreateMember {
        nickname: nickname.to_string(),
        credentials: Credentials {
            mail: mail.to_string(),
            password: password.to_string(),
        },
    }
}
