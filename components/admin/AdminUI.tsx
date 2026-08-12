interface AdminPageHeaderProps {
  title: string;
  description?: string;
}

export function AdminPageHeader({ title, description }: AdminPageHeaderProps) {
  return (
    <div
      style={{
        padding: "28px 32px",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-1)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "26px",
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: description ? "4px" : 0,
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "14px",
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

interface AdminFormCardProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export function AdminFormCard({ children, maxWidth = "680px" }: AdminFormCardProps) {
  return (
    <div style={{ padding: "32px" }}>
      <div
        style={{
          maxWidth,
          border: "1px solid var(--line)",
          background: "var(--bg-1)",
          padding: "28px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface FormFeedbackProps {
  success?: boolean;
  error?: string;
}

export function FormFeedback({ success, error }: FormFeedbackProps) {
  if (success) {
    return (
      <p
        style={{
          fontFamily: "var(--font-eb-garamond), serif",
          fontSize: "14px",
          color: "var(--gold)",
          padding: "10px 0",
        }}
      >
        ✓ Tersimpan.
      </p>
    );
  }
  if (error) {
    return (
      <p
        style={{
          fontFamily: "var(--font-eb-garamond), serif",
          fontSize: "14px",
          color: "#c96b5c",
          padding: "10px 0",
        }}
      >
        {error}
      </p>
    );
  }
  return null;
}
