import type { ElementType, ReactNode } from "react";

/**
 * Liquid Glass surface — an Apple-style glass panel with backdrop refraction,
 * a bright specular rim, an inner bezel highlight and a slow travelling sheen.
 *
 * The technique mirrors the layered lens model used by liquid-glass-js
 * (bezel + specular edge + tint + blur) but is implemented with pure CSS so it
 * stays SSR-safe, works without WebGL/html2canvas and costs nothing on mobile.
 */
export function LiquidGlass({
  as,
  className = "",
  sheen = true,
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  sheen?: boolean;
  children?: ReactNode;
} & Record<string, unknown>) {
  const Tag = (as ?? "div") as React.ComponentType<Record<string, unknown>>;
  return (
    <Tag className={`liquid-glass ${sheen ? "liquid-sheen" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export default LiquidGlass;
