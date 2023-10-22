import { useContext } from "react";

import { WalletContext } from "@/lib/services/context";

export function useWalletContext() {
  const {
    wallet,
    setWallet,
    provider,
    setProvider,
    p256SignerContract,
    setp256SignerContract,
  } = useContext(WalletContext);
  return {
    wallet,
    setWallet,
    provider,
    setProvider,
    p256SignerContract,
    setp256SignerContract,
  };
}
