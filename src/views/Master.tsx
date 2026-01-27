import { VIEWS_ORDER } from "./viewsOrder";

/**
 * MASTER (Startseite)
 * Zweck:
 * - Einstiegspunkt für das Dashboard
 * - Zeigt Status + Navigation (ohne echtes UI-Framework, build-sicher)
 * - Bereitet die spätere Anbindung an companion-json-v2 (events/entities) vor
 */

export default function Master() {
  return (
    <div style={{ padding: 16, maxWidth: 960 }}>
      <h1 style={{ margin: "0 0 8px 0" }}>Master</h1>
      <p style={{ marginTop: 0 }}>
        Dashboard läuft. Routing ist aktiv. Nächster Schritt: Daten (events/entities) anbinden.
      </p>

      <hr />

      <h2 style={{ margin: "16px 0 8px 0" }}>Schnellnavigation</h2>
      <ul style={{ marginTop: 0 }}>
        {VIEWS_ORDER.map((v) => (
          <li key={v.key} style={{ marginBottom: 6 }}>
            <a href={`#${v.path}`}>{v.label}</a>
            <span style={{ opacity: 0.7 }}> — {v.path}</span>
          </li>
        ))}
      </ul>

      <hr />

      <h2 style={{ margin: "16px 0 8px 0" }}>Status</h2>
      <ul style={{ marginTop: 0 }}>
        <li>
          <b>Deploy:</b> GitHub Pages (Vite base gesetzt)
        </li>
        <li>
          <b>Router:</b> HashRouter (Deep-Links über <code>#/…</code>)
        </li>
        <li>
          <b>Views:</b> Platzhalter, verdrahtet über <code>VIEWS_ORDER</code>
        </li>
        <li>
          <b>Daten:</b> noch Demo/leer – Anbindung folgt über <code>companion-json-v2</code>
        </li>
      </ul>

      <hr />

      <h2 style={{ margin: "16px 0 8px 0" }}>Nächste Umsetzung</h2>
      <ol style={{ marginTop: 0 }}>
        <li>
          Sidebar/Layout-Komponente bauen (Navigation aus <code>VIEWS_ORDER</code>)
        </li>
        <li>
          Local Storage Modell fixieren: <code>events</code> (Wahrheit) + <code>entities</code>{" "}
          (Snapshot)
        </li>
        <li>
          Intents-Handler: <code>UPDATE_DASHBOARD_DATA</code> → persistieren → <code>SHOW_DASHBOARD</code>
        </li>
      </ol>
    </div>
  );
}
