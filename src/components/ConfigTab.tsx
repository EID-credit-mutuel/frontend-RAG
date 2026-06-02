import { useState } from 'react';
import { ingest, reset } from '../services/api';
import { useProvider } from '../context/ProviderContext';
import type { IngestResult } from '../types';

export function ConfigTab() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [logs, setLogs] = useState<IngestResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { provider } = useProvider();

  async function handleReset() {
    if (!confirm('Vider la mémoire courte ? La mémoire longue (données permanentes) sera conservée.')) return;
    setResetting(true);
    setError(null);
    try {
      await reset(provider);
      setLogs([]);
      sessionStorage.removeItem('rag-chat-history');
      sessionStorage.setItem('rag-was-reset', 'true');
      window.dispatchEvent(new Event('rag-reset'));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setResetting(false);
    }
  }

  async function handleIngest() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await ingest(text, provider);
      setLogs(prev => [result, ...prev]);
      setText('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <div className="page-title">Configuration AskJo</div>
          <div className="page-subtitle">Gérez les documents de la base de connaissances</div>
        </div>
        <button
          className="btn btn-danger-ghost"
          onClick={handleReset}
          disabled={resetting || loading}
        >
          {resetting ? '⏳ Suppression…' : '🗑 Vider la mémoire courte'}
        </button>
      </div>

      <div className="config-layout">
        <div className="memory-info">
          <div className="memory-item">
            <span className="memory-badge memory-badge--seed">🌱 Mémoire longue</span>
            <span className="memory-desc">Données permanentes pré-chargées (mon CV, mon profil). Non modifiables.</span>
          </div>
          <div className="memory-item">
            <span className="memory-badge memory-badge--user">📝 Mémoire courte</span>
            <span className="memory-desc">Documents que vous ingérez. Vous pouvez en ajouter et les supprimer via le bouton "Vider la base" en haut à droite.</span>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span>📄</span>
            <span className="card-title">Ajouter un document</span>
          </div>
          <div className="card-body">
            <textarea
              className="doc-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Collez ou tapez votre document ici…"
              rows={8}
              disabled={loading}
            />
            <button
              className="btn btn-primary"
              onClick={handleIngest}
              disabled={loading || !text.trim()}
            >
              {loading ? '⏳ Ingestion…' : '⬆️ Ingérer le document'}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            ⚠️ {error}
          </div>
        )}

        {logs.length > 0 && (
          <div className="card">
            <div className="card-header">
              <span>📋</span>
              <span className="card-title">Logs d'ingestion</span>
            </div>
            <div className="card-body">
              <div className="log-list">
                {logs.map((log, i) => (
                  <div key={i} className="log-row">
                    <span className="log-icon">✓</span>
                    <span className="log-msg">Document ingéré</span>
                    <div className="log-pills">
                      <span className="pill">{log.chunksCount} chunks</span>
                      <span className="pill">{log.totalTokens} tokens</span>
                      <span className="pill">{log.durationMs} ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
