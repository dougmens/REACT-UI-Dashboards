/**
 * SETTINGS
 * - lokale Datenverwaltung (LocalStorage)
 * - später: companion-json-v2 Import/Export
 * - Debug-Infos
 */

const LS_KEYS = {
  events: "companion.events",
  entities: "companion.entities",
  meta: "companion.meta",
};

function lsSize(key: string): number {
  try {
    const v = localStorage.getItem(key);
    return v ? v.length : 0;
  } catch {
    return 0;
  }
}

export default function Settings() {
  const eventsBytes = lsSize(LS_KEYS.events);
  const entitiesBytes = lsSize(LS_KEYS.entities);
  const metaBytes = lsSize(LS_KEYS.meta);

  const clearAll = () => {
    if (!confirm("Wirklich ALLE lokalen Dashboard-Daten löschen?")) return;
    localStorage.removeItem(LS_KEYS.events);
    localStorage.removeItem(LS_KEYS.entities);
    localStorage.removeItem(LS_KEYS.meta);
    alert("Lokale Daten gelöscht.");
    location.reload();
  };

  const exportAll = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      keys: LS_KEYS,
      data: {
        events: localStorage.getItem(LS_KEYS.events),
        entities: localStorage.getItem(LS_KEYS.entities),
        meta: localStorage.getItem(LS_KEYS.meta),
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "companion-local-export.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div style={{ maxWidth: 960 }}>
      <h1>Einstellungen</h1>

      <p>
        Diese Dashboard-App verwaltet Daten aktuell <b>nur lokal</b> (LocalStorage). Später folgen Import/Export im
        Format <code>companion-json-v2</code>.
      </p>

      <hr />

      <h2>Lokale Daten</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ddd" }}>Key</th>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ddd" }}>Größe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: 8 }}><code>{LS_KEYS.events}</code></td>
            <td style={{ padding: 8 }}>{eventsBytes} Zeichen</td>
          </tr>
          <tr>
            <td style={{ padding: 8 }}><code>{LS_KEYS.entities}</code></td>
            <td style={{ padding: 8 }}>{entitiesBytes} Zeichen</td>
          </tr>
          <tr>
            <td style={{ padding: 8 }}><code>{LS_KEYS.meta}</code></td>
            <td style={{ padding: 8 }}>{metaBytes} Zeichen</td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
        <button onClick={exportAll} style={{ padding: "10px 12px" }}>
          Export (lokal)
        </button>
        <button onClick={clearAll} style={{ padding: "10px 12px" }}>
          Lokale Daten löschen
        </button>
      </div>

      <hr />

      <h2>Debug</h2>
      <ul>
        <li>
          <b>Routing:</b> HashRouter (<code>#/…</code>)
        </li>
        <li>
          <b>Build:</b> Vite
        </li>
        <li>
          <b>Hinweis:</b> Online-Datenquelle ist noch nicht angebunden.
        </li>
      </ul>

      <p style={{ fontSize: 12, opacity: 0.7 }}>
        Nächster Schritt: <code>events</code> (Wahrheit) + <code>entities</code> (Snapshot) initialisieren und per
        <code>UPDATE_DASHBOARD_DATA</code> aktualisieren.
      </p>
    </div>
  );
}
