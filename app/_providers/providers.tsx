"use client";
import React from "react";

import { WalletProvider as AAProvider } from "@/lib/services/context";

import AuthContext from "./auth-context";
import { ThemeProvider } from "./theme-provider";
import WagmiProvider from "./wagmi-provider";

type ProviderType = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext>
        <AAProvider>
          <WagmiProvider>{children}</WagmiProvider>
        </AAProvider>
      </AuthContext>
    </ThemeProvider>
  );
};

export default Providers;
