import { AppConfigPlugin } from "@/types/plugin";
import { Meal } from "@/types/Meal";

/**
 * Inventory-based plugin (Costco kitchen)
 * NOTE: Macros are per the serving sizes listed in your inventory file.
 */

// ---------- Breakfasts (egg-first) ----------
const breakfasts: Meal[] = [
  {
    id: "breakfast_egg_tacos_3e_2t_kimchi",
    name: "Egg Tacos (3 Eggs + 2 Tortillas + Kimchi)",
    calories: 366,
    protein: 28.9,
    carbs: 41.1,
    fat: 19.4,
    category: "breakfast",
  },
  {
    id: "breakfast_egg_tacos_3e_2t_queso_kimchi",
    name: "Egg Tacos + Queso (3 Eggs + 2 Tortillas + 1oz Queso + Kimchi)",
    calories: 476,
    protein: 35.9,
    carbs: 42.1,
    fat: 28.4,
    category: "breakfast",
  },
  {
    id: "breakfast_egg_chicken_tortilla_kimchi",
    name: "Egg + Chicken Taco Plate (3 Eggs + Chicken + 1 Tortilla + Kimchi)",
    calories: 396,
    protein: 42.9,
    carbs: 24.1,
    fat: 18.9,
    category: "breakfast",
  },
  {
    id: "breakfast_egg_steakbites_tortilla_kimchi",
    name: "Egg + Steak Bites Taco Plate (3 Eggs + Steak Bites + 1 Tortilla + Kimchi)",
    calories: 416,
    protein: 43.9,
    carbs: 23.1,
    fat: 19.9,
    category: "breakfast",
  },
  {
    id: "breakfast_2egg_beef_patty_kimchi",
    name: "2 Eggs + Beef Patty + Kimchi",
    calories: 534,
    protein: 38.6,
    carbs: 2.7,
    fat: 39.6,
    category: "breakfast",
  },
];

// ---------- Lunch / Dinner (inventory meals) ----------
const lunches: Meal[] = [
  {
    id: "lunch_shrimp_rice_broccoli_kimchi",
    name: "Shrimp Rice Bowl (8oz Shrimp + Rice Pouch + 2c Broccoli + Kimchi)",
    calories: 580,
    protein: 50,
    carbs: 86,
    fat: 8,
    category: "lunch",
  },
  {
    id: "lunch_chicken_beans_corn_broccoli_kimchi",
    name: "Chicken Bean Corn Bowl (6oz Chicken + Black Beans + Corn + 2c Broccoli + Kimchi)",
    calories: 450,
    protein: 54,
    carbs: 51,
    fat: 5.5,
    category: "lunch",
  },
  {
    id: "lunch_chicken_broccoli_kimchi",
    name: "Chicken + Broccoli + Kimchi (6oz Chicken + 2c Broccoli + Kimchi)",
    calories: 260,
    protein: 44,
    carbs: 14,
    fat: 4,
    category: "lunch",
  },
];

const dinners: Meal[] = [
  {
    id: "dinner_steakbites_broccoli_greenbeans_tortilla",
    name: "Steak Bites Plate (Steak Bites + 2c Broccoli + 1c Green Beans + 1 Tortilla)",
    calories: 280,
    protein: 33,
    carbs: 36,
    fat: 5.5,
    category: "dinner",
  },
  {
    id: "dinner_kbbq_rice_broccoli",
    name: "Korean BBQ Steak Bowl (Kevin’s + Rice Pouch + 2c Broccoli)",
    calories: 610,
    protein: 33,
    carbs: 92,
    fat: 16,
    category: "dinner",
  },
  {
    id: "dinner_beef_patty_potato_broccoli_kimchi",
    name: "Beef Patty + Potato Plate (Beef Patty + Potato + 2c Broccoli + Kimchi)",
    calories: 601,
    protein: 36.3,
    carbs: 46.6,
    fat: 30.2,
    category: "dinner",
  },
  {
    id: "dinner_beef_patty_12shrimp_kimchi",
    name: "Beef Patty + 12 Shrimp + Kimchi",
    calories: 470,
    protein: 44,
    carbs: 2,
    fat: 31,
    category: "dinner",
  }
];

// ---------- Fruits ----------
const fruits: Meal[] = [
  {
    id: "fruit_apple_medium",
    name: "Apple (1 medium)",
    calories: 95,
    protein: 0.5,
    carbs: 25.1,
    fat: 0.3,
    category: "fruit",
  },
  {
    id: "fruit_banana_medium",
    name: "Banana (1 medium)",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    category: "fruit",
  },
  {
    id: "fruit_blueberries_1cup",
    name: "Blueberries (1 cup)",
    calories: 84,
    protein: 1.1,
    carbs: 21.4,
    fat: 0.5,
    category: "fruit",
  },
];

// ---------- Shakes / Dairy ----------
const shakes: Meal[] = [
  {
    id: "shake_fairlife_nutrition_plan_chocolate",
    name: "Fairlife Nutrition Plan (Chocolate)",
    calories: 150,
    protein: 30,
    carbs: 3,
    fat: 2.5,
    category: "shake",
  },
];

