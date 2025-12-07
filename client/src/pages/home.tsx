import FluxalCursor from "@/components/FluxalCursor";
import FluxalLoader from "@/components/FluxalLoader";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import fluxalTitle from "@assets/Untitled_design__62_-removebg-preview_1765006354328.png";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLaunch = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
      setLocation('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-[#FFE500] selection:text-black">
      <AnimatePresence>
        {isLoading && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[100]"
            >
                <FluxalLoader />
            </motion.div>
        )}
      </AnimatePresence>

      {/* Background Cursor Effect */}
      <FluxalCursor />

      {/* Static Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFE500]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FF8C00]/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center relative"
        >
          {/* Main Title */}
          <div className="flex justify-center mb-8">
            <img 
              src={fluxalTitle} 
              alt="FLUXAL" 
              className="h-48 md:h-64 w-auto object-contain drop-shadow-[0_0_35px_rgba(255,229,0,0.6)]" 
            />
          </div>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-xl md:text-2xl text-neutral-400 font-rajdhani tracking-[0.2em] uppercase font-medium"
          >
            Privacy Layer for Solana
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 flex flex-col md:flex-row gap-8 justify-center items-center"
          >
            <Button 
              size="lg"
              className="relative group overflow-hidden bg-[#FFE500] text-black hover:bg-[#FFDD00] hover:text-black hover:scale-105 transition-all duration-300 text-lg font-bold px-10 py-7 rounded-none border-none uppercase tracking-wider transform -skew-x-12 opacity-50 cursor-not-allowed"
              style={{ clipPath: "polygon(15% 0, 100% 0, 100% 70%, 85% 100%, 0 100%, 0 30%)" }}
            >
              <span className="relative z-10 transform skew-x-12 inline-block">Terminal Offline</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="relative group overflow-hidden border border-[#FFE500]/50 text-[#FFE500] hover:bg-[#FFE500]/10 hover:text-[#FFE500] hover:border-[#FFE500] hover:scale-105 transition-all duration-300 text-lg font-bold px-10 py-7 rounded-none uppercase tracking-wider transform -skew-x-12 bg-transparent backdrop-blur-sm"
              style={{ clipPath: "polygon(15% 0, 100% 0, 100% 70%, 85% 100%, 0 100%, 0 30%)" }}
            >
              <span className="relative z-10 transform skew-x-12 inline-block">Documentation</span>
            </Button>

            <a 
              href="https://x.com/FluxalAI" 
              target="_blank" 
              rel="noreferrer"
              className="relative group overflow-hidden flex items-center justify-center border border-[#FFE500]/50 text-[#FFE500] hover:bg-[#FFE500]/10 hover:text-[#FFE500] hover:border-[#FFE500] hover:scale-105 transition-all duration-300 w-[60px] h-[60px] rounded-none uppercase tracking-wider transform -skew-x-12 bg-transparent backdrop-blur-sm"
              style={{ clipPath: "polygon(25% 0, 100% 0, 100% 70%, 75% 100%, 0 100%, 0 30%)" }}
            >
               <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current relative z-10 transform skew-x-12">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer / Status / HUD Elements */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-1 text-[10px] md:text-xs text-[#FFE500]/60 font-mono z-10 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#FFE500] rounded-full animate-pulse" />
          <p>SYSTEM STATUS: ONLINE</p>
        </div>
        <p className="pl-4 opacity-60">NODE: SOL-MAIN-04 // LATENCY: 12ms</p>
      </div>

      <div className="absolute bottom-8 right-8 text-right text-[10px] md:text-xs text-[#FFE500]/60 font-mono z-10 pointer-events-none select-none">
        <p>FLUXAL PROTOCOL v1.0</p>
        <p className="opacity-60">ENCRYPTED CONNECTION</p>
      </div>

      {/* Decorative HUD Lines */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFE500]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FFE500]/5 to-transparent pointer-events-none" />
      
      <div className="absolute top-8 left-8 w-32 h-[1px] bg-[#FFE500]/30" />
      <div className="absolute top-8 right-8 w-32 h-[1px] bg-[#FFE500]/30" />
      <div className="absolute bottom-8 left-48 w-16 h-[1px] bg-[#FFE500]/20" />
      <div className="absolute bottom-8 right-48 w-16 h-[1px] bg-[#FFE500]/20" />
    </div>
  );
}
