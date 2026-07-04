import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Home, Copy, Trash2, Key, Crown, Plus, X, ExternalLink, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import defaultLogo from '@assets/image_1783159506476.png';

const DEFAULT_KEY_PAGE = {
  linkvertiseLabel: 'Linkvertise',
  linkvertiseUrl: 'https://linkvertise.com',
  lootlabsLabel: 'Lootlabs',
  lootlabsUrl: 'https://loot-labs.com',
  premiumBannerText: 'GET PREMIUM KEY',
  premiumBannerSub: 'Skip the key system entirely',
  premiumBannerPrice: '$4.99',
  premiumBannerPeriod: 'Forever',
};

export default function KeySystem() {
  const [siteInfo]  = useLocalStorage('sovereign_info', { name: 'Sovereign', discord: 'https://discord.gg', logoUrl: '' } as any);
  const [keyPage]   = useLocalStorage('sovereign_key_page', DEFAULT_KEY_PAGE as any);
  const [userKeys, setUserKeys] = useLocalStorage<string[]>('sovereign_user_keys', []);

  const [pasteOpen, setPasteOpen] = useState(false);
  const [inputKey, setInputKey]   = useState('');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const logoSrc          = siteInfo.logoUrl || defaultLogo;
  const linkvertiseUrl   = keyPage.linkvertiseUrl   || DEFAULT_KEY_PAGE.linkvertiseUrl;
  const lootlabsUrl      = keyPage.lootlabsUrl      || DEFAULT_KEY_PAGE.lootlabsUrl;
  const linkvertiseLabel = keyPage.linkvertiseLabel  || DEFAULT_KEY_PAGE.linkvertiseLabel;
  const lootlabsLabel    = keyPage.lootlabsLabel     || DEFAULT_KEY_PAGE.lootlabsLabel;
  const bannerText       = keyPage.premiumBannerText  || DEFAULT_KEY_PAGE.premiumBannerText;
  const bannerSub        = keyPage.premiumBannerSub   || DEFAULT_KEY_PAGE.premiumBannerSub;
  const bannerPrice      = keyPage.premiumBannerPrice || DEFAULT_KEY_PAGE.premiumBannerPrice;
  const bannerPeriod     = keyPage.premiumBannerPeriod|| DEFAULT_KEY_PAGE.premiumBannerPeriod;

  const handleCopy = (key: string, idx: number) => {
    navigator.clipboard.writeText(key);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleDelete = (idx: number) => setUserKeys(userKeys.filter((_, i) => i !== idx));

  const handlePaste = () => {
    const trimmed = inputKey.trim();
    if (!trimmed) return;
    setUserKeys([...userKeys, trimmed]);
    setInputKey('');
    setPasteOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-foreground flex flex-col relative overflow-hidden">
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/70 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt={siteInfo.name}
              className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
              onError={(e) => { (e.target as HTMLImageElement).src = defaultLogo; }}
            />
            <span className="text-lg font-bold text-primary tracking-wide uppercase gold-glow">{siteInfo.name}</span>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm"
              className="border-white/20 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-white gap-2">
              <Home size={15} />
              Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main — narrow column like screenshot */}
      <main className="flex-1 relative z-10 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-4">

        {/* Keys box */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden"
        >
          {userKeys.length === 0 ? (
            <div className="py-14 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-1">
                <Lock size={28} className="text-white/30" />
              </div>
              <p className="text-base font-semibold text-white/80">No active keys</p>
              <p className="text-sm text-muted-foreground">Paste a key below to save it here.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {userKeys.map((key, idx) => (
                <div key={idx} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <span className="flex-1 font-mono text-sm text-gray-300 truncate" title={key}>
                    {key.length > 52 ? key.slice(0, 52) + '…' : key}
                  </span>
                  <button onClick={() => handleCopy(key, idx)}
                    className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" title="Copy">
                    {copiedIdx === idx ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </button>
                  <button onClick={() => handleDelete(idx)}
                    className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-900/20 transition-colors" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* 3 buttons in one row */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="grid grid-cols-3 gap-3"
        >
          <a href={linkvertiseUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline"
              className="w-full h-12 border-white/10 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-white gap-2">
              <ExternalLink size={15} />
              <span className="font-semibold text-sm">{linkvertiseLabel}</span>
            </Button>
          </a>

          <a href={lootlabsUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline"
              className="w-full h-12 border-white/10 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-white gap-2">
              <ExternalLink size={15} />
              <span className="font-semibold text-sm">{lootlabsLabel}</span>
            </Button>
          </a>

          <Button variant="outline" onClick={() => setPasteOpen(true)}
            className="h-12 border-primary/40 hover:border-primary hover:bg-primary/5 text-primary gap-2">
            <Plus size={15} />
            <span className="font-semibold text-sm">Paste A Key</span>
          </Button>
        </motion.div>

        {/* GET PREMIUM KEY banner */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
          <Link href="/premium">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-[#1a1200] via-[#221800] to-[#1a1200] hover:border-primary/60 hover:from-[#221800] hover:to-[#221800] transition-all cursor-pointer group px-6 py-5 flex items-center justify-between">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/8 transition-colors" />
              <div className="relative z-10">
                <p className="text-sm font-black text-white uppercase tracking-wider">{bannerText}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{bannerSub}</p>
              </div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="text-right">
                  <span className="text-2xl font-black text-primary gold-glow">{bannerPrice}</span>
                  <span className="text-xs text-muted-foreground ml-1">{bannerPeriod}</span>
                </div>
                <Crown size={22} className="text-primary" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Discord help */}
        {siteInfo.discord && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-center text-xs text-muted-foreground">
            Need help?{' '}
            <a href={siteInfo.discord} target="_blank" rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4">
              Join our Discord
            </a>
          </motion.p>
        )}
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
                    <p className="text-xs text-muted-foreground">Saved locally — shown in your key box</p>
                  </div>
                </div>
                <textarea
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Paste your key here..."
                  rows={3}
                  autoFocus
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handlePaste(); } }}
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
