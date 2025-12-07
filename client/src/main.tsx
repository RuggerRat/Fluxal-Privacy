import { createRoot } from "react-dom/client";
import { PrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import App from "./App";
import "./index.css";
import '@solana/wallet-adapter-react-ui/styles.css';

// We keep Privy for now as it wraps the app, but we add Solana Wallet Adapter context
// The user requested to "REMOVE all Privy wallet logic entirely" for balance fetching
// and use native adapters. We wrap everything to ensure context availability.

const AppWithProviders = () => {
    // You can also provide a custom RPC endpoint
    const endpoint = "https://api.mainnet-beta.solana.com";
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
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
                                    connectors: toSolanaWalletConnectors({ shouldAutoConnect: true })
                                }
                            }
                        }}
                    >
                        <App />
                    </PrivyProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

createRoot(document.getElementById("root")!).render(<AppWithProviders />);
