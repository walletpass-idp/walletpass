"use client";
import { DocumentCode } from "@ledgerhq/icons-ui/react";
import { utils } from "ethers/lib";
import { getCsrfToken, signIn } from "next-auth/react";
import React from "react";
import { SiweMessage } from "siwe";
import { polygonMumbai } from "viem/chains";

import { useWalletAuth } from "@/lib/hooks/use-wallet-auth";


const SiweStep = ({ goToStep, address }) => {
  const [mounted, setMounted] = React.useState(false);
  const dataToSign = utils.keccak256(utils.toUtf8Bytes("WalletPass"));
  let webauthnSignature = "0x";

  const {
    isConnecting,
    isConnected,
    connect,
    connectionError,
    wallet,
    p256SignerContract,
  } = useWalletAuth();

  const [hasSigned, setHasSigned] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;
  const HandleSign = async () => {
    try {
      console.log("AA ACTION: ", wallet?.getAddress());

      const message = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        version: "1",
        address: wallet?.getAddress() as `0x${string}`,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        nonce: await getCsrfToken(),
        chainId: polygonMumbai.id,
      });

      console.log("about to sign: ", message.prepareMessage());
      //console.log("what will be validated OWNER: ", await wallet?.getOwners());
      
      const webauthnSignature = await wallet?.signMessage("WalletPass");
      setHasSigned(true);

        const response = await signIn("web3", {
          message: `@WalletPass@${wallet?.getAddress()}`,
          webauthnSignature,
          redirect: false,
        });
        console.log("client next-auth aa sign resp ", response);

      /*      const signature = await contract!.isValidSignature(
        dataToSign,
        utils.toUtf8Bytes(webauthnSignature!)
      ); */
      //console.log("p256SignerContract: ", rtx);

/*       const tx = {
        to: "0x7EFa1d3e676Ac675b3087dDA36d3A04515cE68c1",
        value: "2000000000000",
        data: "0x",
      };
      console.log("isValidSignature: ", webauthnSignature);

      const relayId = await wallet?.sendTransaction(tx)
      console.log("isValidSignature: ", relayId); */


      if (response?.error) {
        console.log("Error occured:", response.error);
      }
      console.log("calling nextStep!");
      goToStep(2);
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
      <>
        <button
          onClick={HandleSign}
          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
            <DocumentCode color="black" aria-hidden="true" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">
              Sign in using AA Wallet
            </p>
            <p className="text-sm text-gray-500">{address} </p>
          </div>
        </button>
      </>

      {isConnected && hasSigned && (
        <>
          <p>Next step: Creating WalletPass Key...</p>
        </>
      )}
    </>
  );
};

export default SiweStep;
