import FluxalLoader from "@/components/FluxalLoader";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MoveRight, WifiOff, Shield, Link, Lock, Ban, Zap, Layers, Database } from "lucide-react";
import fluxalTitle from "@assets/Untitled_design__62_-removebg-preview_1765006354328.png";
import fluxalLogoY from "@assets/image_1765082701286.png";
import fluxalEngine from "@assets/image_1765087318769.png";
import fluxalSdk from "@assets/image_1765087690465.png";
import fluxalInfra from "@assets/image_1765087697841.png";
import { useLocation } from "wouter";

export default function Landing() {
  const [_, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initialization loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d0d04] via-black to-black text-white overflow-hidden relative font-neue selection:bg-[#FFE500] selection:text-black">
      {/* Background Gradients - Enhanced for visibility */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,229,0,0.15),_transparent_70%)] pointer-events-none mix-blend-screen" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,140,0,0.1),_transparent_50%)] pointer-events-none mix-blend-screen" />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,rgba(255,229,0,0.02),transparent)] pointer-events-none" />
      
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

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-2 bg-black/50 backdrop-blur-sm border-b border-[#FFE500]/30 h-24">
        <div className="flex items-center h-full">
           <img src={fluxalTitle} alt="FLUXAL" className="h-16 w-auto object-contain" />
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8 font-neue text-xs text-gray-400 tracking-widest font-bold">
            <a data-testid="link-nav-home" href="#home" className="hover:text-[#FFE500] transition-colors">HOME</a>
            <a data-testid="link-nav-features" href="#features" className="hover:text-[#FFE500] transition-colors">FEATURES</a>
            <a data-testid="link-nav-products" href="#products" className="hover:text-[#FFE500] transition-colors">PRODUCTS</a>
            <a data-testid="link-nav-docs" href="#docs" className="hover:text-[#FFE500] transition-colors">DOCS</a>
          </div>

          <Button 
            onClick={() => setLocation("/connect")}
            className="bg-[#FFE500] border border-[#FFE500] text-black hover:bg-[#FF8C00] hover:text-black font-bold rounded-full px-6 py-1 h-auto font-neue tracking-wide text-xs uppercase"
          >
            WALLET
          </Button>
        </div>
      </nav>

      {/* Beta Notification Bar */}
      <div className="absolute top-24 w-full z-40 bg-[#FFE500]/5 border-b border-[#FFE500]/20 py-2 px-4 flex justify-center items-center gap-4 h-10">
        <p className="text-[10px] md:text-xs font-neue font-black tracking-wide text-[#FFE500] truncate uppercase">
          <span className="text-white">Dashboard is live</span> <span className="text-white mx-2">—</span> The FLUXAL dashboard is now live on Solana mainnet and available to all users.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setLocation("/connect")}
          className="hidden md:flex h-6 text-[10px] px-4 rounded-full border-[#FFE500]/30 text-[#FFE500] hover:bg-[#FFE500] hover:text-black uppercase tracking-widest bg-transparent font-bold"
        >
          Read more & Try it here
        </Button>
      </div>

      {/* Main Hero Section */}
      <div id="home" className="relative z-10 flex flex-col md:flex-row min-h-screen pt-52 px-8 md:px-20 items-center">
        
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
              <span className="text-[#FFE500]">FLUXAL</span> turns your crypto assets into <span className="text-[#FFE500]">private</span>, <span className="text-[#FFE500]">portable</span> & <span className="text-[#FFE500]">secure</span> digital cash.
              <br /><br />
              A single, unified ZK pool enabling shielded balances, private transfers and offline P2P with seamless hooks into DeFi.
            </p>
          </motion.div>


        </div>

        {/* Right Visual (Token Image) - REMOVED */}
        {/* <div className="flex-1 flex items-center justify-center relative mt-10 md:mt-0"> ... </div> */}

      </div>

      {/* Features Section */}
      <div id="features" className="relative z-20 w-full bg-transparent py-20 px-8 md:px-20 border-t border-[#FFE500]/20">
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

      {/* Ecosystem & Innovation Section */}
      <div className="relative z-20 w-full bg-transparent py-20 px-8 md:px-20 border-t border-[#FFE500]/20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-neue font-bold text-white mb-2 uppercase tracking-wide">
              <span className="text-[#FFE500]">FLUXAL</span> ECOSYSTEM
            </h2>
            <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest">
              LAYERED PRIVACY. SCALABLE TRUST.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {/* Card 1: $FLUX */}
            <div className="p-8 rounded-2xl border border-[#FFE500]/30 bg-[#FFE500]/5 flex flex-col h-full hover:bg-[#FFE500]/10 transition-colors duration-300">
              <h3 className="text-2xl font-bold font-neue text-[#FFE500] mb-1">$FLUX</h3>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-6">THE UTILITY TOKEN</p>

              <p className="text-gray-300 text-sm leading-relaxed font-neue mb-6" data-testid="text-flux-utility-intro">
                <span className="text-[#FFE500]">$FLUX</span> is used by the protocol to pay for privacy-related computation and infrastructure on Solana.
              </p>

              <div className="space-y-4 flex-1">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs font-neue font-black tracking-widest uppercase text-white" data-testid="text-protocol-fees-title">Protocol Fees</p>
                  <p className="mt-2 text-xs md:text-sm text-gray-400 leading-relaxed font-neue" data-testid="text-protocol-fees-body">
                    Certain privacy-preserving actions require payment in <span className="text-[#FFE500]">$FLUX</span>, covering proof generation, verification, and relayer services.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs font-neue font-black tracking-widest uppercase text-white" data-testid="text-resource-metering-title">Resource Metering</p>
                  <p className="mt-2 text-xs md:text-sm text-gray-400 leading-relaxed font-neue" data-testid="text-resource-metering-body">
                    <span className="text-[#FFE500]">$FLUX</span> is used to rate-limit and meter access to privacy features, preventing abuse and aligning usage with computational cost.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Privacy-Preserving Transfers */}
            <div className="p-8 rounded-2xl border border-white/20 bg-white/5 flex flex-col h-full relative overflow-hidden hover:bg-white/10 transition-colors duration-300">
              <h3 className="text-2xl font-bold font-neue text-white mb-1">PRIVACY-PRESERVING TRANSFERS</h3>
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-6">SUPPORTED SOLANA ASSETS</p>

              <p className="text-gray-300 text-sm leading-relaxed font-neue mb-6" data-testid="text-privacy-transfers-intro">
                The protocol enables private transfers for supported Solana assets.
              </p>
              
              <ul className="space-y-4 flex-1">
                {[
                  { title: "Hidden Amounts", body: "Transaction values are concealed using cryptographic commitments." },
                  { title: "Verifiable State Transitions", body: "Zero-knowledge proofs ensure balances remain correct without revealing private data." },
                  { title: "Solana Execution Model", body: "Proofs are verified by Solana programs, with heavy computation performed off-chain." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="mt-1 w-4 h-4 rounded-full border border-white flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <p className="font-neue font-black tracking-wide text-white" data-testid={`text-privacy-bullet-title-${i}`}>{item.title}</p>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-neue" data-testid={`text-privacy-bullet-body-${i}`}>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cryptographic Innovation Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-neue font-bold text-white mb-2 uppercase tracking-wide">
              CRYPTOGRAPHIC <span className="text-[#FFE500]">INNOVATION</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest">
              LAYERED PRIVACY. SCALABLE TRUST.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Text */}
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-bold font-neue text-[#FFE500] mb-4 uppercase tracking-wider">PEDERSEN COMMITMENTS</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-mono">
                  Our system uses <strong className="text-white">Pedersen commitments</strong> to hide transaction amounts while maintaining mathematical verifiability. Each commitment (vG + rH) cryptographically binds to a value without revealing it.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold font-neue text-[#FFE500] mb-4 uppercase tracking-wider">ZERO-KNOWLEDGE PROOFS</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-mono">
                  zk-SNARKs generate compact proofs that verify transaction validity without exposing any sensitive information. Prove you have funds, prove amounts balance, and keep everything private.
                </p>
              </div>
            </div>

            {/* Right Code Block */}
            <div className="rounded-xl border border-white/10 bg-[#1e1e1e] p-6 font-mono text-xs md:text-sm text-gray-300 relative overflow-hidden group hover:border-[#FFE500]/30 transition-colors duration-300">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFE500] to-[#FF8C00]" />
               <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`// Pedersen Commitment
`}
<span className="text-[#9cdcfe]">commitment</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#9cdcfe]">v</span> <span className="text-[#d4d4d4]">*</span> <span className="text-[#569cd6]">G</span> <span className="text-[#d4d4d4]">+</span> <span className="text-[#9cdcfe]">r</span> <span className="text-[#d4d4d4]">*</span> <span className="text-[#569cd6]">H</span>
{`
// Zero-Knowledge Proof
`}
<span className="text-[#9cdcfe]">proof</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#dcdcaa]">zk_prove</span><span className="text-[#d4d4d4]">(</span> <span className="text-[#9cdcfe]">statement</span><span className="text-[#d4d4d4]">:</span> <span className="text-[#ce9178]">"I know v, r such that C = vG + rH"</span><span className="text-[#d4d4d4]">,</span>
  <span className="text-[#9cdcfe]">witness</span><span className="text-[#d4d4d4]">:</span> <span className="text-[#da70d6]">{`{ v, r }`}</span><span className="text-[#d4d4d4]">,</span> 
  <span className="text-[#9cdcfe]">public</span><span className="text-[#d4d4d4]">:</span> <span className="text-[#da70d6]">{`{ C }`}</span> 
<span className="text-[#d4d4d4]">)</span>
{`
// Nullifier Generation
`}
<span className="text-[#9cdcfe]">nullifier</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#dcdcaa]">hash</span><span className="text-[#d4d4d4]">(</span> <span className="text-[#9cdcfe]">private_key</span><span className="text-[#d4d4d4]">,</span> <span className="text-[#9cdcfe]">commitment</span> <span className="text-[#d4d4d4]">)</span>
               </pre>
            </div>
          </div>

          {/* FLUXAL IS TRUSTWARE Section */}
          <div className="mt-32 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-neue font-bold text-white mb-4 uppercase tracking-wide">
                <span className="text-[#FFE500]">FLUXAL</span> IS TRUSTWARE
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
                The transition from analog to digital trust is underway.
                Learn how FLUXAL powers the core privacy infrastructure for the world.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 max-w-4xl mx-auto hover:border-[#FFE500]/30 transition-colors duration-300">
              <div className="space-y-12">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-neue text-white mb-4">Privacy's broadband moment</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-neue">
                    We're engineering a secure, private, and backward-compatible unified ZK layer for everything from money and identity to markets, coordination, and creativity—tools that scale from individuals to institutions without sacrificing user sovereignty.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-neue text-white mb-4">Token-agnostic by design – built to run across chains & providers</h3>
                  <div className="space-y-6 text-gray-400 text-sm md:text-base leading-relaxed font-neue">
                    <p>
                      The <span className="text-[#FFE500]">$FLUX</span> Protocol is token-native.
                      Users deposit the assets they already hold directly into the privacy layer, no synthetic assets, no IOUs. The result is a familiar user experience with on-chain privacy guarantees enforced by cryptography.
                    </p>
                    <p>
                      The protocol’s cryptographic core is designed to be modular, allowing it to be adapted across different execution environments. This approach enables consistent privacy guarantees on Solana today, with a clear path to supporting additional chains over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FLUXAL WALLET Product Section */}
          <div id="products" className="mt-32 mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-neue font-bold text-white mb-4 uppercase tracking-wide">
                PRODUCTS
              </h2>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">
                FOR USERS
              </p>
              <h3 className="text-2xl md:text-3xl font-neue font-bold text-[#FFE500] uppercase tracking-wider">
                FLUXAL ENGINE
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
              <div className="relative w-64 h-80 md:w-80 md:h-96 mb-8 group">
                <div className="absolute inset-0 bg-[#FFE500]/20 blur-[60px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <img 
                  src={fluxalEngine} 
                  alt="FLUXAL Engine" 
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              <div className="text-center space-y-8 px-4">
                <p className="text-gray-300 font-mono text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
                  A powerful, privacy-preserving digital wallet that feels like cash.
                  Supporting USDC, USDT, and SOL with more assets to come post-launch.
                  Available for Desktop, iOS & Android.
                </p>
                <div className="flex gap-4 justify-center">
                     <Button
                      onClick={() => setLocation("/connect")}
                      data-testid="button-try-now"
                      className="rounded-full bg-[#FFE500] text-black hover:bg-[#FF8C00] uppercase tracking-widest font-bold text-xs px-8 py-2 border-none"
                    >
                      Try Now
                    </Button>
                </div>
              </div>
            </div>
          </div>

           {/* FLUXAL SDK & INFRA Section */}
           <div id="docs" className="mt-32 mb-32 border-t border-[#FFE500]/10 pt-32">
             <div className="text-center mb-20">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">
                FOR DEVELOPERS
              </p>
              <h3 className="text-3xl md:text-5xl font-neue font-bold text-white uppercase tracking-wider">
                BUILD WITH <span className="text-[#FFE500]">FLUXAL</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                {/* SDK Column */}
                <div className="flex flex-col items-center text-center group">
                    <div className="w-48 h-48 mb-8 relative">
                        <div className="absolute inset-0 bg-[#FFE500]/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <img src={fluxalSdk} alt="SDK" className="w-full h-full object-contain relative z-10" />
                    </div>
                    <h4 className="text-xl font-bold font-neue text-white mb-4 uppercase tracking-wide">FLUXAL SDK</h4>
                    <p className="text-gray-400 text-sm font-mono leading-relaxed mb-6 max-w-sm">
                        Integrate privacy into your dApps with a few lines of code. 
                        Shielded transfers, private swaps, and ZK-identity hooks.
                    </p>
                </div>

                {/* INFRA Column */}
                 <div className="flex flex-col items-center text-center group">
                    <div className="w-48 h-48 mb-8 relative">
                         <div className="absolute inset-0 bg-[#FFE500]/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <img src={fluxalInfra} alt="Infrastructure" className="w-full h-full object-contain relative z-10" />
                    </div>
                    <h4 className="text-xl font-bold font-neue text-white mb-4 uppercase tracking-wide">FLUXAL INFRA</h4>
                    <p className="text-gray-400 text-sm font-mono leading-relaxed mb-6 max-w-sm">
                        Run your own provers and relayers.
                        Support a decentralized privacy network on Solana, where $FLUX is used for network fees, access to privacy features, and protocol governance.
                    </p>
                </div>
            </div>
           </div>

           {/* Footer */}
           <div id="faq" className="border-t border-[#FFE500]/20 pt-12 pb-12 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
             <div className="hidden md:block" /> {/* Empty Left Column */}
             
             <div className="flex justify-center gap-12 text-xs text-gray-500 font-mono tracking-widest">
                <a href="#" className="hover:text-[#FFE500] flex items-center gap-2 group">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current group-hover:text-[#FFE500] transition-colors">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a data-testid="link-footer-docs" href="#docs" className="hover:text-[#FFE500]">DOCS</a>
             </div>

             <p className="text-xs text-gray-400 font-mono text-center md:text-right font-bold">
                © 2026 FLUXAL LABS. ALL RIGHTS RESERVED.
             </p>
           </div>

        </div>
      </div>
    </div>
  );
}