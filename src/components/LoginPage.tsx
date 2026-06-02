import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { verifyKey } from '../services/api';

export function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError(null);
    const valid = await verifyKey(password.trim());
    if (valid) {
      login(password.trim());
    } else {
      setError('Mot de passe incorrect');
    }
    setLoading(false);
  }

  return (
    <div className="login-layout">
      <div className="login-card">
        <div className="login-icon">⚡</div>
        <h1 className="login-title">EID RAG Chat</h1>
        <p className="login-sub">Entrez le mot de passe pour accéder à l'application</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className={`login-input ${error ? 'login-input--error' : ''}`}
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(null); }}
            autoFocus
            disabled={loading}
          />
          {error && <span className="login-error">{error}</span>}
          <button className="btn btn-primary login-btn" type="submit" disabled={!password.trim() || loading}>
            {loading ? 'Vérification…' : 'Accéder'}
          </button>
        </form>
      </div>
    </div>
  );
}
