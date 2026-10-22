# Pantry and meal data contract (proposal)

The app currently stores meals as flat macro records in `types/Meal.ts`. No ingredient/inventory persistence exists. Future changes should preserve old plugins.

## Future ingredient-level recipes

```ts
type IngredientAmount = {
  ingredientId: string;
  quantity: number;
  unit: "g" | "ml" | "tsp" | "tbsp" | "piece";
  weightBasis?: "raw" | "cooked";
};

type RecipeDetail = {
  mealId: string;             // stable ID matching Meal.id
  ingredients: IngredientAmount[];
  instructions?: string[];
  yieldServings: number;
  nutritionSource: "label" | "database" | "estimate";
};
```

Store details as an optional separately keyed collection until every plugin is migrated.

## Future inventory

```ts
type PantryItem = {
  ingredientId: string;
  displayName: string;
  quantity?: number;
  unit?: "g" | "ml" | "piece";
  location?: "pantry" | "fridge" | "freezer";
  status: "confirmed" | "usually-stocked" | "to-buy" | "out";
  checkedAt?: string;
  expiresAt?: string;
};
```

Do not infer `confirmed` from a shopping discussion. Pantry stock is NOT a meal record. Keep user-specific inventory outside public source control when it becomes sensitive or dynamically updated.

## Initial recent-staples knowledge (not an inventory database)

- **On hand as reported:** frozen 95/5 ground beef; frozen NY strip.
- **Possible protein:** chicken; quantity and stock unknown.
- **Discussed shopping staples, not confirmed purchased:** soy sauce, gochujang, brown sugar, garlic, toasted sesame oil, gochugaru, rice vinegar, sesame seeds, seaweed, microwave rice, kimchi.
- **Usual foods, stock unverified:** brioche buns, Kraft slices, turkey bacon, potatoes, Fairlife, eggs, bagels, berries.
- **Preference:** no cucumber; avoid pork and alcohol.
- Any nutritional figures in the recent-staples plugin are approximations pending packaging/ingredient verification.
