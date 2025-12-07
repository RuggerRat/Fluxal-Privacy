import { createRoot } from "react-dom/client";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import App from "./App";
import "./index.css";
import { Buffer } from 'buffer';

// Polyfill Buffer for Solana web3.js
window.Buffer = window.Buffer || Buffer;

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const Main = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const endpoint = "https://api.mainnet-beta.solana.com";

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <App />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

createRoot(document.getElementById("root")!).render(<Main />);
