"use client";

import { useRef, type MouseEvent } from "react";

interface RippleButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function RippleButton({ children, href, className = "" }: RippleButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    el.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <a ref={ref} href={href} className={`ripple-container ${className}`} onClick={handleClick}>
      {children}
    </a>
  );
}
