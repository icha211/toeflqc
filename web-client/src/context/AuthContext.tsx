import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onIdTokenChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, type User } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isDeveloper: boolean;
  configurationError: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (displayName: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshClaims: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(firebaseAuth));
  const [isDeveloper, setIsDeveloper] = useState(false);

  useEffect(() => {
    if (!firebaseAuth) {
      return;
    }

    return onIdTokenChanged(firebaseAuth, async (nextUser) => {
      setUser(nextUser);
      setIsDeveloper(nextUser ? (await nextUser.getIdTokenResult()).claims.role === 'developer' : false);
      setIsLoading(false);
    });
  }, []);

  const refreshClaims = useCallback(async () => {
    if (!user) return;
    const token = await user.getIdTokenResult(true);
    setIsDeveloper(token.claims.role === 'developer');
  }, [user]);

  const value: AuthContextValue = {
    user,
    isLoading,
    isDeveloper,
    configurationError: firebaseAuth ? null : 'Firebase authentication is not configured for this environment.',
    signInWithGoogle: async () => {
      if (!firebaseAuth) {
        throw new Error('Firebase authentication is not configured.');
      }

      await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
    },
    signInWithEmail: async (email, password) => {
      if (!firebaseAuth) throw new Error('Firebase authentication is not configured.');
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    },
    registerWithEmail: async (displayName, email, password) => {
      if (!firebaseAuth) throw new Error('Firebase authentication is not configured.');
      const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(credential.user, { displayName });
    },
    resetPassword: async (email) => {
      if (!firebaseAuth) throw new Error('Firebase authentication is not configured.');
      await sendPasswordResetEmail(firebaseAuth, email);
    },
    refreshClaims,
    signOutUser: async () => {
      if (firebaseAuth) {
        await signOut(firebaseAuth);
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return value;
}
