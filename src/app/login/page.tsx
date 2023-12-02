import { LoginForm } from "@/components/organisms/LoginForm";
import { AuthenticationPage } from "@/components/wrappers/AuthPage";
import React from "react";

const LoginPage = () => {
  return (
    <AuthenticationPage>
      <LoginForm />
    </AuthenticationPage>
  );
};

export default LoginPage;
