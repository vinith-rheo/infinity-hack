import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "sonner";


const clerkKey= import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

if(!clerkKey){
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined. Please set it in your .env file.");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkKey} >
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
