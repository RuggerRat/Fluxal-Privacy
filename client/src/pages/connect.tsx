import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import fluxalTitle from "@assets/Untitled_design__62_-removebg-preview_1765006354328.png";

export default function Connect() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Inject Privy script if not already present
    if (!window.privy) {
        const script = document.createElement("script");
        script.type = "module";
        script.innerHTML = `
          import { PrivyClient } from "https://cdn.privy.io/web-sdk/v1.js";
          window.privy = new PrivyClient({
            appId: "cmivd4mze05lol40d22ripecb",
            config: {
              appearance: { theme: "light" },
              solana: {
                wallets: ["injected", "walletconnect"],
              },
              embeddedWallets: {
                createOnLogin: "solana",
              }
            }
          });
          console.log("Privy loaded on Connect page");
        `;
        document.body.appendChild(script);
        
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // @ts-ignore
      if (window.privy) {
        // @ts-ignore
        await window.privy.login().then((user) => {
           console.log("User logged in", user);
           toast({
             title: "Wallet Connected",
             description: "Successfully connected to Privy",
             className: "bg-[#FFE500] text-black border-none font-mono",
           });
           // Optional: Redirect back to dashboard after connection
           // setLocation("/"); 
        });
      } else {
         console.error("Privy not initialized yet");
         toast({
            title: "Initializing...",
            description: "Please wait a moment for the wallet adapter to load.",
            className: "bg-red-500 text-white border-none font-mono",
          });
      }
    } catch (e) {
      console.error("Login failed", e);
    } finally {
      setIsLoading(false);
    }
  };

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

        <Button 
          onClick={handleConnect}
          disabled={isLoading}
          className="w-full bg-[#FFE500] hover:bg-[#FF8C00] text-black font-bold h-12 rounded-xl text-sm uppercase tracking-widest transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,229,0,0.3)]"
        >
          {isLoading ? "Connecting..." : "Continue with Wallet"}
        </Button>
        
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
