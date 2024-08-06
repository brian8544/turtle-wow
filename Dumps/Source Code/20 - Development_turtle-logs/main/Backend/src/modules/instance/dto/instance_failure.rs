use okapi::openapi3::Responses;
use rocket::{http::Status, response::Responder, Request, Response};
use rocket_okapi::{gen::OpenApiGenerator, response::OpenApiResponder, util::add_schema_response};
use schemars::JsonSchema;
use std::io::Cursor;

#[derive(Debug, JsonSchema)]
pub enum InstanceFailure {
    InvalidInput,
    Unknown
}

impl Responder<'static> for InstanceFailure {
    fn respond_to(self, _: &Request) -> Result<Response<'static>, Status> {
        let body;
        let status = match self {
            Self::InvalidInput => {
                body = "Invalid input!".to_owned();
                Status::new(534, "InvalidInput")
            },
            Self::Unknown => {
                body = "Unknown error!".to_owned();
                Status::new(599, "Unknown")
            }
        };
        Response::build().status(status).sized_body(Cursor::new(body)).ok()
    }
}

impl OpenApiResponder<'static> for InstanceFailure {
    fn responses(gen: &mut OpenApiGenerator) -> rocket_okapi::Result<Responses> {
        let mut responses = Responses::default();
        let schema = gen.json_schema::<String>();
        add_schema_response(&mut responses, 534, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 599, "text/plain", schema)?;
        Ok(responses)
    }
}
