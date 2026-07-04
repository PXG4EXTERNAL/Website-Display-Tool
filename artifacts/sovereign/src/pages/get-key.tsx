import { motion } from 'framer-motion';
import { ShieldCheck, Link as LinkIcon, CheckCircle2, Crown, Key, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Link } from 'wouter';

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
  // plan cards
  premiumBadge: 'Recommended',
  premiumCardFeatures: 'Instant whitelist\nNo key system\nKeyless on all games',
  premiumCardButtonText: 'Get Premium',
  freeCardTitle: 'Free Key',
  freeCardLabel: 'with ads',
  freeCardFeatures: 'Easy process\nSecure links\nFast delivery',
  freeCardButtonText: 'Get Free Key',
};

const STEP_ICONS = [
  <LinkIcon className="text-primary w-8 h-8" />,
  <ShieldCheck className="text-primary w-8 h-8" />,
  <CheckCircle2 className="text-primary w-8 h-8" />,
];

export default function GetKey() {
  const [keyPage] = useLocalStorage('sovereign_key_page', DEFAULT_KEY_PAGE);
  const [premium] = useLocalStorage('sovereign_premium', { premiumPrice: '$4.99', premiumPeriod: '/ month' } as any);

  const premiumFeatures = (keyPage.premiumCardFeatures || DEFAULT_KEY_PAGE.premiumCardFeatures).split('\n').filter(Boolean);
  const freeFeatures    = (keyPage.freeCardFeatures    || DEFAULT_KEY_PAGE.freeCardFeatures).split('\n').filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full">
            <Key className="w-7 h-7 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-3">
          {keyPage.title}{' '}<span className="text-primary gold-glow">{keyPage.titleHighlight}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">{keyPage.subtitle}</p>
      </motion.div>

      {/* Plan cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-20">

        {/* Premium card */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="bg-black/50 border border-primary/50 rounded-3xl p-8 flex flex-col relative overflow-hidden gold-border-glow shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-primary to-yellow-600" />

          {keyPage.premiumBadge && (
            <div className="flex justify-end mb-4 relative z-10">
              <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-primary/30">
                ★ {keyPage.premiumBadge}
              </span>
            </div>
          )}

          <div className="flex justify-center mb-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Crown className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-primary text-center mb-2 gold-glow">Premium</h3>
          <div className="flex items-end justify-center gap-1 mb-6 relative z-10">
            <span className="text-3xl font-bold text-white">{premium?.premiumPrice || '$4.99'}</span>
            <span className="text-muted-foreground mb-1">{premium?.premiumPeriod || '/ month'}</span>
          </div>

          <div className="space-y-3 flex-1 mb-6 relative z-10">
            {premiumFeatures.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={15} className="text-primary shrink-0 stroke-[3]" />
                <span className="text-gray-200 text-sm">{f}</span>
              </div>
            ))}
          </div>

          <Link href="/premium" className="relative z-10">
            <Button className="w-full h-12 font-bold bg-gradient-to-r from-primary to-yellow-600 text-black hover:brightness-110 border-none relative overflow-hidden group rounded-xl">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                <Crown size={18} className="fill-black/20" />
                {keyPage.premiumCardButtonText || DEFAULT_KEY_PAGE.premiumCardButtonText}
              </span>
            </Button>
          </Link>
        </motion.div>

        {/* Free Key card */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#111111] border border-white/10 rounded-3xl p-8 flex flex-col"
        >
          <div className="h-8 mb-4" /> {/* spacer to align with premium badge */}

          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Key className="w-8 h-8 text-white/70" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white text-center mb-2">
            {keyPage.freeCardTitle || DEFAULT_KEY_PAGE.freeCardTitle}
          </h3>
          <div className="flex items-end justify-center gap-2 mb-6">
            <span className="text-3xl font-bold text-green-400">Free</span>
            <span className="text-muted-foreground mb-1">{keyPage.freeCardLabel || DEFAULT_KEY_PAGE.freeCardLabel}</span>
          </div>

          <div className="space-y-3 flex-1 mb-6">
            {freeFeatures.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={15} className="text-white/50 shrink-0" />
                <span className="text-gray-400 text-sm">{f}</span>
              </div>
            ))}
          </div>

          <Link href="/key-system">
            <Button variant="outline" className="w-full h-12 font-bold border-white/20 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-white rounded-xl transition-all">
              <Key size={16} className="mr-2" />
              {keyPage.freeCardButtonText || DEFAULT_KEY_PAGE.freeCardButtonText}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Steps — below the plan cards */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 className="text-xl font-bold text-center text-white mb-8 uppercase tracking-widest text-muted-foreground">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {(keyPage.steps || DEFAULT_KEY_PAGE.steps).map((step, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-[#111111] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-primary/30 transition-colors relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />
              <div className="absolute top-4 left-4 text-4xl font-black text-white/5">0{index + 1}</div>
              <div className="w-16 h-16 rounded-2xl bg-black/50 border border-primary/20 flex items-center justify-center mb-6 shadow-inner relative z-10">
                {STEP_ICONS[index]}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
              <p className="text-sm text-muted-foreground relative z-10">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
