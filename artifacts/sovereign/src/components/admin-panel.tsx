import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, KeyRound, X, Plus, Trash2, Save,
  Link as LinkIcon, Settings, Gamepad2, Star, Palette,
  ShieldCheck, Eye, EyeOff, ImageIcon
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAdmin } from '@/contexts/admin-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type TabId = 'site' | 'loadstring' | 'keyPage' | 'games' | 'premium';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'site',       label: 'Site Info',  icon: <Settings size={15} /> },
  { id: 'loadstring', label: 'Loadstring', icon: <Star size={15} /> },
  { id: 'keyPage',    label: 'Key Page',   icon: <KeyRound size={15} /> },
  { id: 'games',      label: 'Games',      icon: <Gamepad2 size={15} /> },
  { id: 'premium',    label: 'Premium',    icon: <Crown size={15} /> },
];

export interface Game {
  name: string;
  status: string;
  link: string;
  logo: string;
}

const DEFAULT_GAMES: Game[] = [
  { name: 'Blox Fruits',     status: 'Active', link: '', logo: '' },
  { name: 'Pet Simulator X', status: 'Active', link: '', logo: '' },
  { name: 'Anime Defenders', status: 'Active', link: '', logo: '' },
  { name: 'King Legacy',     status: 'Active', link: '', logo: '' },
  { name: 'Fisch',           status: 'Active', link: '', logo: '' },
];

const DEFAULT_KEY_PAGE = {
  title: 'Get Your',
  titleHighlight: 'Key',
  subtitle: 'Choose a plan to access Sovereign scripts.',
  buttonText: 'Generate Key',
  steps: [
    { title: 'Click the Get Key Button',  description: 'Click the button below to be redirected to our secure key system.' },
    { title: 'Complete the Steps',        description: 'Follow the short tasks on the key page to verify you are human.' },
    { title: 'Enjoy the Script',          description: 'Copy your generated key, paste it into the UI, and you are ready to go.' },
  ],
  premiumBadge: 'Recommended',
  premiumCardFeatures: 'Instant whitelist\nNo key system\nKeyless on all games',
  premiumCardButtonText: 'Get Premium',
  freeCardTitle: 'Free Key',
  freeCardLabel: 'with ads',
  freeCardFeatures: 'Easy process\nSecure links\nFast delivery',
  freeCardButtonText: 'Get Free Key',
  linkvertiseLabel: 'Linkvertise',
  linkvertiseUrl: 'https://linkvertise.com',
  lootlabsLabel: 'Lootlabs',
  lootlabsUrl: 'https://loot-labs.com',
};

const DEFAULT_PREMIUM = {
  pageTitle: 'Sovereign',
  pageTitleHighlight: 'Premium',
  pageSubtitle: 'Upgrade your experience. Skip the key system, get faster updates, and unlock exclusive scripts.',
  standardName: 'Standard',
  standardPrice: '$0',
  standardPeriod: '/ forever',
  standardBenefits: 'Access to basic scripts\nStandard updates\nCommunity support\nKey system required (4 steps)\nBasic execution speeds',
  standardButtonText: 'Current Plan',
  premiumName: 'Sovereign+',
  premiumPrice: '$4.99',
  premiumPeriod: '/ month',
  premiumBadge: 'Most Popular',
  premiumBenefits: 'NO Key System (Bypass all links)\nPriority script updates\nExclusive Premium-only scripts\nDirect developer support\nCustom theme colors in UI\nInstant injection speeds',
  premiumButtonText: 'Get Premium Now',
  premiumButtonUrl: '#',
  whyTitle: 'Why go Premium?',
  perk1Title: 'No Keys Ever',
  perk1Desc: 'Say goodbye to annoying link shorteners. Just click execute and dominate immediately.',
  perk2Title: 'Priority Updates',
  perk2Desc: 'When a game updates, Premium scripts are patched first. Minimal downtime.',
  perk3Title: 'Undetected',
  perk3Desc: 'Premium users get access to our advanced obfuscation routing for maximum safety.',
};

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{children}</label>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
}

