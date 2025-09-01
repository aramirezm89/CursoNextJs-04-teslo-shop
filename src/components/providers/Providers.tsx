"use client";

import { AuthProvider } from "@/app/auth/auth-provider/AuthProvider";
import React from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <PayPalScriptProvider
   
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent: "capture",
        currency: "USD",
      }}
    >
      <AuthProvider>{children}</AuthProvider>
    </PayPalScriptProvider>
  );
};
