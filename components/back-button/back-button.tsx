import React, { forwardRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Button, ButtonProps } from "../button/button";
import { useRouter } from "next/navigation";

export type BackButtonProps = ButtonProps;

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ ...props }, ref) => {
    const router = useRouter();
    const handleBack = () => {
      router.back();
    };
    return (
      <Button ref={ref} {...props} onClick={handleBack}>
        <ArrowLeft size={14} />
        Back
      </Button>
    );
  }
);

BackButton.displayName = "BackButton";
