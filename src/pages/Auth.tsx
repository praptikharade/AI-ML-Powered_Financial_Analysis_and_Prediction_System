import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, Building2, Briefcase, Eye, EyeOff, Check, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const emailSchema = z.string().email("Please enter a valid email address");

// Password criteria for signup
const passwordCriteria = [
  { key: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { key: "uppercase", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { key: "lowercase", label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { key: "number", label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { key: "special", label: "One special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

type AuthMode = "signin" | "signup";
type AppRole = "borrower" | "lender";

export default function Auth() {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>("signin");
  const [role, setRole] = useState<AppRole>("borrower");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Compute password validity for each criterion
  const passwordStatus = useMemo(() => {
    return passwordCriteria.map((c) => ({
      ...c,
      met: c.test(password),
    }));
  }, [password]);

  const allCriteriaMet = passwordStatus.every((c) => c.met);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    if (mode === "signin") {
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
    } else {
      // Signup: all criteria must pass
      if (!allCriteriaMet) {
        newErrors.password = "Password does not meet all criteria";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            variant: "destructive",
            title: "Sign in failed",
            description: error.message === "Invalid login credentials" 
              ? "Invalid email or password. Please try again."
              : error.message,
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          navigate("/dashboard");
        }
      } else {
        const { error } = await signUp(email, password, role, firstName, lastName);
        if (error) {
          let description = error.message;
          if (error.message.includes("already registered")) {
            description = "This email is already registered. Please sign in instead.";
          }
          toast({
            variant: "destructive",
            title: "Sign up failed",
            description,
          });
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account.",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            {/* Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-muted rounded-xl p-1">
                <button
                  onClick={() => setMode("signin")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    mode === "signin"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    mode === "signup"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Auth Card */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
              <div className="text-center mb-8">
                <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                  {mode === "signin" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-muted-foreground">
                  {mode === "signin"
                    ? "Sign in to access your dashboard"
                    : "Join ClariFin to get started"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {mode === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Role Selection */}
                      <div className="space-y-3">
                        <Label>I am a</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setRole("borrower")}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                              role === "borrower"
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <Building2 className={`h-5 w-5 ${role === "borrower" ? "text-primary" : "text-muted-foreground"}`} />
                            <div className="text-left">
                              <div className={`font-medium ${role === "borrower" ? "text-primary" : "text-foreground"}`}>
                                Borrower
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Apply for loans
                              </div>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setRole("lender")}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                              role === "lender"
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <Briefcase className={`h-5 w-5 ${role === "lender" ? "text-primary" : "text-muted-foreground"}`} />
                            <div className="text-left">
                              <div className={`font-medium ${role === "lender" ? "text-primary" : "text-foreground"}`}>
                                Lender
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Review assessments
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="John"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}

                  {/* Password Criteria (only on signup) */}
                  {mode === "signup" && password.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-1.5 bg-muted/50 rounded-lg p-3"
                    >
                      {passwordStatus.map((criterion) => (
                        <div
                          key={criterion.key}
                          className={`flex items-center gap-2 text-xs ${
                            criterion.met ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                          }`}
                        >
                          {criterion.met ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                          {criterion.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Submit Button */}
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
                      {mode === "signin" ? "Sign In" : "Create Account"}
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Forgot Password Link */}
              {mode === "signin" && (
                <div className="text-center">
                  <Link
                    to="/reset-password"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}

              {/* Footer Text */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                {mode === "signin" ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setMode("signup")}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setMode("signin")}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
