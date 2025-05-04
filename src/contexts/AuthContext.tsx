import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';

interface AuthContextType {
  user: User | null;
  profile: { full_name: string; email: string } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setTenant } = useTenant();

  useEffect(() => {
    // Check active sessions and sets the user
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          // Restore tenant from profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('tenant_id')
            .eq('id', session.user.id)
            .maybeSingle();
          if (profile && profile.tenant_id) {
            const { data: tenantData } = await supabase
              .from('tenants')
              .select('id, name')
              .eq('id', profile.tenant_id)
              .maybeSingle();
            if (tenantData) setTenant(tenantData);
          }
        }
        if (session?.user && window.location.pathname === '/login') {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user && window.location.pathname === '/login') {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, setTenant]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', userId)
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        // No profile found, create one on the fly
        const { data: userData } = await supabase.auth.getUser();
        const tenant = JSON.parse(sessionStorage.getItem('tenant') || 'null');
        if (userData?.user && tenant) {
          const { data: newProfile, error: insertError } = await supabase.from('profiles').insert([
            {
              id: userId,
              email: userData.user.email || '',
              full_name: userData.user.user_metadata?.full_name || '',
              tenant_id: tenant.id,
            }
          ]).select('full_name, email').maybeSingle();
          if (insertError) throw insertError;
          setProfile(newProfile);
          return;
        }
      }
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProfile(user.id);
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data.user) {
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setTenant(null);
      sessionStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 