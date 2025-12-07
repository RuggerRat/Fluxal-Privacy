import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { usePrivy } from "@privy-io/react-auth";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Home, WifiOff, Activity, MessageSquare, Eye, EyeOff, Bug, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import fluxalTitle from "@assets/Untitled_design__62_-removebg-preview_1765006354328.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for initial state or fallback
const INITIAL_SOL_PRICE = 132.67;

export default function Dashboard() {
  const [_, setLocation] = useLocation();
  const { user, authenticated, logout } = usePrivy();
  const [balance, setBalance] = useState<number>(0);
  const [solPrice, setSolPrice] = useState<number>(INITIAL_SOL_PRICE);
  const [solChange, setSolChange] = useState<number>(-0.97);
  const [hideBalance, setHideBalance] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const wallet = user?.wallet;
  const address = wallet?.address || "";
  const shortAddress = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "Not Connected";

  useEffect(() => {
    if (!authenticated) {
        // Optional: Redirect to connect if not authenticated
        // setLocation("/connect"); 
    }
  }, [authenticated, setLocation]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true");
        const data = await response.json();
        if (data.solana) {
            setSolPrice(data.solana.usd);
            setSolChange(data.solana.usd_24h_change);
        }
      } catch (e) {
        console.warn("Failed to fetch price, using fallback", e);
      }
    };

    const fetchBalance = async () => {
      if (address) {
        try {
            // Using a public RPC endpoint
            const connection = new Connection("https://api.mainnet-beta.solana.com"); 
            const pubKey = new PublicKey(address);
            const bal = await connection.getBalance(pubKey);
            setBalance(bal / LAMPORTS_PER_SOL);
        } catch (e) {
            console.error("Failed to fetch balance", e);
        }
      }
    };

    fetchPrice();
    fetchBalance();
    
    const interval = setInterval(() => {
        fetchPrice();
        fetchBalance();
    }, 30000); 
    
    return () => clearInterval(interval);
  }, [address]);

  const solValue = balance * solPrice;
  const usdcBalance = 0; // Mock for now
  const usdcValue = usdcBalance * 1; // USDC is stable
  const totalValue = solValue + usdcValue;

  const formattedTotalValue = totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-neue tracking-wide ${
        activeTab === id 
          ? "bg-[#FFE500]/10 text-[#FFE500] border border-[#FFE500]/20" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-neue flex overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black flex flex-col p-6 z-20">
        <div className="mb-10 pl-2">
             <img src={fluxalTitle} alt="FLUXAL" className="h-12 w-auto object-contain opacity-90" />
        </div>

        <nav className="space-y-2 flex-1">
            <SidebarItem id="dashboard" icon={Home} label="Dashboard" />
            <SidebarItem id="offline" icon={WifiOff} label="Offline Cash" />
            <SidebarItem id="activity" icon={Activity} label="Activity" />
            <SidebarItem id="feedback" icon={MessageSquare} label="Feedback" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
         {/* Top Bar */}
         <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
            <div>
                 {/* Empty left side or breadcrumbs */}
            </div>
            <div className="flex items-center gap-4">
                 <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFE500] animate-pulse" />
                    {shortAddress}
                 </div>
                 {authenticated && (
                     <Button 
                        onClick={logout}
                        variant="ghost" 
                        className="text-xs text-gray-500 hover:text-white h-8"
                     >
                        Disconnect
                     </Button>
                 )}
            </div>
         </header>

         {/* Content Area */}
         <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

                {/* Balance Card */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 mb-12 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFE500]/50 to-transparent opacity-50" />
                    
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm text-gray-400 font-mono tracking-wider">Balance USD</h2>
                        <button 
                            onClick={() => setHideBalance(!hideBalance)}
                            className="text-gray-500 hover:text-white transition-colors"
                        >
                            {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="mb-6">
                        <span className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            {hideBalance ? "••••••" : formattedTotalValue}
                        </span>
                    </div>

                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFE500]/50 w-1/3 rounded-full" /> 
                    </div>
                </div>

                {/* Assets Section */}
                <div>
                    <h3 className="text-lg font-bold mb-6">Assets</h3>
                    
                    <div className="w-full">
                        {/* Table Header */}
                        <div className="grid grid-cols-5 gap-4 text-xs font-mono text-gray-500 uppercase tracking-wider mb-4 px-4">
                            <div className="col-span-2">Name</div>
                            <div className="text-right">Price</div>
                            <div className="text-right">Amount</div>
                            <div className="text-right">Value</div>
                            {/* <div className="text-right">24hr %</div> */}
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-white/5 mb-4" />

                        {/* Asset Row: Wrapped SOL */}
                        <div className="group grid grid-cols-5 gap-4 items-center px-4 py-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                            <div className="col-span-2 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                                    <img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" alt="SOL" className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm">Wrapped SOL</div>
                                    <div className="text-xs text-gray-500">SOL</div>
                                </div>
                            </div>
                            <div className="text-right font-mono text-sm text-gray-300">
                                ${solPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-right font-mono text-sm text-gray-300">
                                {hideBalance ? "•••" : balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                            </div>
                            <div className="text-right font-mono text-sm text-white font-bold">
                                {hideBalance ? "••••" : solValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </div>
                        </div>

                         {/* Asset Row: USDC */}
                         <div className="group grid grid-cols-5 gap-4 items-center px-4 py-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5 mt-2">
                            <div className="col-span-2 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                                     <div className="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-[8px] font-bold text-white">
                                        $
                                     </div>
                                </div>
                                <div>
                                    <div className="font-bold text-sm">USDC</div>
                                    <div className="text-xs text-gray-500">USDC</div>
                                </div>
                            </div>
                            <div className="text-right font-mono text-sm text-gray-300">
                                $1.00
                            </div>
                            <div className="text-right font-mono text-sm text-gray-300">
                                {hideBalance ? "•••" : usdcBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-right font-mono text-sm text-white font-bold">
                                {hideBalance ? "••••" : usdcValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
         </div>

         {/* Bug Report Fab */}
         <div className="absolute bottom-8 right-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-[#1e1e1e] border border-white/10 text-xs text-gray-400 hover:text-white hover:border-[#FFE500]/50 gap-2 pl-3 pr-4 h-10">
                    <Bug className="w-3 h-3" />
                    Report a Bug
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1e1e24] border-white/10 text-white sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold font-neue">Report a Bug</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-gray-300 font-neue">Name</Label>
                    <Input id="name" placeholder="Your Name" className="bg-[#2b2b30] border-white/10 text-white placeholder:text-gray-500" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-300 font-neue">Email</Label>
                    <Input id="email" placeholder="your.email@example.org" className="bg-[#2b2b30] border-white/10 text-white placeholder:text-gray-500" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-gray-300 font-neue">Description (required)</Label>
                    <Textarea id="description" placeholder="What's the bug? What did you expect?" className="bg-[#2b2b30] border-white/10 text-white placeholder:text-gray-500 min-h-[100px]" />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white">
                    Add a screenshot
                  </Button>
                </div>
                <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
                  <Button className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold">
                    Send Bug Report
                  </Button>
                  <DialogClose asChild>
                     <Button variant="ghost" className="w-full text-gray-400 hover:text-white hover:bg-transparent">
                        Cancel
                     </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
         </div>

      </main>
    </div>
  );
}