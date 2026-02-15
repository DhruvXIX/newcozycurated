"use client";

import { useAuth } from "@/components/AuthProvider";
import { ProfileForm } from "./ProfileForm";
import LoginView from "./LoginView";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-[var(--foreground)] md:text-5xl">
            Join Cozy Curated
          </h1>
          <p className="mt-4 text-base text-[var(--muted-foreground)]">
            Sign in to create your profile and connect with the community.
          </p>
        </div>
        <LoginView />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 animate-fade-in">
      <div className="mb-8 text-center relative">
        <h1 className="text-4xl font-bold tracking-tighter text-[var(--foreground)] md:text-5xl">
          Your Profile
        </h1>
        <p className="mt-4 text-base text-[var(--muted-foreground)]">
          Manage your personal details and preferences.
        </p>
        <button
          onClick={() => logout()}
          className="absolute top-0 right-0 text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-widest border border-red-200 px-3 py-1 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
        >
          Sign Out
        </button>
      </div>

      <ProfileForm user={user} />
    </div>
  );
}

