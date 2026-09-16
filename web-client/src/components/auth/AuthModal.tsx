import { useState, type FormEvent } from 'react';
import { LogIn, UserPlus, X } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (displayName: string, email: string, password: string) => Promise<void>;
  onGoogle: () => Promise<void>;
  onResetPassword: (email: string) => Promise<void>;
}

const defaultDeveloperEmail = import.meta.env.VITE_DEFAULT_ADMIN_EMAIL ?? 'quickcheck.edu@gmail.com';

function getAuthenticationErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'string') {
    const messages: Record<string, string> = {
      'auth/invalid-credential': 'Email or password is incorrect.',
      'auth/user-not-found': 'No account exists for this email address.',
      'auth/wrong-password': 'Email or password is incorrect.',
      'auth/email-already-in-use': 'An account already exists for this email address.',
      'auth/operation-not-allowed': 'Email/password sign-in is not enabled in Firebase Authentication.',
      'auth/invalid-api-key': 'Firebase web configuration is invalid. Check the VITE_FIREBASE values.',
    };
    return messages[error.code] ?? `Authentication failed (${error.code}).`;
  }

  return error instanceof Error ? error.message : 'Unable to complete authentication.';
}

export function AuthModal({ onClose, onLogin, onRegister, onGoogle, onResetPassword }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState(defaultDeveloperEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      if (mode === 'login') await onLogin(email, password);
      else await onRegister(displayName, email, password);
      onClose();
    } catch (authError) {
      console.error('Authentication failed:', authError);
      setError(getAuthenticationErrorMessage(authError));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function resetPassword() {
    try {
      setError(null);
      await onResetPassword(email);
      setError('A password reset email has been sent.');
    } catch (resetError) {
      console.error('Password reset failed:', resetError);
      setError(getAuthenticationErrorMessage(resetError));
    }
  }

  return <div className="auth-modal-backdrop" role="presentation"><section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
    <button className="auth-modal__close" onClick={onClose} aria-label="Close account dialog"><X size={18} /></button>
    <p className="auth-modal__eyebrow">Quick Check account</p><h2 id="auth-title">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
    <form onSubmit={submit}>
      {mode === 'register' && <label>Display name<input value={displayName} required onChange={(event) => setDisplayName(event.target.value)} /></label>}
      <label>Email<input type="email" value={email} required onChange={(event) => setEmail(event.target.value)} /></label>
      <label>Password<input type="password" minLength={6} value={password} required onChange={(event) => setPassword(event.target.value)} /></label>
      {mode === 'login' && <button className="auth-modal__forgot" type="button" onClick={() => void resetPassword()}>Forgot password?</button>}
      {error && <p className="auth-modal__error" role="alert">{error}</p>}
      <button className="auth-modal__submit" disabled={isSubmitting}>{mode === 'login' ? <LogIn size={16} /> : <UserPlus size={16} />}{isSubmitting ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
    </form>
    <button className="auth-modal__google" onClick={() => onGoogle().then(onClose).catch(() => setError('Google sign-in could not be completed.'))}>Continue with Google</button>
    <button className="auth-modal__switch" onClick={() => setMode((current) => current === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}</button>
  </section></div>;
}
