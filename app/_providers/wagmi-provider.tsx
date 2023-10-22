import "@rainbow-me/rainbowkit/styles.css";

import {
  AvatarComponent,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { GetSiweMessageOptions } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { w3mProvider } from "@web3modal/ethereum";
import Avatar from "boring-avatars";
import Image from "next/image";
import React from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  zora,
} from "wagmi/chains";

import { generateColorFromAddress } from "@/lib/utils";

type WagmiProviderType = {
  children: React.ReactNode;
};

const chains = [
  polygonMumbai,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
];
const projectId = process.env.NEXT_PUBLIC_W3C_PID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
});

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const color = generateColorFromAddress(address);
  return ensImage ? (
    <Image
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
      alt={""}
    />
  ) : (
    <Avatar
      size={40}
      name={address}
      variant="beam"
      colors={["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]}
    />
  );
};
const WagmiProvider = ({ children }: WagmiProviderType) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {/* <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        > */}
        <RainbowKitProvider
          modalSize="compact"
          chains={chains}
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
          avatar={CustomAvatar}
        >
          {children}
        </RainbowKitProvider>
        {/* </RainbowKitSiweNextAuthProvider> */}
      </WagmiConfig>
    </>
  );
};

export default WagmiProvider;
