import { useState } from 'react';
import styles from './index.module.css';

const illustration = '/login-art-export.png';
const logoMark = '/login-logo-mark.png';
const logoWordmark = '/login-logo-wordmark.png';
const eyeOff = '/login-eye-off.svg';
const checkbox = '/login-checkbox.svg';
const googleIcon = '/login-google.svg';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className={styles.login}>
      <div className={styles.brand} aria-label="Quick Check">
        <img src={logoMark} alt="" />
        <img src={logoWordmark} alt="Quick Check" />
      </div>
      <section className={styles.formPanel} aria-labelledby="login-title">
        <div className={styles.heading}>
          <h1 id="login-title">Login</h1>
          <p>Login to access your Quick Check account</p>
        </div>
        <form className={styles.form} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <div className={styles.fields}>
            <label className={styles.field}>
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label className={styles.field}>
              <span>Password</span>
              <input type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" required />
              <button className={styles.iconButton} type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}>
                <img src={eyeOff} alt="" />
              </button>
            </label>
            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                <img src={checkbox} alt="" />
                <span>Remember me</span>
              </label>
              <button className={styles.linkButton} type="button">Forgot Password</button>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.loginButton} type="submit">Login</button>
            <p>Don’t have an account? <button className={styles.inlineLink} type="button">Sign up</button></p>
            {submitted && <p className={styles.status} role="status">Login details ready to submit.</p>}
          </div>
        </form>
        <div className={styles.divider}><span /> <p>Or login with</p> <span /></div>
        <button className={styles.googleButton} type="button" aria-label="Login with Google"><img src={googleIcon} alt="" /></button>
      </section>
      <section className={styles.artPanel} aria-label="Quick Check security illustration">
        <img className={styles.illustration} src={illustration} alt="A hand holding a phone with a security shield" />
        <div className={styles.dots} aria-hidden="true"><span className={styles.activeDot} /><span /><span /></div>
      </section>
    </main>
  );
}

export default LoginForm;
