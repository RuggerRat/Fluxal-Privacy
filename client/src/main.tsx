import { createRoot } from "react-dom/client";
import { PrivyProvider } from '@privy-io/react-auth';
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <PrivyProvider
    appId='cmivd4mze05lol40d22ripecb'
    config={{
      loginMethods: ["email", "wallet"],
      appearance: { theme: 'light' },
      solana: { wallets: ['phantom'] }
    }}
  >
    <App />
  </PrivyProvider>
);
