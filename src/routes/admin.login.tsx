import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, UserPlus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { signIn, signUp, loading, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mode, setMode] = useState<"login" | "setup">("login");
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);

  // Check if any admin exists
  useEffect(() => {
    supabase.from("user_roles").select("id").eq("role", "admin").limit(1).then(({ data }) => {
      setHasAdmin(!!data && data.length > 0);
    });
  }, []);

  if (!loading && user && isAdmin) {
    navigate({ to: "/admin/dashboard" });
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err);
      setSubmitting(false);
      return;
    }
    setTimeout(() => navigate({ to: "/admin/dashboard" }), 500);
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    setSubmitting(true);

    // Sign up the admin user
    const { error: signUpErr } = await signUp(email, password);
    if (signUpErr) {
      setError(signUpErr);
      setSubmitting(false);
      return;
    }

    // Sign in immediately
    const { error: signInErr } = await signIn(email, password);
    if (signInErr) {
      setError(signInErr);
      setSubmitting(false);
      return;
    }

    // Get the user and assign admin role
    const { data: { user: newUser } } = await supabase.auth.getUser();
    if (newUser) {
      await supabase.from("user_roles").insert({ user_id: newUser.id, role: "admin" });
      toast.success("Admin account created! Redirecting...");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);
    } else {
      setError("Failed to create admin. Try signing in.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-20">
      <div className="w-full max-w-md bg-card rounded-2xl p-8 gold-border animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
            {mode === "login" ? <Lock className="w-8 h-8 text-primary-foreground" /> : <UserPlus className="w-8 h-8 text-primary-foreground" />}
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            {mode === "login" ? "Admin Login" : "Create Admin"}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {mode === "login" ? "Sign in to manage your restaurant" : "Set up your admin account"}
          </p>
        </div>

        <form onSubmit={mode === "login" ? handleLogin : handleSetup} className="space-y-5">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-xl">{error}</div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="email" placeholder="admin@Masala Mood.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-12 pr-4 py-3.5 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full pl-12 pr-4 py-3.5 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>

          <button type="submit" disabled={submitting} className="w-full bg-gradient-gold text-primary-foreground py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
            {submitting ? (mode === "login" ? "Signing in..." : "Creating account...") : (mode === "login" ? "Sign In" : "Create Admin Account")}
          </button>
        </form>

        {hasAdmin === false && mode === "login" && (
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm mb-2">No admin account exists yet.</p>
            <button onClick={() => setMode("setup")} className="text-primary text-sm font-semibold hover:underline">
              Create your first admin account →
            </button>
          </div>
        )}

        {mode === "setup" && (
          <div className="mt-4 text-center">
            <button onClick={() => setMode("login")} className="text-muted-foreground text-sm hover:text-primary transition-colors">
              ← Back to login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
