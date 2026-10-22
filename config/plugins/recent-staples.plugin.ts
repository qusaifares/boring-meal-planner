import { AppConfigPlugin } from "@/types/plugin";
import { Meal } from "@/types/Meal";

/**
 * Recent everyday staples (October 2026).
 * All macro values are estimates, not verified nutrition labels.
 * Meat weights refer to raw portions; rice/potato weights are cooked unless noted.
 * Cooking oil/butter is included only where explicitly listed in the meal name.
 */
const meals: Meal[] = [
  { id: "recent_egg_cheese_bagel", name: "Egg & Cheese Bagel", calories: 430, protein: 22, carbs: 53, fat: 15, category: "breakfast" },
  { id: "recent_avocado_eggs_salmon_toast", name: "Avocado Toast + 2 Eggs + Salmon", calories: 520, protein: 33, carbs: 34, fat: 29, category: "breakfast" },
  { id: "recent_ms_chicken_vegetables", name: "Microsoft Chicken + Vegetables (including Rainbow Carrots)", calories: 260, protein: 38, carbs: 12, fat: 6, category: "lunch" },
  { id: "recent_ms_steelhead_salad", name: "Microsoft Steelhead Salad (Greens, Egg, Feta, Vegetables)", calories: 580, protein: 44, carbs: 20, fat: 36, category: "lunch" },
  { id: "recent_ms_steelhead_salad_flank", name: "Microsoft Steelhead Salad + 1/2 Serving Flank Steak", calories: 720, protein: 64, carbs: 20, fat: 42, category: "lunch" },
  { id: "recent_ms_steelhead_salad_chicken", name: "Microsoft Steelhead Salad + 1/2 Serving Chicken Breast", calories: 680, protein: 66, carbs: 20, fat: 38, category: "lunch" },
  { id: "recent_korean_ground_beef", name: "Korean 95/5 Ground Beef Bowl (225g Beef, 150g Rice, Sauce, Mushrooms)", calories: 650, protein: 54, carbs: 61, fat: 21, category: "dinner" },
  { id: "recent_gochujang_chicken", name: "Gochujang Chicken Bowl (225g Breast, 150g Rice, Broccoli)", calories: 550, protein: 59, carbs: 60, fat: 9, category: "dinner" },
  { id: "recent_ny_strip_bulgogi", name: "NY Strip Bulgogi (200g Steak, 150g Rice, Onion & Mushrooms)", calories: 730, protein: 52, carbs: 60, fat: 31, category: "dinner" },
  { id: "recent_ny_strip_sweet_potato_broccoli", name: "12oz NY Strip (Fat Cap Not Eaten, Cooked with Butter) + Sweet Potato (200g) + Broccoli (1 cup)", calories: 975, protein: 82, carbs: 49, fat: 50, category: "dinner" },
  { id: "recent_cheeseburger_potatoes", name: "Cheeseburger + 110g Potatoes (225g 95/5 Beef, Brioche, 2 Kraft, 2 Turkey Bacon, 8g Mayo, Butter)", calories: 890, protein: 65, carbs: 62, fat: 43, category: "dinner" },
  { id: "recent_fairlife_chocolate", name: "Fairlife Nutrition Plan Chocolate", calories: 150, protein: 30, carbs: 3, fat: 2.5, category: "shake" },
  { id: "recent_fairlife_pudding", name: "Fairlife + 18g Jell-O Pudding Mix", calories: 210, protein: 30, carbs: 18, fat: 2.5, category: "snack" },
  { id: "recent_creami_pudding", name: "Ninja Creami: Fairlife + 8g Pudding Mix (No Mix-ins)", calories: 177, protein: 30, carbs: 10, fat: 2.5, category: "snack" },
  { id: "recent_crepini_pancakes", name: "Crepini Pancakes (4-pack)", calories: 220, protein: 8, carbs: 30, fat: 8, category: "snack" },
  { id: "recent_coldstone_birthday_cake_remix_small", name: "Cold Stone Birthday Cake Remix (Small / Like It)", calories: 670, protein: 8, carbs: 88, fat: 29, category: "snack" },
  { id: "recent_greek_yogurt", name: "Plain Nonfat Greek Yogurt (170g)", calories: 100, protein: 18, carbs: 7, fat: 0, category: "snack" },
  { id: "recent_apple", name: "Apple (Medium)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, category: "fruit" },
  { id: "recent_banana", name: "Banana (Medium)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, category: "fruit" },
  { id: "recent_berries", name: "Mixed Berries (1 cup)", calories: 75, protein: 1, carbs: 18, fat: 0.5, category: "fruit" },
  { id: "recent_rice", name: "Cooked White Rice (150g)", calories: 195, protein: 4, carbs: 43, fat: 0.4, category: "side" },
  { id: "recent_kimchi", name: "Kimchi (50g)", calories: 15, protein: 1, carbs: 3, fat: 0, category: "side" },
  { id: "recent_potatoes", name: "Air-Fried Potatoes (110g, No Added Oil)", calories: 95, protein: 2, carbs: 22, fat: 0, category: "side" },
  { id: "recent_coffee_black", name: "Espresso / Black Coffee", calories: 5, protein: 0, carbs: 1, fat: 0, category: "coffee" },
  { id: "recent_cappuccino_2percent", name: "Cappuccino (2% Milk)", calories: 100, protein: 7, carbs: 10, fat: 4, category: "coffee" },
];

export const recentStaplesPlugin: AppConfigPlugin = {
  tenantId: "recent-staples",
  tenantName: "Qusai - Recent Staples",
  version: "1.0.0",
  mealLibrary: meals,
  categoryConfig: {
    breakfast: { label: "Breakfast", inputType: "multiselect", maxSelections: Infinity },
    lunch: { label: "Microsoft / Lunch", inputType: "multiselect", maxSelections: Infinity },
    dinner: { label: "Dinner Rotation", inputType: "multiselect", maxSelections: Infinity },
    coffee: { label: "Coffee", inputType: "radio", maxSelections: 1 },
    shake: { label: "Fairlife", inputType: "multiselect", maxSelections: Infinity },
    fruit: { label: "Fruit", inputType: "checkbox", maxSelections: Infinity },
    snack: { label: "Snacks / Dessert", inputType: "checkbox", maxSelections: Infinity },
    side: { label: "Sides", inputType: "checkbox", maxSelections: Infinity },
  },
  branding: {
    appTitle: "Boring Meal Planner",
    appDescription: "Recent high-protein staples: Korean bowls, burgers, Microsoft meals, bagels, and Fairlife. Macros estimated; no cucumber.",
  },
  features: {
    enableLocalStorage: false,
    storageKey: "boring-meal-planner-qusai-recent-staples",
    enableMobileView: true,
  },
};
