---
name: update-meal
description: Modify an existing meal, serving sizes or nutrition in a named profile without affecting others.
---
# Update Meal

1. Locate the tenant and meal by exact ID or unambiguous name; inspect current record and relevant category.
2. Preserve the meal's stable ID unless it is truly a new meal. Do not modify a similarly named meal in another tenant.
3. Record ingredient and portion changes, including raw vs cooked weights and fats used for cooking.
4. Recalculate all four nutrition fields from changed ingredients using label values where possible; clearly distinguish estimates and original figures. Ensure calories and macro totals are plausible.
5. Respect tenant preferences and avoid introducing disliked or restricted food.
6. Check for duplicate entries, valid category, TS types, and tests when available.
7. Submit changes on a branch and PR, stating before/after macro totals, portion assumptions, and changed files.

Do not silently rewrite historical eaten-food logs when changing a reusable recipe.
