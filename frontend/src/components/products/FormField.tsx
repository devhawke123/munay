import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  className?: string;
};

type InputFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type TextareaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

type FormFieldProps = InputFieldProps | TextareaFieldProps;

const fieldClassName =
  "w-full rounded-[10px] border border-brand/10 bg-brand-soft/40 px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-brand/40";

export function FormField({ label, className = "", ...props }: FormFieldProps) {
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
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className={fieldClassName}
        />
      )}
    </label>
  );
}
