import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  className?: string;
  tone?: "soft" | "white";
};

type InputFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type TextareaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

type ColorFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as: "color" };

type FormFieldProps = InputFieldProps | TextareaFieldProps | ColorFieldProps;

const toneClassName = {
  soft: "border-brand/10 bg-brand-soft/40",
  white: "border-brand-border bg-white",
};

export function FormField({ label, className = "", tone = "soft", ...props }: FormFieldProps) {
  const fieldClassName = `w-full rounded-[10px] border px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-brand/40 ${toneClassName[tone]}`;
  const colorFieldClassName = `h-10 w-full cursor-pointer rounded-[10px] border p-1 outline-none focus:border-brand/40 ${toneClassName[tone]}`;

  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </span>
      {props.as === "textarea" ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={fieldClassName}
        />
      ) : props.as === "color" ? (
        <input
          type="color"
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className={colorFieldClassName}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className={fieldClassName}
        />
      )}
    </label>
  );
}
