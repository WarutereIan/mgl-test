import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const walletConnect = new WalletConnectConnector({
  rpcUrl: "https://rpc.ankr.com/bsc",
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

/* import { WalletConnectConnector } from "@wagmi/core/connectors";

export const walletConnectConnector = new walletConnectConnector({
  options: {
    projectId: process.env.REACT_APP_FB_WC_PROJECT_ID,
    showQrModal: true,
  },
});
 */
