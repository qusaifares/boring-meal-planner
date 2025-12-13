import { MealCategory } from "@/types/Meal";
import { CategoryConfig } from "@/types/plugin";
import type { PlannerState } from "@/types/planner";

// ------------------
// Helper: dropdown
// ------------------
function applyDropdownSelection(mealId: string | null): string[] {
  return mealId ? [mealId] : [];
}

// ------------------
// Helper: remove
// ------------------
function removeFromArray(arr: string[], id: string): string[] {
  return arr.filter((x) => x !== id);
}

// ------------------
// Helper: checkbox logic
// ------------------
function applyCheckboxSelection(
  current: string[],
  mealId: string,
  maxSelections: number
): string[] {
  console.log(mealId);
  const isSelected = current.includes(mealId);

  // unselect
  if (isSelected) {
    return removeFromArray(current, mealId);
  }

  // radio-style checkbox (max 1)
  if (maxSelections === 1) {
    if (mealId === '') {
      return [];
    }

    return [mealId];
  }

  // unlimited checkboxes
  return [...current, mealId];
}

// ------------------
// Main public function
// ------------------
export function toggleMeal(
  prev: PlannerState,
  category: MealCategory,
  mealId: string | null,
  categoryConfig: Partial<Record<MealCategory, CategoryConfig>>
): PlannerState {
  const config = categoryConfig[category];
  if (!config) return prev;

  const current = prev.selections[category] ?? [];
  let nextForCategory: string[];

  if (config.inputType === "dropdown") {
    nextForCategory = applyDropdownSelection(mealId);
  } else {
    if (mealId === null || mealId === undefined) return prev;
    // TODO: Separate radio into its own block
    nextForCategory = applyCheckboxSelection(
      current,
      mealId,
      config.maxSelections
    );
  }

  return {
    ...prev,
    selections: {
      ...prev.selections,
      [category]: nextForCategory,
    },
  };
}
