import { useState } from "react";
import { allPlugins } from "@/config/plugins";
import { useIsMobile } from "@/hooks/useIsMobile";

export function TenantSelector() {
  const isMobile = useIsMobile();
  
  // Lazy initial state to get current tenant and path from URL (client-side only)
  const [currentTenant] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      return url.searchParams.get("tenant");
    }
    return null;
  });
  
  const [currentPath] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "/";
  });

  return (
    <div
      style={{
        marginBottom: isMobile ? "16px" : "20px",
        padding: isMobile ? "12px" : "16px",
        background: "#1f2937",
        borderRadius: "8px",
        border: "1px solid #374151",
      }}
    >
      <h3
        style={{
          fontSize: isMobile ? "0.9rem" : "1rem",
          marginBottom: "8px",
          fontWeight: 500,
          color: "#e5e7eb",
        }}
      >
        Switch Configuration
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "8px" : "12px",
          flexWrap: "wrap",
        }}
      >
        {allPlugins.map((plugin) => {
          const isActive = currentTenant === plugin.tenantId || 
                          (currentTenant === null && plugin.tenantId === "default");
          
          const url = plugin.tenantId === "default" 
            ? currentPath 
            : `${currentPath}?tenant=${plugin.tenantId}`;

          return (
            <a
              key={plugin.tenantId}
              href={url}
              style={{
                padding: isMobile ? "8px 12px" : "6px 10px",
                borderRadius: "6px",
                border: isActive ? "2px solid #3b82f6" : "1px solid #4b5563",
                background: isActive ? "#1e40af" : "transparent",
                color: isActive ? "#ffffff" : "#d1d5db",
                fontSize: isMobile ? "0.85rem" : "0.8rem",
                textDecoration: "none",
                textAlign: "center",
                transition: "all 0.2s ease",
                fontWeight: isActive ? 500 : 400,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#374151";
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#d1d5db";
                }
              }}
            >
              {plugin.tenantName}
            </a>
          );
        })}
      </div>
      {currentTenant && (
        <p
          style={{
            fontSize: "0.75rem",
            color: "#9ca3af",
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          Currently using: {allPlugins.find(p => p.tenantId === currentTenant)?.tenantName || currentTenant}
        </p>
      )}
    </div>
  );
}