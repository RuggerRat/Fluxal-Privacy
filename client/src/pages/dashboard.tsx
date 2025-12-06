import FluxalLoader from "@/components/FluxalLoader";
import FluxalCursor from "@/components/FluxalCursor";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, MoveRight } from "lucide-react";
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
      <div className="fixed top-24 w-full z-40 bg-[#FFE500]/5 border-b border-[#FFE500]/20 py-2 px-4 overflow-hidden h-9 flex items-center">
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
      <div className="fixed top-[132px] w-full z-40 bg-[#FFE500]/5 border-b border-[#FFE500]/20 py-2 px-4 flex justify-center items-center gap-4 h-10">
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

      {/* Bottom Banner - Replaced by new sections */}
      
      {/* Features Section */}
      <section className="relative z-10 py-32 px-8 md:px-20 bg-black border-t border-[#FFE500]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-neue font-bold text-white uppercase tracking-tight mb-4">
              THE <span className="text-[#FFE500]">NEW ERA</span> OF DIGITAL CASH
            </h2>
            <div className="w-24 h-1 bg-[#FFE500] mx-auto mb-8" />
            <p className="text-gray-400 font-neue tracking-widest text-sm md:text-base max-w-2xl mx-auto uppercase">
              EXPERIENCE THE PERFECT BLEND OF PHYSICAL CASH PRIVACY WITH DIGITAL CONVENIENCE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "TRUE OFFLINE PAYMENTS",
                desc: "Complete device-to-device transactions with zero internet connectivity. Tap-to-pay using NFC, Bluetooth, or QR codes.",
                icon: "⚡"
              },
              {
                title: "CRYPTOGRAPHIC PRIVACY",
                desc: "Zero-knowledge proofs and Pedersen commitments ensure mathematical privacy guarantees. Perfect anonymity.",
                icon: "🛡️"
              },
              {
                title: "PERFECT DIVISIBILITY",
                desc: "Spend exact amounts with automatic cryptographic change creation. No minimum amounts or rounding errors.",
                icon: "↔️"
              },
              {
                title: "SECURE ENCLAVES",
                desc: "Private keys stored in tamper-resistant hardware. Biometric authentication for high-value transactions.",
                icon: "🔒"
              },
              {
                title: "ANTI-DOUBLE SPENDING",
                desc: "Nullifiers prevent double-spending while maintaining complete anonymity. Cryptographic stamps ensure validity.",
                icon: "🚫"
              },
              {
                title: "SOLANA SPEED",
                desc: "Built on Solana for lightning-fast, low-cost USDC settlement when syncing online. High throughput meets privacy.",
                icon: "⚡"
              }
            ].map((feature, i) => (
              <div key={i} className="border border-[#FFE500]/20 rounded-2xl p-8 bg-[#FFE500]/5 hover:bg-[#FFE500]/10 transition-colors group">
                <div className="text-[#FFE500] mb-4 text-xl">{feature.icon} <span className="font-bold ml-2 tracking-wider uppercase">{feature.title}</span></div>
                <p className="text-gray-400 text-sm leading-relaxed font-neue">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="relative z-10 py-32 px-8 md:px-20 bg-black border-t border-[#FFE500]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-neue font-bold text-white uppercase tracking-tight mb-2">
              <span className="text-[#FFE500]">FLUXAL</span> ECOSYSTEM
            </h2>
            <p className="text-gray-500 font-neue tracking-[0.2em] text-sm uppercase">
              LAYERED PRIVACY. SCALABLE TRUST.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-12 mb-32">
            <div className="flex-1 border border-[#FFE500]/30 rounded-2xl p-8 md:p-12 bg-gradient-to-br from-[#FFE500]/10 to-transparent relative overflow-hidden">
               <h3 className="text-2xl font-bold text-[#FFE500] mb-2 font-neue">$FLUXAL</h3>
               <p className="text-gray-400 text-sm tracking-wider mb-8 uppercase">THE UTILITY TOKEN</p>
               <ul className="space-y-4 text-sm text-gray-300 font-neue">
                 {['Governance and protocol decisions', 'Programmatic buy-back and burns', 'Access gates for premium features', 'Early access to new products'].map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <span className="text-[#FFE500] mt-0.5">✓</span> {item}
                   </li>
                 ))}
               </ul>
            </div>

            <div className="flex items-center justify-center text-[#FFE500] text-4xl">
              ↔
            </div>

            <div className="flex-1 border border-[#FF8C00]/30 rounded-2xl p-8 md:p-12 bg-gradient-to-br from-[#FF8C00]/10 to-transparent relative overflow-hidden">
               <h3 className="text-2xl font-bold text-[#FF8C00] mb-2 font-neue">USDC/USDT/SOL + OTHERS</h3>
               <p className="text-gray-400 text-sm tracking-wider mb-8 uppercase">PRIVATE DIGITAL CASH</p>
               <ul className="space-y-4 text-sm text-gray-300 font-neue">
                 {['Any stablecoin or token with privacy', 'Complete transaction anonymity', 'Offline payment capability', 'Zero-knowledge proof transfers'].map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <span className="text-[#FF8C00] mt-0.5">➜</span> {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Innovation Section */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-neue font-bold text-white uppercase tracking-tight mb-2">
              CRYPTOGRAPHIC <span className="text-[#FFE500]">INNOVATION</span>
            </h2>
            <p className="text-gray-500 font-neue tracking-[0.2em] text-sm uppercase">
              LAYERED PRIVACY. SCALABLE TRUST.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-12">
              <div>
                <h3 className="text-[#FFE500] text-xl font-bold mb-4 uppercase tracking-wider">PEDERSEN COMMITMENTS</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-neue">
                  Our system uses <span className="text-white font-bold">Pedersen commitments</span> to hide transaction amounts while maintaining mathematical verifiability. Each commitment (vG + rH) <span className="text-white font-bold">cryptographically binds to a value without revealing it.</span>
                </p>
              </div>
              <div>
                <h3 className="text-[#FFE500] text-xl font-bold mb-4 uppercase tracking-wider">ZERO-KNOWLEDGE PROOFS</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-neue">
                  zk-SNARKs generate compact proofs that verify transaction validity without exposing any sensitive information. Prove you have funds, prove amounts balance, and keep everything private.
                </p>
              </div>
            </div>

            <div className="bg-[#111] border border-[#333] rounded-xl p-6 font-mono text-xs md:text-sm text-gray-400 overflow-x-auto">
              <div className="text-[#FFE500] mb-2">// Pedersen Commitment</div>
              <div className="mb-4">commitment = v * G + r * H</div>
              
              <div className="text-[#FFE500] mb-2">// Zero-Knowledge Proof</div>
              <div className="mb-1">proof = zk_prove( statement: "I know v, r such that C = vG + rH",</div>
              <div className="mb-4">witness: {'{ v, r }'}, public: {'{ C }'} )</div>

              <div className="text-[#FFE500] mb-2">// Nullifier Generation</div>
              <div>nullifier = hash( private_key, commitment )</div>
            </div>
          </div>

        </div>
      </section>

      {/* Trustware Section */}
      <section className="relative z-10 py-32 px-8 md:px-20 bg-black border-t border-[#FFE500]/10 pb-40">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-neue font-bold text-white uppercase tracking-tight mb-6">
            <span className="text-[#FFE500]">FLUXAL</span> IS TRUSTWARE
          </h2>
          <p className="text-gray-300 font-neue text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            The transition from analog to digital trust is underway. Learn how FLUXAL powers the core privacy infrastructure for the world.
          </p>
        </div>

        <div className="max-w-4xl mx-auto border border-[#FFE500]/20 bg-[#FFE500]/5 rounded-3xl p-8 md:p-16 space-y-12">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Privacy's broadband moment</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-neue">
              We're engineering a secure, private, and backward-compatible unified ZK layer for everything from money and identity to markets, coordination, and creativity—tools that scale from individuals to institutions without sacrificing user sovereignty.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-xl mb-4">Token-agnostic by design – built to run across chains & providers</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-neue mb-6">
              The <span className="text-[#FFE500]">$FLUXAL Protocol</span> is token-native: you deposit the assets you already hold - no synthetic pegs, no IOUs—directly into the privacy layer. One model, familiar UX, same guarantees.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed font-neue">
              The same cryptographic core ports cleanly via modular adapters, preserving UX and assurances across Ethereum, Bitcoin, Polygon, Solana, and beyond the crypto stack - think AMEX, VISA, or even your local bank. The math is provider-agnostic by design.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
