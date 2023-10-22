"use client";

import { Popover, Transition } from "@headlessui/react";
import { BTC, ETH, SOL, TRX } from "@ledgerhq/crypto-icons-ui/react";
import { ChevronDown } from "@ledgerhq/icons-ui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-multi-lang";
import { usePopper } from "react-popper";
import { useAccount } from "wagmi";

import {
  Step,
  Stepper,
  StepperLeftChevronNavigation,
  StepperRightChevronNavigation,
  StepsIndicator,
} from "@/components/stepper";

const OnboardingSteps = (t: ReturnType<typeof useTranslation>) => [
  {
    title: t("walletSelect.step1Title"),
    content: t("walletSelect.step1Content"),
  },
  {
    title: t("walletSelect.step2Title"),
    content: t("walletSelect.step2Content"),
  },
  {
    title: t("walletSelect.step3Title"),
    content: t("walletSelect.step3Content"),
  },
  {
    title: t("walletSelect.step4Title"),
    content: t("walletSelect.step4Content"),
  },
];

const solutions = [
  {
    name: "Solana",
    description: "Link Solana Account",
    href: Bitcoin,
    icon: Solana,
  },
  {
    name: "Bitcoin",
    description: "Link Lightning Wallet",
    href: Bitcoin,
    icon: Bitcoin,
  },
  {
    name: "Tron",
    description: "Link Tron Wallet",
    href: Bitcoin,
    icon: Tron,
  },
];

export default function Example() {
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const t = useTranslation();

  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            ref={setReferenceElement}
            className={`${
              loading
                ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
                : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
            } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
          >
            <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
              Link Wallets
            </span>
            <ChevronDown
              className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              ref={setPopperElement}
              {...attributes.popper}
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
            >
              {({ close }) => (
                <div className="relative w-full py-8 sm:static">
                  <div className="flex flex-col px-8">
                    <Stepper
                      className="relative flex flex-col gap-2"
                      autoplay={{ stopOnHover: true, delayInMs: 4000 }}
                    >
                      <StepsIndicator className="order-1 mt-16" />
                      <StepperLeftChevronNavigation className="absolute left-0 top-1/2 z-50 -translate-y-1/2 transform" />
                      {OnboardingSteps(t).map(({ title, content }) => (
                        <Step key={title}>
                          <div className="flex flex-col items-center justify-center gap-10 text-center">
                            <div className="h-[48px] w-[48px]">
                              <Image
                                src="/vercel.svg"
                                alt="Wallet showcase"
                                width={186}
                                height={186}
                              />
                            </div>

                            <div className="flex max-w-sm flex-col gap-3">
                              <h1 className="subtitle1">{title}</h1>
                            </div>
                          </div>
                        </Step>
                      ))}
                      <StepperRightChevronNavigation className="absolute right-0 top-1/2 z-50 -translate-y-1/2 transform" />
                    </Stepper>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
function Tron() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />

      <TRX size={48} />
    </svg>
  );
}
function Solana() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />

      <SOL size={48} />
    </svg>
  );
}
function Bitcoin() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />

      <BTC size={48} />
    </svg>
  );
}
function Ethereum() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />

      <ETH size={48} />
    </svg>
  );
}
function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function AliPay() {
  return (
    <svg
      version="1.1"
      width="48"
      height="48"
      className="fill-blue-300"
      viewBox="0 0 448 512"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path d="M377.74 32H70.26C31.41 32 0 63.41 0 102.26v307.48C0 448.59 31.41 480 70.26 480h307.48c38.52 0 69.76-31.08 70.26-69.6-45.96-25.62-110.59-60.34-171.6-88.44-32.07 43.97-84.14 81-148.62 81-70.59 0-93.73-45.3-97.04-76.37-3.97-39.01 14.88-81.5 99.52-81.5 35.38 0 79.35 10.25 127.13 24.96 16.53-30.09 26.45-60.34 26.45-60.34h-178.2v-16.7h92.08v-31.24H88.28v-19.01h109.44V92.34h50.92v50.42h109.44v19.01H248.63v31.24h88.77s-15.21 46.62-38.35 90.92c48.93 16.7 100.01 36.04 148.62 52.74V102.26C447.83 63.57 416.43 32 377.74 32zM47.28 322.95c.99 20.17 10.25 53.73 69.93 53.73 52.07 0 92.58-39.68 117.87-72.9-44.63-18.68-84.48-31.41-109.44-31.41-67.45 0-79.35 33.06-78.36 50.58z"></path>
    </svg>
  );
}
function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}
