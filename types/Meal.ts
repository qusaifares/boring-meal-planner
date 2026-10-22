export type MealCategory =
  | "breakfast"
  | "dinner"
  | "fruit"
  | "coffee"
  | "shake"
  | "snack"
  | "side"
  | "lunch"
  | "treat";

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: MealCategory;
};
