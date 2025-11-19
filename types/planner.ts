import { Meal, MealCategory } from "./Meal";

export type PlannerState = {
  selections: Partial<Record<MealCategory, Meal['id'][]>>; 
  // example:
  // { breakfast: ["breakfast_bagel"], fruit: ["fruit_apple"], shake: [] }
};