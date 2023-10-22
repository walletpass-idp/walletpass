import { ComethWallet } from "@cometh/connect-sdk";
import { Bolt, Check } from "@ledgerhq/icons-ui/react";
import { ETH  } from "@ledgerhq/crypto-icons-ui/react";

import LoadingSpinner from "@/components/loading-spinner";

interface ConnectWalletProps {
  connectionError: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  wallet: ComethWallet;
}

function ConnectWallet({
  connectionError,
  isConnecting,
  isConnected,
  connect,
  wallet,
}: ConnectWalletProps): JSX.Element {
  const getTextButton = () => {
    if (isConnected) {
      return (
        <>
          <a
            href={`https://mumbai.polygonscan.com/address/${wallet.getAddress()}`}
            target="_blank"
          >
            {"Wallet connected"}
          </a>
        </>
      );
    } else if (isConnecting) {
      return (
        <>
          <LoadingSpinner />
          {"Creating Web Wallet..."}
        </>
      );
    } else {
      return (
        <>
          <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
            {"Create New Ethereum Wallet"}
          </p>
        </>
      );
    }
  };


  return (
    <>
      {!connectionError ? (
        <button
          disabled={isConnecting || isConnected || !!connectionError}
          onClick={connect}

          className={`${
            isConnecting
              ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800" : ""
          }
          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
          >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
    <Ethereum aria-hidden="true" />
  </div>
  <div className="ml-4">
    <p className="text-sm font-medium text-gray-900">
      Ethereum
    </p>
    <p className="text-sm text-gray-500">
    {getTextButton()}
    </p>
  </div>
</button>
       
      ) : (
        <p className="flex items-center justify-center text-gray-900 bg-red-50">
          Connection denied
        </p>
      )}
    </>
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
export default ConnectWallet;
