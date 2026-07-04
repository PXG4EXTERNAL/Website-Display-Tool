import { motion } from 'framer-motion';
import { Crown, Check, Infinity, Shield, Rocket, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAdmin } from '@/contexts/admin-context';

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

export default function Premium() {
  const [p] = useLocalStorage('sovereign_premium', DEFAULT_PREMIUM);
  const { isAdmin, openAdmin } = useAdmin();

  const stdBenefits  = (p.standardBenefits  || DEFAULT_PREMIUM.standardBenefits).split('\n').filter(Boolean);
  const premBenefits = (p.premiumBenefits    || DEFAULT_PREMIUM.premiumBenefits).split('\n').filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full">
            <Crown className="w-8 h-8 text-primary" />
          </div>
          {isAdmin && (
            <button onClick={openAdmin} title="Edit premium page"
              className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors">
              <Pencil size={16} />
            </button>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
          {p.pageTitle}{' '}<span className="text-primary gold-glow">{p.pageTitleHighlight}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{p.pageSubtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Standard */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#111111] border border-white/10 rounded-3xl p-8 flex flex-col">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">{p.standardName}</h3>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold text-white">{p.standardPrice}</span>
              <span className="text-muted-foreground mb-1">{p.standardPeriod}</span>
            </div>
          </div>
          <div className="space-y-4 flex-1 mb-8">
            {stdBenefits.map((b, i) => <FeatureItem key={i} text={b} />)}
          </div>
          <Button variant="outline" className="w-full h-12 border-white/20 hover:bg-white/5 text-white" disabled>
            {p.standardButtonText}
          </Button>
        </motion.div>

        {/* Premium */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="bg-black/50 border border-primary/50 rounded-3xl p-8 flex flex-col relative overflow-hidden gold-border-glow transform md:-translate-y-4 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-primary to-yellow-600" />
          {p.premiumBadge && (
            <div className="absolute top-8 right-8">
              <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-primary/30">
                {p.premiumBadge}
              </span>
            </div>
          )}
          <div className="mb-8 relative z-10">
            <h3 className="text-2xl font-bold text-primary mb-2 gold-glow">{p.premiumName}</h3>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold text-white">{p.premiumPrice}</span>
              <span className="text-muted-foreground mb-1">{p.premiumPeriod}</span>
            </div>
          </div>
          <div className="space-y-4 flex-1 mb-8 relative z-10">
            {premBenefits.map((b, i) => <FeatureItem key={i} text={b} premium />)}
          </div>
          <a href={p.premiumButtonUrl || '#'} target={p.premiumButtonUrl && p.premiumButtonUrl !== '#' ? '_blank' : undefined} rel="noopener noreferrer" className="z-10">
            <Button className="w-full h-14 text-base font-bold bg-gradient-to-r from-primary to-yellow-600 text-black hover:brightness-110 border-none relative overflow-hidden group rounded-xl">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                <Crown size={20} className="fill-black/20" />
                {p.premiumButtonText}
              </span>
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Why section */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold text-center text-white mb-12">{p.whyTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <PremiumPerk icon={<Infinity className="w-8 h-8 text-primary" />} title={p.perk1Title} description={p.perk1Desc} />
          <PremiumPerk icon={<Rocket    className="w-8 h-8 text-primary" />} title={p.perk2Title} description={p.perk2Desc} />
          <PremiumPerk icon={<Shield    className="w-8 h-8 text-primary" />} title={p.perk3Title} description={p.perk3Desc} />
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text, premium = false }: { text: string; premium?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${premium ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/50'}`}>
        <Check size={14} className={premium ? 'stroke-[3]' : ''} />
      </div>
      <span className={premium ? 'text-gray-200 font-medium' : 'text-gray-400'}>{text}</span>
    </div>
  );
}

function PremiumPerk({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center hover:border-primary/20 transition-colors">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">{icon}</div>
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
