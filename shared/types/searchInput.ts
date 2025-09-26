export interface SearchInputEmits {
  (e: "update:input", value: string): void;
  (e: "focus", value: FocusEvent): void;
  (e: "keydown", value: KeyboardEvent): void;
  (e: "clear"): void;
}
