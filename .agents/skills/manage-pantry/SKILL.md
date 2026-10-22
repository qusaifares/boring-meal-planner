---
name: manage-pantry
description: Maintain inventory and pantry staples separately from meal recipes and avoid claiming purchases have occurred.
---
# Manage Pantry

The current app has no pantry model; do not confuse a meal library with actual in-stock inventory.

1. Distinguish confirmed on-hand, usually stocked, planned-to-buy, and out-of-stock items.
2. Record item name, quantity, unit, location (fridge/freezer/pantry), optional expiration/date checked, and uncertainty. Do not invent amounts.
3. If creating stored inventory, start with the documented format in `docs/pantry-model.md`, implement the smallest backward-compatible data layer, and keep it separate from `Meal` until UI support exists.
4. For this profile, confirmed proteins discussed are frozen 95/5 ground beef and NY strip; chicken is a possible protein, not confirmed in stock. Pantry ingredients such as soy sauce, gochujang, brown sugar and sesame oil were discussed as items to buy, NOT confirmed purchased.
5. On a pantry update, never overwrite unknown quantities with invented counts; preserve last-confirmed status.
6. Allow a meal suggestion to prefer on-hand items, but surface missing ingredients. Avoid cucumber and pork/alcohol for this user's profile.
7. Validate changes and open a PR, listing confirmed vs proposed pantry items and any missing data.
