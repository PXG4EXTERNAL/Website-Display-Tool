import { motion } from 'framer-motion';
import { ShieldCheck, Link as LinkIcon, CheckCircle2, ArrowRight, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAdmin } from '@/contexts/admin-context';

const DEFAULT_KEY_PAGE = {
  title: 'Get Your',
  titleHighlight: 'Key',
  subtitle: 'Follow the steps below to get your free key and unlock access to all our powerful scripts.',
  buttonText: 'Generate Key',
  steps: [
    { title: 'Click the Get Key Button',  description: 'Click the button below to be redirected to our secure key system.' },
    { title: 'Complete the Steps',        description: 'Follow the short tasks on the key page to verify you are human.' },
    { title: 'Enjoy the Script',          description: 'Copy your generated key, paste it into the UI, and you are ready to go.' },
  ],
};

const STEP_ICONS = [
  <LinkIcon className="text-primary w-8 h-8" />,
  <ShieldCheck className="text-primary w-8 h-8" />,
  <CheckCircle2 className="text-primary w-8 h-8" />,
];

export default function GetKey() {
  const [keyUrl]  = useLocalStorage('sovereign_key_url', 'https://jnkie.com/get-key/pxgkey');
  const [keyPage] = useLocalStorage('sovereign_key_page', DEFAULT_KEY_PAGE);
  const { isAdmin, openAdmin } = useAdmin();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-24">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            {keyPage.title}{' '}
            <span className="text-primary gold-glow">{keyPage.titleHighlight}</span>
          </h1>
          {isAdmin && (
            <button onClick={openAdmin} title="Edit key page in admin panel"
              className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors">
              <Pencil size={16} />
            </button>
          )}
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{keyPage.subtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {(keyPage.steps || DEFAULT_KEY_PAGE.steps).map((step, index) => (
          <motion.div key={index}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
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

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="flex justify-center">
        <a href={keyUrl} target="_blank" rel="noopener noreferrer">
          <Button className="h-16 px-12 text-lg font-bold bg-gradient-to-r from-primary to-yellow-600 text-black hover:brightness-110 border-none relative overflow-hidden group shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-all rounded-xl">
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative flex items-center justify-center gap-3">
              {keyPage.buttonText}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </a>
      </motion.div>
    </div>
  );
}
