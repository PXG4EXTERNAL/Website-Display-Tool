import { Navbar } from '@/components/navbar';
import { AdminPanel } from '@/components/admin-panel';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-[#0d0d0d] text-foreground flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />
      <AdminPanel />

      <main className="flex-1 pt-16 relative z-10 flex flex-col">
        {children}
      </main>

      <footer className="py-6 border-t border-white/5 mt-auto relative z-10 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sovereign Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
