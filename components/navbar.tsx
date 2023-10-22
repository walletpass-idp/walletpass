"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

import { navVariants } from "@/lib/motion";

import { ModeToggle } from "./mode-toggle";

type NavbarProps = {
  title: string;
};
const Navbar = ({ title }: NavbarProps) => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`sm:px-16 px-4 py-4 relative`}
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div className={`flex items-center justify-between h-16`}>
      <div className="flex flex-1">
        <h2 className="font-extrabold text-[24px]">{title}</h2>
      </div>
      <div className="flex flex-row items-center flex-1 gap-2">
        <ModeToggle />
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
        />
      </div>
    </div>
  </motion.nav>
);

export default Navbar;
