import { SignIn } from "@clerk/clerk-react";
import React from "react";

const LoginPage = () => {
  return (
    <div className="display flex items-center justify-center h-screen bg-gray-100">
      <SignIn signUpUrl="/signup"  forceRedirectUrl={"/movies"} />
    </div>
  );
};

export default LoginPage;
