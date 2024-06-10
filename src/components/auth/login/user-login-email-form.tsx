import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface UserEmailFormProps {
  isEmailLoading: boolean;
  registerEmail: UseFormRegister<{ email: string }>;
  errorsEmail: FieldErrors<{ email: string }>;
}

const UserLoginEmailForm = ({
  isEmailLoading,
  registerEmail,
  errorsEmail,
}: UserEmailFormProps) => (
  <div>
    <label className="sr-only" htmlFor="email">
      Email
    </label>
    <Input
      id="email"
      placeholder="E-mail*"
      type="email"
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect="off"
      disabled={isEmailLoading}
      {...registerEmail("email")}
      className="p-4 rounded-lg h-14 focus:outline-none"
    />
    {errorsEmail?.email && (
      <p className="px-4 pt-[6px] text-xs text-red-600">
        {errorsEmail.email.message}
      </p>
    )}
  </div>
);

export default UserLoginEmailForm;
