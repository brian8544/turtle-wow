use okapi::openapi3::Responses;
use rocket::{
    http::Status,
    outcome::Outcome::*,
    request::{self, FromRequest, Request, State},
    response::Responder,
    Response,
};
use rocket_okapi::{gen::OpenApiGenerator, response::OpenApiResponder, util::add_schema_response};

use crate::modules::account::{tools::Token, Account};
use crate::MainDb;

pub struct IsModerator(pub u32);

impl<'a, 'r> FromRequest<'a, 'r> for IsModerator {
    type Error = ();

    fn from_request(req: &'a Request<'r>) -> request::Outcome<Self, ()> {
        let auth_header = req.headers().get_one("X-Authorization");
        if auth_header.is_none() {
            return Failure((Status::Unauthorized, ()));
        }

        let api_token = auth_header.unwrap();
        let account = req.guard::<State<'_, Account>>();
        if account.is_failure() {
            return Failure((Status::Unauthorized, ()));
        }

        let db_main = req.guard::<MainDb>();
        if db_main.is_failure() {
            return Failure((Status::Unauthorized, ()));
        }

        let acc_res = account.unwrap();
        let mut db_main = db_main.unwrap();
        let validation = acc_res.validate_token(&mut *db_main, api_token);
        if validation.is_none() {
            return Failure((Status::Unauthorized, ()));
        }

        let member_id = validation.unwrap();
        let member_map = acc_res.member.read().unwrap();
        let member = member_map.get(&member_id).unwrap();
        if (member.access_rights & 1) == 0 {
            return Failure((Status::Unauthorized, ()));
        }

        Success(IsModerator(member_id))
    }
}

// This implementation is required from OpenAPI, it does nothing here
// and is not supposed to be used!
impl Responder<'static> for IsModerator {
    fn respond_to(self, _: &Request) -> Result<Response<'static>, Status> {
        Response::build().status(Status::Unauthorized).ok()
    }
}

impl OpenApiResponder<'static> for IsModerator {
    fn responses(gen: &mut OpenApiGenerator) -> rocket_okapi::Result<Responses> {
        let mut responses = Responses::default();
        let schema = gen.json_schema::<String>();
        add_schema_response(&mut responses, 401, "text/plain", schema)?;
        Ok(responses)
    }
}