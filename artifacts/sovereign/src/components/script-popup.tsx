import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Copy, Key, Gamepad2, X } from 'lucide-react';
import sovereignLogo from '@assets/image_1783159506476.png';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface ScriptPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScriptPopup({ isOpen, onClose }: ScriptPopupProps) {
  const [loadstring] = useLocalStorage('sovereign_loadstring', 'loadstring(game:HttpGet("https://sovereigns.dev/loader"))()');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(loadstring);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111111] border border-primary/20 rounded-xl p-6 w-full max-w-lg shadow-2xl pointer-events-auto relative overflow-hidden gold-border-glow"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <img src={sovereignLogo} alt="Sovereign" className="w-8 h-8 object-contain" />
                <h2 className="text-xl font-bold text-foreground">Copy the script</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Copy the script then run it in your Executor</p>

              <div className="bg-black/50 border border-primary/10 rounded-lg p-4 mb-6 font-mono text-sm text-primary/90 break-all select-all shadow-inner">
                {loadstring}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleCopy}
                  className="flex-1 bg-gradient-to-r from-primary to-yellow-600 text-black font-bold hover:brightness-110 border-none relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2 justify-center">
                    <Copy size={16} />
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </Button>

                <Link href="/get-key" onClick={onClose}>
                  <Button variant="outline" className="flex-1 w-full border-primary/20 hover:border-primary/50 hover:bg-primary/10 text-foreground">
                    <Key size={16} className="mr-2" />Get Keys
                  </Button>
                </Link>

                <Link href="/games" onClick={onClose}>
                  <Button variant="outline" className="flex-1 w-full border-primary/20 hover:border-primary/50 hover:bg-primary/10 text-foreground">
                    <Gamepad2 size={16} className="mr-2" />View Games
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
