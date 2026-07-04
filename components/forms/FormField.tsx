interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
  rows = 4,
}: FormFieldProps) {
  const inputClasses = `w-full rounded-lg border bg-cream px-4 py-3 text-ink placeholder:text-brown/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus:ring-2 focus:ring-gold ${
    error ? "border-burnt-orange" : "border-brown/20"
  }`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-brown">
        {label} {required && <span className="text-burnt-orange">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      {error && <span className="text-xs text-burnt-orange-dark">{error}</span>}
    </div>
  );
}
