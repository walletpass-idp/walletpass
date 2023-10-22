"use client";
import Image from "next/image";
import React, { Fragment, Suspense, useState } from "react";
import { useTranslation } from "react-multi-lang";

import { useWalletAuth } from "@/lib/hooks/use-wallet-auth";

import CryptoLinkButton from "./crypto-link-button-wizard";
import CryptoLinkAA from "./crypto-link-aa-wallet";

export default function Home() {

  const [loading, setLoading] = useState(false);
  const t = useTranslation();

  return (
    /*  <div className="h-full relative">
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-400">
          Welcome
        </h1>
        <h2 className="text-3xl tracking-tight text-gray-500">
          Lets get started, shall we?
        </h2>
        <Link href="/auth">
          <Button variant="default">Get Started</Button>
        </Link>
      </main>
    </div> */
    <>
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
          <Image
            alt="WalletPass"
            width={100}
            height={100}
            className="relative mx-auto h-12 w-auto dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
            src="/logo.png"
          />
          <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
            WalletPass{" "}
          </h1>
          <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
            Universal Identity Platform <br />
            <a
              className="font-medium text-black hover:text-stone-800 dark:text-stone-300 dark:hover:text-stone-100"
              href="https://vercel.com/blog/platforms-starter-kit"
              rel="noreferrer"
              target="_blank"
            >
              Read the announcement.
            </a>
          </p>

          <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
            <Suspense
              fallback={
                <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
              }
            >
              <CryptoLinkButton />
              <CryptoLinkAA/>

    
             
          
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
