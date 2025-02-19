import React, { forwardRef, InputHTMLAttributes } from "react";
import { Input } from "@/components/input/input";

interface SearchbarProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  ({ placeholder = "Search...", ...props }, ref) => {
    return <Input ref={ref} placeholder={placeholder} {...props} />;
  }
);

Searchbar.displayName = "Searchbar";
