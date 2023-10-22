import Link from "next/link";

import CreateSiteModal from "@/components/modal/create-site";
//import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

import CreateSiteButton from "./create-site-button";

export default async function OverviewSitesCTA() {
/*   const session = await getSession();
  if (!session) {
    return 0;
  } */
  const sites = 0

  return sites > 0 ? (
    <Link
      href="/sites"
      className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
    >
      View All Dapps
    </Link>
  ) : (
    <CreateSiteButton>
      <CreateSiteModal />
    </CreateSiteButton>
  );
}
