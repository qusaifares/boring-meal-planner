"use client";

import { useRef, useState, useEffect } from "react";
import { Meal } from "@/types/Meal";

interface Props {
  meals: Meal[];
  selections: string[];
  onChange: (mealId: string) => void;
  isMobile: boolean;
}

export function MultiSelectDropdown({ meals, selections, onChange, isMobile }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const label =
    selections.length === 0
      ? "— None —"
      : selections
          .map((id) => meals.find((m) => m.id === id)?.name ?? id)
          .join(", ");

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: isMobile ? "10px" : "8px",
          borderRadius: "8px",
          border: "1px solid #374151",
          background: "#020617",
          color: selections.length === 0 ? "#6b7280" : "#e5e7eb",
          fontSize: isMobile ? "16px" : "14px",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {label}
        </span>
        <span style={{ flexShrink: 0, color: "#6b7280" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#0f172a",
            border: "1px solid #374151",
            borderRadius: "8px",
            zIndex: 100,
            maxHeight: "260px",
            overflowY: "auto",
            padding: "4px 0",
          }}
        >
          {meals.map((m) => {
            const checked = selections.includes(m.id);
            return (
              <label
                key={m.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: isMobile ? "10px 12px" : "7px 12px",
                  cursor: "pointer",
                  fontSize: isMobile ? "0.85rem" : "0.875rem",
                  color: "#e5e7eb",
                  background: checked ? "#1e293b" : "transparent",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange(m.id)}
                  style={{ accentColor: "#6366f1", flexShrink: 0 }}
                />
                <span>
                  {m.name}{" "}
                  <span style={{ color: "#9ca3af", fontSize: "0.8em" }}>
                    ({m.calories} kcal, {m.protein}g P)
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
