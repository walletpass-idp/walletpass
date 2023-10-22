"use client";

import { RelayTransactionResponse } from "@cometh/connect-sdk";
import { TransactionReceipt } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";

import LoadingSpinner from "@/components/loading-spinner";
import Alert from "@/components/ui/alert";
import { useWalletAuth } from "@/lib/hooks/use-wallet-auth";


interface TransactionProps {
  transactionSuccess: boolean;
  setTransactionSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Transaction({
  transactionSuccess,
  setTransactionSuccess,
}: TransactionProps) {
  const { wallet, p256SignerContract } = useWalletAuth();
  const [isTransactionLoading, setIsTransactionLoading] =
    useState<boolean>(false);
  const [transactionSended, setTransactionSended] =
    useState<RelayTransactionResponse | null>(null);
  const [transactionResponse, setTransactionResponse] =
    useState<TransactionReceipt | null>(null);
  const [transactionFailure, setTransactionFailure] = useState(false);
  const [nftBalance, setNftBalance] = useState<number>(0);

  function TransactionButton({
    sendTestTransaction,
    isTransactionLoading,
  }: {
    sendTestTransaction: () => Promise<void>;
    isTransactionLoading: boolean;
  }) {
    return (
      <button
        className="mt-1 flex h-11 py-2 px-4 gap-2 flex-none items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200"
        onClick={sendTestTransaction}
      >
        {isTransactionLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <PlusIcon width={16} height={16} />
          </>
        )}{" "}
        Increment counter
      </button>
    );
  }

  useEffect(() => {
    if (wallet) {
      (async () => {
        const balance = await counterContract!.counters(wallet.getAddress());
        setNftBalance(Number(balance));
      })();
    }
  }, []);

  const sendTestTransaction = async () => {
    setTransactionSended(null);
    setTransactionResponse(null);
    setTransactionFailure(false);
    setTransactionSuccess(false);

    setIsTransactionLoading(true);
    try {
      if (!wallet) throw new Error("No wallet instance");

      const tx: RelayTransactionResponse = await counterContract!.count();
      setTransactionSended(tx);

      const txResponse = await tx.wait();

      const balance = await counterContract!.counters(wallet.getAddress());
      setNftBalance(Number(balance));

      setTransactionResponse(txResponse);
      setTransactionSuccess(true);
    } catch (e) {
      console.log("Error:", e);
      setTransactionFailure(true);
    }

    setIsTransactionLoading(false);
  };

  return (
    <main>
      <div className="p-4">
        <div className="relative flex items-center gap-x-6 rounded-lg p-4">
          <TransactionButton
            sendTestTransaction={sendTestTransaction}
            isTransactionLoading={isTransactionLoading}
          />
          <p className=" text-gray-600">{nftBalance}</p>
        </div>
      </div>
      {transactionSended && !transactionResponse && (
        <Alert
          state="information"
          content="Transaction in progress.. (est. time 10 sec)"
        />
      )}
      {transactionSuccess && (
        <Alert
          state="success"
          content="Transaction confirmed !"
          link={{
            content: "Go see your transaction",
            url: `https://mumbai.polygonscan.com/tx/${transactionResponse?.transactionHash}`,
          }}
        />
      )}
      {transactionFailure && (
        <Alert state="error" content="Transaction Failed !" />
      )}
    </main>
  );
}