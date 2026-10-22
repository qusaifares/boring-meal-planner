---
name: create-meal
description: Add a meal to a Boring Meal Planner profile with grounded serving sizes and nutrition.
---
# Create Meal

1. Identify target tenant plugin and inspect `types/Meal.ts` and that plugin's `mealLibrary` structure.
2. Capture name, category, ingredients, portions with raw/cooked distinction, and cooking oil/butter. Ask only if a missing quantity materially affects the outcome; otherwise mark assumption.
3. Check exact nutrition labels when available; otherwise calculate transparent approximate calories, protein, carbs, fat from ingredient portions. Never pretend estimates are label-verified. Prefer sums that approximately match macro calories (4P + 4C + 9F).
4. Use a stable, unique, tenant-specific meal ID. Check for near duplicates and prefer editing an existing meal when appropriate.
5. Insert a `Meal` record with numeric `calories`, `protein`, `carbs`, `fat` and a supported `category`; keep all fields accepted by the current schema. Since the current schema has no ingredient arrays, document ingredient assumptions in a name/comment until a migration lands.
6. Never add disliked ingredients (e.g. cucumber for this user's recent-staples profile), or pork/alcohol in that profile.
7. Validate category configuration, TS checks and tests where runnable; open a PR with a meal summary and assumptions.

If the user requests a precise ingredient-level meal, propose a backward-compatible schema migration instead of writing unsupported fields.
