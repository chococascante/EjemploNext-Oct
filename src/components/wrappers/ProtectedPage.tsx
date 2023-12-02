"use client";
import { useFirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export const ProtectedPage: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user, loadingAuthState } = useFirebaseAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (!user && !loadingAuthState) {
      router.push("/login");
    }
  }, [loadingAuthState, router, user]);

  if (loadingAuthState) {
    return <CircularProgress />;
  }

  return <>{children}</>;
};
