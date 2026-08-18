import type { ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function PrimaryButton({
  children,
  icon,
  className = "",
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-[47px] items-center rounded-[7px] bg-button-brand py-3 pl-[25px] pr-[38px] text-base font-semibold text-white ${className}`}
    >
      {icon ? <span className="mr-1.5 shrink-0">{icon}</span> : null}
      <span className="whitespace-nowrap leading-none">{children}</span>
    </button>
  );
}
