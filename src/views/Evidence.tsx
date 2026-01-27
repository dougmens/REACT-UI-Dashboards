/**
 * EVIDENCE (Schäden & Beweise)
 * Platzhalter-View für Beweis-/Anlagenverwaltung
 * Datenanbindung folgt über companion-json-v2 (events/entities)
 */

export default function Evidence() {
  return (
    <div style={{ maxWidth: 960 }}>
      <h1>Schäden &amp; Beweise</h1>

      <p>
        Sammlung und Strukturierung von Belegen (Fotos, PDFs, Protokolle) pro Fall.
        Aktuell Demo-Modus (keine Daten angebunden).
      </p>

      <hr />

      <h2>Letzte Belege</h2>
      <ul>
        <li>
          <b>Räumung Pullach</b> — „Terminverlegung 15.02.2026“ (Platzhalter)
        </li>
        <li>
          <b>Allgemein</b> — „BeA-Exportprofil: Versandpaket PDF“ (Platzhalter)
        </li>
      </ul>

      <h2>Hinweis</h2>
      <p style={{ opacity: 0.8 }}>
        Später: Upload/Verlinkung, Tagging, Zuordnung zu Fällen, Export-Paket (beA/eBO).
      </p>

      <hr />

      <p style={{ fontSize: 12, opacity: 0.7 }}>
        Quelle künftig: <code>entities.evidence</code> · Änderungen über{" "}
        <code>UPDATE_DASHBOARD_DATA</code>
      </p>
    </div>
  );
}
