import { SELECTED_MEAL_BACKGROUND } from "@/tokens/colors";
import { useIsMobile } from "@/hooks/useIsMobile";

export type StatTileProps = {
  label: string;
  value: number;
  suffix?: string;
};

export function StatTile({ label, value, suffix }: StatTileProps) {
  const isMobile = useIsMobile();
  
  return (
    <div
      style={{
        padding: isMobile ? "8px 6px" : "10px 12px",
        borderRadius: "8px",
        border: "1px solid #111827",
        background:
          `radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 55%), ${SELECTED_MEAL_BACKGROUND}`,
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: isMobile ? "0.7rem" : "0.8rem",
          marginBottom: "2px",
          color: "#9ca3af",
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: isMobile ? "0.9rem" : "1.1rem", fontWeight: 600 }}>
        {value}
        {suffix ? ` ${suffix}` : ""}
      </p>
    </div>
  );
}
