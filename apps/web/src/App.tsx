
import { useState } from "react";

const navigation = [
  { label: "Intelligence Overview", icon: "◈" },
  { label: "Unified Search", icon: "⌕" },
  { label: "Investigations", icon: "◎" },
  { label: "Evidence Vault", icon: "▤" },
  { label: "Intelligence Network", icon: "⌘" },
  { label: "Operations Center", icon: "▦" }
];

export default function App() {
  const [activePage, setActivePage] = useState("Intelligence Overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <strong>AIVORA</strong>
            <span>INTELLIGENCE</span>
          </div>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav>
          {navigation.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${
                activePage === item.label ? "active" : ""
              }`}
              onClick={() => setActivePage(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="status-dot" />
          <div>
            <strong>Local workspace</strong>
            <span>Development environment</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">AIVORA / {activePage}</div>
          <div className="secure-label">
            <span className="status-dot" />
            LOCAL ENVIRONMENT
          </div>
        </header>

        <section className="page-content">
          <div className="eyebrow">INTELLIGENCE WORKSPACE</div>
          <h1>{activePage}</h1>
          <p className="page-description">
            From digital clues to clear intelligence.
          </p>

          <section className="search-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">INVESTIGATION ENTRY</span>
                <h2>Unified Intelligence Search</h2>
              </div>
              <span className="search-symbol">⌕</span>
            </div>

            <p>
              Start with a link, phone number, username, email address, or
              details of a suspected scam. Findings will need source
              verification before they support a conclusion.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (searchQuery.trim()) {
                  setActivePage("Unified Search");
                }
              }}
              className="search-form"
            >
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Enter a public link, phone number, username, or scam details..."
                aria-label="Intelligence search query"
              />
              <button type="submit">Prepare search <span>→</span></button>
            </form>

            <div className="search-note">
              <span>ⓘ</span>
              Search preparation only. Live source connectors are not yet
              configured.
            </div>
          </section>

          <div className="section-title">
            <div>
              <span className="section-kicker">YOUR WORKSPACE</span>
              <h2>Investigation management</h2>
            </div>
            <span className="muted-label">FOUNDATION PHASE</span>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon blue">◎</div>
              <h3>Investigations</h3>
              <p>
                Organize cases, track progress, and preserve a clear history
                of investigative decisions.
              </p>
              <button onClick={() => setActivePage("Investigations")}>
                Open investigations →
              </button>
            </article>

            <article className="feature-card">
              <div className="feature-icon teal">▤</div>
              <h3>Evidence Vault</h3>
              <p>
                Build a traceable evidence workflow with integrity hashes,
                source details, and controlled access.
              </p>
              <button onClick={() => setActivePage("Evidence Vault")}>
                Open evidence →
              </button>
            </article>

            <article className="feature-card">
              <div className="feature-icon gold">⌘</div>
              <h3>Intelligence Network</h3>
              <p>
                Prepare to connect findings across cases while distinguishing
                supported links from hypotheses.
              </p>
              <button onClick={() => setActivePage("Intelligence Network")}>
                Explore network →
              </button>
            </article>
          </div>

          <div className="notice">
            <strong>Evidence-first intelligence</strong>
            <p>
              Similarity is not proof of identity, and a risk indicator is
              not proof of wrongdoing. AIVORA will distinguish observations,
              hypotheses, and verified conclusions.
            </p>
          </div>

          <footer>
            AIVORA Intelligence <span>•</span> Private investigation workspace
            <span>•</span> Local development
          </footer>
        </section>
      </main>
    </div>
  );
}
