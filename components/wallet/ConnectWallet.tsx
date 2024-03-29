"use client";

import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { useAccount, WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

import { Account } from "./Account";

const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "cf362f27e0516b723381c17d249092ca",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

export default function ConnectWallet() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
          <ConnectButton
            showBalance={{
              smallScreen: false,
              largeScreen: false,
            }}
            accountStatus="address"
            chainStatus="none"
          />
        </RainbowKitProvider>
        <Account />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
