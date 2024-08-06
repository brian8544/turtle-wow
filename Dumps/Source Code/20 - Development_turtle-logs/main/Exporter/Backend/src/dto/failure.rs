use std::io::Cursor;

use rocket::http::Status;
use rocket::response::Responder;
use rocket::{Request, Response};

#[derive(Debug)]
pub enum Failure {
    ConsentAlreadyGiven,
    NoConsentGivenYet,
    NotTheGuildMaster,
    Database,
}

impl Responder<'static> for Failure {
    fn respond_to(self, _: &Request) -> Result<Response<'static>, Status> {
        let status = match self {
            Failure::ConsentAlreadyGiven => Status::new(520, "ConsentAlreadyGiven"),
            Failure::NoConsentGivenYet => Status::new(521, "NoConsentGivenYet"),
            Failure::NotTheGuildMaster => Status::new(522, "NotTheGuildMaster"),
            Failure::Database => Status::new(523, "Database"),
        };
        Response::build().status(status).sized_body(Cursor::new(String::new())).ok()
    }
}
