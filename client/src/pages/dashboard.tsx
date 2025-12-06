import FluxalCursor from "@/components/FluxalCursor";
import FluxalLoader from "@/components/FluxalLoader";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, MoveRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText("8avjtJHAHfqp4g2RR9ALAGBpSTqKPZR8nRbzStWFLUX");
    toast({
      title: "Address Copied",
      description: "Contract address copied to clipboard",
      className: "bg-[#FFE500] text-black border-none font-mono",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-rajdhani selection:bg-[#FFE500] selection:text-black">

      {/* Cursor Effect */}
      <FluxalCursor />

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FFE500] transform skew-x-12" />
          <span className="text-2xl font-orbitron font-bold tracking-widest text-white">FLUXAL</span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-sm text-gray-400 tracking-widest">
          <a href="#" className="hover:text-[#FFE500] transition-colors">HOME</a>
          <a href="#" className="hover:text-[#FFE500] transition-colors">FEATURES</a>
          <a href="#" className="hover:text-[#FFE500] transition-colors">PRODUCTS</a>
          <a href="#" className="hover:text-[#FFE500] transition-colors">NEWS</a>
          <a href="#" className="hover:text-[#FFE500] transition-colors">DOCS</a>
          <a href="#" className="hover:text-[#FFE500] transition-colors">FAQ</a>
        </div>

        <Button 
          className="bg-[#FFE500] hover:bg-[#FF8C00] text-black font-bold rounded-full px-6 font-mono tracking-wide"
        >
          LAUNCH APP
        </Button>
      </nav>

      {/* Ticker Bar */}
      <div className="fixed top-[88px] w-full z-40 bg-[#FFE500]/10 border-y border-[#FFE500]/20 py-2 px-4 overflow-hidden">
        <div className="flex items-center gap-4 text-xs font-mono text-[#FFE500] tracking-widest whitespace-nowrap animate-marquee">
          <span className="font-bold">PROTOCOL STATUS: LIVE</span>
          <span>//</span>
          <span>PRIVACY POOL TVL: $142,892,102</span>
          <span>//</span>
          <span>LATEST AUDIT PASSED (CERTIK)</span>
          <span>//</span>
          <span>NEW ZK-SNARK CIRCUITS DEPLOYED</span>
          <span>//</span>
          <span>FLUXAL v2.0 BETA ACCESS OPEN</span>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen pt-32 px-8 md:px-20">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center space-y-10">
          
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] font-orbitron text-white tracking-tighter uppercase">
              A NEW<br />
              <span className="text-[#FFE500]">PRIVACY</span><br />
              LAYER<br />
              IS HERE
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-lg text-gray-400 font-medium leading-relaxed border-l-2 border-[#FFE500] pl-4">
              Fluxal turns your SOL assets into <span className="text-[#FFE500]">private</span>, <span className="text-[#FFE500]">portable</span> & <span className="text-[#FFE500]">secure</span> digital cash.
              <br /><br />
              A single, unified ZK pool enabling shielded balances, private transfers and offline P2P with seamless hooks into DeFi.
            </p>
          </motion.div>

          {/* Contract Address Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 items-start md:items-center"
          >
            <div 
              onClick={copyAddress}
              className="group cursor-pointer flex items-center gap-3 px-4 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#FFE500]/50 transition-all duration-300"
            >
              <span className="font-mono text-sm text-[#FFE500]">8avjtJ...StWFLUX</span>
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            
            <Button 
              variant="outline" 
              className="rounded-full px-8 py-6 border-white/20 text-white hover:bg-[#FFE500] hover:text-black hover:border-[#FFE500] transition-all font-bold tracking-widest"
            >
              LEARN MORE
            </Button>
          </motion.div>

        </div>

        {/* Right Visual (3D Element Placeholder) */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
            {/* Glowing Orb / Logo Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFE500]/20 to-[#FF8C00]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-10 bg-black/80 rounded-full border border-[#FFE500]/30 backdrop-blur-xl flex items-center justify-center overflow-hidden">
               {/* Stylized 'F' or Logo */}
               <div className="relative w-48 h-64 flex">
                  <div className="w-16 h-full bg-[#FFE500] transform -skew-x-12 translate-x-8" />
                  <div className="w-16 h-48 mt-16 bg-[#FF8C00] transform -skew-x-12 -translate-x-4 opacity-90" />
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Banner */}
      <div className="absolute bottom-0 w-full text-center pb-8 pt-20 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-orbitron font-bold tracking-widest text-white">
          THE <span className="text-[#FFE500]">NEW ERA</span> OF PRIVATE DEFI
        </h2>
        <div className="w-32 h-1 bg-[#FFE500] mx-auto mt-4" />
      </div>

    </div>
  );
}
