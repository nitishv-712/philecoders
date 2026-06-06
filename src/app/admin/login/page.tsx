"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin");
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <Loader2 className="animate-spin text-[#7c3aed]" size={40} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center pt-24 pb-12 px-5 sm:px-8 relative dot-grid" style={{ background: "var(--bg)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />

        <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl border shadow-2xl transition-all duration-300"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
            style={{ background: "linear-gradient(90deg, #0170f4, #7c3aed)" }} />

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
              Admin <span className="gradient-text">Login</span>
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Sign in to manage PhileCoders insights and articles
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{ color: "var(--text-faint)" }}>
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="admin@philecoders.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    color: "var(--text-primary)"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--input-border)")}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{ color: "var(--text-faint)" }}>
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    color: "var(--text-primary)"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--input-border)")}
                />
              </div>
            </div>

            {error && (
              <p className="text-xs font-semibold text-red-500 text-center bg-red-50/80 p-2.5 rounded-xl border border-red-100">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-2xl text-white text-sm font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)", boxShadow: "0 10px 25px rgba(124,58,237,0.2)" }}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t pt-5" style={{ borderColor: "var(--border-soft)" }}>
            <Link href="/" className="text-xs font-semibold transition-colors hover:text-[#7c3aed]" style={{ color: "var(--text-muted)" }}>
              ← Return to homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
