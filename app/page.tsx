"use client";

import { useEffect, useMemo, useState } from "react";
import { MEAL_LIBRARY } from "@/data/meals";
import { CATEGORY_CONFIG, CategoryConfig } from "@/data/categories";
import { toggleMeal } from "@/utils/mealToggle";
import { calculateTotals } from "@/lib/totals";
import type { PlannerState } from "@/types/planner";
import { Meal, MealCategory } from "@/types/Meal";
import { CategorySection } from "@/components/CategorySection";
import { StatTile } from "@/components/StatTile";
import { SECTION_BACKGROUND, SELECTED_MEAL_BACKGROUND } from "@/tokens/colors";

const STORAGE_KEY = "boring-meal-planner-v2";
const PERSIST_WITH_LOCAL_STORAGE = false;

const defaultState: PlannerState = {
  selections: {},
};

export default function HomePage() {
  //
  // ------------------------------
  // INITIAL STATE (lazy-loaded)
  // ------------------------------
  //
  const [state, setState] = useState<PlannerState>(() => {
    if (typeof window === "undefined") return defaultState;

    try {
      if (!PERSIST_WITH_LOCAL_STORAGE) return defaultState;
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState;

      const parsed = JSON.parse(raw) as PlannerState;
      return { ...defaultState, ...parsed };
    } catch {
      return defaultState;
    }
  });

  //
  // ------------------------------
  // PERSIST TO LOCAL STORAGE
  // ------------------------------
  //
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!PERSIST_WITH_LOCAL_STORAGE) return;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  //
  // ------------------------------
  // BUILD SELECTED MEALS
  // ------------------------------
  //
  const selectedMeals = useMemo(() => {
    const list: Meal[] = [];

    (Object.keys(state.selections) as MealCategory[]).forEach((category) => {
      const ids = state.selections[category] ?? [];
      ids.forEach((id) => {
        const meal = MEAL_LIBRARY.find((m) => m.id === id);
        if (meal) list.push(meal);
      });
    });

    return list;
  }, [state]);


  //
  // ------------------------------
  // TOTALS
  // ------------------------------
  //
  const totals = useMemo(() => calculateTotals(selectedMeals), [selectedMeals]);

  //
  // ------------------------------
  // CLEAR DAY
  // ------------------------------
  //
  const handleClear = () => setState(defaultState);

  //
  // ------------------------------
  // RENDER
  // ------------------------------
  //
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "24px",
        width: '100%',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          display: "flex",
          alignItems: 'stretch',
          flexWrap: "wrap",
          gap: "24px",
        }}
      >

        {/* Left Column */}
        <section
          style={{
            background: SECTION_BACKGROUND,
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #1f2937",
            minWidth: 500,
            flexGrow: 1,
          }}
        >
          <h1 style={{ fontSize: "1.5rem", marginBottom: "8px", fontWeight: 600 }}>
            Boring Meal Planner
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#9ca3af", marginBottom: 20 }}>
            Hard-coded for your real meals.  
            Pick breakfast, dinner, fruit, shake, mocha.
          </p>

          {/* ------------------------------ */}
          {/* DYNAMIC CATEGORY RENDER */}
          {/* ------------------------------ */}

          {(Object.entries(CATEGORY_CONFIG) as [MealCategory, CategoryConfig][])
            .map(([category, config]) => {
              const meals = MEAL_LIBRARY.filter((m) => m.category === category);
              const selections = state.selections[category] ?? [];

              return (
                <CategorySection
                  key={category}
                  category={category}
                  config={config}
                  meals={meals}
                  selections={selections}
                  onChange={(mealId) =>
                    setState((prev) => toggleMeal(prev, category, mealId))
                  }
                />
              );
            })}

          {/* Clear button */}
          <button
            type="button"
            onClick={handleClear}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #4b5563",
              background: "transparent",
              color: "#e5e7eb",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Clear day
          </button>
        </section>

        {/* Right Column */}
        <section
          style={{
            background: SECTION_BACKGROUND,
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #1f2937",
            width: 350,
            flexGrow: 1,
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              marginBottom: "12px",
              fontWeight: 600,
            }}
          >
            Today&apos;s Summary
          </h2>

          {/* Totals grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <StatTile label="Calories" value={totals.calories} suffix="kcal" />
            <StatTile label="Protein" value={totals.protein} suffix="g" />
            <StatTile label="Carbs" value={totals.carbs} suffix="g" />
            <StatTile label="Fat" value={totals.fat} suffix="g" />
          </div>

          {/* Selected meals list */}
          <div>
            <h3 style={{ fontSize: "1rem", marginBottom: "8px", fontWeight: 500 }}>
              Selected Meals
            </h3>

            {selectedMeals.length === 0 ? (
              <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
                Nothing selected yet.
              </p>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "0.9rem",
                }}
              >
                {selectedMeals.map((meal) => (
                  <li
                    key={meal.id}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: SELECTED_MEAL_BACKGROUND,
                      border: "1px solid #111827",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <span>{meal.name}</span>
                      <span style={{ color: "#9ca3af" }}>
                        {meal.calories} kcal
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#9ca3af",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <span>P {meal.protein}g</span>
                      <span>C {meal.carbs}g</span>
                      <span>F {meal.fat}g</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
