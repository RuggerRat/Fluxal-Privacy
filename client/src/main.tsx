import { createRoot } from "react-dom/client";
import { PrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import App from "./App";
import "./index.css";

const solanaConnectors = toSolanaWalletConnectors({
    shouldAutoConnect: true,
});

createRoot(document.getElementById("root")!).render(
  <PrivyProvider
    appId='cmivd4mze05lol40d22ripecb'
    config={{
      loginMethods: ['wallet'],
      appearance: { 
        theme: 'light',
        walletChainType: 'solana-only',
        walletList: ['phantom']
      },
      externalWallets: {
        solana: {
            connectors: solanaConnectors
        }
      },
      solana: {
        wallets: ['phantom']
      }
    }}
  >
    <App />
  </PrivyProvider>
);
