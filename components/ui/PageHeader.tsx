import { AccentTag } from "@/components/ui/AccentTag";

interface PageHeaderProps {
  label: string;
  subtitle: string;
}

export function PageHeader({ label, subtitle }: PageHeaderProps) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "100px clamp(20px, 5vw, 64px) 60px",
        position: "relative",
      }}
    >
      <div
        data-testid="page-header-grid"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(var(--color-surface-alt) 1px, transparent 1px), linear-gradient(90deg, var(--color-surface-alt) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 100% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 100% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <AccentTag label={label} />
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 600,
            color: "var(--color-primary)",
            letterSpacing: "-0.03em",
            marginTop: "16px",
            lineHeight: 1.1,
          }}
        >
          {subtitle}
        </h1>
      </div>
    </div>
  );
}
