import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { usePrivy } from "@privy-io/react-auth";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Home, WifiOff, Activity, MessageSquare, Eye, EyeOff, Bug, Send, Download, FolderOpen, File, CheckCircle2, AlertTriangle, ShieldCheck, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import fluxalTitle from "@assets/Untitled_design__62_-removebg-preview_1765006354328.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const renderContent = () => {
      switch (activeTab) {
        case "offline":
          return (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex justify-between items-center mb-6">
                 <h1 className="text-2xl font-bold">Offline Cash</h1>
                 <div className="flex gap-4">
                     <div className="px-4 py-2 rounded-full border border-white/10 bg-[#111] text-xs text-gray-400 font-mono flex items-center gap-2">
                        Keep some SOL in this wallet to deposit.
                        <AlertTriangle className="w-3 h-3 text-gray-500" />
                     </div>
                     <Dialog>
                        <DialogTrigger asChild>
                             <Button variant="outline" className="border-white/10 bg-[#111] text-white hover:bg-white/5 hover:text-[#FFE500] gap-2 h-9 text-xs uppercase tracking-wider font-bold">
                                <Send className="w-3 h-3" /> Deposit
                             </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black border border-white/10 text-white sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-bold font-neue">Deposit USDC</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="amount" className="text-gray-300 font-mono text-xs">Amount (USDC)</Label>
                                <Input id="amount" placeholder="0.00" className="bg-[#111] border-white/10 text-white placeholder:text-gray-600 focus:border-[#FFE500]/50 focus:ring-[#FFE500]/20 font-mono" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="recipient" className="text-gray-300 font-mono text-xs">Recipient wallet (optional)</Label>
                                <Input id="recipient" placeholder={address} className="bg-[#111] border-white/10 text-gray-400 placeholder:text-gray-600 focus:border-[#FFE500]/50 focus:ring-[#FFE500]/20 font-mono text-xs" />
                                <p className="text-[10px] text-gray-500 font-mono">
                                    Leave empty to bind the voucher to your connected wallet ({shortAddress}).
                                </p>
                              </div>
                            </div>
                            <DialogFooter className="flex gap-2 sm:justify-between">
                              <DialogClose asChild>
                                 <Button variant="outline" className="flex-1 border-[#FFE500]/30 text-white hover:bg-[#FFE500]/10 hover:text-[#FFE500] rounded-full">
                                    Cancel
                                 </Button>
                              </DialogClose>
                              <Button className="flex-1 bg-[#111] text-gray-500 font-bold border border-white/10 hover:bg-white/5 hover:text-white rounded-full">
                                Confirm deposit
                              </Button>
                            </DialogFooter>
                        </DialogContent>
                     </Dialog>

                     <Dialog>
                        <DialogTrigger asChild>
                             <Button variant="outline" className="border-white/10 bg-[#111] text-white hover:bg-white/5 hover:text-[#FFE500] gap-2 h-9 text-xs uppercase tracking-wider font-bold">
                                <Download className="w-3 h-3" /> Withdraw
                             </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black border border-white/10 text-white sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-bold font-neue">Withdraw USDC</DialogTitle>
                            </DialogHeader>
                            
                            <div className="py-4 space-y-4">
                                <Button variant="outline" className="w-full border-[#FFE500]/30 text-[#FFE500] hover:bg-[#FFE500]/10 rounded-full font-mono text-xs">
                                    Select voucher file
                                </Button>

                                <div className="space-y-2">
                                    <Label className="text-gray-300 font-mono text-xs">Voucher ID (hex, 32 bytes)</Label>
                                    <Input placeholder="0x..." className="bg-[#111] border-white/10 text-white placeholder:text-gray-600 focus:border-[#FFE500]/50 focus:ring-[#FFE500]/20 font-mono text-xs" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-300 font-mono text-xs">Secret (hex, 32 bytes)</Label>
                                    <Input placeholder="0x..." className="bg-[#111] border-white/10 text-white placeholder:text-gray-600 focus:border-[#FFE500]/50 focus:ring-[#FFE500]/20 font-mono text-xs" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-300 font-mono text-xs">Salt (hex, 32 bytes)</Label>
                                    <Input placeholder="0x..." className="bg-[#111] border-white/10 text-white placeholder:text-gray-600 focus:border-[#FFE500]/50 focus:ring-[#FFE500]/20 font-mono text-xs" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-300 font-mono text-xs">Recipient wallet (base58)</Label>
                                    <Input placeholder="Recipient Solana address" className="bg-[#111] border-white/10 text-white placeholder:text-gray-600 focus:border-[#FFE500]/50 focus:ring-[#FFE500]/20 font-mono text-xs" />
                                </div>

                                <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
                                    The voucher file contains voucherId, secret, salt, and the recipient. Load them from a voucher file above or paste them manually to redeem the deposit.
                                </p>
                            </div>

                            <DialogFooter className="flex gap-2 sm:justify-between">
                              <DialogClose asChild>
                                 <Button variant="outline" className="flex-1 border-[#FFE500]/30 text-white hover:bg-[#FFE500]/10 hover:text-[#FFE500] rounded-full">
                                    Cancel
                                 </Button>
                              </DialogClose>
                              <Button className="flex-1 bg-[#111] text-gray-500 font-bold border border-white/10 hover:bg-white/5 hover:text-white rounded-full">
                                Confirm withdraw
                              </Button>
                            </DialogFooter>
                        </DialogContent>
                     </Dialog>
                 </div>
              </div>

              {/* Warning Banner */}
              <div className="border border-[#FFE500]/50 bg-[#FFE500]/5 rounded-xl p-4 flex items-start gap-3">
                 <AlertTriangle className="w-5 h-5 text-[#FFE500] mt-0.5 shrink-0" />
                 <div>
                    <h3 className="text-[#FFE500] font-bold text-xs uppercase tracking-widest mb-1">Early Demo - Use With Caution</h3>
                    <p className="text-[#FFE500]/80 text-xs font-mono leading-relaxed">
                        Offline Cash is an early, partial implementation intended for demonstration and testing only. Use at your own risk and only deposit small amounts you are fully prepared to lose.
                    </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Balance Card */}
                 <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                    <h3 className="text-gray-400 font-mono text-xs mb-4">Offline balance USD</h3>
                    <div className="text-4xl font-bold text-white mb-2">$0.00</div>
                    <p className="text-gray-500 text-xs">Available for offline transactions</p>
                 </div>

                 {/* Security Status */}
                 <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                    <h3 className="text-gray-400 font-mono text-xs mb-4">Security status</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-5 h-5 text-[#FFE500]" />
                        <span className="text-white font-bold">Secure</span>
                    </div>
                    <p className="text-gray-500 text-xs mb-4">All proofs verified</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-[#FFE500]/10 text-[#FFE500] text-[10px] font-bold border border-[#FFE500]/20 uppercase tracking-wider">
                        128-bit Security
                    </div>
                 </div>
              </div>

              {/* Private Assets */}
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <h3 className="text-sm font-bold text-white">Private assets</h3>
                    <div className="flex gap-4">
                        <Button variant="outline" className="border-[#FFE500]/30 bg-[#FFE500]/5 text-[#FFE500] hover:bg-[#FFE500]/10 gap-2 h-8 text-[10px] uppercase tracking-wider font-bold rounded-full">
                            <FolderOpen className="w-3 h-3" /> Locate assets
                        </Button>
                        <Button variant="ghost" className="text-gray-400 hover:text-white h-8 text-[10px] uppercase tracking-wider font-bold">
                            Choose files
                        </Button>
                        <Button variant="ghost" className="text-gray-400 hover:text-white h-8 text-[10px] uppercase tracking-wider font-bold">
                            Clear assets
                        </Button>
                    </div>
                 </div>

                 <div className="border border-white/5 border-dashed rounded-xl bg-[#0F0F0F] h-24 flex items-center justify-center">
                    <p className="text-gray-600 text-xs font-mono">Select a folder that contains voucher files to see them displayed here.</p>
                 </div>
              </div>
              
              <div className="border border-white/5 rounded-xl p-4 bg-[#0F0F0F] flex items-start gap-3">
                 <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-gray-600 font-mono">i</div>
                 <p className="text-gray-500 text-xs font-mono leading-relaxed">
                    Once you successfully withdraw funds from a voucher, move or archive that JSON file so the list stays tidy.
                    Wallet errors such as Transaction failed simulation or Account already exists almost always mean the voucher was already redeemed.
                 </p>
              </div>

              <div className="text-gray-500 text-xs font-mono">
                Current FLUX price: ${solPrice.toLocaleString(undefined, { minimumFractionDigits: 6 })}
              </div>
            </div>
          );
        
        case "activity":
            // Mock Activity Data
            const activities = [
                { type: "Sent", amount: "-1.244015635 SOL", subAmount: "951Ed...pwoa", status: "Finalized", timestamp: "Dec 04, 01:41 PM", signature: "45WxbJo15q..." },
                { type: "Received", amount: "+0.025874295 SOL", subAmount: "PL4dM...2aeq", status: "Finalized", timestamp: "Dec 04, 01:40 PM", signature: "2skgU3NY7z..." },
                { type: "Sent", amount: "-0.00203928 SOL", subAmount: "DKvs5...dwot", status: "Finalized", timestamp: "Dec 04, 01:40 PM", signature: "2skgU3NY7z..." },
                { type: "Received", amount: "+0.00001 SOL", subAmount: "95HCw...3qyp", status: "Finalized", timestamp: "Dec 04, 01:36 PM", signature: "2w2w73HDuL..." },
                { type: "Sent", amount: "-2.315 SOL", subAmount: "95HCw...3qyp", status: "Finalized", timestamp: "Dec 04, 01:36 PM", signature: "3E0kfn3ZSo..." },
                { type: "Received", amount: "+0.632990292 SOL", subAmount: "PL4dM...2aeq", status: "Finalized", timestamp: "Dec 04, 01:34 PM", signature: "5pejHwMKot..." },
                { type: "Sent", amount: "-0.00203928 SOL", subAmount: "9uh15...qrRC", status: "Finalized", timestamp: "Dec 04, 01:34 PM", signature: "5pejHwMKot..." },
                { type: "Sent", amount: "-0.027795218 SOL", subAmount: "AVUCZ...cnZH", status: "Finalized", timestamp: "Dec 04, 01:33 PM", signature: "48pMW5qL6c..." },
                { type: "Sent", amount: "-34199203.154141 SpectreOSI", subAmount: "FahQ6...drVi", status: "Finalized", timestamp: "Dec 04, 01:33 PM", signature: "48pMW5qL6c..." },
                { type: "Received", amount: "+1e-7 SOL", subAmount: "HLSMe...hi2F", status: "Finalized", timestamp: "Dec 04, 01:28 PM", signature: "29pfg1XFwm..." },
            ];

            return (
                <div className="max-w-7xl mx-auto h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Activity</h1>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                         <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input placeholder="Search activity" className="pl-10 bg-[#111] border-white/10 text-white placeholder:text-gray-600 focus:border-[#FFE500]/50 h-10 rounded-lg text-xs font-mono" />
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 font-mono">Rows per page</span>
                            <Select defaultValue="10">
                                <SelectTrigger className="w-[70px] h-8 bg-[#111] border-white/10 text-xs rounded-lg">
                                    <SelectValue placeholder="10" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#111] border-white/10 text-white">
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                    </div>

                    <div className="rounded-xl overflow-hidden bg-transparent">
                        <Table>
                            <TableHeader className="bg-transparent border-b border-white/5">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="text-gray-400 font-mono text-xs font-bold uppercase w-[200px] pl-4">Type</TableHead>
                                    <TableHead className="text-gray-400 font-mono text-xs font-bold uppercase w-[250px]">Amount</TableHead>
                                    <TableHead className="text-gray-400 font-mono text-xs font-bold uppercase">Status</TableHead>
                                    <TableHead className="text-gray-400 font-mono text-xs font-bold uppercase">Timestamp</TableHead>
                                    <TableHead className="text-gray-400 font-mono text-xs font-bold uppercase text-right pr-4">Signature</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activities.map((item, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-white/5 h-20">
                                        <TableCell className="font-mono text-xs pl-4 font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                                                    {item.type === "Sent" ? 
                                                        <Send className="w-3.5 h-3.5 text-white -rotate-45 mr-0.5 mt-0.5" /> : 
                                                        <Download className="w-3.5 h-3.5 text-white" />
                                                    }
                                                </div>
                                                <span className="text-white font-bold">{item.type}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1.5">
                                                <span className={`font-mono text-xs font-bold tracking-wide ${item.amount.startsWith("+") ? "text-[#4ADE80]" : "text-[#F87171]"}`}>
                                                    {item.amount}
                                                </span>
                                                <span className="font-mono text-[10px] text-gray-400 font-medium">
                                                    {item.subAmount}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/30 text-[#4ADE80] text-[10px] font-bold uppercase tracking-wider">
                                                <CheckCircle2 className="w-3 h-3" /> {item.status}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-gray-300 font-bold tracking-wide">{item.timestamp}</TableCell>
                                        <TableCell className="font-mono text-xs text-gray-500 text-right pr-4 font-medium">
                                            <div className="flex items-center justify-end gap-2 group cursor-pointer hover:text-white transition-colors">
                                                {item.signature} 
                                                <div className="w-4 h-4 flex items-center justify-center">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100">
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                        <polyline points="15 3 21 3 21 9"></polyline>
                                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                                    </svg>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex justify-between items-center mt-6 text-xs text-gray-500 font-mono">
                        <div>Showing 1-10 of 13</div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-white/10 bg-[#111] hover:bg-white/5 text-gray-400" disabled>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                             <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-white/10 bg-[#111] hover:bg-white/5 text-gray-400">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            );

        case "feedback":
            return (
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-8">Feedback</h1>
                    
                    <div className="bg-[#111] border border-white/5 rounded-xl p-8 md:p-12 max-w-2xl mx-auto">
                         <h2 className="text-lg font-mono text-gray-400 mb-8">Web wallet demo feedback</h2>

                         <div className="space-y-6">
                            <div className="space-y-2">
                                <Input placeholder="How should we address you?" className="bg-[#0F0F0F] border-white/10 text-white placeholder:text-gray-600 focus:border-[#FFE500]/50 h-12" />
                            </div>

                            <div className="space-y-2">
                                <Textarea placeholder="Tell us what's working well, what's confusing, or what you'd like to see next." className="bg-[#0F0F0F] border-white/10 text-white placeholder:text-gray-600 focus:border-[#FFE500]/50 min-h-[160px] resize-none p-4" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs text-gray-500 font-mono">Wallet address</Label>
                                <div className="px-4 py-3 bg-[#0F0F0F] border border-white/10 rounded-md text-xs font-mono text-gray-400">
                                    {address || "Not connected"}
                                </div>
                            </div>

                            <Button 
                                onClick={() => {
                                    /* In a real app, submit logic here */
                                }}
                                className="w-full bg-[#FFE500] hover:bg-[#FF8C00] text-black font-bold h-12 uppercase tracking-widest text-xs border-none mt-4"
                            >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <span className="w-full h-full flex items-center justify-center">Submit feedback</span>
                                    </DialogTrigger>
                                    <DialogContent className="bg-black border border-[#FFE500]/30 text-white sm:max-w-[425px]">
                                        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                                            <div className="w-16 h-16 rounded-full bg-[#FFE500]/10 flex items-center justify-center mb-2">
                                                <CheckCircle2 className="w-8 h-8 text-[#FFE500]" />
                                            </div>
                                            <h2 className="text-xl font-bold font-neue text-white uppercase tracking-wide">Thank You</h2>
                                            <p className="text-gray-400 font-mono text-sm max-w-xs">
                                                Your feedback helps us build a better private economy.
                                            </p>
                                            <DialogClose asChild>
                                                <Button className="mt-4 bg-[#FFE500] text-black hover:bg-[#FF8C00] rounded-full px-8 font-bold uppercase tracking-wider text-xs">
                                                    Close
                                                </Button>
                                            </DialogClose>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </Button>
                         </div>
                    </div>
                </div>
            );

        default:
          return (
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
          );
      }
  };

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
      <main className="flex-1 flex flex-col relative overflow-hidden antialiased">
         {/* Top Bar */}
         <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
            <div>
                 {/* Empty left side or breadcrumbs */}
            </div>
            <div className="flex items-center gap-4">
                 <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300 flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${authenticated ? "bg-[#FFE500] animate-pulse" : "bg-red-500"}`} />
                    {authenticated ? shortAddress : "Not Connected"}
                 </div>
                 {authenticated ? (
                     <Button 
                        onClick={logout}
                        variant="ghost" 
                        className="text-xs text-gray-500 hover:text-white h-8"
                     >
                        Disconnect
                     </Button>
                 ) : (
                     <Button 
                        onClick={() => setLocation("/connect")}
                        variant="ghost" 
                        className="text-xs text-[#FFE500] hover:text-[#FFDD00] h-8"
                     >
                        Connect
                     </Button>
                 )}
            </div>
         </header>

         {/* Content Area */}
         <div className="flex-1 overflow-y-auto p-8">
            {renderContent()}
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
              <DialogContent className="bg-black border border-white/10 text-white sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold font-neue">Report a Bug</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-gray-300 font-neue">Name</Label>
                    <Input id="name" placeholder="Your Name" className="bg-[#111] border-white/10 text-white placeholder:text-gray-600 focus:border-[#FFE500]/50 focus:ring-[#FFE500]/20" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-300 font-neue">Email</Label>
                    <Input id="email" placeholder="your.email@example.org" className="bg-[#111] border-white/10 text-white placeholder:text-gray-600 focus:border-[#FFE500]/50 focus:ring-[#FFE500]/20" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-gray-300 font-neue">Description (required)</Label>
                    <Textarea id="description" placeholder="What's the bug? What did you expect?" className="bg-[#111] border-white/10 text-white placeholder:text-gray-600 min-h-[100px] focus:border-[#FFE500]/50 focus:ring-[#FFE500]/20" />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent border-white/10 text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/20">
                    Add a screenshot
                  </Button>
                </div>
                <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
                  <Button className="w-full bg-[#FFE500] hover:bg-[#FF8C00] text-black font-bold border-none">
                    Send Bug Report
                  </Button>
                  <DialogClose asChild>
                     <Button variant="ghost" className="w-full text-gray-500 hover:text-white hover:bg-transparent">
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