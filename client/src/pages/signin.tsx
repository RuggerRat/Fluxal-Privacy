import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Signin() {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const modalRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initWalletConnect = async () => {
      try {
        // Dynamic imports from esm.sh as requested
        // @ts-ignore
        const { createModal } = await import("https://esm.sh/@walletconnect/modal");
        // @ts-ignore
        const { SolanaAdapter } = await import("https://esm.sh/@walletconnect/solana-adapter");

        const adapter = new SolanaAdapter({
          network: "mainnet",
          appMetadata: {
            name: "Fluxal",
          }
        });

        const modal = createModal({
          projectId: "9258364bbfb36e1882eb3fb863ef3b287",
          solanaAdapters: [adapter],
        });

        modalRef.current = modal;
        setIsReady(true);
        console.log("Fluxal Wallet Connect initialized");
      } catch (error) {
        console.error("Failed to initialize WalletConnect:", error);
        toast({
          title: "Initialization Error",
          description: "Failed to load wallet connection libraries.",
          variant: "destructive"
        });
      }
    };

    initWalletConnect();
  }, [toast]);
  
  const handleConnect = async () => {
    if (!modalRef.current) {
        toast({
          title: "Loading...",
          description: "Wallet connection is initializing. Please wait.",
          className: "bg-[#FFE500] text-black border-none font-mono",
        });
        return;
    }

    try {
        toast({
            title: "Connecting Wallet",
            description: "Opening Reown WalletConnect...",
            className: "bg-[#FFE500] text-black border-none font-mono",
        });

        const session = await modalRef.current.open();
        console.log("Connected wallet:", session);
        
        if (session) {
            toast({
                title: "Connected!",
                description: "Wallet connected successfully.",
                className: "bg-green-500 text-black border-none font-mono",
            });
            setTimeout(() => {
                setLocation("/dashboard");
            }, 1000);
        }
    } catch (error) {
        console.error("Connection failed:", error);
        // User might have closed the modal, or actual error
    }
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
                disabled={!isReady}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-sm tracking-wide ${
                    isReady 
                    ? "bg-[#4ADE80] hover:bg-[#22c55e] text-black" 
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
            >
                {isReady ? "Continue with Wallet" : "Initializing..."}
            </button>
        </div>
    </div>
  );
}