export function AdminPanel() {
  const { isAdminOpen, closeAdmin, isAdmin, setIsAdmin } = useAdmin();
  const [step, setStep]         = useState<'password' | 'panel'>('password');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [newPw, setNewPw]       = useState('');
  const [error, setError]       = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('site');

  // Skip password prompt when already authenticated
  useEffect(() => {
    if (isAdminOpen && isAdmin) {
      setStep('panel');
    } else if (!isAdminOpen) {
      // Reset to password step only when the panel closes while logged out
      if (!isAdmin) setStep('password');
    }
  }, [isAdminOpen, isAdmin]);

  const [adminPassword, setAdminPassword] = useLocalStorage('sovereign_admin_pw', 'pugunyt0623763408sovereign');
  const [loadstring, setLoadstring]       = useLocalStorage('sovereign_loadstring', 'loadstring(game:HttpGet("https://sovereigns.dev/loader"))()');
  const [games, setGames]                 = useLocalStorage<Game[]>('sovereign_games', DEFAULT_GAMES);
  const [gamesPage, setGamesPage]         = useLocalStorage('sovereign_games_page', { subtitle: 'Powerful scripts for the most popular Roblox games.' });
  const [siteInfo, setSiteInfo]           = useLocalStorage('sovereign_info', { name: 'Sovereign', tagline: 'PXG', discord: 'https://discord.gg', logoUrl: '' });
  const [keyPage, setKeyPage]             = useLocalStorage('sovereign_key_page', DEFAULT_KEY_PAGE);
  const [premium, setPremium]             = useLocalStorage('sovereign_premium', DEFAULT_PREMIUM);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setStep('panel'); setIsAdmin(true); setError(false); setPassword('');
    } else {
      setError(true); setTimeout(() => setError(false), 500);
    }
  };

  const handleClose = () => { setStep('password'); setPassword(''); setError(false); closeAdmin(); };

  const addGame    = ()                                      => setGames([...games, { name: 'New Game', status: 'Inactive', link: '', logo: '' }]);
  const updateGame = (i: number, f: keyof Game, v: string)  => { const n=[...games]; n[i]={...n[i],[f]:v}; setGames(n); };
  const removeGame = (i: number)                             => setGames(games.filter((_,idx)=>idx!==i));

  const updateStep = (i: number, f: 'title'|'description', v: string) => {
    const steps = [...(keyPage.steps || DEFAULT_KEY_PAGE.steps)];
    steps[i] = { ...steps[i], [f]: v };
    setKeyPage({ ...keyPage, steps });
  };

  const setPrem = (k: string, v: string) => setPremium({ ...premium, [k]: v });
  const setKP   = (k: string, v: string) => setKeyPage({ ...keyPage, [k]: v });

  return (
    <AnimatePresence>
      {isAdminOpen && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50" onClick={handleClose} />

          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            {step === 'password' ? (
              <motion.div
                initial={{opacity:0,scale:0.95}}
                animate={{opacity:1,scale:1,x:error?[-10,10,-10,10,0]:0}}
                transition={{duration:error?0.4:0.2}}
                exit={{opacity:0,scale:0.95}}
                className="bg-[#111111] border border-primary/30 rounded-xl p-8 w-full max-w-sm pointer-events-auto shadow-2xl gold-border-glow"
              >
                <div className="flex flex-col items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <KeyRound className="text-primary" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Admin Access</h2>
                  <p className="text-muted-foreground text-sm mt-1 text-center">Enter the master password</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Input type={showPw ? 'text' : 'password'} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password..." autoFocus
                      className="bg-black/50 border-primary/20 text-center h-12 pr-10 focus-visible:ring-primary/50" />
                    <button type="button" onClick={() => setShowPw(s=>!s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white">
                      {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                    {error && <p className="text-red-500 text-xs text-center mt-2">Incorrect password</p>}
                  </div>
                  <Button type="submit" className="w-full bg-primary text-black font-bold hover:brightness-110 h-12">Enter</Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{opacity:0,scale:0.95,y:20}}
                animate={{opacity:1,scale:1,y:0}}
                exit={{opacity:0,scale:0.95,y:20}}
                className="bg-[#111111] border border-primary/20 rounded-xl w-full max-w-4xl pointer-events-auto flex flex-col shadow-2xl overflow-hidden"
                style={{maxHeight:'90vh'}}
              >
                <div className="flex items-center justify-between p-5 border-b border-primary/10 bg-black/40 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg"><Crown className="text-primary" size={20}/></div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Admin Panel</h2>
                      <p className="text-xs text-muted-foreground">Sovereign Hub Control Center</p>
                    </div>
                  </div>
                  <button onClick={handleClose} className="text-muted-foreground hover:text-white p-1"><X size={22}/></button>
                </div>

                <div className="flex flex-1 min-h-0">
                  <div className="w-40 shrink-0 border-r border-white/5 bg-black/30 flex flex-col gap-1 p-3">
                    {TABS.map((tab) => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                          activeTab===tab.id
                            ? 'bg-primary/15 text-primary border border-primary/20'
                            : 'text-muted-foreground hover:text-white hover:bg-white/5'
                        }`}>
                        {tab.icon}{tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-5">

                    {/* ── SITE ──────────────────────────────── */}
                    {activeTab === 'site' && (
                      <div className="space-y-5">
                        <SectionTitle>Site Information</SectionTitle>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Hub Name">
                            <Input value={(siteInfo as any).name} onChange={(e)=>setSiteInfo({...siteInfo as any,name:e.target.value})} className="bg-black/50 border-primary/20"/>
                          </Field>
                          <Field label="Tagline">
                            <Input value={(siteInfo as any).tagline} onChange={(e)=>setSiteInfo({...siteInfo as any,tagline:e.target.value})} className="bg-black/50 border-primary/20"/>
                          </Field>
                        </div>
                        <Field label="Discord URL">
                          <Input value={(siteInfo as any).discord||''} onChange={(e)=>setSiteInfo({...siteInfo as any,discord:e.target.value})} className="bg-black/50 border-primary/20" placeholder="https://discord.gg/..."/>
                        </Field>

                        <SectionTitle>Logo</SectionTitle>
                        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-3">
                          <Field label="Custom Logo URL (leave blank to use default)">
                            <Input
                              value={(siteInfo as any).logoUrl || ''}
                              onChange={(e) => setSiteInfo({...siteInfo as any, logoUrl: e.target.value})}
                              className="bg-black/50 border-primary/20 font-mono text-xs"
                              placeholder="https://example.com/logo.png"
                            />
                          </Field>
                          {(siteInfo as any).logoUrl && (
                            <div className="flex items-center gap-3">
                              <img src={(siteInfo as any).logoUrl} alt="Preview"
                                className="w-12 h-12 object-contain rounded-lg border border-white/10 bg-black/30"
                                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                              />
                              <div>
                                <p className="text-xs text-muted-foreground">Logo preview</p>
                                <button onClick={() => setSiteInfo({...siteInfo as any, logoUrl: ''})}
                                  className="text-xs text-red-400 hover:text-red-300 mt-0.5">Reset to default</button>
                              </div>
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <ImageIcon size={11}/> Paste any direct image URL. Best results: square PNG with transparent background.
                          </p>
                        </div>

                        <SectionTitle>Change Admin Password</SectionTitle>
                        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-3">
                          <Field label="New Password">
                            <Input type="text" value={newPw} onChange={(e)=>setNewPw(e.target.value)} className="bg-black/50 border-primary/20" placeholder="Enter new password..."/>
                          </Field>
                          <Button size="sm" disabled={!newPw}
                            onClick={()=>{setAdminPassword(newPw);setNewPw('');}}
                            className="bg-primary text-black font-bold hover:brightness-110 text-xs h-8">
                            <ShieldCheck size={13} className="mr-1"/> Save Password
                          </Button>
                        </div>

                        <div className="bg-[#0d0d0d] border border-white/5 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-1"><Palette size={13} className="text-primary"/><span className="text-sm font-medium text-white">Brand Colors</span></div>
                          <p className="text-xs text-muted-foreground">Gold (#FFD700) + black (#0d0d0d) — color picker coming soon.</p>
                        </div>
                      </div>
                    )}

                    {/* ── LOADSTRING ────────────────────────── */}
                    {activeTab === 'loadstring' && (
                      <div className="space-y-5">
                        <SectionTitle>Hub Loadstring</SectionTitle>
                        <Field label="Script shown in popup">
                          <Textarea value={loadstring} onChange={(e)=>setLoadstring(e.target.value)} className="bg-black/50 border-primary/20 font-mono text-sm h-28" placeholder="loadstring(game:HttpGet(...))()"/>
                        </Field>
                        <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm text-primary/80 break-all">
                          {loadstring || <span className="text-muted-foreground italic">No loadstring set</span>}
                        </div>
                      </div>
                    )}

                    {/* ── KEY PAGE ──────────────────────────── */}
                    {activeTab === 'keyPage' && (
                      <div className="space-y-5">
                        <SectionTitle>Page Header</SectionTitle>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Title text">
                            <Input value={keyPage.title} onChange={(e)=>setKP('title',e.target.value)} className="bg-black/50 border-primary/20"/>
                          </Field>
                          <Field label="Highlighted word">
                            <Input value={keyPage.titleHighlight} onChange={(e)=>setKP('titleHighlight',e.target.value)} className="bg-black/50 border-primary/20"/>
                          </Field>
                        </div>
                        <Field label="Subtitle">
                          <Textarea value={keyPage.subtitle} onChange={(e)=>setKP('subtitle',e.target.value)} className="bg-black/50 border-primary/20 text-sm h-16"/>
                        </Field>

                        <SectionTitle>Premium Plan Card</SectionTitle>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Badge text">
                            <Input value={(keyPage as any).premiumBadge||''} onChange={(e)=>setKP('premiumBadge',e.target.value)} className="bg-black/50 border-primary/20" placeholder="Recommended"/>
                          </Field>
                          <Field label="Button text">
                            <Input value={(keyPage as any).premiumCardButtonText||''} onChange={(e)=>setKP('premiumCardButtonText',e.target.value)} className="bg-black/50 border-primary/20"/>
                          </Field>
                        </div>
                        <Field label="Features (one per line)">
                          <Textarea value={(keyPage as any).premiumCardFeatures||''} onChange={(e)=>setKP('premiumCardFeatures',e.target.value)} className="bg-black/50 border-primary/20 text-sm h-24"/>
                        </Field>

                        <SectionTitle>Free Key Card</SectionTitle>
                        <div className="grid grid-cols-3 gap-3">
                          <Field label="Card title">
                            <Input value={(keyPage as any).freeCardTitle||''} onChange={(e)=>setKP('freeCardTitle',e.target.value)} className="bg-black/50 border-primary/20"/>
                          </Field>
                          <Field label="Label (e.g. 'with ads')">
                            <Input value={(keyPage as any).freeCardLabel||''} onChange={(e)=>setKP('freeCardLabel',e.target.value)} className="bg-black/50 border-primary/20"/>
                          </Field>
                          <Field label="Button text">
                            <Input value={(keyPage as any).freeCardButtonText||''} onChange={(e)=>setKP('freeCardButtonText',e.target.value)} className="bg-black/50 border-primary/20"/>
                          </Field>
                        </div>
                        <Field label="Features (one per line)">
                          <Textarea value={(keyPage as any).freeCardFeatures||''} onChange={(e)=>setKP('freeCardFeatures',e.target.value)} className="bg-black/50 border-primary/20 text-sm h-24"/>
                        </Field>

                        <SectionTitle>Premium Banner (on key system page)</SectionTitle>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Banner headline">
                            <Input value={(keyPage as any).premiumBannerText||''} onChange={(e)=>setKP('premiumBannerText',e.target.value)} className="bg-black/50 border-primary/20" placeholder="GET PREMIUM KEY"/>
                          </Field>
                          <Field label="Sub-text">
                            <Input value={(keyPage as any).premiumBannerSub||''} onChange={(e)=>setKP('premiumBannerSub',e.target.value)} className="bg-black/50 border-primary/20" placeholder="Skip the key system entirely"/>
                          </Field>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Price">
                            <Input value={(keyPage as any).premiumBannerPrice||''} onChange={(e)=>setKP('premiumBannerPrice',e.target.value)} className="bg-black/50 border-primary/20" placeholder="$4.99"/>
                          </Field>
                          <Field label="Period label">
                            <Input value={(keyPage as any).premiumBannerPeriod||''} onChange={(e)=>setKP('premiumBannerPeriod',e.target.value)} className="bg-black/50 border-primary/20" placeholder="Forever"/>
                          </Field>
                        </div>

                        <SectionTitle>Key Links</SectionTitle>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Linkvertise label">
                            <Input value={(keyPage as any).linkvertiseLabel||''} onChange={(e)=>setKP('linkvertiseLabel',e.target.value)} className="bg-black/50 border-primary/20"/>
                          </Field>
                          <Field label="Linkvertise URL">
                            <Input value={(keyPage as any).linkvertiseUrl||''} onChange={(e)=>setKP('linkvertiseUrl',e.target.value)} className="bg-black/50 border-primary/20 font-mono text-xs"/>
                          </Field>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Lootlabs label">
                            <Input value={(keyPage as any).lootlabsLabel||''} onChange={(e)=>setKP('lootlabsLabel',e.target.value)} className="bg-black/50 border-primary/20"/>
                          </Field>
                          <Field label="Lootlabs URL">
                            <Input value={(keyPage as any).lootlabsUrl||''} onChange={(e)=>setKP('lootlabsUrl',e.target.value)} className="bg-black/50 border-primary/20 font-mono text-xs"/>
                          </Field>
                        </div>

                        <SectionTitle>How It Works — Steps</SectionTitle>
                        {(keyPage.steps||DEFAULT_KEY_PAGE.steps).map((s,i)=>(
                          <div key={i} className="bg-black/30 border border-white/5 rounded-lg p-4 space-y-2">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Step {i+1}</p>
                            <Field label="Title">
                              <Input value={s.title} onChange={(e)=>updateStep(i,'title',e.target.value)} className="bg-black/50 border-primary/20"/>
                            </Field>
                            <Field label="Description">
                              <Textarea value={s.description} onChange={(e)=>updateStep(i,'description',e.target.value)} className="bg-black/50 border-primary/20 text-sm h-16"/>
                            </Field>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ── GAMES ─────────────────────────────── */}
                    {activeTab === 'games' && (
                      <div className="space-y-5">
                        <SectionTitle>Games Page</SectionTitle>
                        <Field label="Subtitle text">
                          <Input value={gamesPage.subtitle} onChange={(e)=>setGamesPage({...gamesPage,subtitle:e.target.value})} className="bg-black/50 border-primary/20"/>
                        </Field>

                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                          <SectionTitle>Game Cards</SectionTitle>
                          <Button variant="outline" size="sm" onClick={addGame} className="border-primary/20 text-xs h-8">
                            <Plus size={13} className="mr-1"/> Add Game
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground -mt-2">Paste a direct image URL for the game logo.</p>

                        <div className="space-y-4">
                          {games.map((game,i)=>(
                            <div key={i} className="bg-black/30 border border-white/5 rounded-lg p-4 space-y-3">
                              <div className="flex gap-2">
                                <Input value={game.name} onChange={(e)=>updateGame(i,'name',e.target.value)} className="bg-black/50 border-primary/20 flex-1" placeholder="Game Name"/>
                                <select value={game.status} onChange={(e)=>updateGame(i,'status',e.target.value)}
                                  className="bg-black/50 border border-primary/20 rounded-md px-3 h-10 text-sm w-28 outline-none focus:ring-1 focus:ring-primary/50 text-white">
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                </select>
                                <Button variant="destructive" size="icon" onClick={()=>removeGame(i)} className="h-10 w-10 shrink-0 bg-red-950 hover:bg-red-900 text-red-400 border border-red-900/50">
                                  <Trash2 size={14}/>
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center gap-2">
                                  <LinkIcon size={13} className="text-muted-foreground shrink-0"/>
                                  <Input value={game.link||''} onChange={(e)=>updateGame(i,'link',e.target.value)} className="bg-black/50 border-white/10 text-sm h-9" placeholder="Roblox game URL (optional)"/>
                                </div>
                                <div className="flex items-center gap-2">
                                  {game.logo && <img src={game.logo} alt="" className="w-8 h-8 rounded object-cover border border-white/10 shrink-0" onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}}/>}
                                  <Input value={game.logo||''} onChange={(e)=>updateGame(i,'logo',e.target.value)} className="bg-black/50 border-white/10 text-sm h-9" placeholder="Logo image URL (optional)"/>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── PREMIUM ───────────────────────────── */}
                    {activeTab === 'premium' && (
                      <div className="space-y-5">
                        <SectionTitle>Page Header</SectionTitle>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Title"><Input value={premium.pageTitle} onChange={(e)=>setPrem('pageTitle',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                          <Field label="Highlighted word"><Input value={premium.pageTitleHighlight} onChange={(e)=>setPrem('pageTitleHighlight',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                        </div>
                        <Field label="Subtitle">
                          <Textarea value={premium.pageSubtitle} onChange={(e)=>setPrem('pageSubtitle',e.target.value)} className="bg-black/50 border-primary/20 text-sm h-16"/>
                        </Field>

                        <SectionTitle>Standard Tier</SectionTitle>
                        <div className="grid grid-cols-3 gap-3">
                          <Field label="Name"><Input value={premium.standardName} onChange={(e)=>setPrem('standardName',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                          <Field label="Price"><Input value={premium.standardPrice} onChange={(e)=>setPrem('standardPrice',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                          <Field label="Period"><Input value={premium.standardPeriod} onChange={(e)=>setPrem('standardPeriod',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                        </div>
                        <Field label="Benefits (one per line)">
                          <Textarea value={premium.standardBenefits} onChange={(e)=>setPrem('standardBenefits',e.target.value)} className="bg-black/50 border-primary/20 text-sm h-28"/>
                        </Field>
                        <Field label="Button text">
                          <Input value={premium.standardButtonText} onChange={(e)=>setPrem('standardButtonText',e.target.value)} className="bg-black/50 border-primary/20"/>
                        </Field>

                        <SectionTitle>Premium Tier</SectionTitle>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Name"><Input value={premium.premiumName} onChange={(e)=>setPrem('premiumName',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                          <Field label="Badge label"><Input value={premium.premiumBadge} onChange={(e)=>setPrem('premiumBadge',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Price"><Input value={premium.premiumPrice} onChange={(e)=>setPrem('premiumPrice',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                          <Field label="Period"><Input value={premium.premiumPeriod} onChange={(e)=>setPrem('premiumPeriod',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                        </div>
                        <Field label="Benefits (one per line)">
                          <Textarea value={premium.premiumBenefits} onChange={(e)=>setPrem('premiumBenefits',e.target.value)} className="bg-black/50 border-primary/20 text-sm h-36"/>
                        </Field>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Button text"><Input value={premium.premiumButtonText} onChange={(e)=>setPrem('premiumButtonText',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                          <Field label="Button URL"><Input value={premium.premiumButtonUrl} onChange={(e)=>setPrem('premiumButtonUrl',e.target.value)} className="bg-black/50 border-primary/20 font-mono text-xs" placeholder="#"/></Field>
                        </div>

                        <SectionTitle>"Why Premium" Section</SectionTitle>
                        <Field label="Section title"><Input value={premium.whyTitle} onChange={(e)=>setPrem('whyTitle',e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                        {([
                          ['perk1Title','perk1Desc','Perk 1'],
                          ['perk2Title','perk2Desc','Perk 2'],
                          ['perk3Title','perk3Desc','Perk 3'],
                        ] as [string,string,string][]).map(([tk,dk,label])=>(
                          <div key={tk} className="bg-black/30 border border-white/5 rounded-lg p-4 space-y-2">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{label}</p>
                            <Field label="Title"><Input value={(premium as any)[tk]} onChange={(e)=>setPrem(tk,e.target.value)} className="bg-black/50 border-primary/20"/></Field>
                            <Field label="Description"><Textarea value={(premium as any)[dk]} onChange={(e)=>setPrem(dk,e.target.value)} className="bg-black/50 border-primary/20 text-sm h-16"/></Field>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>

                <div className="p-4 border-t border-primary/10 bg-black/40 flex items-center justify-between shrink-0">
                  <p className="text-xs text-muted-foreground">All changes save automatically.</p>
                  <Button onClick={handleClose} className="bg-primary text-black font-bold px-8 hover:brightness-110">
                    <Save size={14} className="mr-2"/> Done
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-primary border-b border-primary/10 pb-2">{children}</h3>;
}
