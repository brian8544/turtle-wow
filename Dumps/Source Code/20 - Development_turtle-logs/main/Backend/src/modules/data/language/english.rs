use language::{domain_value::Language, material::Dictionary, tools::Register};

pub fn init(dictionary: &Dictionary) {
    dictionary.register("days", Language::English, "{0} days");
    dictionary.register("hours", Language::English, "{0} hours");
    dictionary.register("minutes", Language::English, "{0} minutes");
    dictionary.register("seconds", Language::English, "{0} seconds");
    dictionary.register("milliseconds", Language::English, "{0} milliseconds");

    dictionary.register("day", Language::English, "1 day");
    dictionary.register("hour", Language::English, "1 hour");
    dictionary.register("minute", Language::English, "1 minute");
    dictionary.register("second", Language::English, "1 second");
    dictionary.register("millisecond", Language::English, "1 millisecond");
}
