use crate::mysql::{Row, Value};
#[cfg(test)]
use mockall::automock;

#[macro_export]
macro_rules! params {
    ( $( $key:expr => $value:expr ),* ) => {
        vec![
            $(
                ($key.to_string(), crate::mysql::Value::from($value)),
            )*
        ]
    }
}

#[cfg_attr(test, automock)]
pub trait Execute {
    fn execute_one(&mut self, query_str: &str) -> bool;
    fn execute_wparams(&mut self, query_str: &str, params: std::vec::Vec<(std::string::String, Value)>) -> bool;
    fn execute_batch_wparams<T: 'static, F: 'static + (Fn(T) -> std::vec::Vec<(std::string::String, Value)>)>(&mut self, query_str: &str, params: Vec<T>, params_process: F) -> bool;
}

#[cfg_attr(test, automock)]
pub trait Exists {
    fn exists(&mut self, query_str: &str) -> bool;
    fn exists_wparams(&mut self, query_str: &str, params: std::vec::Vec<(std::string::String, Value)>) -> bool;
}

#[cfg_attr(test, automock)]
pub trait Select {
    fn select<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, query_str: &str, process_row: F) -> Vec<T>;
    fn select_wparams<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, query_str: &str, process_row: F, params: std::vec::Vec<(std::string::String, Value)>) -> Vec<T>;
    fn select_value<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, query_str: &str, process_row: F) -> Option<T>;
    fn select_wparams_value<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, query_str: &str, process_row: F, params: std::vec::Vec<(std::string::String, Value)>) -> Option<T>;
}

impl Execute for crate::mysql::Conn {
    fn execute_one(&mut self, query_str: &str) -> bool {
        self.prep_exec(query_str, ()).is_ok()
    }

    fn execute_wparams(&mut self, query_str: &str, params: std::vec::Vec<(std::string::String, Value)>) -> bool {
        self.prep_exec(query_str, params).is_ok()
    }

    fn execute_batch_wparams<T: 'static, F: 'static + (Fn(T) -> std::vec::Vec<(std::string::String, Value)>)>(&mut self, query_str: &str, params: Vec<T>, params_process: F) -> bool {
        let mut prepared_statment = self.prepare(query_str).expect("Stmt is valid!");
        let mut success = true;
        for param in params {
            success = success && prepared_statment.execute(params_process(param)).is_ok();
        }
        success
    }
}

impl Exists for crate::mysql::Conn {
    fn exists(&mut self, query_str: &str) -> bool {
        self.select_value(&["SELECT EXISTS(", query_str, ")"].concat(), &|row| crate::mysql::from_row(row)).unwrap()
    }

    fn exists_wparams(&mut self, query_str: &str, params: Vec<(String, Value)>) -> bool {
        self.select_wparams_value(&["SELECT EXISTS(", query_str, ")"].concat(), &|row| crate::mysql::from_row(row), params).unwrap()
    }
}

impl Select for crate::mysql::Conn {
    fn select<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, query_str: &str, process_row: F) -> Vec<T> {
        self.prep_exec(query_str, ()).map(|result| result.map(|x| x.unwrap()).map(|row| process_row(crate::mysql::from_row(row))).collect()).unwrap()
    }

    fn select_wparams<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, query_str: &str, process_row: F, params: Vec<(String, Value)>) -> Vec<T> {
        self.prep_exec(query_str, params).map(|result| result.map(|x| x.unwrap()).map(|row| process_row(crate::mysql::from_row(row))).collect()).unwrap()
    }

    fn select_value<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, query_str: &str, process_row: F) -> Option<T> {
        self.select(query_str, process_row).pop()
    }

    fn select_wparams_value<T: 'static, F: 'static + (Fn(Row) -> T)>(&mut self, query_str: &str, process_row: F, params: Vec<(String, Value)>) -> Option<T> {
        self.select_wparams(query_str, process_row, params).pop()
    }
}
