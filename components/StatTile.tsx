export type StatTileProps = {
  label: string;
  value: number;
  suffix?: string;
};

export function StatTile({ label, value, suffix }: StatTileProps) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: "10px",
        border: "1px solid #111827",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 55%), #020617",
      }}
    >
      <p
        style={{
          fontSize: "0.8rem",
          marginBottom: "4px",
          color: "#9ca3af",
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>
        {value}
        {suffix ? ` ${suffix}` : ""}
      </p>
    </div>
  );
}
