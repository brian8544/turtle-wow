// Horrible implementation, lets hope there is a better solution at some point!
pub fn fmt(mut format: String, arguments: &[&str]) -> String {
    for (i, arg) in arguments.iter().enumerate() {
        format = format.replace(&format!("{{{}}}", i), arg);
    }
    format
}
