type AdminFieldProps = {
  children: React.ReactNode;
  help?: string;
  label: string;
};

export function AdminField({ children, help, label }: AdminFieldProps) {
  return (
    <label className="admin-field">
      <span className="field-label">{label}</span>
      {children}
      {help && <span className="field-help">{help}</span>}
    </label>
  );
}
