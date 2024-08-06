use crate::modules::account::guard::Authenticate;
use crate::modules::instance::dto::InstanceFailure;
use crate::modules::instance::tools::DeleteInstance;
use crate::modules::instance::Instance;
use crate::MainDb;
use rocket::State;
use rocket_contrib::json::Json;

#[openapi]
#[delete("/delete", data = "<data>")]
pub fn delete_instance(mut db_main: MainDb, me: State<Instance>, data: Json<u32>, auth: Authenticate) -> Result<(), InstanceFailure> {
    me.delete_instance(&mut *db_main, data.into_inner(), auth.0)
}
