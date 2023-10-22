"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { useDisconnect } from "wagmi";

import { Button } from "@/components/ui/button";

const SignoutButton = () => {
  const { disconnectAsync } = useDisconnect();
  const handleSignout = async () => {
    disconnectAsync();
    signOut({ callbackUrl: "/" });
  };
  return (
    <Button variant="destructive" onClick={handleSignout}>
      Sign Out
    </Button>
  );
};

export default SignoutButton;
