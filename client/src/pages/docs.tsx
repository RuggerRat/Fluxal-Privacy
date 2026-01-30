import FluxalCursor from "@/components/FluxalCursor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, ShieldCheck, Layers, Wallet, Cpu, BadgeDollarSign, Zap, Network } from "lucide-react";
import { useLocation } from "wouter";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "principles", label: "Principles" },
  { id: "how-it-works", label: "How it works" },
  { id: "assets", label: "Supported assets" },
  { id: "flux", label: "$FLUX utility" },
  { id: "transfers", label: "Private transfers" },
  { id: "offline", label: "Offline cash" },
  { id: "security", label: "Security model" },
  { id: "network", label: "Network & infra" },
  { id: "faq", label: "FAQ" },
];

function SectionTitle({ children, id }: { children: string; id: string }) {
  return (
    <div className="scroll-mt-28" id={id} data-testid={`section-${id}`}>
      <h2 className="text-2xl md:text-3xl font-neue font-black uppercase tracking-wide text-white">
        {children}
      </h2>
      <div className="mt-3 h-px w-full bg-gradient-to-r from-[#FFE500]/50 via-white/10 to-transparent" />
    </div>
  );
}

function Bullet({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5" data-testid={`card-doc-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <p className="text-xs font-neue font-black tracking-widest uppercase text-white" data-testid={`text-doc-title-${title.toLowerCase().replace(/\s+/g, "-")}`}>
        {title}
      </p>
      <p className="mt-2 text-sm md:text-base text-gray-300 leading-relaxed font-neue" data-testid={`text-doc-body-${title.toLowerCase().replace(/\s+/g, "-")}`}>
        {body}
      </p>
    </div>
  );
}

