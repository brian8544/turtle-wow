use std::io::Cursor;

use okapi::openapi3::Responses;
use rocket::{http::Status, response::Responder, Request, Response};
use rocket_okapi::{gen::OpenApiGenerator, response::OpenApiResponder, util::add_schema_response};
use schemars::JsonSchema;

#[derive(Debug, JsonSchema)]
pub enum Failure {
    InvalidCredentials,
    InvalidMail,
    InvalidNickname,
    PwnedPassword(u64),
    PasswordTooShort,
    InvalidPasswordCharacters,
    MailIsInUse,
    NicknameIsInUse,
    InvalidUrl,
    MailSend,
    DeleteNotIssued,
    ForgotNotIssued,
    TooManyDays,
    DateInThePast,
    TokenPurposeLength,
    Unknown,
}

impl<'r> Responder<'r> for Failure {
    fn respond_to(self, _: &Request) -> Result<Response<'r>, Status> {
        let mut body: String = String::new();
        let status = match self {
            Failure::InvalidCredentials => Status::new(520, "InvalidCredentials"),
            Failure::InvalidMail => Status::new(521, "InvalidMail"),
            Failure::InvalidNickname => Status::new(522, "InvalidNickname"),
            Failure::PwnedPassword(timed_pwned) => {
                body = timed_pwned.to_string();
                Status::new(523, "PwnedPassword")
            },
            Failure::PasswordTooShort => Status::new(524, "PasswordTooShort"),
            Failure::MailIsInUse => Status::new(525, "MailIsInUse"),
            Failure::NicknameIsInUse => Status::new(526, "NicknameIsInUse"),
            Failure::InvalidUrl => Status::new(527, "InvalidUrl"),
            Failure::MailSend => Status::new(528, "MailSend"),
            Failure::DeleteNotIssued => Status::new(529, "DeleteNotIssued"),
            Failure::ForgotNotIssued => Status::new(530, "ForgotNotIssued"),
            Failure::TooManyDays => Status::new(531, "TooManyDays"),
            Failure::DateInThePast => Status::new(532, "DateInThePast"),
            Failure::TokenPurposeLength => Status::new(533, "TokenPurposeLength"),
            Failure::InvalidPasswordCharacters => Status::new(535, "InvalidPasswordCharacters"),
            Failure::Unknown => Status::new(599, "Unknown"),
        };
        Response::build().status(status).sized_body(Cursor::new(body)).ok()
    }
}

impl<'r> OpenApiResponder<'r> for Failure {
    fn responses(gen: &mut OpenApiGenerator) -> rocket_okapi::Result<Responses> {
        let mut responses = Responses::default();
        let schema = gen.json_schema::<String>();
        add_schema_response(&mut responses, 520, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 521, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 522, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 523, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 524, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 525, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 526, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 527, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 528, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 529, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 530, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 531, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 532, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 533, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 535, "text/plain", schema.clone())?;
        add_schema_response(&mut responses, 599, "text/plain", schema)?;
        Ok(responses)
    }
}
