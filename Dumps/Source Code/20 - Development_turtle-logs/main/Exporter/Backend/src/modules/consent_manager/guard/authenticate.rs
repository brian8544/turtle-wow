use std::env;

use rocket::http::Status;
use rocket::outcome::Outcome::*;
use rocket::request::{self, FromRequest, Request};

pub struct Authenticate(pub u32);

#[derive(Debug, Serialize)]
struct APIToken {
    pub token: String,
    pub account_id: u32,
}

impl<'a, 'r> FromRequest<'a, 'r> for Authenticate {
    type Error = ();

    fn from_request(req: &'a Request<'r>) -> request::Outcome<Self, ()> {
        let auth_header = req.headers().get_one("X-Authorization");
        if auth_header.is_none() {
            return Failure((Status::Unauthorized, ()));
        }

        let split: Vec<&str> = auth_header.unwrap().split('|').collect();
        if split.len() != 2 {
            return Failure((Status::Unauthorized, ()));
        }
        let token = split[0].to_string();
        let account_id_res = split[1].parse::<u32>();
        if account_id_res.is_err() {
            return Failure((Status::Unauthorized, ()));
        }
        let account_id = account_id_res.unwrap();

        let uri = env::var("URL_AUTHORIZATION_ENDPOINT").unwrap();
        let client = reqwest::blocking::Client::new();
        let resp = client.post(&uri).body(serde_json::to_string(&APIToken { token, account_id }).unwrap()).send();
        if resp.is_err() {
            return Failure((Status::Unauthorized, ()));
        }

        let json_res = resp.unwrap().json::<bool>();
        if json_res.is_err() || !json_res.unwrap() {
            return Failure((Status::Unauthorized, ()));
        }

        Success(Authenticate(account_id))
    }
}
