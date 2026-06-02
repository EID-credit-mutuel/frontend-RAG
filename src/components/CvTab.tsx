export function CvTab() {
  return (
    <div className="cv-layout">
      <div className="cv-header">
        <div className="cv-photo-wrap">
          <img src="/photo.jpg" alt="Jonathan Ehrhard" className="cv-photo" />
        </div>
        <div style={{ flex: 1 }}>
          <h1 className="cv-name">Jonathan Ehrhard</h1>
          <div className="cv-title">Analyste Développeur Full-Stack C# / React · 6 années d'exp.</div>
          <div className="cv-contacts">
            <span>📞 06 61 00 50 39</span>
            <span>✉️ ehrhard.jonathan@gmail.com</span>
            <span>📍 Illkirch-Graffenstaden, France</span>
          </div>
          <a
            href="/CV_EHRHARD_Jonathan_2026.pdf"
            download="CV_EHRHARD_Jonathan_2026.pdf"
            className="btn btn-primary"
            style={{ marginTop: '0.75rem', textDecoration: 'none', display: 'inline-flex' }}
          >
            ⬇️ Télécharger le CV
          </a>
        </div>
      </div>

      <div className="cv-body">
        <div className="cv-col-left">
          <section className="cv-section">
            <div className="cv-section-title">Profil personnel</div>
            <p className="cv-text">
              Fort de mes premières expériences, j'ai développé une double compétence en analyse et développement,
              avec un socle solide en C# .NET et React. Curieux et polyvalent, je m'adapte rapidement aux nouveaux
              environnements et technologies, avec une forte volonté de comprendre les enjeux métier.
            </p>
          </section>

          <section className="cv-section">
            <div className="cv-section-title">Compétences</div>
            <div className="cv-skill-group">
              <div className="cv-skill-label">Confirmé</div>
              <div className="cv-skill-list">
                {[
                  'Backend : C# .NET / ASP.NET Core / EF',
                  'Front: JS / React / Html / js /css',
                  'Data : SQL Server / MySQL',
                  'IA: Analyse de données / intégration d\'API d\'IA / LLM / orchestration / gestion du contexte',
                  'Outils: Git / Postman / VS / VS Code',
                  'Methogologie: Rédaction de specs Agile / Scrum Tests fonctionnels / SIT',
                  'CRM: LWC / Apex / Admin / SOQL',
                ].map(s => (
                  <span key={s} className="cv-skill-pill">{s}</span>
                ))}
              </div>
            </div>
            <div className="cv-skill-group">
              <div className="cv-skill-label">Notions</div>
              <div className="cv-skill-list">
                {['Data: MongoDB / NoSQL', 'Front: Flutter / Angular / Vue', 'Back: Java', 'Outils: Docker / Android Studio'].map(s => (
                  <span key={s} className="cv-skill-pill cv-skill-pill--dim">{s}</span>
                ))}
              </div>
            </div>
            <div className="cv-skill-group">
              <div className="cv-skill-label">Skill additionel</div>
              <div className="cv-skill-list">
                {[
                  'Photoshop, Illustrator, Premiere Pro',
                  'WordPress, Elementor...',
                  'ERP (SAP) + tool integration Mulesoft',
                  'COBOL (initiation)',
                ].map(s => (
                  <span key={s} className="cv-skill-pill cv-skill-pill--dim">{s}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="cv-section">
            <div className="cv-section-title">Formation</div>
            <div className="cv-entry">
              <div className="cv-entry-title">Diplôme d'ingénieur informatique (Bac+5) CNAM</div>
              <div className="cv-entry-sub">Spécialisation en développement logiciel, conception de SI et analyse fonctionnelle formation suivie en alternance.</div>
            </div>
          </section>

          <section className="cv-section">
            <div className="cv-section-title">Langue</div>
            <div className="cv-entry">
              <div className="cv-entry-title">Anglais : Niveau professionnel</div>
              <div className="cv-entry-sub">TOEIC : 820 – 2021, renforcé depuis par 4 ans d'utilisation quotidienne en environnement international (réunions en anglais)</div>
            </div>
            <div className="cv-entry">
              <div className="cv-entry-title">Français : Langue maternelle</div>
            </div>
          </section>

          <section className="cv-section">
            <div className="cv-section-title">Passions</div>
            <div className="cv-skill-list">
              {['Basket / Volley / Padel', 'Paddle / Nature / Randonnée'].map(p => (
                <span key={p} className="cv-skill-pill cv-skill-pill--dim">{p}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="cv-col-right">
          <section className="cv-section">
            <div className="cv-section-title">Expérience professionnelle</div>

            <div className="cv-job">
              <div className="cv-job-title">Analyste, Developpeur et Gestion de projet</div>
              <div className="cv-job-company">Hara consulting (2024 - Auj) - 2,5 ans - Client domaine Santé</div>
              <ul className="cv-job-list">
                <li>Développement de microservices C# / React intégrés à Salesforce, améliorant la performance et la maintenabilité des processus CRM</li>
                <li>Animation occasionnelle de réunions en anglais (remplacement) : daily meetings, réunions d'équipe internationales, coordination autour de bugs complexes et des releases, y compris en contexte à forte pression</li>
                <li>Amélioration de la qualité via mise en place de tests (SIT/UAT) et contribution aux processus CI/CD</li>
                <li>Développement de solutions front-end personnalisées en LWC (equivalent Angular) et back-end en Apex (équivalent C#/Java) au sein de l'écosystème Salesforce</li>
                <li>Implémentation et configuration avancée de Salesforce (administration et développement)</li>
                <li>Gestion du versioning via Git et déploiements multi-environnements avec Copado</li>
                <li><strong>Succès marquant:</strong> Réduction des coûts du projet de migration CRM de 5% en contournant des contraintes techniques majeures via le développement et le déploiement de deux applications sur mesure, avec un delivery de bout en bout et suivi post-production adapté aux besoins métier.</li>
              </ul>
            </div>

            <div className="cv-job">
              <div className="cv-job-title">Analyste, Developpeur et Gestion de projet</div>
              <div className="cv-job-company">Amaris (2022 - 2024) - 2 ans - Client domaine Santé</div>
              <ul className="cv-job-list">
                <li>Maintenance et évolution d'applications en C# (migration de Silverlight vers ASP.NET)</li>
                <li>Migration d'outils personnalisés (C#, React avec architecture Redux) vers SAP Field Service Management</li>
                <li>Développement et intégration d'applications sur mesure en React et C# afin de répondre à des besoins non couverts nativement par SAP FSM</li>
                <li>Conception d'outils de monitoring en C# (applications console) avec intégration complète dans l'environnement Windows (registre, serveur, etc.)</li>
                <li>Gestion du versioning via Git et déploiements multi-environnements</li>
                <li>Recueil et analyse des besoins clients, priorisation des demandes et intégration des contraintes techniques dans la conception des solutions</li>
              </ul>
            </div>

            <div className="cv-job">
              <div className="cv-job-title">Alternance Ingénieur chargé d'études et de développements</div>
              <div className="cv-job-company">Mercedes-Benz Trucks Molsheim - 3 ans (2018 - 2021) + 8 mois intérim (2021 - 2022)</div>
              <ul className="cv-job-list">
                <li>Pilotage de projet MVP en autonomie : cadrage, priorisation, suivi des livrables</li>
                <li>Développement backend PHP et intégration des données SAP via API REST / OData</li>
                <li>Conception et maintenance de la base de données MySQL</li>
                <li>Développement frontend HTML / JavaScript (vanilla + librairies JS)</li>
              </ul>
            </div>
          </section>

          <section className="cv-section">
            <div className="cv-section-title">Projet personnel</div>
            <p className="cv-text">
              Dans une démarche d'amélioration continue, je réalise régulièrement une veille technologique approfondie
              (environ tous les 6 mois), en complément d'une recherche continue, afin d'explorer de nouvelles solutions
              et d'expérimenter des technologies émergentes à travers des projets personnels.
            </p>
            <div className="cv-job">
              <div className="cv-job-title">PaddleToday</div>
              <div className="cv-entry-sub">Développement d'une application mobile (Flutter) avec backend C# .NET 9, architecture semi-microservices et base de données MongoDB</div>
            </div>
            <div className="cv-job">
              <div className="cv-job-title">SeekJobs</div>
              <div className="cv-entry-sub">Développement d'une application exploitant l'IA (OpenAI) pour analyser des CV, extraire et scorer les compétences, et proposer un système de matching automatisé entre candidats et entreprises. Pipeline d'analyse, moteur matching, Rate liming, gestion tokens etc...</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
