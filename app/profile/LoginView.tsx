"use client";

import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";

export default function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);

    // Animation state to trigger re-render with animation class
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        // Reset form and trigger animation on mode switch
        setError(null);
        setAnimKey(prev => prev + 1);
    }, [isRegistering]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (err: any) {
            // Friendly error mapping
            let message = err.message;
            if (message.includes("auth/email-already-in-use")) message = "That email is already in use.";
            else if (message.includes("auth/invalid-email")) message = "Please enter a valid email address.";
            else if (message.includes("auth/user-not-found")) message = "No account found with this email.";
            else if (message.includes("auth/wrong-password")) message = "Incorrect password.";

            setError(message.replace("Firebase: ", ""));
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => setIsRegistering(!isRegistering);

    return (
        <div className="w-full max-w-md mx-auto mt-8 md:mt-12 perspective-1000 px-4 sm:px-0">
            <div
                key={animKey}
                className={`glass relative overflow-hidden rounded-3xl p-8 shadow-2xl transition-all duration-500 ${isRegistering ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
            >
                {/* Decorative background element */}
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-2 text-[var(--foreground)] tracking-tight">
                        {isRegistering ? "Create Account" : "Welcome Back"}
                    </h2>
                    <p className="text-center text-[var(--muted-foreground)] mb-8 text-sm">
                        {isRegistering ? "Join our community today" : "Sign in to continue to your profile"}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/50 px-5 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/30 transition-all shadow-sm"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/50 px-5 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/30 transition-all shadow-sm"
                                placeholder="••••••••"
                                minLength={6}
                            />
                        </div>

                        {/* Smooth error message */}
                        {error && (
                            <div className="animate-fade-in p-4 rounded-xl bg-red-50/80 text-red-600 text-sm border border-red-100/50 flex items-start gap-2 shadow-sm backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full overflow-hidden rounded-2xl bg-[var(--accent)] py-3.5 px-4 text-sm font-bold uppercase tracking-widest text-[var(--accent-foreground)] shadow-lg transition-all hover:shadow-[var(--accent)]/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading && <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                {loading ? "Processing..." : (isRegistering ? "Sign Up" : "Sign In")}
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0 duration-300 ease-out"></div>
                        </button>
                    </form>

                    <div className="mt-8 mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[var(--border)] opacity-30"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
                                <span className="px-3 bg-white/80 backdrop-blur text-[var(--muted-foreground)] rounded-full">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={() => signInWithGoogle()}
                            className="mt-6 w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border border-[var(--glass-border)] bg-white/50 hover:bg-white/80 transition-all text-[var(--foreground)] font-medium shadow-sm hover:shadow-md backdrop-blur-md group"
                        >
                            <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>Google</span>
                        </button>
                    </div>

                    <p className="text-center text-sm text-[var(--muted-foreground)]">
                        {isRegistering ? "Already have an account?" : "New to Cozy Curated?"}{" "}
                        <button
                            onClick={toggleMode}
                            className="font-bold text-[var(--accent)] hover:underline focus:outline-none ml-1 transition-colors"
                        >
                            {isRegistering ? "Sign in" : "Create account"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
