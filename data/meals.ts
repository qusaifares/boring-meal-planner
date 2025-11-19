import { Meal } from "@/types/Meal";

export const breakfasts: Meal[] = [
  {
    id: "breakfast_bagel_turkey",
    name: "Egg, Cheese & Turkey Bagel",
    calories: 400,
    protein: 40,
    carbs: 40,
    fat: 12,
    category: "breakfast",
  },
  {
    id: "breakfast_avo_salmon",
    name: "Avocado Toast + 2 Eggs + Salmon",
    calories: 520,
    protein: 33,
    carbs: 34,
    fat: 29,
    category: "breakfast",
  },
  {
    id: "breakfast_eggwhite_bowl",
    name: "Lean Egg White Bowl",
    calories: 300,
    protein: 35,
    carbs: 8,
    fat: 7,
    category: "breakfast",
  },
  {
    id: "breakfast_merguez_combo",
    name: "2 Eggs, 3 Merguez, 2 Toast, Home Fries",
    calories: 1180,
    protein: 44,
    carbs: 93,
    fat: 74,
    category: "breakfast",
  },
  {
    id: "breakfast_eggs_beefbacon",
    name: "3 Eggs + 3 Beef Bacon",
    calories: 420,
    protein: 36,
    carbs: 1,
    fat: 30,
    category: "breakfast",
  },
];

export const dinners: Meal[] = [
  {
    id: "dinner_chipotle_quesadilla",
    name: "Chipotle Quesadilla + Side Chicken + Guac",
    calories: 980,
    protein: 68,
    carbs: 60,
    fat: 52,
    category: "dinner",
  },
  {
    id: "dinner_chipotle_bowl_full",
    name: "Chipotle Bowl (Brown Rice, BB, Double Chicken, SC, Cheese, Salsa, Corn, Guac)",
    calories: 1180,
    protein: 75,
    carbs: 105,
    fat: 50,
    category: "dinner",
  },
  {
    id: "dinner_evergreens_sombrero",
    name: "Evergreens El Sombrero (Triple Chicken + Egg)",
    calories: 780,
    protein: 78,
    carbs: 40,
    fat: 36,
    category: "dinner",
  },
  {
    id: "dinner_sushi_katsu",
    name: "1 California Roll + Chicken Katsu",
    calories: 900,
    protein: 45,
    carbs: 95,
    fat: 32,
    category: "dinner",
  },
  {
    id: "dinner_wingstop_10",
    name: "Wingstop 10 Wings",
    calories: 750,
    protein: 55,
    carbs: 5,
    fat: 52,
    category: "dinner",
  },
  {
    id: "dinner_wingstop_10_fries",
    name: "Wingstop 10 Wings + Fries",
    calories: 1150,
    protein: 58,
    carbs: 60,
    fat: 75,
    category: "dinner",
  },
  {
    id: "dinner_fiesta_lime_half_rice_18shrimp",
    name: "Fiesta Lime Chicken (Half Rice + 18 Shrimp)",
    calories: 1184,
    protein: 101,
    carbs: 70,
    fat: 58,
    category: "dinner",
  },
];

export const fruits: Meal[] = [
  {
    id: "fruit_apple",
    name: "Apple",
    calories: 95,
    protein: 0,
    carbs: 25,
    fat: 0,
    category: "fruit",
  },
  {
    id: "fruit_banana",
    name: "Banana",
    calories: 105,
    protein: 1,
    carbs: 27,
    fat: 0,
    category: "fruit",
  },
];

export const coffees: Meal[] = [
  {
    id: "coffee_mocha_halfsweet",
    name: "Mocha (Half Sweet, 2% Milk)",
    calories: 220,
    protein: 10,
    carbs: 28,
    fat: 7,
    category: "coffee",
  },
  {
    id: "coffee_black",
    name: "Black Coffee",
    calories: 2,
    protein: 0,
    carbs: 0,
    fat: 0,
    category: "coffee",
  },
  {
    id: "coffee_sf_vanilla_latte",
    name: "Sugar-Free Vanilla Latte (2% Milk)",
    calories: 130,
    protein: 10,
    carbs: 12,
    fat: 5,
    category: "coffee",
  },
];

export const proteinShakes: Meal[] = [
  {
    id: "protein_shake",
    name: "Protein Shake (1 scoop whey)",
    calories: 130,
    protein: 24,
    carbs: 3,
    fat: 2,
    category: "shake",
  },
];

export const snacks: Meal[] = [
  {
    id: "snack_turkey_slices_2",
    name: "2 Turkey Slices",
    calories: 50,
    protein: 8,
    carbs: 0,
    fat: 0,
    category: "snack",
  }
];

export const MEAL_LIBRARY: Meal[] = [
  ...breakfasts,
  ...dinners,
  ...fruits,
  ...coffees,
  ...snacks,
  ...proteinShakes,
];
