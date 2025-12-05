import FluxalCursor from "@/components/FluxalCursor";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import xLogo from "@assets/image_1764912714351.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-[#FFE500] selection:text-black">
      {/* Background Cursor Effect */}
      <FluxalCursor />

      {/* Top Right Social Icon */}
      <a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noreferrer"
        className="absolute top-8 right-8 z-50 w-8 h-8 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <img 
          src={xLogo} 
          alt="X (Twitter)" 
          className="w-full h-full object-contain filter invert" 
        />
      </a>

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
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter font-orbitron bg-clip-text text-transparent bg-gradient-to-b from-white via-[#FFE500] to-[#FF8C00] drop-shadow-[0_0_35px_rgba(255,229,0,0.6)] select-none italic transform -skew-x-12">
            FLUXAL
          </h1>
          
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
              className="relative group overflow-hidden bg-[#FFE500] text-black hover:bg-[#FFDD00] hover:text-black hover:scale-105 transition-all duration-300 text-lg font-bold px-10 py-7 rounded-none border-none uppercase tracking-wider transform -skew-x-12"
              style={{ clipPath: "polygon(15% 0, 100% 0, 100% 70%, 85% 100%, 0 100%, 0 30%)" }}
            >
              <span className="relative z-10 transform skew-x-12 inline-block">Launch Terminal</span>
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
