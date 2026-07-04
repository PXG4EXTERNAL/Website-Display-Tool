import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Search, Zap, Code2, ExternalLink } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScriptPopup } from '@/components/script-popup';
import type { Game } from '@/components/admin-panel';

const DEFAULT_GAMES: Game[] = [
  { name: 'Blox Fruits',     status: 'Active', link: '', logo: '' },
  { name: 'Pet Simulator X', status: 'Active', link: '', logo: '' },
  { name: 'Anime Defenders', status: 'Active', link: '', logo: '' },
  { name: 'King Legacy',     status: 'Active', link: '', logo: '' },
  { name: 'Fisch',           status: 'Active', link: '', logo: '' },
];

export default function Games() {
  const [games]     = useLocalStorage<Game[]>('sovereign_games', DEFAULT_GAMES);
  const [gamesPage] = useLocalStorage('sovereign_games_page', { subtitle: 'Powerful scripts for the most popular Roblox games.' });
  const [search, setSearch]             = useState('');
  const [isScriptOpen, setIsScriptOpen] = useState(false);

  const filtered = games.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">

      {/* Header — centered, vertical, matching Get Key / Premium */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Gamepad2 className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-3">
          Supported <span className="text-primary gold-glow">Games</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          {gamesPage.subtitle}
        </p>

        {/* Search — below the headline */}
        <div className="relative max-w-sm mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-[#111111] border-white/10 h-12 rounded-xl focus-visible:ring-primary/50 text-white"
          />
        </div>
      </motion.div>

      {/* Game cards */}
      {filtered.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-20 bg-[#111111] rounded-2xl border border-white/5">
          <Gamepad2 className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
          <p className="text-muted-foreground">Try a different search term.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((game, index) => {
            const isActive = game.status === 'Active';
            return (
              <motion.div key={index}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                className="bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-5 relative z-10">
                  {game.logo ? (
                    <img src={game.logo} alt={game.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/10"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center">
                      <Gamepad2 className="text-white/70 group-hover:text-primary transition-colors" size={24} />
                    </div>
                  )}
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white/5 text-muted-foreground border border-white/10'
                  }`}>
                    {isActive && <Zap size={10} className="fill-primary" />}
                    {game.status}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 relative z-10">{game.name}</h3>

                <div className="mt-auto space-y-2 relative z-10">
                  <Button
                    onClick={() => setIsScriptOpen(true)}
                    disabled={!isActive}
                    className={`w-full ${
                      isActive
                        ? 'bg-white/5 hover:bg-primary/20 text-white hover:text-primary border border-white/10 hover:border-primary/50'
                        : 'bg-black/50 text-muted-foreground cursor-not-allowed border-transparent'
                    }`}
                    variant="outline"
                  >
                    <Code2 size={16} className="mr-2" />
                    {isActive ? 'Get Script' : 'Coming Soon'}
                  </Button>

                  {game.link && (
                    <a href={game.link} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full border-primary/10 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary text-sm h-9">
                        <ExternalLink size={14} className="mr-2" />
                        {game.name}
                      </Button>
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <ScriptPopup isOpen={isScriptOpen} onClose={() => setIsScriptOpen(false)} />
    </div>
  );
}
