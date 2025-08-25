export const CATEGORY_OPTIONS = [
  { value: "VEGETABLES", label: "Овочі" },
  { value: "FRUITS", label: "Фрукти" },
  { value: "MEAT", label: "М'ясо" },
  { value: "DAIRY", label: "Молочка" },
  { value: "SPICES", label: "Спеції" },
  { value: "OTHER", label: "Інше" }
] as const;

export const UNIT_OPTIONS = [
  { value: "GRAMS", label: "Грами" },
  { value: "KILOGRAMS", label: "Кілограми" },
  { value: "LITERS", label: "Літри" },
  { value: "MILLILITERS", label: "Мілілітри" },
  { value: "PIECES", label: "Штуки" }
] as const;

export const UNIT_ABBREVIATIONS = [
  { value: "GRAMS", label: "г" },
  { value: "KILOGRAMS", label: "кг" },
  { value: "LITERS", label: "л" },
  { value: "MILLILITERS", label: "мл" },
  { value: "PIECES", label: "шт" }
] as const;