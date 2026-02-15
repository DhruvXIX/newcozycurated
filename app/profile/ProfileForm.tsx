"use client";

import * as React from "react";
import Image from "next/image";
import { User } from "firebase/auth";
import { ref, onValue, set } from "firebase/database";
import { db } from "@/lib/firebase";

type UserProfile = {
  name: string;
  email: string;
  bio: string;
  role: string;
};

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = React.useState(false); // Default to false if profile exists
  const [loading, setLoading] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  // Form State
  const [name, setName] = React.useState(user.displayName || "");
  const [role, setRole] = React.useState("");
  const [bio, setBio] = React.useState("");

  // Load profile from Realtime Database
  React.useEffect(() => {
    const userRef = ref(db, `users/${user.uid}`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfile(data);
        setName(data.name || user.displayName || "");
        setRole(data.role || "");
        setBio(data.bio || "");
        // If we found data, we are not editing by default
        setIsEditing(false);
      } else {
        // No data, so we are "new" -> default to editing
        setIsEditing(true);
        // Initialize local validation state with auth defaults
        setName(user.displayName || "");
      }
    });

    return () => unsubscribe();
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSaveSuccess(false);

    const newProfile = {
      name,
      email: user.email || "",
      role,
      bio
    };

    try {
      await set(ref(db, `users/${user.uid}`), newProfile);
      setProfile(newProfile);
      setSaveSuccess(true);
      // Short delay before closing edit mode to show success state
      setTimeout(() => {
        setIsEditing(false);
        setSaveSuccess(false);
      }, 800);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  }

  // View Mode
  if (!isEditing && profile) {
    return (
      <div className="glass mt-6 overflow-hidden rounded-3xl p-8 animate-fade-in shadow-xl transition-all relative">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-[var(--accent)]/5 pointer-events-none"></div>

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-white/50 shadow-lg group">
            {user.photoURL ? (
              <Image src={user.photoURL} alt={profile.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[var(--secondary-bg)] text-4xl font-bold text-[var(--accent)]">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 hidden group-hover:flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Placeholder for future upload feature */}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[var(--foreground)] tracking-tight mb-1">{profile.name}</h2>
          <p className="mb-6 font-medium text-[var(--accent)] uppercase tracking-widest text-[10px] bg-[var(--accent)]/5 px-3 py-1 rounded-full">{profile.role || "Member"}</p>

          <p className="max-w-md text-sm leading-relaxed text-[var(--muted-foreground)] mb-8 italic">
            &ldquo;{profile.bio || "No bio yet."}&rdquo;
          </p>

          <div className="flex w-full max-w-sm flex-col gap-3">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--glass-bg)]/80 border border-[var(--glass-border)] shadow-sm">
              <div className="h-8 w-8 rounded-full bg-[var(--secondary-bg)] flex items-center justify-center text-[var(--accent)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Email</span>
                <span className="text-sm font-medium text-[var(--foreground)]">{user.email}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="group mt-10 relative overflow-hidden rounded-full bg-[var(--foreground)] px-8 py-3 text-xs font-bold uppercase tracking-widest text-[var(--primary-bg)] shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
          >
            <span className="relative z-10">Edit Profile</span>
            <div className="absolute inset-0 bg-[var(--accent)] translate-y-full transition-transform group-hover:translate-y-0 duration-300 ease-in-out"></div>
          </button>
        </div>
      </div>
    );
  }

  // Edit Mode
  return (
    <form
      onSubmit={handleSubmit}
      className="glass mt-6 space-y-6 rounded-3xl p-8 shadow-xl transition-all animate-fade-in relative overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none"></div>

      <div className="grid gap-6 md:grid-cols-2 relative z-10">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] ml-1" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/50 px-5 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/30 transition-all shadow-sm"
            placeholder="Jane Doe"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] ml-1" htmlFor="role">
            Role / Profession
          </label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/50 px-5 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/30 transition-all shadow-sm"
            placeholder="Designer, Entrepreneur..."
          />
        </div>
      </div>

      <div className="space-y-1 relative z-10">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] ml-1" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          disabled
          type="email"
          value={user.email || ""}
          className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--secondary-bg)]/50 px-5 py-3.5 text-sm text-[var(--muted-foreground)] outline-none cursor-not-allowed opacity-75"
        />
      </div>

      <div className="space-y-1 relative z-10">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] ml-1" htmlFor="bio">
          Bio & Interests
        </label>
        <textarea
          id="bio"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/50 px-5 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)]/50 outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/30 transition-all shadow-sm resize-none"
          placeholder="Tell us about yourself and what drives you..."
        />
      </div>

      <div className="flex gap-4 pt-4 relative z-10">
        {profile && (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="flex-1 rounded-2xl border border-[var(--foreground)]/20 px-8 py-3.5 text-sm font-bold tracking-wide uppercase text-[var(--muted-foreground)] hover:bg-[var(--foreground)] hover:text-[var(--primary-bg)] transition-colors shadow-sm"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading || saveSuccess}
          className="flex-1 group relative overflow-hidden rounded-2xl bg-[var(--accent)] px-8 py-3.5 text-sm font-bold tracking-wide uppercase text-[var(--accent-foreground)] shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? "Saving..." : (saveSuccess ? "Saved!" : "Save Profile")}
          </span>
          <div className={`absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 ease-out ${!loading && !saveSuccess ? 'group-hover:translate-y-0' : ''}`}></div>
        </button>
      </div>
    </form>
  );
}
