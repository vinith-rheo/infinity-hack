import { SignIn } from "@clerk/clerk-react";
import React from "react";

const LoginPage = () => {
  return (
    <div className="display flex items-center justify-center h-screen bg-[#000000]">
      <SignIn signUpUrl="/signup"  forceRedirectUrl={"/"} />
    </div>
  );
};

export default LoginPage;
