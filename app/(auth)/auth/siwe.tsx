"use client";
import { DocumentCode } from "@ledgerhq/icons-ui/react";
import { useWeb3Modal } from "@web3modal/react";
import { getCsrfToken, signIn } from "next-auth/react";
import React from "react";
import { utils } from 'ethers/lib'

import { SiweMessage } from "siwe";
import { polygonMumbai } from "viem/chains";
import { useAccount, useSignMessage } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
const SiweStep = ({ goToStep }) =>  {


  const [mounted, setMounted] = React.useState(false);

  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { signMessageAsync } = useSignMessage();
  const [hasSigned, setHasSigned] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;
  
  const handleSign = async () => {
    if (!isConnected) open();
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        version: "1",
        address: address as `0x${string}`,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        nonce: await getCsrfToken(),
        chainId: polygonMumbai.id,
      });
      console.log("EOA prepareMessage: ", message.prepareMessage());

      const signedMessage = await signMessageAsync({
        message: message.prepareMessage(),
      });
      console.log("EOA SIGN: ", signedMessage);
      setHasSigned(true);

      const response = await signIn("web3", {
        message: JSON.stringify(message),
        signedMessage,
        redirect: false,
      });
      if (response?.error) {
        console.log("Error occured:", response.error);
      }
    } catch (error) {
      console.log("Error Occured", error);
    }
  };
  if (isConnected && hasSigned) {
    console.log("calling nextStep!");
    goToStep(2);
  }
  return (
    <>
      {isConnected && !hasSigned && (
        <>
          <button
            onClick={handleSign}
            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
              <DocumentCode color="black" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">
                Sign in using Linked Wallet
              </p>
              <p className="text-sm text-gray-500">SIWE </p>
            </div>
          </button>
        </>
      )}
      {isConnected && hasSigned && (
        <>
          <p>Next step: Creating WalletPass Key...</p>
        </>
      )}
    </>
  );
};

export default SiweStep;
