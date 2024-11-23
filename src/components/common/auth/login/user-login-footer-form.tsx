import { Button } from "@/components/ui/buttons/button/button";
import { cn } from "@/lib/common/utils";
import React from "react";

interface UserAuthFooterProps {
  formCurrentStep: number;
  isEmailLoading: boolean;
  isPasswordLoading: boolean;
}
const UserLoginFooterForm = ({
  formCurrentStep,
  isEmailLoading,
  isPasswordLoading,
}: UserAuthFooterProps) => {
  return (
    <div
      className={cn(
        "flex justify-end",
        formCurrentStep === 0 ? "pt-4" : "pt-[30px]"
      )}
    >
      <Button
        isLoading={formCurrentStep === 0 ? isEmailLoading : isPasswordLoading}
      >
        {formCurrentStep === 0 ? "Continuer" : "Password"}
      </Button>
    </div>
  );
};

export default UserLoginFooterForm;
