"use client";

import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectButton, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ConnectButtonRenderer } from "@rainbow-me/rainbowkit/dist/components/ConnectButton/ConnectButtonRenderer";
import { Account } from "./Account";
import connectStore from "../store/connect.store";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();
// set default configuration values
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
          <ConnectButton.Custom>
            {({ account, chain, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");
              return (
                <div>
                  {(() => {
                    if (!connected) {
                      connectStore.setConnect(false);
                      return <ConnectButton />;
                    } else {
                      connectStore.setConnect(true);
                      return <Account />;
                    }
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
