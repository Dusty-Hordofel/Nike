import { Input } from "@/components/ui/input";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface UserPasswordFormProps {
  isPasswordLoading: boolean;
  registerPassword: UseFormRegister<{ password: string }>;
  errorsPassword: FieldErrors<{ password: string }>;
}

const UserLoginPasswordForm: React.FC<UserPasswordFormProps> = ({
  isPasswordLoading,
  registerPassword,
  errorsPassword,
}) => (
  <div>
    <label className="sr-only" htmlFor="password">
      Password
    </label>
    <Input
      id="password"
      placeholder="Mot de passe*"
      type="password"
      autoCapitalize="none"
      autoComplete="password"
      autoCorrect="off"
      disabled={isPasswordLoading}
      {...registerPassword("password")}
      className="p-4 rounded-lg h-14 focus:outline-none"
    />
    {errorsPassword?.password && (
      <p className="px-4 pt-[6px] text-xs text-red-600">
        {errorsPassword.password.message}
      </p>
    )}
  </div>
);

export default UserLoginPasswordForm;
