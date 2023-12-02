import { SignupForm } from "@/components/organisms/SignupForm";
import { AuthenticationPage } from "@/components/wrappers/AuthPage";
import React from "react";

const SignupPage = () => {
  return (
    <AuthenticationPage>
      <SignupForm />
    </AuthenticationPage>
  );
};

export default SignupPage;
