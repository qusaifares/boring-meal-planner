import { AppConfigPlugin } from "@/types/plugin";
import { Meal } from "@/types/Meal";

// Vegetarian-focused meal library
const breakfasts: Meal[] = [
  {
    id: "veggie_breakfast_avocado_toast",
    name: "Avocado Toast with Tomatoes & Sprouts",
    calories: 320,
    protein: 12,
    carbs: 38,
    fat: 14,
    category: "breakfast",
  },
  {
    id: "veggie_breakfast_oatmeal",
    name: "Steel Cut Oatmeal with Berries & Almonds",
    calories: 380,
    protein: 14,
    carbs: 52,
    fat: 12,
    category: "breakfast",
  },
  {
    id: "veggie_breakfast_tofu_scramble",
    name: "Tofu Scramble with Veggies",
    calories: 290,
    protein: 22,
    carbs: 18,
    fat: 16,
    category: "breakfast",
  },
];

const dinners: Meal[] = [
  {
    id: "veggie_dinner_buddha_bowl",
    name: "Buddha Bowl (Quinoa, Chickpeas, Roasted Veggies)",
    calories: 520,
    protein: 18,
    carbs: 72,
    fat: 18,
    category: "dinner",
  },
  {
    id: "veggie_dinner_lentil_curry",
    name: "Red Lentil Curry with Brown Rice",
    calories: 480,
    protein: 20,
    carbs: 68,
    fat: 14,
    category: "dinner",
  },
  {
    id: "veggie_dinner_veggie_burger",
    name: "Black Bean Burger with Sweet Potato Fries",
    calories: 580,
    protein: 24,
    carbs: 76,
    fat: 20,
    category: "dinner",
  },
  {
    id: "veggie_dinner_pasta_primavera",
    name: "Whole Wheat Pasta Primavera",
    calories: 450,
    protein: 16,
    carbs: 68,
    fat: 14,
    category: "dinner",
  },
];

const fruits: Meal[] = [
  {
    id: "veggie_fruit_apple",
    name: "Organic Apple",
    calories: 95,
    protein: 0,
    carbs: 25,
    fat: 0,
    category: "fruit",
  },
  {
    id: "veggie_fruit_berries",
    name: "Mixed Berries (1 cup)",
    calories: 85,
    protein: 1,
    carbs: 21,
    fat: 0,
    category: "fruit",
  },
  {
    id: "veggie_fruit_orange",
    name: "Orange",
    calories: 62,
    protein: 1,
    carbs: 15,
    fat: 0,
    category: "fruit",
  },
];

const coffees: Meal[] = [
  {
    id: "veggie_coffee_oat_latte",
    name: "Oat Milk Latte",
    calories: 140,
    protein: 3,
    carbs: 18,
    fat: 6,
    category: "coffee",
  },
  {
    id: "veggie_coffee_green_tea",
    name: "Green Tea",
    calories: 2,
    protein: 0,
    carbs: 0,
    fat: 0,
    category: "coffee",
  },
];

const proteinShakes: Meal[] = [
  {
    id: "veggie_shake_pea_protein",
    name: "Pea Protein Shake with Almond Milk",
    calories: 160,
    protein: 20,
    carbs: 8,
    fat: 4,
    category: "shake",
  },
];

const snacks: Meal[] = [
  {
    id: "veggie_snack_hummus_veggies",
    name: "Hummus with Carrot Sticks",
    calories: 120,
    protein: 4,
    carbs: 14,
    fat: 6,
    category: "snack",
  },
  {
    id: "veggie_snack_almonds",
    name: "Raw Almonds (1 oz)",
    calories: 164,
    protein: 6,
    carbs: 6,
    fat: 14,
    category: "snack",
  },
];

/**
 * Vegetarian-focused plugin demonstrating plugin extensibility
 * with custom meals, categories, and branding.
 */
export const veggiePlugin: AppConfigPlugin = {
  // Metadata
  tenantId: "veggie",
  tenantName: "Vegetarian User",
  version: "1.0.0",

  // Vegetarian meal library
  mealLibrary: [
    ...breakfasts,
    ...dinners,
    ...fruits,
    ...coffees,
    ...snacks,
    ...proteinShakes,
  ],

  // Category configuration with custom labels
  categoryConfig: {
    breakfast: {
      label: "Morning Meal",
      inputType: "dropdown",
      maxSelections: 1,
    },
    dinner: {
      label: "Main Meal",
      inputType: "dropdown",
      maxSelections: 1,
    },
    coffee: {
      label: "Beverages",
      inputType: "radio",
      maxSelections: 1,
    },
    fruit: {
      label: "Fresh Fruit",
      inputType: "checkbox",
      maxSelections: Infinity,
    },
    snack: {
      label: "Healthy Snacks",
      inputType: "checkbox",
      maxSelections: Infinity,
    },
    shake: {
      label: "Plant Protein",
      inputType: "radio",
      maxSelections: 1,
    },
  },

  // Custom branding
  branding: {
    appTitle: "Veggie Meal Planner",
    appDescription: "Plant-based meal planning made easy. Nutritious, delicious, and sustainable.",
    primaryColor: "#10b981",
    accentColor: "#34d399",
  },

  // Feature flags
  features: {
    enableLocalStorage: false,
    storageKey: "veggie-meal-planner-v1",
    enableMobileView: true,
  },
};
