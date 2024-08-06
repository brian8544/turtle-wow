use okapi::openapi3::Responses;
use rocket::{
    http::Status,
    outcome::Outcome::*,
    request::{self, FromRequest, Request, State},
    response::Responder,
    Response,
};
use rocket_okapi::{gen::OpenApiGenerator, response::OpenApiResponder, util::add_schema_response};

use crate::modules::{account::guard::Authenticate, data::Data};

pub struct ServerOwner(pub u32);

impl<'a, 'r> FromRequest<'a, 'r> for ServerOwner {
    type Error = ();

    fn from_request(req: &'a Request<'r>) -> request::Outcome<Self, ()> {
        Authenticate::from_request(req).and_then(|authenticate| {
            let data_req = req.guard::<State<'_, Data>>();
            if data_req.is_failure() {
                return Failure((Status::Unauthorized, ()));
            }

            let data = data_req.unwrap();
            let servers = data.servers.read().unwrap();
            let server_res = servers.iter().find(|(_, server)| server.owner.contains(&authenticate.0));
            if server_res.is_none() {
                return Failure((Status::Unauthorized, ()));
            }

            let (id, _) = server_res.unwrap();
            Success(ServerOwner(*id))
        })
    }
}

// This implementation is required from OpenAPI, it does nothing here
// and is not supposed to be used!
impl Responder<'static> for ServerOwner {
    fn respond_to(self, _: &Request) -> Result<Response<'static>, Status> {
        Response::build().status(Status::Unauthorized).ok()
    }
}

impl OpenApiResponder<'static> for ServerOwner {
    fn responses(gen: &mut OpenApiGenerator) -> rocket_okapi::Result<Responses> {
        let mut responses = Responses::default();
        let schema = gen.json_schema::<String>();
        add_schema_response(&mut responses, 401, "text/plain", schema)?;
        Ok(responses)
    }
}
