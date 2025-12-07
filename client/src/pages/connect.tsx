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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if Privy is already initialized
    // @ts-ignore
    if (window.privy) {
      setIsReady(true);
      return;
    }

    // Polling mechanism to check for Privy
    const checkInterval = setInterval(() => {
      // @ts-ignore
      if (window.privy) {
        setIsReady(true);
        clearInterval(checkInterval);
      }
    }, 100);

    // Inject Privy script if not already present
    if (!document.getElementById("privy-script")) {
        const script = document.createElement("script");
        script.id = "privy-script";
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
    }
    
    return () => {
        clearInterval(checkInterval);
        // We do NOT remove the script here to preserve it for other pages or re-visits
    };
  }, []);

  const handleConnect = async () => {
    if (!isReady) return;
    
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
         // Should not happen if isReady is true, but just in case
         console.error("Privy not initialized yet");
      }
    } catch (e) {
      console.error("Login failed", e);
      toast({
        title: "Connection Failed",
        description: "Please try again.",
        variant: "destructive",
      });
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
          disabled={!isReady || isLoading}
          className={`w-full font-bold h-12 rounded-xl text-sm uppercase tracking-widest transition-all duration-300 transform 
            ${!isReady || isLoading 
              ? "bg-gray-800 text-gray-400 cursor-not-allowed" 
              : "bg-[#FFE500] hover:bg-[#FF8C00] text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,229,0,0.3)]"
            }`}
        >
          {!isReady 
            ? "INITIALIZING..." 
            : (isLoading ? "CONNECTING..." : "CONTINUE WITH WALLET")
          }
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
