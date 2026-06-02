import { ArchDiagram } from './ArchDiagram';

type Tab = 'home' | 'chat' | 'config' | 'cv';

interface Props {
  onNavigate: (tab: Tab) => void;
}

export function HomePage({ onNavigate }: Props) {
  return (
    <div className="home-layout">
      <div className="home-content">

        <div className="home-intro">
          <div className="home-badge">POC RAG · kNN · Embedding · LLM · Vector Store</div>
          <h1 className="home-title">AskJo <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '1rem' }}>RAG demo pour EID</span></h1>
          <p className="home-desc">
            Suite à notre entretien, j'ai reçu un retour sur un manque d'approfondissement technique. Deux solutions s'offraient à moi : attendre et postuler à de nouvelles offres pour la Cognitive Factory, ou agir et vous démontrer concrètement mes capacités techniques.
          </p>
          <p className="home-desc">
            J'ai développé ce POC RAG : un front-end React hébergé sur GitHub Pages, un back-end C# avec middleware d'authentification, connecté à une base Elasticsearch hébergée sur un VPS. Il couvre l'embedding, la tokenisation, la recherche par similarité cosinus et l'intégration multi-LLM. J'ai intégré <span className="home-highlight">Mistral</span> car c'est le modèle que vous utilisez chez EID, et <span className="home-highlight">Claude</span> en complément pour mettre en place un design pattern Factory. <strong>Une réalisation vaut plus que des mots.</strong>
          </p>
          <p className="home-desc">
            Ce projet est une base, je compte approfondir :<br />
            * Le RAG agentique (laisser le modèle raisonner et agir en continu plutôt qu'un simple cycle demande → réponse)<br />
            * La gestion de queues avec Kafka et les architectures multi-utilisateurs
          </p>

        </div>

        <div className="home-section-label">Architecture mise en place</div>
        <ArchDiagram />

        <div className="home-section-label">Actions que vous pouvez réaliser</div>
        <div className="home-sections home-sections--compact">
          <div className="home-section">
            <div className="home-section-header">
              <span className="home-section-icon">⚙️</span>
              <div>
                <div className="home-section-title">Configurer la base de connaissances</div>
                <div className="home-section-sub">À faire avant de chatter</div>
              </div>
            </div>
            <p className="home-section-desc">
              Collez un document texte. L'API le découpe en <strong>chunks token-aware</strong>,
              vectorise via <code>IEmbeddingService</code> (Mistral Embed) et stocke dans Elasticsearch.
            </p>
            <button className="home-btn home-btn-primary" onClick={() => onNavigate('config')}>
              <span>📄</span> Configurer les documents
            </button>
          </div>

          <div className="home-section">
            <div className="home-section-header">
              <span className="home-section-icon">💬</span>
              <div>
                <div className="home-section-title">Discuter avec AskJo</div>
                <div className="home-section-sub">Une fois les documents ingérés</div>
              </div>
            </div>
            <p className="home-section-desc">
              Posez une question en langage naturel. Le système récupère les <strong>top-K chunks</strong> par similarité cosinus
              et génère une réponse ancrée dans vos documents via <code>IChatService</code>.
            </p>
            <button className="home-btn home-btn-secondary" onClick={() => onNavigate('chat')}>
              <span>💬</span> Ouvrir le chat
            </button>
          </div>

          <div className="home-section">
            <div className="home-section-header">
              <span className="home-section-icon">📋</span>
              <div>
                <div className="home-section-title">Mon CV</div>
                <div className="home-section-sub">Profil & expériences</div>
              </div>
            </div>
            <p className="home-section-desc">
              Développeur Full-Stack C# / React avec 6 ans d'expérience. Retrouvez mon parcours, mes compétences et mes projets personnels.
            </p>
            <button className="home-btn home-btn-secondary" onClick={() => onNavigate('cv')}>
              <span>📋</span> Revoir mon CV
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
