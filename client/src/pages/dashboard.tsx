import FluxalLoader from "@/components/FluxalLoader";
import FluxalCursor from "@/components/FluxalCursor";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Copy, MoveRight, WifiOff, Shield, Link, Lock, Ban, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import fluxalTitle from "@assets/Untitled_design__62_-removebg-preview_1765006354328.png";
import fluxalLogoY from "@assets/image_1765082701286.png";

export default function Dashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initialization loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText("8avjtJHAHfqp4g2RR9ALAGBpSTqKPZR8nRbzStWFLUX");
    toast({
      title: "Address Copied",
      description: "Contract address copied to clipboard",
      className: "bg-[#FFE500] text-black border-none font-mono",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-neue selection:bg-[#FFE500] selection:text-black">
      <AnimatePresence>
        {isLoading && (
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[100]"
            >
                <FluxalLoader />
            </motion.div>
        )}
      </AnimatePresence>

      <FluxalCursor />

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-2 bg-black/50 backdrop-blur-sm border-b border-[#FFE500]/30 h-24">
        <div className="flex items-center h-full">
           <img src={fluxalTitle} alt="FLUXAL" className="h-16 w-auto object-contain" />
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8 font-neue text-xs text-gray-400 tracking-widest font-bold">
            <a href="#" className="hover:text-[#FFE500] transition-colors">HOME</a>
            <a href="#" className="hover:text-[#FFE500] transition-colors">FEATURES</a>
            <a href="#" className="hover:text-[#FFE500] transition-colors">PRODUCTS</a>
            <a href="#" className="hover:text-[#FFE500] transition-colors">NEWS</a>
            <a href="#" className="hover:text-[#FFE500] transition-colors">DOCS</a>
            <a href="#" className="hover:text-[#FFE500] transition-colors">FAQ</a>
          </div>

          <Button 
            className="bg-[#FFE500] border border-[#FFE500] text-black hover:bg-[#FF8C00] hover:text-black font-bold rounded-full px-6 py-1 h-auto font-neue tracking-wide text-xs uppercase"
          >
            WALLET
          </Button>
        </div>
      </nav>

      {/* Ticker Bar */}
      <div className="absolute top-24 w-full z-40 bg-[#FFE500]/5 border-b border-[#FFE500]/20 py-2 px-4 overflow-hidden h-9 flex items-center">
        <div className="flex items-center gap-4 text-[10px] md:text-xs font-neue text-[#FFE500] tracking-widest whitespace-nowrap animate-marquee">
          <span className="font-bold">Quick User Updates</span>
          <span>—</span>
          <span>User feedback updates:</span>
          <span>-</span>
          <span>Offline cash icon updated to match designs</span>
          <span>-</span>
          <span>Sidebar menu items line height fix</span>
        </div>
      </div>

      {/* Beta Notification Bar */}
      <div className="absolute top-[132px] w-full z-40 bg-[#FFE500]/5 border-b border-[#FFE500]/20 py-2 px-4 flex justify-center items-center gap-4 h-10">
        <p className="text-[10px] md:text-xs font-neue tracking-wider text-[#FFE500] truncate">
          <span className="font-bold">Dashboard Beta is live</span> — The FLUXAL dashboard beta (in demo mode) is now live on Solana mainnet.
        </p>
        <Button 
          variant="outline" 
          className="hidden md:flex h-6 text-[10px] px-4 rounded-full border-[#FFE500]/30 text-[#FFE500] hover:bg-[#FFE500] hover:text-black uppercase tracking-widest bg-transparent"
        >
          Read more & Try it here
        </Button>
      </div>

      {/* Main Hero Section */}
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen pt-52 px-8 md:px-20 items-center">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center space-y-8">
          
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] font-neue text-white uppercase tracking-tight">
              A NEW<br />
              <span className="relative inline-block">
                <span className="relative z-10 text-black">ZERO-KNOWLEDGE</span>
                <div className="absolute inset-0 bg-[#FFE500] transform -skew-x-0 z-0 -left-2 -right-2" />
              </span><br />
              <span className="relative inline-block">
                 <span className="relative z-10 text-black">ERA</span>
                 <div className="absolute inset-0 bg-[#FFE500] transform -skew-x-0 z-0 -left-2 -right-12" />
              </span><br />
              IS HERE
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-lg"
          >
            <p className="text-sm md:text-base text-gray-300 font-neue font-medium leading-relaxed">
              <span className="text-[#FFE500]">ZERA</span> turns your crypto assets into <span className="text-[#FFE500]">private</span>, <span className="text-[#FFE500]">portable</span> & <span className="text-[#FFE500]">secure</span> digital cash.
              <br /><br />
              A single, unified ZK pool enabling shielded balances, private transfers and offline P2P with seamless hooks into DeFi.
            </p>
          </motion.div>

          {/* Contract Address Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <div 
              onClick={copyAddress}
              className="group cursor-pointer flex items-center gap-3 px-4 py-2 rounded-full border border-[#FFE500]/30 bg-[#FFE500]/5 hover:bg-[#FFE500]/10 transition-all duration-300"
            >
              <span className="font-mono text-xs text-[#FFE500]">8avjtJ...StWFLUX</span>
              <Copy className="w-3 h-3 text-[#FFE500]/70 group-hover:text-[#FFE500] transition-colors" />
            </div>
            
            <Button 
              variant="outline" 
              className="rounded-full px-6 py-2 border-[#FFE500]/30 text-white hover:bg-[#FFE500] hover:text-black hover:border-[#FFE500] transition-all font-bold text-xs tracking-widest uppercase"
            >
              LEARN MORE
            </Button>
          </motion.div>

        </div>

        {/* Right Visual (Token Image) */}
        <div className="flex-1 flex items-center justify-center relative mt-10 md:mt-0">
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm flex items-center justify-center group hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 rounded-full bg-[#FFE500]/5 blur-3xl" />
            <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-dashed border-[#FFE500]/20 animate-[spin_20s_linear_infinite_reverse]" />
            
            <img 
              src={fluxalLogoY} 
              alt="FLUXAL" 
              className="w-3/4 h-auto object-contain drop-shadow-[0_0_30px_rgba(255,229,0,0.3)] opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

      </div>

      {/* Features Section */}
      <div className="relative z-20 w-full bg-black/90 py-20 px-8 md:px-20 border-t border-[#FFE500]/20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-neue font-bold text-white mb-4 uppercase tracking-wide">
              THE <span className="text-[#FFE500]">NEW ERA</span> OF DIGITAL CASH
            </h2>
            <div className="w-24 h-0.5 bg-[#FFE500]/50 mx-auto mb-6" />
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto uppercase tracking-widest">
              Experience the perfect blend of physical cash privacy with digital convenience
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-[#FFE500]/50 hover:bg-[#FFE500]/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <WifiOff className="w-6 h-6 text-[#FFE500]" />
                <h3 className="font-bold font-neue text-white uppercase tracking-wider text-base">TRUE OFFLINE PAYMENTS</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-neue">
                Complete device-to-device transactions with zero internet connectivity. Tap-to-pay using NFC, Bluetooth, or QR codes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-[#FFE500]/50 hover:bg-[#FFE500]/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-[#FFE500]" />
                <h3 className="font-bold font-neue text-white uppercase tracking-wider text-base">CRYPTOGRAPHIC PRIVACY</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-neue">
                Zero-knowledge proofs and Pedersen commitments ensure mathematical privacy guarantees. Perfect anonymity.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-[#FFE500]/50 hover:bg-[#FFE500]/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Link className="w-6 h-6 text-[#FFE500]" />
                <h3 className="font-bold font-neue text-white uppercase tracking-wider text-base">PERFECT DIVISIBILITY</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-neue">
                Spend exact amounts with automatic cryptographic change creation. No minimum amounts or rounding errors.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-[#FFE500]/50 hover:bg-[#FFE500]/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-[#FFE500]" />
                <h3 className="font-bold font-neue text-white uppercase tracking-wider text-base">SECURE ENCLAVES</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-neue">
                Private keys stored in tamper-resistant hardware. Biometric authentication for high-value transactions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-[#FFE500]/50 hover:bg-[#FFE500]/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Ban className="w-6 h-6 text-[#FFE500]" />
                <h3 className="font-bold font-neue text-white uppercase tracking-wider text-base">ANTI-DOUBLE SPENDING</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-neue">
                Nullifiers prevent double-spending while maintaining complete anonymity. Cryptographic stamps ensure validity.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-[#FFE500]/50 hover:bg-[#FFE500]/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-[#FFE500]" />
                <h3 className="font-bold font-neue text-white uppercase tracking-wider text-base">SOLANA SPEED</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-neue">
                Built on Solana for lightning-fast, low-cost USDC settlement when syncing online. High throughput meets privacy.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}