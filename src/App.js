import { Button } from "antd";
import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/pages/Home.js";
import Register from "./components/pages/Register.js";
import WalletLanding from "./components/pages/WalletLanding/WalletLanding.js";
import WalletAccess from "./components/pages/WalletAccess/WalletAccess.js";
import LogIn from "./components/pages/Login.js";
import AdminLogin from "./components/pages/AdminLogin.js";
import Launch from "./components/pages/Launch.js";
import Redirection from "./components/pages/Redirection";
import BuySell from "./components/pages/BuySell";
import AdminPanel from "./components/pages/Admin/AdminPanel";
import UserInfo from "./components/pages/UserInfo";
import Wallet from "./components/pages/Wallet";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "dotenv/config.js";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const projectId = process.env.WC_PROJECT_ID;

/* const bsc = {
  chainId: 56,
  name: "BNB Smart Chain",
  currency: "BNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://rpc.ankr.com/bsc",
};

const polygon = {
  chainId: 137,
  name: "Polygon",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: "https://polygon-rpc.com",
};

const metadata = {
  name: "MRL",
  description: "Connect to MRL exchange!",
};

const ethersConfig = defaultConfig({
  metadata,
  defaultChainId: 56,
  rpcUrl: "...",
});

createWeb3Modal({
  ethersConfig,
  chains: [bsc, polygon],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
}); */

/* const firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}; */

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);

console.log(firebaseConfig);

const analytics = getAnalytics(app);

function App() {
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Routes>
          <Route path="/walletphrase/:id" element={<WalletAccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/walletMain" element={<WalletLanding />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/launchpad" element={<Launch />} />
          <Route path="/ieo/:url" element={<Redirection />} />
          <Route path="/wallet" element={<Wallet />}>
            <Route path="/wallet/:id" element={<Wallet />}>
              <Route
                path="/wallet/:id/:presaleToken/:chainId"
                element={<Wallet />}
              />
            </Route>
          </Route>
          <Route path="/wallet/:id" element={<Wallet />} />
          <Route path="/p2p" element={<BuySell />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:jxt" element={<ResetPassword />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}

export default App;
