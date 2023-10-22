import "@/styles/globals.css";

import type { Metadata } from "next";
import { setDefaultLanguage, setTranslations } from "react-multi-lang";

import { cn } from "@/lib/utils";
import en from "@/localizations/en.json";
import { cal, inter } from "@/styles/fonts";

import Providers from "./_providers/providers";

export const metadata: Metadata = {
  title: "WalletPass",
  description: "Link and Login with all your Wallets",
};

const DEFAULT_LANGUAGE = "en";
setTranslations({ en });
setDefaultLanguage(DEFAULT_LANGUAGE);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(cal.variable, inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
