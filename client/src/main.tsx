import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css";
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
            connectors: [],
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