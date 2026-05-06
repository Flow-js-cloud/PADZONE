import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface LegalPageProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPage({ title, subtitle, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-white/30 mb-10">
        <Link href="/" className="hover:text-white/60">Accueil</Link>
        <ChevronRight size={12} />
        <span className="text-white/50">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-12 pb-8 border-b border-border">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-DEFAULT mb-3">
          // Informations légales
        </p>
        <h1 className="font-orbitron font-black text-4xl text-white mb-3">{title}</h1>
        {subtitle && <p className="text-white/40 font-rajdhani">{subtitle}</p>}
        <p className="text-xs font-mono text-white/20 mt-4">
          Dernière mise à jour : {lastUpdated}
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-sm max-w-none space-y-8
        [&_h2]:font-orbitron [&_h2]:font-bold [&_h2]:text-xl [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4
        [&_h3]:font-orbitron [&_h3]:font-semibold [&_h3]:text-base [&_h3]:text-cyan-DEFAULT [&_h3]:mt-6 [&_h3]:mb-3
        [&_p]:text-white/50 [&_p]:font-rajdhani [&_p]:leading-relaxed [&_p]:text-base
        [&_ul]:space-y-2 [&_li]:text-white/50 [&_li]:font-rajdhani [&_li]:flex [&_li]:gap-2
        [&_strong]:text-white/80 [&_a]:text-cyan-DEFAULT [&_a]:underline
      ">
        {children}
      </div>
    </div>
  );
}
