import { createRoot } from "react-dom/client";
import { PrivyProvider } from '@privy-io/react-auth';
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <PrivyProvider
    appId="cmivd4mze05lol40d22ripecb"
    config={{
      loginMethods: ['wallet'],

      // supportedChains: ['solana'],     // Commented out: Causes runtime error (expects Chain objects)
      // defaultChain: 'solana',          // Commented out: Causes runtime error

      solana: {
        wallets: ['injected', 'walletconnect'], 
      },

      embeddedWallets: {
        createOnLogin: 'users-without-wallets', // Updated to valid value
      },
      
      appearance: {
        walletList: ['phantom'],
        showWalletLoginFirst: true
      }
    }}
  >
    <App />
  </PrivyProvider>
);
