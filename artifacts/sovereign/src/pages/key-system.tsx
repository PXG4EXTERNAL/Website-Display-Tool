import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Home, Copy, Trash2, Key, Crown, Plus, X, ExternalLink, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import defaultLogo from '@assets/image_1783159506476.png';

const DEFAULT_KEY_PAGE = {
  linkvertiseLabel: 'Linkvertise',
  linkvertiseUrl: 'https://linkvertise.com',
  lootlabsLabel: 'Lootlabs',
  lootlabsUrl: 'https://loot-labs.com',
  freeCardTitle: 'Free Key',
  premiumCardButtonText: 'Get Premium',
};

export default function KeySystem() {
  const [siteInfo]   = useLocalStorage('sovereign_info', { name: 'Sovereign', tagline: 'PXG', discord: 'https://discord.gg', logoUrl: '' });
  const [keyPage]    = useLocalStorage('sovereign_key_page', DEFAULT_KEY_PAGE as any);
  const [userKeys, setUserKeys] = useLocalStorage<string[]>('sovereign_user_keys', []);

  const [pasteOpen, setPasteOpen]   = useState(false);
  const [inputKey, setInputKey]     = useState('');
  const [copiedIdx, setCopiedIdx]   = useState<number | null>(null);

  const logoSrc = (siteInfo as any).logoUrl || defaultLogo;
  const linkvertiseUrl = keyPage.linkvertiseUrl || DEFAULT_KEY_PAGE.linkvertiseUrl;
  const lootlabsUrl   = keyPage.lootlabsUrl   || DEFAULT_KEY_PAGE.lootlabsUrl;
  const linkvertiseLabel = keyPage.linkvertiseLabel || DEFAULT_KEY_PAGE.linkvertiseLabel;
  const lootlabsLabel   = keyPage.lootlabsLabel   || DEFAULT_KEY_PAGE.lootlabsLabel;

  const handleCopy = (key: string, idx: number) => {
    navigator.clipboard.writeText(key);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleDelete = (idx: number) => {
    setUserKeys(userKeys.filter((_, i) => i !== idx));
  };

  const handlePaste = () => {
    const trimmed = inputKey.trim();
    if (!trimmed) return;
    setUserKeys([...userKeys, trimmed]);
    setInputKey('');
    setPasteOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-foreground flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo + hub name */}
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt={siteInfo.name}
              className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
              onError={(e) => { (e.target as HTMLImageElement).src = defaultLogo; }}
            />
            <span className="text-lg font-bold text-primary tracking-wide uppercase gold-glow">{siteInfo.name}</span>
          </div>

          {/* Home button */}
          <Link href="/">
            <Button variant="outline" size="sm" className="border-white/20 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-white gap-2">
              <Home size={15} />
              Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 relative z-10 max-w-4xl mx-auto w-full px-4 py-10">

        {/* Keys box */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] border border-white/5 rounded-2xl mb-6 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Key size={16} className="text-primary" />
              <span className="text-sm font-bold text-white">Your Keys</span>
              {userKeys.length > 0 && (
                <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold">
                  {userKeys.length}
                </span>
              )}
            </div>
          </div>

          {userKeys.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-center">
                <Key size={24} className="text-white/20" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">No active keys</p>
              <p className="text-xs text-muted-foreground/60">Paste a key or generate one below</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {userKeys.map((key, idx) => (
                <div key={idx} className="flex items-center gap-3 px-5 py-3 group hover:bg-white/2 transition-colors">
                  <span className="flex-1 font-mono text-sm text-gray-300 truncate" title={key}>
                    {key.length > 48 ? key.slice(0, 48) + '…' : key}
                  </span>
                  <button
                    onClick={() => handleCopy(key, idx)}
                    className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    title="Copy"
                  >
                    {copiedIdx === idx ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-900/20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Action buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4"
        >
          {/* Linkvertise */}
          <a href={linkvertiseUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline"
              className="w-full h-13 border-white/10 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-white justify-between group py-3">
              <div className="flex items-center gap-2">
                <ExternalLink size={16} className="text-primary" />
                <span className="font-semibold">{linkvertiseLabel}</span>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-primary/60">Get key →</span>
            </Button>
          </a>

          {/* Lootlabs */}
          <a href={lootlabsUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline"
              className="w-full h-13 border-white/10 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-white justify-between group py-3">
              <div className="flex items-center gap-2">
                <ExternalLink size={16} className="text-primary" />
                <span className="font-semibold">{lootlabsLabel}</span>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-primary/60">Get key →</span>
            </Button>
          </a>

          {/* Paste a Key */}
          <Button variant="outline" onClick={() => setPasteOpen(true)}
            className="h-13 border-white/10 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-white justify-between group py-3">
            <div className="flex items-center gap-2">
              <Plus size={16} className="text-primary" />
              <span className="font-semibold">Paste A Key</span>
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-primary/60">Enter manually →</span>
          </Button>

          {/* Get Premium Key */}
          <Link href="/premium" className="block">
            <Button className="w-full h-13 font-bold bg-gradient-to-r from-primary to-yellow-600 text-black hover:brightness-110 border-none relative overflow-hidden group rounded-xl py-3">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                <Crown size={16} className="fill-black/20" />
                {keyPage.premiumCardButtonText || 'Get Premium Key'}
              </span>
            </Button>
          </Link>
        </motion.div>
      </main>

      {/* Paste Key Popup */}
      <AnimatePresence>
        {pasteOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" onClick={() => setPasteOpen(false)} />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#111111] border border-primary/20 rounded-xl p-6 w-full max-w-md shadow-2xl pointer-events-auto relative gold-border-glow"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-t-xl" />
                <button onClick={() => setPasteOpen(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors">
                  <X size={18} />
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Key size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Paste Your Key</h3>
                    <p className="text-xs text-muted-foreground">It will be saved and shown in your key box</p>
                  </div>
                </div>

                <textarea
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Paste your key here..."
                  rows={3}
                  autoFocus
                  className="w-full bg-black/50 border border-primary/20 rounded-lg p-3 text-sm font-mono text-white placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/50 resize-none mb-4"
                />

                <div className="flex gap-3">
                  <Button onClick={() => setPasteOpen(false)} variant="outline"
                    className="flex-1 border-white/10 hover:bg-white/5 text-muted-foreground">
                    Cancel
                  </Button>
                  <Button onClick={handlePaste} disabled={!inputKey.trim()}
                    className="flex-1 bg-gradient-to-r from-primary to-yellow-600 text-black font-bold hover:brightness-110 border-none disabled:opacity-40">
                    Save Key
                  </Button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
