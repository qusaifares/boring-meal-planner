import { MealCategory } from "@/types/Meal";

export type CategoryConfig = {
  label: string;
  inputType: "dropdown" | "checkbox" | "radio";
  maxSelections: number; // 1 for dropdown or radio-style checkbox; Infinity for multi-checkbox
};

export const CATEGORY_CONFIG: Record<MealCategory, CategoryConfig> = {
  breakfast: {
    label: "Breakfast",
    inputType: "dropdown",
    maxSelections: 1,
  },

  dinner: {
    label: "Dinner",
    inputType: "dropdown",
    maxSelections: 1,
  },

  coffee: {
    label: "Coffee",
    inputType: "radio",
    maxSelections: 1, // only 1 coffee per day
  },

  fruit: {
    label: "Fruit",
    inputType: "checkbox",
    maxSelections: Infinity, // apple, banana (multi)
  },

  snack: {
    label: "Snacks",
    inputType: "checkbox",
    maxSelections: Infinity, // multiple snacks allowed
  },

  shake: {
    label: "Protein Shake",
    inputType: "radio",
    maxSelections: 1, // one shake per day
  },
};
