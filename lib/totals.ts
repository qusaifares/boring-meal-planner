import { Meal } from "@/types/Meal";

export type Totals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export function calculateTotals(meals: Meal[]): Totals {
  return meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}
