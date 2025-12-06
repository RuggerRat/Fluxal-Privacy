import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import FluxalCursor from "@/components/FluxalCursor";
import gridBg from "@assets/generated_images/fluxal_zoomed_grid_background.png";

export default function Terminal() {
  const [, setLocation] = useLocation();
  const [lines, setLines] = useState<string[]>([
    "CONNECTING TO FLUXAL NETWORK...",
    "ESTABLISHING SECURE HANDSHAKE...",
    "VERIFYING CRYPTOGRAPHIC KEYS...",
    "ACCESS GRANTED."
  ]);

  useEffect(() => {
    // Simulation of terminal output
    let delay = 500;
    const timeouts: NodeJS.Timeout[] = [];

    const addLine = (text: string, time: number) => {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, text]);
      }, time);
      timeouts.push(timeout);
    };

    // Add some dummy logs
    addLine("LOADING MODULES: [====================] 100%", 800);
    addLine("INITIALIZING PRIVACY SHIELD...", 1200);
    addLine("NODE SYNC: SOL-MAIN-04 [OK]", 1600);
    addLine("READY.", 2000);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#FFE500] font-mono overflow-hidden relative p-8">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{ 
          backgroundImage: `url(${gridBg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }} 
      />
      
      <FluxalCursor />

      <div className="relative z-10 max-w-4xl mx-auto mt-20 border border-[#FFE500]/30 bg-black/80 p-6 min-h-[600px] shadow-[0_0_50px_rgba(255,229,0,0.1)] backdrop-blur-sm">
        <div className="flex justify-between items-center border-b border-[#FFE500]/30 pb-4 mb-4">
            <h2 className="text-xl font-bold tracking-widest">FLUXAL TERMINAL v1.0</h2>
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFE500]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FF8C00]"></div>
            </div>
        </div>
        
        <div className="space-y-2">
            {lines.map((line, i) => (
                <div key={i} className="opacity-0 animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-forwards" style={{ animationDelay: `${i * 100}ms` }}>
                    <span className="text-[#FF8C00] mr-2">{">"}</span>
                    {line}
                </div>
            ))}
            <div className="animate-pulse">
                <span className="text-[#FF8C00] mr-2">{">"}</span>
                <span className="bg-[#FFE500] text-black px-1">_</span>
            </div>
        </div>
      </div>

      <button 
        onClick={() => setLocation("/")}
        className="absolute top-8 right-8 text-[#FF8C00] hover:text-[#FFE500] border border-[#FF8C00] hover:border-[#FFE500] px-4 py-2 transition-colors uppercase text-xs tracking-widest z-50"
      >
        Exit Terminal
      </button>
    </div>
  );
}
