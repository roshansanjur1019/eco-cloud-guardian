import React, { createContext, useContext, useState, useEffect } from 'react';

interface Tenant {
  id: string;
  name: string;
}

interface TenantContextType {
  tenant: Tenant | null;
  setTenant: (tenant: Tenant | null) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    // Try to load tenant from sessionStorage on mount
    const stored = sessionStorage.getItem('tenant');
    if (stored) setTenant(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (tenant) {
      sessionStorage.setItem('tenant', JSON.stringify(tenant));
    } else {
      sessionStorage.removeItem('tenant');
    }
  }, [tenant]);

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) throw new Error('useTenant must be used within a TenantProvider');
  return context;
} 