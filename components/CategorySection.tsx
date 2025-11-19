import { CategoryConfig } from "@/data/categories";
import { MEAL_LIBRARY } from "@/data/meals";
import { Meal, MealCategory } from "@/types/Meal";

export function CategorySection({
  category,
  config,
  meals,
  selections,
  onChange,
}: {
  category: MealCategory;
  config: CategoryConfig;
  meals: Meal[];
  selections: string[];
  onChange: (mealId: string) => void;
}) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <p style={{ fontSize: "0.95rem", marginBottom: 8 }}>{config.label}</p>

      {config.inputType === "dropdown" && (
        <select
          value={selections[0] ?? ""}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#020617",
            color: "#e5e7eb",
          }}
        >
          <option value="">— None —</option>
          {meals.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.calories} kcal, {m.protein}g P)
            </option>
          ))}
        </select>
      )}

      {config.inputType === "radio" && (
          <>
            {[{ id: "", name: "— None —", calories: 0, protein: 0 }, ...meals].map((m) => (
              <label
                key={m.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                <input
                  type="radio"
                  name={`${category}-radio`}
                  checked={m.id === '' ? !selections.some(selection => meals.map(m => m.id).includes(selection)) : selections.includes(m.id)}
                  onChange={() => onChange(m.id)}
                />
                <span>
                  {m.name} ({m.calories} kcal, {m.protein}g P)
                </span>
              </label>
            ))}
          </>
      )}

      {config.inputType === "checkbox" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {meals.map((m) => (
            <label
              key={m.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              <input
                type="checkbox"
                checked={selections.includes(m.id)}
                onChange={() => onChange(m.id)}
              />
              <span>
                {m.name} ({m.calories} kcal, {m.protein}g P)
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