const snacks: Meal[] = [
  {
    id: "snack_greek_yogurt_170g",
    name: "Nonfat Greek Yogurt (170g)",
    calories: 100,
    protein: 18,
    carbs: 7,
    fat: 0,
    category: "snack",
  },
  {
    id: "snack_milk_2_percent_1cup",
    name: "2% Milk (1 cup)",
    calories: 130,
    protein: 8,
    carbs: 13,
    fat: 5,
    category: "snack",
  },
  {
    id: "snack_chomps_beef_stick",
    name: "Chomps Beef Stick (1)",
    calories: 100,
    protein: 10,
    carbs: 0,
    fat: 7,
    category: "snack",
  },
  {
    id: "snack_steak_bites_pouch",
    name: "Steak Bites (1 pouch)",
    calories: 120,
    protein: 20,
    carbs: 1,
    fat: 3,
    category: "snack",
  },
  {
    id: "snack_chicken_strips_3oz",
    name: "Chicken Strips (3 oz)",
    calories: 100,
    protein: 19,
    carbs: 2,
    fat: 2,
    category: "snack",
  },
  {
    id: "snack_shrimp_4oz",
    name: "Argentinian Shrimp (4 oz)",
    calories: 80,
    protein: 18,
    carbs: 0,
    fat: 1,
    category: "snack",
  },
  {
    id: "snack_triple_chocolate_muffin",
    name: "Kirkland Signature Triple Chocolate Muffin",
    calories: 410,
    
    // Conservative estimate (treat macros as approximate)
    // Goal: don't over-credit protein on a cut.
    protein: 5,
    carbs: 59,
    fat: 17,
    category: "snack",
  }
];

// ---------- Sides (low-cal / carb knobs) ----------
const sides: Meal[] = [
  {
    id: "side_broccoli_1cup",
    name: "Broccoli (1 cup)",
    calories: 25,
    protein: 3,
    carbs: 4,
    fat: 0,
    category: "side",
  },
  {
    id: "side_green_beans_1_2cup",
    name: "Green Beans (1/2 cup)",
    calories: 20,
    protein: 1,
    carbs: 4,
    fat: 0,
    category: "side",
  },
  {
    id: "side_kimchi_1oz",
    name: "Kimchi (1 oz)",
    calories: 10,
    protein: 0,
    carbs: 2,
    fat: 0,
    category: "side",
  },
  {
    id: "side_rice_pouch",
    name: "Cilantro Lime Rice (1 pouch)",
    calories: 360,
    protein: 8,
    carbs: 76,
    fat: 6,
    category: "side",
  },
  {
    id: "side_potato_medium",
    name: "Baked Potato (1 medium)",
    calories: 161,
    protein: 4.3,
    carbs: 36.6,
    fat: 0.2,
    category: "side",
  },
  {
    id: "side_tortilla_carb_balance_1",
    name: "Carb Balance Tortilla (1)",
    calories: 70,
    protein: 5,
    carbs: 19,
    fat: 2.5,
    category: "side",
  },
  {
    id: "side_black_beans_1_2cup",
    name: "Black Beans (1/2 cup)",
    calories: 110,
    protein: 7,
    carbs: 19,
    fat: 0.5,
    category: "side",
  },
  {
    id: "side_corn_1_2cup",
    name: "Corn (1/2 cup)",
    calories: 80,
    protein: 3,
    carbs: 18,
    fat: 1,
    category: "side",
  },
  {
    id: "side_queso_chihuahua_1oz",
    name: "Queso Chihuahua (1 oz)",
    calories: 110,
    protein: 7,
    carbs: 1,
    fat: 9,
    category: "side",
  },
];

// ---------- Plugin ----------
export const costcoKitchenPlugin: AppConfigPlugin = {
  tenantId: "costco-kitchen",
  tenantName: "Qusai - Costco Kitchen",
  version: "1.0.0",

  mealLibrary: [
    ...breakfasts,
    ...lunches,
    ...dinners,
    ...fruits,
    ...snacks,
    ...shakes,
    ...sides,
  ],

  categoryConfig: {
    breakfast: {
      label: "Breakfast",
      inputType: "dropdown",
      maxSelections: 1,
    },
    lunch: {
      label: "Lunch",
      inputType: "dropdown",
      maxSelections: 1,
    },
    dinner: {
      label: "Dinner",
      inputType: "dropdown",
      maxSelections: 1,
    },
    shake: {
      label: "Shake",
      inputType: "radio",
      maxSelections: 1,
    },
    fruit: {
      label: "Fruit",
      inputType: "checkbox",
      maxSelections: Infinity,
    },
    snack: {
      label: "Snacks",
      inputType: "checkbox",
      maxSelections: Infinity,
    },
    side: {
      label: "Sides / Add-ons",
      inputType: "checkbox",
      maxSelections: Infinity,
    },
  },

  branding: {
    appTitle: "Boring Meal Planner",
    appDescription:
      "Inventory-based meals. Egg-first breakfasts + Costco staples for cutting.",
  },

  features: {
    enableLocalStorage: false,
    storageKey: "boring-meal-planner-qusai-costco-kitchen",
    enableMobileView: true,
  },
};
