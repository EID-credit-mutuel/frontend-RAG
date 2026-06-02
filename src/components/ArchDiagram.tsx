function Tag({ label }: { label: string }) {
  return <span className="arch-tag">{label}</span>;
}

function Arrow({ label, vertical = false }: { label: string; vertical?: boolean }) {
  if (vertical) return (
    <div className="arch-v-arrow">
      <span className="arch-v-arrow-label">{label}</span>
      <span className="arch-v-arrow-tip">↓</span>
    </div>
  );
  return (
    <div className="arch-h-arrow">
      <span className="arch-h-arrow-label">{label}</span>
      <div className="arch-h-arrow-line"><span>▶</span></div>
    </div>
  );
}

export function ArchDiagram() {
  return (
    <div className="arch-container">

      {/* GitHub Pages */}
      <div className="arch-host">
        <div className="arch-host-label">⬡ GitHub Pages</div>
        <div className="arch-host-body">
          <div className="arch-box arch-box--blue">
            <div className="arch-box-title-row">
              <div className="arch-box-title">⚛️ Frontend React</div>
              <div className="arch-box-sub">vibe codé</div>
            </div>
            <div className="arch-tags">
              <Tag label="React 19" />
              <Tag label="Vite 8" />
              <Tag label="TypeScript" />
              <Tag label="CI/CD Actions" />
            </div>
          </div>
        </div>
      </div>

      <Arrow label="HTTPS · POST /ask · X-Api-Key" />

      {/* VPS Ionos */}
      <div className="arch-host">
        <div className="arch-host-label">🖥️ VPS Ionos · Docker · Caddy TLS</div>
        <div className="arch-host-body">
          <div className="arch-vps-stack">

            <div className="arch-box arch-box--gray">
              <div className="arch-box-title-row">
                <div className="arch-box-title">🛡️ Middleware C#</div>
                <div className="arch-box-sub">codé manuellement avec assistance IA · commit GitHub</div>
              </div>
              <div className="arch-tags">
                <Tag label="X-Api-Key" />
                <Tag label="CORS" />
                <Tag label="OPTIONS preflight" />
              </div>
            </div>

            <Arrow label="" vertical />

            <div className="arch-box arch-box--blue">
              <div className="arch-box-title-row">
                <div className="arch-box-title">⚙️ Backend C# .NET 8</div>
                <div className="arch-box-sub">codé manuellement avec assistance IA · commit GitHub</div>
              </div>
              <div className="arch-tags">
                <Tag label="RAG" />
                <Tag label="Chunking" />
                <Tag label="Tokenisation" />
                <Tag label="Vector Store" />
                <Tag label="Similarité cosinus" />
                <Tag label="Pattern Strategy + Factory" />
                <Tag label="IEmbeddingService" />
                <Tag label="IChatService" />
              </div>
            </div>

            <Arrow label="" vertical />

            <div className="arch-box arch-box--green">
              <div className="arch-box-title">🗄️ Elasticsearch 9</div>
              <div className="arch-tags">
                <Tag label="dense_vector 1024 dims" />
                <Tag label="kNN Search" />
                <Tag label="Similarité cosinus" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Arrow label="Embedding + Chat API" />

      {/* External LLM */}
      <div className="arch-host">
        <div className="arch-host-label">☁️ APIs externes</div>
        <div className="arch-host-body">
          <div className="arch-vps-stack">
            <div className="arch-box arch-box--purple">
              <div className="arch-box-title">🟠 Mistral AI</div>
              <div className="arch-tags">
                <Tag label="mistral-embed" />
                <Tag label="Chat" />
              </div>
            </div>
            <div style={{ height: '0.5rem' }} />
            <div className="arch-box arch-box--purple">
              <div className="arch-box-title">🟣 Claude Opus</div>
              <div className="arch-tags">
                <Tag label="Chat" />
                <Tag label="Anthropic API" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
