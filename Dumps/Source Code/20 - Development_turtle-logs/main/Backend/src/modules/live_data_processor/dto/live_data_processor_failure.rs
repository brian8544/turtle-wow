use okapi::openapi3::Responses;
use rocket::{http::Status, response::Responder, Request, Response};
use rocket_okapi::{gen::OpenApiGenerator, response::OpenApiResponder, util::add_schema_response};
use schemars::JsonSchema;
use std::io::Cursor;

#[derive(Debug, JsonSchema)]
pub enum LiveDataProcessorFailure {
    InvalidInput,
    DatabaseFailure(String),
    FileIsNotUTF8,
    InvalidZipFile,
    InvalidStartTime,
    InvalidEndTime
}

impl Responder<'static> for LiveDataProcessorFailure {
    fn respond_to(self, _: &Request) -> Result<Response<'static>, Status> {
        let body;
        let status = match self {
            LiveDataProcessorFailure::InvalidInput => {
                body = "Invalid input!".to_owned();
                Status::new(534, "InvalidInput")
            },
            LiveDataProcessorFailure::DatabaseFailure(reason) => {
                body = reason;
                Status::new(535, "DatabaseFailure")
            },
            LiveDataProcessorFailure::FileIsNotUTF8 => {
                body = "File is not UFT8!".to_owned();
                Status::new(536, "FileIsNotUTF8")
            },
            LiveDataProcessorFailure::InvalidZipFile => {
                body = "Invalid input: ZIP file not recognized!".to_owned();
                Status::new(537, "InvalidZipFile")
            },
            LiveDataProcessorFailure::InvalidStartTime => {
                body = "Invalid input: Start Time has an invalid format!".to_owned();
                Status::new(538, "InvalidStartTime")
            },
            LiveDataProcessorFailure::InvalidEndTime => {
                body = "Invalid input: End Time has an invalid format!".to_owned();
                Status::new(539, "InvalidEndTime")
            },
        };
        Response::build().status(status).sized_body(Cursor::new(body)).ok()
    }
}

impl OpenApiResponder<'static> for LiveDataProcessorFailure {
    fn responses(gen: &mut OpenApiGenerator) -> rocket_okapi::Result<Responses> {
        let mut responses = Responses::default();
        let schema = gen.json_schema::<String>();
        add_schema_response(&mut responses, 534, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 535, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 536, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 537, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 538, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 539, "text/plain", schema)?;
        Ok(responses)
    }
}
