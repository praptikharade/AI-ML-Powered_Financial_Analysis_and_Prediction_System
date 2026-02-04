import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(8, "Password must be at least 8 characters");

type ResetMode = "request" | "update";

export default function ResetPassword() {
  const navigate = useNavigate();
  
  const [mode, setMode] = useState<ResetMode>("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checkingSession, setCheckingSession] = useState(true);

  // Check for recovery session from email link (hash fragment contains access_token)
  useEffect(() => {
    const checkRecoverySession = async () => {
      // Supabase sends recovery links with hash fragments like:
      // #access_token=...&type=recovery&...
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get("type");
      
      if (type === "recovery") {
        // Let Supabase handle the hash and set up the session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          toast({
            variant: "destructive",
            title: "Invalid or expired link",
            description: "Please request a new password reset link.",
          });
          setCheckingSession(false);
          return;
        }
        
        if (data.session) {
          // We have a valid recovery session, show the update password form
          setMode("update");
        }
      }
      
      setCheckingSession(false);
    };

    // Listen for auth state changes (Supabase will fire PASSWORD_RECOVERY event)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("update");
        setCheckingSession(false);
      }
    });

    checkRecoverySession();

    return () => subscription.unsubscribe();
  }, []);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setErrors({ email: result.error.errors[0].message });
      return;
    }

    setLoading(true);
    setErrors({});

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      setSuccess(true);
      toast({
        title: "Check your email",
        description: "We've sent you a password reset link.",
      });
    }

    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      setSuccess(true);
      toast({
        title: "Password updated!",
        description: "Your password has been successfully changed.",
      });
      
      setTimeout(() => navigate("/auth"), 2000);
    }

    setLoading(false);
  };

  // Show loading while checking for recovery session
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-risk-low/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-risk-low" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    {mode === "request" ? "Check Your Email" : "Password Updated!"}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {mode === "request"
                      ? "We've sent a password reset link to your email address."
                      : "Your password has been successfully changed. Redirecting to sign in..."}
                  </p>
                  {mode === "request" && (
                    <Button
                      variant="outline"
                      onClick={() => setSuccess(false)}
                    >
                      Send Another Link
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                      {mode === "request" ? "Forgot Password?" : "Set New Password"}
                    </h1>
                    <p className="text-muted-foreground">
                      {mode === "request"
                        ? "Enter your email and we'll send you a reset link"
                        : "Enter your new password below"}
                    </p>
                  </div>

                  {mode === "request" ? (
                    <form onSubmit={handleRequestReset} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setErrors({});
                            }}
                            className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Send Reset Link
                            <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleUpdatePassword} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setErrors((prev) => ({ ...prev, password: "" }));
                            }}
                            className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                          />
                        </div>
                        {errors.password && (
                          <p className="text-sm text-destructive">{errors.password}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                            }}
                            className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Update Password
                            <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Remember your password?{" "}
                    <button
                      onClick={() => navigate("/auth")}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
