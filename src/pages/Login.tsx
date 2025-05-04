import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useTenant } from "@/contexts/TenantContext";

interface LoginProps {
  isSignUp?: boolean;
}

const Login = ({ isSignUp: defaultIsSignUp = false }: LoginProps) => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(defaultIsSignUp);
  const [connectionStatus, setConnectionStatus] = useState<string>("Checking...");
  const [tenantName, setTenantName] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [tenants, setTenants] = useState<{ id: string; name: string }[]>([]);
  const { setTenant } = useTenant();

  useEffect(() => {
    setIsSignUp(defaultIsSignUp);
  }, [defaultIsSignUp]);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
        console.log("Supabase Key length:", import.meta.env.VITE_SUPABASE_ANON_KEY?.length);
        
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Connection error:", error);
          setConnectionStatus("Connection Error: " + error.message);
          return;
        }
        setConnectionStatus("Connected to Supabase");
        console.log("Session check:", data);
      } catch (error) {
        console.error("Failed to check connection:", error);
        setConnectionStatus("Failed to connect");
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    if (isSignUp) {
      // Fetch tenants from Supabase
      supabase.from('tenants').select('id, name').then(({ data }) => {
        if (data) setTenants(data);
      });
    }
  }, [isSignUp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        const user = data.user;
        
        // Create or select tenant
        let tenant = null;
        if (tenantId) {
          tenant = tenants.find(t => t.id === tenantId);
        } else if (tenantName) {
          const { data: newTenant, error: tenantError } = await supabase.from('tenants').insert([{ name: tenantName }]).select().single();
          if (tenantError) throw tenantError;
          tenant = newTenant;
        }
        if (tenant) setTenant(tenant);
        
        // Insert user profile with tenant_id
        if (user && tenant) {
          await supabase.from('profiles').insert([
            {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || '', // or get from form
              tenant_id: tenant.id,
            }
          ]);
        }
        
        toast.success("Account created! Please check your email for verification.");
        setIsSignUp(false);
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Fetch profile to get tenant_id
        const { data: profile } = await supabase
          .from('profiles')
          .select('tenant_id, full_name, email')
          .eq('id', data.user.id)
          .maybeSingle();
        if (profile && profile.tenant_id) {
          // Optionally fetch tenant name
          const { data: tenantData } = await supabase
            .from('tenants')
            .select('id, name')
            .eq('id', profile.tenant_id)
            .maybeSingle();
          if (tenantData) setTenant(tenantData);
        }
        
        console.log("Login response:", data);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <Card className="border-none shadow-xl hover-lift">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-center text-gray-500 dark:text-gray-400">
              {isSignUp ? "Sign up for an account" : "Sign in to your account to continue"}
            </CardDescription>
            <div className="text-sm text-center text-gray-500">
              {connectionStatus}
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {isSignUp && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Organization</Label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={tenantId}
                    onChange={e => setTenantId(e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="">-- Select Existing --</option>
                    {tenants.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">or</span>
                    <Input
                      placeholder="Create new organization"
                      value={tenantName}
                      onChange={e => setTenantName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}
              {!isSignUp && (
                <div className="flex items-center justify-end">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-blue-600 hover:text-blue-700"
                    onClick={() => navigate("/forgot-password")}
                    disabled={isLoading}
                  >
                    Forgot password?
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isSignUp ? "Creating account..." : "Signing in..."}</span>
                  </div>
                ) : (
                  isSignUp ? "Create Account" : "Sign in"
                )}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                    Or
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsSignUp(!isSignUp)}
                disabled={isLoading}
              >
                {isSignUp ? "Already have an account? Sign in" : "Create an account"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
