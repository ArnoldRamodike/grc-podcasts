import { SignIn } from "@clerk/nextjs";
import React from "react";

const SingIn = () => {
  return (
    <main className="auth-page">
      <SignIn />
    </main>
  );
};

export default SingIn;
