import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import fluxalTitle from "@assets/Untitled_design__62_-removebg-preview_1765006354328.png";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect } from "react";

export default function Connect() {
  const [_, setLocation] = useLocation();
  const { connected } = useWallet();

  useEffect(() => {
    if (connected) {
      setLocation("/dashboard");
    }
  }, [connected, setLocation]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-white font-neue">
      {/* Background Gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,229,0,0.05),_transparent_60%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6 text-center z-10"
      >
        {/* Logo */}
        <div className="mb-12 flex justify-center">
             <img src={fluxalTitle} alt="FLUXAL" className="h-12 w-auto object-contain opacity-80" />
        </div>

        <h1 className="text-3xl font-bold mb-3 font-neue tracking-wide">Sign in</h1>
        <p className="text-gray-400 text-sm mb-10 font-mono tracking-wide">Continue to your Fluxal Wallet</p>

        <div className="flex justify-center w-full">
            {/* Custom styling for the wallet adapter button to match design */}
            <div className="[&>button]:w-full [&>button]:justify-center [&>button]:bg-[#FFE500] [&>button]:text-black [&>button]:font-bold [&>button]:h-12 [&>button]:rounded-xl [&>button]:text-sm [&>button]:uppercase [&>button]:tracking-widest [&>button]:transition-all [&>button]:duration-300 [&>button]:transform [&>button]:hover:scale-[1.02] [&>button]:hover:shadow-[0_0_20px_rgba(255,229,0,0.3)] [&>button]:hover:bg-[#FF8C00]">
                <WalletMultiButton>
                    CONTINUE WITH WALLET
                </WalletMultiButton>
            </div>
        </div>
        
        <div className="mt-8">
            <button 
                onClick={() => setLocation("/")}
                className="text-xs text-gray-500 hover:text-[#FFE500] transition-colors font-mono uppercase tracking-widest"
            >
                Return to Home
            </button>
        </div>
      </motion.div>
    </div>
  );
}