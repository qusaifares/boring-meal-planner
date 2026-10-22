---
name: create-profile
description: Create a new Boring Meal Planner tenant profile with its own meal library and categories.
---
# Create Profile

Use when asked to create a new dietary profile, meal library, or tenant.

1. Read `types/plugin.ts`, `types/Meal.ts`, `config/plugins/index.ts`, and an existing plugin before editing.
2. Get a unique kebab-case tenant ID and a human-readable name; infer from conversation when unambiguous. Never overwrite an existing profile.
3. Create `config/plugins/<tenant-id>.plugin.ts` exporting a typed `AppConfigPlugin`. Set unique storageKey, sensible categoryConfig for included meal categories, name, branding, and feature flags.
4. Register the plugin in `config/plugins/index.ts`: import, export, and add it to `allPlugins`; verify the tenant selector can resolve it.
5. Keep existing profiles unchanged, carry over only foods the user asked for, and do not include disliked or restricted ingredients.
6. Run validation/tests when possible. Create a branch and PR, summarize included categories/meals and how to open using `?tenant=<tenant-id>`.

Avoid hardcoding authentication, secret keys, or user-sensitive data in public repository files.
