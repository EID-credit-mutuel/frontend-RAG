import { useState, useEffect, useRef } from 'react';
import { ask } from '../services/api';
import { useProvider } from '../context/ProviderContext';
import type { Message, Step, MessageMeta } from '../types';

const STORAGE_KEY = 'rag-chat-history';

const STEPS: Record<Step, string> = {
  idle: '',
  embedding: 'Vectorisation de la question…',
  searching: 'Recherche des chunks pertinents…',
  generating: 'Génération de la réponse…',
  done: '',
};

function loadHistory(): Message[] {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]'); }
  catch { return []; }
}

export function ChatTab() {
  const [messages, setMessages] = useState<Message[]>(loadHistory);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<Step>('idle');
  const [error, setError] = useState<string | null>(null);
  const [showMeta, setShowMeta] = useState<Record<number, boolean>>({});
  const [wasReset, setWasReset] = useState(() => {
    const flag = sessionStorage.getItem('rag-was-reset');
    if (flag) { sessionStorage.removeItem('rag-was-reset'); return true; }
    return false;
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { provider } = useProvider();

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    function onReset() { setMessages([]); setWasReset(true); }
    window.addEventListener('rag-reset', onReset);
    return () => window.removeEventListener('rag-reset', onReset);
  }, []);

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }

  async function handleSend() {
    if (!input.trim() || step !== 'idle') return;
    const question = input.trim();
    setInput('');
    setError(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    setMessages(prev => [...prev, { role: 'user', content: question, timestamp: Date.now() }]);

    try {
      setStep('embedding');
      await delay(500);
      setStep('searching');
      await delay(500);
      setStep('generating');

      const result = await ask(question, provider);

      const meta: MessageMeta = {
        chunksRetrieved: result.chunksRetrieved,
        scores: result.scores,
        durationMs: result.durationMs,
      };

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: result.answer,
        meta,
        timestamp: Date.now(),
      }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setStep('idle');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function toggleMeta(i: number) {
    setShowMeta(prev => ({ ...prev, [i]: !prev[i] }));
  }

  const busy = step !== 'idle';

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <div className="page-title">AskJo</div>
          <div className="page-subtitle">RAG sur vos documents internes</div>
        </div>
        {messages.length > 0 && (
          <button
            className="btn btn-danger-ghost"
            onClick={() => { setMessages([]); sessionStorage.removeItem(STORAGE_KEY); }}
          >
            🗑 Effacer
          </button>
        )}
      </div>

      <div className="chat-layout">
        <div className="messages-area">
          {messages.length === 0 && (
            <div className="empty-chat">
              <div className="empty-chat-icon">{wasReset ? '🧠' : '💬'}</div>
              <h3>{wasReset ? 'Oupsss j\'ai perdu ma mémoire court terme' : 'Commencez une conversation'}</h3>
              <p>{wasReset ? 'La mémoire courte a été vidée. Vous pouvez ingérer de nouveaux documents dans la tab Configuration.' : 'Posez une question sur vos documents ingérés.'}</p>
              {!wasReset && (
                <div className="suggestions">
                  {['Qui est Jonathan ?', 'Quels sont les loisirs de Jonathan ?', 'Devons-nous le revoir en entretien ?'].map(q => (
                    <button key={q} className="suggestion-chip" onClick={() => setInput(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`message-row ${msg.role}`}>
              <div className={`avatar ${msg.role}`}>
                {msg.role === 'user' ? 'J' : '⚡'}
              </div>
              <div className="message-content">
                <div className="bubble" dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                {msg.meta && (
                  <>
                    <button className="sources-toggle" onClick={() => toggleMeta(i)}>
                      {showMeta[i] ? '▲' : '▼'} {msg.meta.chunksRetrieved} chunk{msg.meta.chunksRetrieved !== 1 ? 's' : ''} · {msg.meta.durationMs} ms
                    </button>
                    {showMeta[i] && (
                      <div className="sources-list">
                        <div className="log-pills">
                          <span className="pill">{msg.meta.chunksRetrieved} chunks récupérés</span>
                          {msg.meta.scores.length > 0 && (
                            <span className="pill">score max {(Math.max(...msg.meta.scores) * 100).toFixed(0)}%</span>
                          )}
                          <span className="pill">{msg.meta.durationMs} ms</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {busy && (
            <div className="message-row assistant">
              <div className="avatar assistant">⚡</div>
              <div className="message-content">
                <div className="bubble typing-bubble">
                  <span className="typing-step">{STEPS[step]}</span>
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {error && <div className="error-banner" style={{ margin: '0 1.75rem 0.75rem' }}>⚠️ {error}</div>}

        <div className="chat-input-area">
          <div className="input-box">
            <textarea
              ref={textareaRef}
              value={input}
              rows={1}
              onChange={e => { setInput(e.target.value); autoResize(); }}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question…"
              disabled={busy}
            />
            <button className="send-btn" onClick={handleSend} disabled={!input.trim() || busy}>
              ↑
            </button>
          </div>
          <div className="input-hint">Entrée pour envoyer · Shift+Entrée pour saut de ligne</div>
        </div>
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n/g, '<br/>');
}
