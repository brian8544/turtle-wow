use okapi::openapi3::Responses;
use rocket::{http::Status, response::Responder, Request, Response};
use rocket_okapi::{gen::OpenApiGenerator, response::OpenApiResponder, util::add_schema_response};
use schemars::JsonSchema;
use std::io::Cursor;

#[derive(Debug, JsonSchema)]
pub enum TooltipFailure {
    InvalidInput,
    CharacterHasNoInformation,
}

impl Responder<'static> for TooltipFailure {
    fn respond_to(self, _: &Request) -> Result<Response<'static>, Status> {
        let body;
        let status = match self {
            TooltipFailure::InvalidInput => {
                body = "Invalid input!".to_owned();
                Status::new(534, "InvalidInput")
            },
            TooltipFailure::CharacterHasNoInformation => {
                body = "CharacterHasNoInformation".to_owned();
                Status::new(536, "Database")
            },
        };
        Response::build().status(status).sized_body(Cursor::new(body)).ok()
    }
}

impl OpenApiResponder<'static> for TooltipFailure {
    fn responses(gen: &mut OpenApiGenerator) -> rocket_okapi::Result<Responses> {
        let mut responses = Responses::default();
        let schema = gen.json_schema::<String>();
        add_schema_response(&mut responses, 534, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 536, "text/plain", schema)?;
        Ok(responses)
    }
}
