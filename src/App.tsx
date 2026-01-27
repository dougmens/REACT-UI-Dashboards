import "./App.css";

/**
 * Minimal-stabile App-Komponente.
 * Zweck:
 * - Build sicher grün bekommen
 * - Keine Router-/View-Abhängigkeiten
 * - Saubere Basis für den nächsten Schritt
 */

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>REACT UI Dashboards</h1>
      <p>Build OK – Routing und Views werden als Nächstes angebunden.</p>
    </div>
  );
}

/**
 * Temporär hier belassen, damit andere Imports nicht brechen.
 * Kann später in ein eigenes Modell-/types-File verschoben werden.
 */
export interface Incident {
  id: string;
  case_id: string;
  type: string;
  description?: string;
  date?: string;
  status?: string;
}
