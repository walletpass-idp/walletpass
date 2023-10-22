"use client";

import {
  ComethProvider,
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
} from "@cometh/connect-sdk";
import { ethers } from "ethers";
import { useState } from "react";

import p256ContractAbi from "@/lib/contracts/P256Signer.json";

import { useWalletContext } from "./use-wallet-context";

export function useWalletAuth() {
  const {
    setWallet,
    setProvider,
    wallet,
    p256SignerContract,
    setp256SignerContract,
  } = useWalletContext();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [connectionError, setConnectionError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_COMETH_API_KEY!;
  const P256SIGNER_CONTRACT_ADDRESS = "0x61816719c2086d60571a3c04c1fde82ad469d8eb";

  // MATIC MUMBAI
  // chainId: SupportedNetworks.MUMBAI,
  // const COUNTER_CONTRACT_ADDRESS = 0x3633A1bE570fBD902D10aC6ADd65BB11FC914624

  // GNOSIS CHIADO
  // chainId: SupportedNetworks.CHIADO,
  // const COUNTER_CONTRACT_ADDRESS = 0x31Fc8d102a06E136E30911dbD43D68d14898Cb91

  // AVAX FUJI
  // chainId: SupportedNetworks.FUJI,
  //const COUNTER_CONTRACT_ADDRESS = 0xcdE55cdDe8D690B9cFeB1Ef1bc42085FCd910E8e
  function displayError(message: string) {
    setConnectionError(message);
  }

  async function connect() {
    setIsConnecting(true);
    try {
      const walletAdaptor = new ConnectAdaptor({
        chainId: SupportedNetworks.MUMBAI,
        apiKey,
      });

      const instance = new ComethWallet({
        authAdapter: walletAdaptor,
        apiKey,
      });

      const localStorageAddress = window.localStorage.getItem("walletAddress");

      if (localStorageAddress) {
        await instance.connect(localStorageAddress);
      } else {
        await instance.connect();
        const walletAddress = await instance.getAddress();
        window.localStorage.setItem("walletAddress", walletAddress);
      }

      const instanceProvider = new ComethProvider(instance);
      const contract = new ethers.Contract(
        P256SIGNER_CONTRACT_ADDRESS,
        [
          'function isValidSignature(bytes32 _hash, bytes memory _signature) view returns (bytes4 magicValue)',
        ],
        instanceProvider.getSigner()
      );
        
      setp256SignerContract(contract);

      setIsConnected(true);
      setWallet(instance as any);
      setProvider(instanceProvider as any);
    } catch (e) {
      displayError((e as Error).message);
    } finally {
      setIsConnecting(false);
    }
  }

  async function disconnect() {
    if (wallet) {
      try {
        await wallet!.logout();
        setIsConnected(false);
        setWallet(null);
        setProvider(null);
        setp256SignerContract(null);
      } catch (e) {
        displayError((e as Error).message);
      }
    }
  }
  return {
    wallet,
    p256SignerContract,
    connect,
    disconnect,
    isConnected,
    isConnecting,
    connectionError,
    setConnectionError,
  };
}
