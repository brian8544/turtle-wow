use okapi::openapi3::Responses;
use rocket::{
    http::Status,
    outcome::Outcome::*,
    request::{self, FromRequest, Request, State},
    response::Responder,
    Response,
};
use rocket_okapi::{gen::OpenApiGenerator, response::OpenApiResponder};

use crate::modules::data::{tools::RetrieveExpansion, Data};

pub struct Expansion(pub u8);

impl<'a, 'r> FromRequest<'a, 'r> for Expansion {
    type Error = ();

    fn from_request(req: &'a Request<'r>) -> request::Outcome<Self, ()> {
        let expansion_header = req.headers().get_one("X-Expansion");
        if expansion_header.is_none() {
            return Failure((Status::NotFound, ()));
        }

        let expansion_res = expansion_header.unwrap().parse::<u8>();
        if expansion_res.is_err() {
            return Failure((Status::NotFound, ()));
        }
        let expansion = expansion_res.unwrap();

        let data_res = req.guard::<State<'_, Data>>();
        if data_res.is_failure() {
            return Failure((Status::NotFound, ()));
        }

        let data = data_res.unwrap();
        match data.get_expansion(expansion) {
            Some(_) => Success(Expansion(expansion)),
            None => Failure((Status::NotFound, ())),
        }
    }
}
/*
impl<'a, 'r> OpenApiFromRequest<'a, 'r> for Expansion {
    fn request_parameter(_: &mut OpenApiGenerator, _: String) -> rocket_okapi::Result<Parameter> {
        Ok(Parameter {
            name: "X-Expansion".to_owned(),
            location: "header".to_owned(),
            description: None,
            required: true,
            deprecated: false,
            allow_empty_value: false,
            value: ParameterValue::Schema {
                style: None,
                explode: None,
                allow_reserved: false,
                schema: Default::default(),
                example: None,
                examples: None,
            },
            extensions: Default::default(),
        })
    }
}
*/
// This implementation is required from OpenAPI, it does nothing here
// and is not supposed to be used!
impl Responder<'static> for Expansion {
    fn respond_to(self, _: &Request) -> Result<Response<'static>, Status> {
        Response::build().status(Status::NotFound).ok()
    }
}

impl OpenApiResponder<'static> for Expansion {
    fn responses(_: &mut OpenApiGenerator) -> rocket_okapi::Result<Responses> {
        Ok(Responses::default())
    }
}
