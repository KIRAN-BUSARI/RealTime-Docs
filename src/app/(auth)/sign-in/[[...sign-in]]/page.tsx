import { SignIn } from "@clerk/nextjs";
import React from "react";

const SigninPage = () => {
  return (
    <main className="auth-page">
      <SignIn />
    </main>
  );
};

export default SigninPage;
