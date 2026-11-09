"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useRequest } from "./RequestProvider";

type RequestButtonProps = {
  title: string;
  residence?: string;
  configuration?: string;
  variant?: "primary" | "accent" | "secondary" | "ghost";
  className?: string;
  children: ReactNode;
};

export function RequestButton({
  title,
  residence,
  configuration,
  variant = "primary",
  className,
  children,
}: RequestButtonProps) {
  const open = useRequest();
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => open({ title, residence, configuration })}
    >
      {children}
    </Button>
  );
}
