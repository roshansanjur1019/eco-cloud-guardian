import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CloudAccounts from "./pages/CloudAccounts";
import AddAccount from "./pages/AddAccount";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import { checkSupabaseConnection } from "./lib/supabase-check";
import AdminDashboard from "./pages/admin";
import LandingPage from "./pages/LandingPage";
import { TenantProvider } from "@/contexts/TenantContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("Protected Route State:", { user, loading });
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    console.log("No user found, redirecting to login");
    // Save the current URL to redirect back after login
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  
  // Handle tenant redirects if needed
  useEffect(() => {
    const tenantId = sessionStorage.getItem('tenantId');
    const redirectPath = sessionStorage.getItem('redirectAfterLogin');
    
    // If user logged in and there's a redirect path, navigate there
    if (user && redirectPath) {
      sessionStorage.removeItem('redirectAfterLogin');
      window.location.href = redirectPath;
    }
  }, [user]);
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login isSignUp={true} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cloud-accounts"
        element={
          <ProtectedRoute>
            <CloudAccounts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-account"
        element={
          <ProtectedRoute>
            <AddAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  useEffect(() => {
    console.log("App mounted");
    checkSupabaseConnection().then(isConnected => {
      console.log("Supabase connection check result:", isConnected);
    });
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TenantProvider>
          <AuthProvider>
            <TooltipProvider delayDuration={200}>
              <Toaster />
              <Sonner position="top-right" />
              <AppRoutes />
            </TooltipProvider>
          </AuthProvider>
        </TenantProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
