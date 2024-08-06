#[cfg(test)]
mod tests {
    use crate::domain_value::Language;
    use crate::material::Dictionary;
    use crate::tools::Get;
    use crate::tools::Register;

    #[test]
    #[should_panic]
    fn duplicate_entry() {
        let dictionary = Dictionary::default();

        dictionary.register("Test", Language::English, "Test");
        dictionary.register("Test", Language::English, "Test");
    }

    #[test]
    fn same_value_but_different_language() {
        let dictionary = Dictionary::default();

        dictionary.register("Test", Language::English, "Test");
        dictionary.register("Test", Language::German, "Test");
    }

    #[test]
    fn value_exists_after_insert() {
        let dictionary = Dictionary::default();
        dictionary.register("Test", Language::German, "Test");

        assert_eq!(dictionary.get("Test", Language::German), "Test");
    }

    #[test]
    fn translation_vector_is_extended() {
        let dictionary = Dictionary::default();
        dictionary.register("Test", Language::English, "Test");
        dictionary.register("Test", Language::Japanese, "Test2");

        assert_eq!(dictionary.get("Test", Language::Japanese), "Test2");
    }
}
