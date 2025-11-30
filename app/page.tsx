"use client";

import { useEffect, useMemo, useState } from "react";
import { toggleMeal } from "@/utils/mealToggle";
import { calculateTotals } from "@/lib/totals";
import type { PlannerState } from "@/types/planner";
import { Meal, MealCategory } from "@/types/Meal";
import { CategorySection } from "@/components/CategorySection";
import { StatTile } from "@/components/StatTile";
import { SECTION_BACKGROUND, SELECTED_MEAL_BACKGROUND } from "@/tokens/colors";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useConfig } from "@/context/ConfigContext";
import { CategoryConfig } from "@/types/plugin";

const defaultState: PlannerState = {
  selections: {},
};

export default function HomePage() {
  const isMobile = useIsMobile();
  const config = useConfig();
  
  // Extract configuration values with defaults
  const mealLibrary = config.mealLibrary;
  const categoryConfig = config.categoryConfig;
  const enableLocalStorage = config.features?.enableLocalStorage ?? false;
  const storageKey = config.features?.storageKey ?? "boring-meal-planner-v2";
  const appTitle = config.branding?.appTitle ?? "Boring Meal Planner";
  const appDescription = config.branding?.appDescription ?? "Hard-coded for your real meals. Pick breakfast, dinner, fruit, shake, mocha.";
  
  //
  // ------------------------------
  // INITIAL STATE (lazy-loaded)
  // ------------------------------
  //
  const [state, setState] = useState<PlannerState>(() => {
    if (typeof window === "undefined") return defaultState;

    try {
      if (!enableLocalStorage) return defaultState;
      const raw = window.localStorage.getItem(storageKey);
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
      if (!enableLocalStorage) return;
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }, [state, enableLocalStorage, storageKey]);

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
        const meal = mealLibrary.find((m) => m.id === id);
        if (meal) list.push(meal);
      });
    });

    return list;
  }, [state, mealLibrary]);


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
        padding: "12px",
        width: '100%',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          display: "flex",
          alignItems: 'stretch',
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "16px" : "24px",
          width: "100%",
        }}
      >

        {/* Left Column */}
        <section
          style={{
            background: SECTION_BACKGROUND,
            borderRadius: "12px",
            padding: isMobile ? "16px" : "20px",
            border: "1px solid #1f2937",
            minWidth: isMobile ? "auto" : 500,
            flexGrow: 1,
          }}
        >
          <h1 style={{ fontSize: isMobile ? "1.25rem" : "1.5rem", marginBottom: "8px", fontWeight: 600 }}>
            {appTitle}
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: 16, lineHeight: 1.4 }}>
            {appDescription}
          </p>

          {/* ------------------------------ */}
          {/* DYNAMIC CATEGORY RENDER */}
          {/* ------------------------------ */}

          {(Object.entries(categoryConfig) as [MealCategory, CategoryConfig][])
            .map(([category, categoryConf]) => {
              const meals = mealLibrary.filter((m) => m.category === category);
              const selections = state.selections[category] ?? [];

              return (
                <CategorySection
                  key={category}
                  category={category}
                  config={categoryConf}
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
            borderRadius: "12px",
            padding: isMobile ? "16px" : "20px",
            border: "1px solid #1f2937",
            width: isMobile ? "100%" : 350,
            flexGrow: isMobile ? 0 : 1,
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "1.1rem" : "1.25rem",
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
              gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(2, minmax(0, 1fr))",
              gap: isMobile ? "8px" : "10px",
              marginBottom: isMobile ? "16px" : "20px",
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
