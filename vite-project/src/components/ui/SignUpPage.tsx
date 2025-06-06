import { SignUp } from "@clerk/clerk-react";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="display flex items-center justify-center h-screen bg-gray-100">
      <SignUp signInUrl="/login" forceRedirectUrl={"/movies"} />
    </div>
  );
};

export default SignUpPage;
