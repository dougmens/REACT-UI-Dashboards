/**
 * CASES (Rechtsfälle)
 * Platzhalter-Dashboard für Fälle
 * Datenanbindung folgt über companion-json-v2 (events/entities)
 */

export default function Cases() {
  return (
    <div style={{ maxWidth: 960 }}>
      <h1>Rechtsfälle</h1>

      <p>
        Übersicht aller laufenden und archivierten Fälle.
        Aktuell Demo-Modus (keine Daten angebunden).
      </p>

      <hr />

      <h2>Aktive Fälle</h2>
      <ul>
        <li>
          <b>Räumung Pullach</b> — Status: Termin ausstehend
        </li>
      </ul>

      <h2>Archiv</h2>
      <p style={{ opacity: 0.7 }}>Noch keine archivierten Fälle.</p>

      <hr />

      <p style={{ fontSize: 12, opacity: 0.7 }}>
        Quelle künftig: <code>entities.cases</code> · Änderungen über{" "}
        <code>UPDATE_DASHBOARD_DATA</code>
      </p>
    </div>
  );
}
