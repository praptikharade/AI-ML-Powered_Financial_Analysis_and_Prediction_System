import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'borrower' | 'lender';

interface Profile {
  id: string;
  user_id: string;
  role: AppRole;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, role: AppRole, firstName?: string, lastName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

type PendingSignupProfile = {
  email: string;
  role: AppRole;
  first_name: string | null;
  last_name: string | null;
};

const PENDING_SIGNUP_KEY = 'clarifin.pending_signup_profile';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const readPendingSignup = (): PendingSignupProfile | null => {
    try {
      const raw = localStorage.getItem(PENDING_SIGNUP_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as PendingSignupProfile;
    } catch {
      return null;
    }
  };

  const clearPendingSignup = () => {
    try {
      localStorage.removeItem(PENDING_SIGNUP_KEY);
    } catch {
      // ignore
    }
  };

  const savePendingSignup = (pending: PendingSignupProfile) => {
    try {
      localStorage.setItem(PENDING_SIGNUP_KEY, JSON.stringify(pending));
    } catch {
      // ignore
    }
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data as Profile | null;
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Defer profile fetch with setTimeout to prevent deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id).then(async (p) => {
              // If the user just verified/logged in after signup, their profile may not exist yet.
              // Create it lazily using the stored pending signup info.
              if (!p) {
                const pending = readPendingSignup();
                if (pending && pending.email?.toLowerCase() === session.user.email?.toLowerCase()) {
                  const { error: profileError } = await supabase.from('profiles').insert({
                    user_id: session.user.id,
                    role: pending.role,
                    first_name: pending.first_name,
                    last_name: pending.last_name,
                    email: pending.email,
                  });

                  if (profileError) {
                    console.error('Error creating profile:', profileError);
                  } else {
                    // Also create user_roles entry
                    const { error: roleError } = await supabase.from('user_roles').insert({
                      user_id: session.user.id,
                      role: pending.role,
                    });
                    if (roleError) {
                      console.error('Error creating user role:', roleError);
                    }
                    clearPendingSignup();
                    p = await fetchProfile(session.user.id);
                  }
                }
              }

              setProfile(p);
            });
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then((profile) => {
          setProfile(profile);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    role: AppRole,
    firstName?: string,
    lastName?: string
  ) => {
    const redirectUrl = `${window.location.origin}/`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      return { error };
    }

    // IMPORTANT:
    // If email confirmation is enabled, the user won't have a session yet.
    // In that case, inserting into `profiles` will fail RLS (auth.uid() is null).
    // So we store the intended profile data and create the profile on first real login.
    savePendingSignup({
      email,
      role,
      first_name: firstName || null,
      last_name: lastName || null,
    });

    // If the project is configured to auto-confirm email, we may already have a session.
    // Try to create the profile immediately (and clear pending info) in that case.
    if (data.user) {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user?.id === data.user.id) {
        const { error: profileError } = await supabase.from('profiles').insert({
          user_id: data.user.id,
          role,
          first_name: firstName || null,
          last_name: lastName || null,
          email,
        });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          // keep pending so it can be retried on first login
          return { error: profileError };
        }

        const { error: roleError } = await supabase.from('user_roles').insert({
          user_id: data.user.id,
          role,
        });
        if (roleError) {
          console.error('Error creating user role:', roleError);
        }

        clearPendingSignup();
      }
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
