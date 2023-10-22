"use client";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useSession, getSession } from "next-auth/react";
import LogoutButton from "@/components/auth/logout-button";

export default function Profile() {
  const { data: session, status } = useSession()

  const { address: account } = useAccount();

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/settings"
        className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        <Image
          src={`https://cdn.stamp.fyi/avatar/${session?.user?.address}`}
          width={40}
          height={40}
          alt={account ?? "avatar"}
          className="h-6 w-6 rounded-full"
        />
        <span className="truncate text-sm font-medium">{session?.user?.address}</span>
      </Link>
      <LogoutButton />
    </div>
  );
}
