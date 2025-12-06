import FluxalLoader from "@/components/FluxalLoader";
import FluxalCursor from "@/components/FluxalCursor";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, MoveRight, WifiOff, Shield, Link, Lock, Ban, Zap, CheckCircle, ArrowLeftRight, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import fluxalTitle from "@assets/Untitled_design__62_-removebg-preview_1765006354328.png";

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
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-neue selection:bg-[#FFE500] selection:text-black">
      <FluxalCursor key="dashboard-cursor-v2" />

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
          {/* Token Image Removed */}
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

      {/* Ecosystem Section */}
      <div className="relative z-20 w-full bg-black py-20 px-8 md:px-20 border-t border-[#FFE500]/20">
        <div className="max-w-7xl mx-auto">
          
          {/* Ecosystem Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-neue font-bold text-white mb-4 uppercase tracking-wide">
              <span className="text-[#FFE500]">FLUXAL</span> ECOSYSTEM
            </h2>
            <p className="text-gray-400 text-sm md:text-base tracking-widest uppercase">
              LAYERED PRIVACY. SCALABLE TRUST.
            </p>
          </div>

          {/* Ecosystem Cards */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-32 relative">
            
            {/* Left Card - Token */}
            <div className="flex-1 w-full p-8 rounded-2xl border border-[#FFE500]/30 bg-[#FFE500]/5 hover:bg-[#FFE500]/10 transition-all duration-300 h-full">
              <h3 className="text-2xl font-bold font-neue text-[#FFE500] mb-1">$FLUX</h3>
              <p className="text-xs text-gray-400 font-neue tracking-wider mb-6 uppercase">THE UTILITY TOKEN</p>
              
              <ul className="space-y-4">
                {[
                  "Governance and protocol decisions",
                  "Programmatic buy-back and burns",
                  "Access gates for premium features",
                  "Early access to new products"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FFE500] flex-shrink-0" />
                    <span className="text-sm text-gray-300 font-neue">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exchange Icon */}
            <div className="hidden md:flex items-center justify-center text-[#FFE500]">
               <ArrowLeftRight className="w-8 h-8" />
            </div>

            {/* Right Card - Stablecoins */}
            <div className="flex-1 w-full p-8 rounded-2xl border border-white/20 bg-white/5 hover:border-[#FFE500]/30 transition-all duration-300 h-full">
              <h3 className="text-2xl font-bold font-neue text-[#8da2b5] mb-1 text-white">USDC/USDT/SOL + OTHERS</h3>
              <p className="text-xs text-gray-400 font-neue tracking-wider mb-6 uppercase">PRIVATE DIGITAL CASH</p>
              
              <ul className="space-y-4">
                {[
                  "Any stablecoin or token with privacy",
                  "Complete transaction anonymity",
                  "Offline payment capability",
                  "Zero-knowledge proof transfers"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-sm text-gray-300 font-neue">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Innovation Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-neue font-bold text-white mb-4 uppercase tracking-wide">
              CRYPTOGRAPHIC <span className="text-[#FFE500]">INNOVATION</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base tracking-widest uppercase">
              LAYERED PRIVACY. SCALABLE TRUST.
            </p>
          </div>

          {/* Innovation Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Text */}
            <div className="space-y-12">
              <div>
                <h3 className="text-[#FFE500] font-bold font-neue text-lg mb-4 uppercase tracking-wider">PEDERSEN COMMITMENTS</h3>
                <p className="text-gray-300 font-neue leading-relaxed text-sm">
                  Our system uses <strong className="text-white">Pedersen commitments</strong> to hide transaction amounts while maintaining mathematical verifiability. Each commitment (vG + rH) <strong className="text-white">cryptographically binds to a value without revealing it.</strong>
                </p>
              </div>
              
              <div>
                <h3 className="text-[#FFE500] font-bold font-neue text-lg mb-4 uppercase tracking-wider">ZERO-KNOWLEDGE PROOFS</h3>
                <p className="text-gray-300 font-neue leading-relaxed text-sm">
                  zk-SNARKs generate compact proofs that verify transaction validity without exposing any sensitive information. Prove you have funds, prove amounts balance, and keep everything private.
                </p>
              </div>
            </div>

            {/* Right Code Block */}
            <div className="rounded-xl border border-white/10 bg-[#111] p-6 font-mono text-xs overflow-x-auto">
              <div className="text-gray-500 mb-2">// Pedersen Commitment</div>
              <div className="mb-4"><span className="text-[#FFE500]">commitment</span> = v * G + r * H</div>
              
              <div className="text-gray-500 mb-2">// Zero-Knowledge Proof</div>
              <div className="mb-1"><span className="text-[#FF8C00]">proof</span> = zk_prove( statement: <span className="text-gray-400">"I know v, r such that C = vG + rH"</span>,</div>
              <div className="mb-4">witness: {'{'} v, r {'}'}, public: {'{'} C {'}'} )</div>
              
              <div className="text-gray-500 mb-2">// Nullifier Generation</div>
              <div><span className="text-[#FFE500]">nullifier</span> = hash( private_key, commitment )</div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
