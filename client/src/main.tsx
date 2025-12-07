import { createRoot } from "react-dom/client";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import App from "./App";
import "./index.css";
import "@solana/wallet-adapter-react-ui/styles.css";

// Default to mainnet as requested for wallet interactions
const endpoint = "https://api.mainnet-beta.solana.com";

function Main() {
    // Only Phantom as requested
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <App />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

createRoot(document.getElementById("root")!).render(<Main />);