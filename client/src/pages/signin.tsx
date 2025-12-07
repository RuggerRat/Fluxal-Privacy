// import { useAppKit } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Signin() {
  // const { open } = useAppKit();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  
  const handleConnect = () => {
    // open();
    toast({
      title: "Connecting Wallet",
      description: "Opening Reown WalletConnect... (Simulation)",
      className: "bg-[#FFE500] text-black border-none font-mono",
    });
    
    // Simulate connection delay then redirect
    setTimeout(() => {
        setLocation("/dashboard");
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-neue text-white relative overflow-hidden">
        {/* Background Gradients similar to Dashboard but simpler */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,229,0,0.05),_transparent_70%)] pointer-events-none mix-blend-screen" />
        
        <div className="z-10 flex flex-col items-center gap-8 w-full max-w-md px-4">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-wide">Sign in</h1>
                <p className="text-gray-400 text-sm tracking-wider">Continue to your Fluxal Wallet</p>
            </div>

            <button 
                onClick={handleConnect}
                className="w-full bg-[#4ADE80] hover:bg-[#22c55e] text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-sm tracking-wide"
            >
                Continue with Wallet
            </button>
        </div>
    </div>
  );
}
