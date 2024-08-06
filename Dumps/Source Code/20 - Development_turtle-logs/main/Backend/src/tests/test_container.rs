use crate::mysql::Opts;
use testcontainers::clients::Cli;
use testcontainers::images::generic::{GenericImage, WaitFor};
use testcontainers::{clients, Container, Docker};

pub struct TestContainer {
    docker: Cli,
    full_db: bool,
}

impl TestContainer {
    pub fn new(full_db: bool) -> Self {
        TestContainer { docker: clients::Cli::default(), full_db }
    }

    pub fn run(&self) -> (crate::mysql::Conn, String, Container<'_, Cli, GenericImage>) {
        let node = self.docker.run(self.get_test_image());
        let db_name = if self.full_db { "main" } else { "main_test" };
        let port = node.get_host_port(3306).unwrap();
        let user = "root";
        let password = "vagrant";
        let dns = format!("mysql://{}:{}@localhost:{}/{}", user, password, port, db_name);
        let conn = crate::mysql::Conn::new(Opts::from_url(&dns).unwrap()).unwrap();
        (conn, dns, node)
    }

    fn get_test_image(&self) -> GenericImage {
        GenericImage::new("rpll_backend_test_db:latest")
            .with_env_var("MYSQL_USER", "mysql")
            .with_env_var("MYSQL_PASSWORD", "vagrant")
            .with_env_var("MYSQL_ROOT_PASSWORD", "vagrant")
            .with_wait_for(WaitFor::message_on_stderr("port: 3306"))
    }
}
