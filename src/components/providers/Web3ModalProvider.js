import { createWeb3Modal } from "@web3modal/wagmi";
import { defaultWagmiConfig } from "@web3modal/wagmi";

import { WagmiProvider } from "wagmi";
import { mainnet, bsc, polygon } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const projectId = process.env.WC_PROJECT_ID;

const metadata = {
  name: "MRL",
  description: "Connect to the MRL Exchange!",
};

const chains = [mainnet, bsc, polygon];

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableOnramp: true,
});

export function Web3ModalProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
