import { SignUp } from "@clerk/clerk-react";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="display flex items-center justify-center h-screen bg-[#000000]">
      <SignUp  signInUrl="/login" forceRedirectUrl={"/"} />
    </div>
  );
};

export default SignUpPage;
