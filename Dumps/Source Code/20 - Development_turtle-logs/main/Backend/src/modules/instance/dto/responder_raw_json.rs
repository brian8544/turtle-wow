use std::io::Cursor;

use rocket::http::ContentType;
use rocket::request::Request;
use rocket::response::{self, Responder, Response};

pub struct RawJson(pub String);

impl<'a> Responder<'a> for RawJson {
    fn respond_to(self, _: &Request) -> response::Result<'a> {
        Response::build().header(ContentType::JSON).sized_body(Cursor::new(self.0)).ok()
    }
}
