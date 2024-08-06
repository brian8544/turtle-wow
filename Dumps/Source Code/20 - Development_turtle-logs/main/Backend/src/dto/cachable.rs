use rocket::{http::Status, response::Responder, Request, Response};
use schemars::JsonSchema;

#[derive(Debug, JsonSchema, Clone, PartialEq)]
pub struct Cachable<R>(pub R);

impl<'r, R: Responder<'r>> Responder<'r> for Cachable<R> {
    fn respond_to(self, req: &Request) -> Result<Response<'r>, Status> {
        Response::build().merge(self.0.respond_to(req)?).raw_header("X-Is-Cachable", "true").ok()
    }
}
