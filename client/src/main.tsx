import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css";

import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';

import { PrivyProvider } from '@privy-io/react-auth'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivyProvider
      appId="cmivd4mze05lol40d22ripecb"
      config={{
        loginMethods: ['wallet'],
        supportedChains: ['solana' as any],
        defaultChain: 'solana' as any,

        externalWallets: {
          solana: {
            connectors: [
              new PhantomWalletAdapter(),
              new SolflareWalletAdapter(),
              new BackpackWalletAdapter(),
            ],
          },
        },

        solana: {
          wallets: ['injected', 'walletconnect'],
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
)