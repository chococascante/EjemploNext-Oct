"use client";
import { FirebaseAuthContextProvider } from "@/contexts/FirebaseAuthContext";
import { FirebaseContextProvider } from "@/contexts/FirebaseContext";
import React from "react";

export const ClientProvidersWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <FirebaseContextProvider>
      <FirebaseAuthContextProvider>{children}</FirebaseAuthContextProvider>
    </FirebaseContextProvider>
  );
};
