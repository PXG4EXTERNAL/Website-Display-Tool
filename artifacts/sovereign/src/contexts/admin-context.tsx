import { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  setIsAdmin: () => {},
  isAdminOpen: false,
  openAdmin: () => {},
  closeAdmin: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <AdminContext.Provider value={{
      isAdmin,
      setIsAdmin,
      isAdminOpen,
      openAdmin: () => setIsAdminOpen(true),
      closeAdmin: () => setIsAdminOpen(false),
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
