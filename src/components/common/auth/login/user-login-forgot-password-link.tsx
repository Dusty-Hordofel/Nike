import Link from "next/link";
import React from "react";

const UserLoginForgotPasswordLink = () => {
  return (
    <span className="block w-max underline py-4 text-gray-500 text-base">
      <Link href="/auth/forgot-password">Mot de passe oublié ?</Link>
    </span>
  );
};

export default UserLoginForgotPasswordLink;
