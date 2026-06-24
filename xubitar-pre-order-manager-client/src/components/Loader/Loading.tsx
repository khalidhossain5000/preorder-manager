import * as React from "react";
import { Loader2Icon } from "lucide-react";

export type LoadingSize = "xs" | "sm" | "md";

export interface LoadingProps {
  size?: LoadingSize;
  ariaLabel?: string;
  className?: string;
}

export default function Loading({
  size = "sm",
  ariaLabel = "Loading",
  className = "",
}: LoadingProps) {
  const px = size === "xs" ? 12 : size === "sm" ? 16 : 20;

  return (
    <Loader2Icon
      role="status"
      aria-label={ariaLabel}
      className={"animate-spin inline-block " + className}
      size={px}
    />
  );
}

export { Loading };