export default function Docs() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-[#FFE500] selection:text-black">
      <FluxalCursor />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(255,229,0,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,140,0,0.10),transparent_55%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,229,0,0.03),transparent)]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-[#FFE500]/25 bg-black/55 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              data-testid="button-back"
              variant="outline"
              onClick={() => setLocation("/landing")}
              className="rounded-full border-white/15 text-white hover:bg-white hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-neue" data-testid="text-docs-kicker">Documentation</p>
              <h1 className="text-lg md:text-xl font-neue font-black uppercase tracking-wider text-white" data-testid="text-docs-title">
                FLUXAL Docs
              </h1>
            </div>
          </div>

          <a
            data-testid="link-docs-x"
            href="https://x.com/FluxalAI"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-neue font-black uppercase tracking-widest text-[#FFE500] hover:text-white transition-colors"
          >
            X / FluxalAI
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-4">
          <div className="flex gap-2 flex-wrap">
            {sections.map((s) => (
              <a
                key={s.id}
                data-testid={`link-toc-${s.id}`}
                href={`#${s.id}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-300 hover:text-black hover:bg-[#FFE500] hover:border-[#FFE500] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 md:p-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="max-w-3xl">
                <p className="text-[11px] uppercase tracking-[0.28em] text-gray-400 font-neue" data-testid="text-hero-kicker">
                  Zero-knowledge privacy layer for Solana
                </p>
                <h2 className="mt-2 text-3xl md:text-5xl font-neue font-black uppercase tracking-tight leading-[0.95]" data-testid="text-hero-heading">
                  A protocol for private, portable digital cash
                </h2>
                <p className="mt-4 text-sm md:text-base text-gray-300 leading-relaxed font-neue" data-testid="text-hero-subtitle">
                  FLUXAL turns supported Solana assets into shielded balances you can transfer privately and use in offline, peer-to-peer flows—while maintaining verifiable correctness enforced by cryptography.
                </p>
              </div>

              <div className="w-full md:w-auto">
                <div className="rounded-2xl border border-[#FFE500]/25 bg-[#FFE500]/5 p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#FFE500] text-black grid place-items-center">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-neue" data-testid="text-quickstart-kicker">Quick start</p>
                      <p className="text-sm font-neue font-black uppercase tracking-wider" data-testid="text-quickstart-title">Try the dashboard</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2">
                    <Button
                      data-testid="button-open-dashboard"
                      onClick={() => setLocation("/connect")}
                      className="rounded-full bg-[#FFE500] text-black hover:bg-[#FF8C00] uppercase tracking-widest font-neue font-black"
                    >
                      Open Dashboard
                    </Button>
                    <Button
                      data-testid="button-open-landing"
                      variant="outline"
                      onClick={() => setLocation("/landing")}
                      className="rounded-full border-white/15 text-white hover:bg-white hover:text-black uppercase tracking-widest font-neue font-black"
                    >
                      Back to Landing
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-[#FFE500]" />
                  <p className="text-xs font-neue font-black uppercase tracking-widest" data-testid="text-pill-1">Shielded balances</p>
                </div>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed font-neue" data-testid="text-pill-1-body">
                  Deposit supported assets into the privacy layer and operate with a private balance abstraction.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-[#FFE500]" />
                  <p className="text-xs font-neue font-black uppercase tracking-widest" data-testid="text-pill-2">Wallet-friendly UX</p>
                </div>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed font-neue" data-testid="text-pill-2-body">
                  Keep flows familiar: connect a Solana wallet, view balances, and initiate actions through a clean dashboard.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-[#FFE500]" />
                  <p className="text-xs font-neue font-black uppercase tracking-widest" data-testid="text-pill-3">Proof-powered privacy</p>
                </div>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed font-neue" data-testid="text-pill-3-body">
                  Privacy features are backed by verifiable computation, with heavy proving work performed off-chain.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 space-y-10">
          <section className="space-y-6">
            <SectionTitle id="overview">Overview</SectionTitle>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-neue" data-testid="text-overview">
              FLUXAL is a zero-knowledge privacy layer for Solana designed to make on-chain assets behave like cash: private, portable, and usable in peer-to-peer contexts.
              The system is built around a unified pool model where users can move from public balances into shielded balances, then transact without revealing sensitive metadata.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Bullet title="What FLUXAL is" body="A privacy layer that enables shielded balances and private transfers for supported Solana assets, with cryptographic correctness." />
              <Bullet title="What FLUXAL is not" body="Not a custodial wallet, not a centralized mixer UI, and not a promise of anonymity against every adversary in every context." />
            </div>
          </section>

          <section className="space-y-6">
            <SectionTitle id="principles">Principles</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Bullet title="Privacy by default" body="Transfers are designed to conceal value and linkability while keeping the system verifiable." />
              <Bullet title="Familiar UX" body="Users deposit assets they already hold and interact through simple actions: deposit, send, withdraw." />
              <Bullet title="Cryptographic enforcement" body="Correctness is enforced by cryptography rather than policy—balances remain consistent without revealing private state." />
              <Bullet title="Solana-first" body="Solana verifies proofs on-chain while heavy computation is performed off-chain, keeping execution practical." />
            </div>
          </section>

          <section className="space-y-6">
            <SectionTitle id="how-it-works">How it works</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Bullet title="Deposit" body="Move supported assets from a public wallet balance into a shielded balance in the privacy layer." />
              <Bullet title="Transact" body="Create privacy-preserving transfers between shielded balances without exposing value or linkability." />
              <Bullet title="Withdraw" body="Exit the privacy layer back to a standard wallet address when you need public on-chain liquidity." />
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-6">
              <p className="text-xs font-neue font-black uppercase tracking-widest text-gray-400" data-testid="text-how-note-title">Design note</p>
              <p className="mt-2 text-sm md:text-base text-gray-300 leading-relaxed font-neue" data-testid="text-how-note-body">
                The protocol uses proof verification on Solana programs, while the largest computational work happens off-chain. This keeps on-chain execution efficient while maintaining verifiable privacy guarantees.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <SectionTitle id="assets">Supported assets</SectionTitle>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-neue" data-testid="text-assets">
              FLUXAL is designed to support major Solana assets (e.g., SOL and stablecoins) and extend coverage over time.
              Asset support is governed by protocol rules and security constraints that preserve correctness and prevent unsafe edge cases.
            </p>
          </section>

          <section className="space-y-6">
            <SectionTitle id="flux">$FLUX utility</SectionTitle>
            <div className="rounded-2xl border border-[#FFE500]/25 bg-[#FFE500]/5 p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#FFE500] text-black grid place-items-center">
                  <BadgeDollarSign className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-neue" data-testid="text-flux-kicker">The utility token</p>
                  <p className="text-base md:text-lg font-neue font-black uppercase tracking-wider" data-testid="text-flux-title">$FLUX powers privacy computation</p>
                </div>
              </div>

              <p className="mt-4 text-sm md:text-base text-gray-300 leading-relaxed font-neue" data-testid="text-flux-intro">
                <span className="text-[#FFE500]">$FLUX</span> is used by the protocol to pay for privacy-related computation and infrastructure on Solana.
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Bullet title="Protocol Fees" body="Certain privacy-preserving actions require payment in $FLUX, covering proof generation, verification, and relayer services." />
                <Bullet title="Resource Metering" body="$FLUX is used to rate-limit and meter access to privacy features, preventing abuse and aligning usage with computational cost." />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <SectionTitle id="transfers">Private transfers</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Bullet title="Privacy-preserving transfers" body="The protocol enables private transfers for supported Solana assets." />
              <Bullet title="Hidden amounts" body="Transaction values are concealed using cryptographic commitments." />
              <Bullet title="Verifiable state transitions" body="Zero-knowledge proofs ensure balances remain correct without revealing private data." />
              <Bullet title="Solana execution model" body="Proofs are verified by Solana programs, with heavy computation performed off-chain." />
            </div>
          </section>

          <section className="space-y-6">
            <SectionTitle id="offline">Offline cash</SectionTitle>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-[#FFE500]" />
                <p className="text-xs font-neue font-black uppercase tracking-widest" data-testid="text-offline-title">True offline payments</p>
              </div>
              <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed font-neue" data-testid="text-offline-body">
                Offline cash describes device-to-device payments where a transfer can be prepared and exchanged locally (e.g., via QR/NFC/Bluetooth patterns) and then later synchronized on-chain.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <SectionTitle id="security">Security model</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Bullet title="Threat model" body="Privacy systems have tradeoffs. Metadata leakage can still occur through user behavior, timing, or external analytics. Use safe operational practices." />
              <Bullet title="Correctness" body="The system is designed so invalid state transitions are rejected by verification rules, protecting solvency and consistency." />
              <Bullet title="Key security" body="End-user keys remain in their wallet; private flows should avoid exposing sensitive data in logs or third-party scripts." />
              <Bullet title="Non-custodial design" body="Users retain control: the protocol is designed so funds are not held by a centralized custodian." />
            </div>
          </section>

          <section className="space-y-6">
            <SectionTitle id="network">Network & infrastructure</SectionTitle>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <Network className="h-5 w-5 text-[#FFE500]" />
                <p className="text-xs font-neue font-black uppercase tracking-widest" data-testid="text-network-title">Decentralized proving & relaying</p>
              </div>
              <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed font-neue" data-testid="text-network-body">
                Run your own provers and relayers. Support a decentralized privacy network on Solana, where $FLUX is used for network fees, access to privacy features, and protocol governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Bullet title="Proof generation" body="Provers generate the privacy proofs required for protected actions." />
              <Bullet title="Verification" body="Solana programs verify proofs and enforce state transitions." />
              <Bullet title="Relayers" body="Relayers help submit transactions and improve UX when appropriate." />
              <Bullet title="Metering" body="$FLUX aligns demand with computational resources across the network." />
            </div>
          </section>

          <section className="space-y-6">
            <SectionTitle id="faq">FAQ</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Bullet title="Is this live?" body="The dashboard experience is available in this prototype. Protocol-level behavior described here represents the intended design." />
              <Bullet title="Does this guarantee total anonymity?" body="No system guarantees anonymity against every adversary. FLUXAL aims to significantly improve privacy while keeping correctness verifiable." />
              <Bullet title="Why $FLUX?" body="$FLUX funds privacy computation and infrastructure, and helps meter access to resource-intensive features." />
              <Bullet title="Where do I start?" body="Connect a wallet in the dashboard, explore the flows, and read the docs section-by-section." />
            </div>

          </section>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6 flex-wrap">
          <p className="text-xs text-gray-500 font-mono tracking-widest" data-testid="text-footer-copyright">
            © 2026 FLUXAL. ALL RIGHTS RESERVED.
          </p>
          <a
            data-testid="link-footer-x"
            href="https://x.com/FluxalAI"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono tracking-widest text-gray-500 hover:text-[#FFE500] transition-colors"
          >
            X: FluxalAI
          </a>
        </div>
      </main>
    </div>
  );
}
