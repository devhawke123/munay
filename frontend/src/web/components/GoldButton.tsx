import type { ButtonHTMLAttributes } from "react";

type GoldButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function GoldButton({ className = "", children, ...props }: GoldButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-[6px] bg-gold-deep px-8 py-2.5 font-sans text-[14px] font-light leading-[20px] tracking-[0.35px] text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
