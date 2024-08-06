use okapi::openapi3::Responses;
use rocket::{
    http::Status,
    outcome::Outcome::*,
    request::{self, FromRequest, Request, State},
    response::Responder,
    Response,
};
use rocket_okapi::{gen::OpenApiGenerator, response::OpenApiResponder};

use crate::modules::account::{tools::Token, Account};
use crate::MainDb;

pub struct CurrentUser(pub Option<u32>);

impl<'a, 'r> FromRequest<'a, 'r> for CurrentUser {
    type Error = ();

    fn from_request(req: &'a Request<'r>) -> request::Outcome<Self, ()> {
        let auth_header = req.headers().get_one("X-Authorization");
        if auth_header.is_none() {
            return Success(CurrentUser(None));
        }

        let api_token = auth_header.unwrap();
        let account = req.guard::<State<'_, Account>>();
        if account.is_failure() {
            return Success(CurrentUser(None));
        }

        let db_main = req.guard::<MainDb>();
        if db_main.is_failure() {
            return Success(CurrentUser(None));
        }

        let acc_res = account.unwrap();
        let mut db_main = db_main.unwrap();
        let validation = acc_res.validate_token(&mut *db_main, api_token);
        if validation.is_none() {
            return Success(CurrentUser(None));
        }

        Success(CurrentUser(Some(validation.unwrap())))
    }
}

// This implementation is required from OpenAPI, it does nothing here
// and is not supposed to be used!
impl Responder<'static> for CurrentUser {
    fn respond_to(self, _: &Request) -> Result<Response<'static>, Status> {
        Response::build().status(Status::Ok).ok()
    }
}

impl OpenApiResponder<'static> for CurrentUser {
    fn responses(_gen: &mut OpenApiGenerator) -> rocket_okapi::Result<Responses> {
        Ok(Responses::default())
    }
}
