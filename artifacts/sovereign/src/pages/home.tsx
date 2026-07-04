import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Code2, Crown, Gamepad2, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScriptPopup } from '@/components/script-popup';
import sovereignLogo from '@assets/image_1783159506476.png';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function Home() {
  const [isScriptOpen, setIsScriptOpen] = useState(false);
  const [siteInfo] = useLocalStorage('sovereign_info', {
    name: 'Sovereign',
    tagline: 'PXG',
    discord: 'https://discord.gg',
    logoUrl: '',
  } as any);

  const logoSrc = (siteInfo as any).logoUrl || sovereignLogo;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 z-10">

        {/* Logo — no box, pure glow on dark bg */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 scale-150 bg-primary/15 blur-[60px] rounded-full pointer-events-none" />
            <img
              src={logoSrc}
              alt={siteInfo.name}
              className="w-36 h-36 md:w-48 md:h-48 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]"
              style={{ mixBlendMode: 'lighten' }}
              onError={(e) => { (e.target as HTMLImageElement).src = sovereignLogo; }}
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase mb-1">
            <span className="gold-glow text-primary">{siteInfo.name}</span>
          </h1>
          <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {siteInfo.tagline}
          </p>
        </motion.div>

        {/* Welcome text — no card/box */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Welcome to our Hub{' '}
            <span className="text-primary font-semibold">{siteInfo.name}</span>
            {' '}to get started first check out{' '}
            <Link href="/games">
              <span className="text-primary font-bold cursor-pointer hover:underline underline-offset-4 decoration-primary/50 transition-all gold-glow">
                Games
              </span>
            </Link>
          </p>
        </motion.div>

        {/* Buttons — 2×2 grid, Games + Get Key side by side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mt-4"
        >
          <Button
            onClick={() => setIsScriptOpen(true)}
            variant="outline"
            className="h-14 text-base font-bold border-primary/20 hover:border-primary hover:bg-primary/5 text-white transition-all group"
          >
            <Code2 className="mr-2 group-hover:text-primary transition-colors" size={20} />
            Script
          </Button>

          <Link href="/games" className="contents">
            <Button variant="outline" className="h-14 text-base font-bold border-primary/20 hover:border-primary hover:bg-primary/5 text-white transition-all group w-full">
              <Gamepad2 className="mr-2 group-hover:text-primary transition-colors" size={20} />
              Games
            </Button>
          </Link>

          <Link href="/get-key" className="contents">
            <Button variant="outline" className="h-14 text-base font-bold border-primary/20 hover:border-primary hover:bg-primary/5 text-white transition-all group w-full">
              <Key className="mr-2 group-hover:text-primary transition-colors" size={20} />
              Get Key
            </Button>
          </Link>

          <Link href="/premium" className="contents">
            <Button className="h-14 text-base font-bold bg-gradient-to-r from-primary to-yellow-600 text-black hover:brightness-110 border-none relative overflow-hidden group shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all w-full">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2"><Crown size={20} className="fill-black/20" />Premium</span>
            </Button>
          </Link>
        </motion.div>
      </div>

      <ScriptPopup isOpen={isScriptOpen} onClose={() => setIsScriptOpen(false)} />
    </div>
  );
}
