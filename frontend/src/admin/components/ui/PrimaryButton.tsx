import type { MouseEventHandler, ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export function PrimaryButton({
  children,
  icon,
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-[47px] items-center rounded-[7px] bg-brand py-3 pl-[25px] pr-[38px] text-base font-semibold text-white disabled:opacity-40 disabled:pointer-events-none ${className}`}
    >
      {icon ? <span className="mr-1.5 shrink-0">{icon}</span> : null}
      <span className="whitespace-nowrap leading-none">{children}</span>
    </button>
  );
}
