import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "placeholder" | "type">;

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  ...props
}: SearchBarProps) {
  return (
    <div
      className={`flex h-[37px] items-center gap-2 rounded-[10px] border border-brand/10 bg-surface-muted px-[14px] ${className}`}
    >
      <Search size={13} className="shrink-0 text-text-muted" />
      <input
        {...props}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-primary/50"
      />
    </div>
  );
}
