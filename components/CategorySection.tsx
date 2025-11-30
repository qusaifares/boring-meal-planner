import { CategoryConfig } from "@/types/plugin";
import { Meal, MealCategory } from "@/types/Meal";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  const NONE_MEAL: Meal = {
    id: "", name: "— None —",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    category,
  };
  const isMobile = useIsMobile();
  
  const getMealLabel = (meal: Meal): string => meal.id === '' ? meal.name : `${meal.name} (${meal.calories} kcal, ${meal.protein}g P)`;
  
  return (
    <div style={{ marginBottom: isMobile ? "20px" : "24px" }}>
      <p style={{ fontSize: "0.9rem", marginBottom: 8, fontWeight: 500 }}>{config.label}</p>

      {config.inputType === "dropdown" && (
        <select
          value={selections[0] ?? ""}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: isMobile ? "10px" : "8px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#020617",
            color: "#e5e7eb",
            fontSize: isMobile ? "16px" : "14px",
          }}
        >
          {[NONE_MEAL, ...meals].map((m) => (
            <option key={m.id} value={m.id}>
              {getMealLabel(m)}
            </option>
          ))}
        </select>
      )}

      {config.inputType === "radio" && (
          <>
            {[NONE_MEAL, ...meals].map((m) => (
              <label
                key={m.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  fontSize: isMobile ? "0.85rem" : "0.9rem",
                  padding: isMobile ? "4px 0" : "2px 0",
                }}
              >
                <input
                  type="radio"
                  name={`${category}-radio`}
                  checked={m.id === '' ? !selections.some(selection => meals.map(m => m.id).includes(selection)) : selections.includes(m.id)}
                  onChange={() => onChange(m.id)}
                />
                <span>
                  {getMealLabel(m)}
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
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                padding: isMobile ? "4px 0" : "2px 0",
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
