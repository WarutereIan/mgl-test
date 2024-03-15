import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const walletconnect = new WalletConnectConnector({
  //rpcUrl: "https://rpc.ankr.com/bsc",
  //bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  rpc: "https://rpc.ankr.com/bsc",
  chainId: 56,
  supportedChainIds: [56, 137],
});
/* import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";

const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector(
  (actions) => {
    return new WalletConnect({
      options: {
        rpc: "https://rpc.ankr.com/bsc",
        showQrModal: true,
        chains: [56, 137],
        projectId: process.env.REACT_APP_FB_WC_PROJECT_ID,
      },
    });
  }
);

const walletConnectConnection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
};

export const PRIORITIZED_CONNECTORS = [walletConnectConnection]; */
