import { Button } from "@/components/ui/buttons/button/button";
import { cn } from "@/lib/utils";
import React from "react";

interface UserAuthFooterProps {
  formStep: number;
  isEmailLoading: boolean;
  isPasswordLoading: boolean;
}
const UserLoginFooterForm = ({
  formStep,
  isEmailLoading,
  isPasswordLoading,
}: UserAuthFooterProps) => {
  return (
    <div
      className={cn("flex justify-end", formStep === 0 ? "pt-4" : "pt-[30px]")}
    >
      <Button isLoading={formStep === 0 ? isEmailLoading : isPasswordLoading}>
        {formStep === 0 ? "Continuer" : "Password"}
      </Button>
    </div>
  );
};

export default UserLoginFooterForm;
