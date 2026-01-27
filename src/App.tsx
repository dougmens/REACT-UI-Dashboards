<<<<<<< HEAD
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
                <h1>REACT UI Dashboards</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
=======
import React, { useEffect, useState } from 'react';

// Datentypen für dein Pflicht-Datenmodell
export interface Case {
  id: string;
  title: string;
  description?: string;
  client?: string;
  status: 'open' | 'in_progress' | 'closed' | 'on_hold';
  created_at: string;
  updated_at?: string;
  tags?: string[];
>>>>>>> c04f143 (Arbeitsstand Companion-React-Dashboard)
}

export interface Incident {
  id: string;
  case_id: string;
  type: string;
  description?: string;
  date?: string;
  status?: string;
}

export interface Evidence {
  id: string;
  case_id?: string;
  incident_id?: string;
  type: string;
  description?: string;
  source?: string;
  file_ref?: string;
  added_at?: string;
}

export interface ActionLog {
  id: string;
  entity_type: 'case' | 'incident' | 'evidence';
  entity_id: string;
  action_type: string;
  performed_by: 'rechtgpt' | 'user' | string;
  timestamp: string;
  details?: string;
}

export interface CompanionData {
  cases: Case[];
  incidents: Incident[];
  evidence: Evidence[];
  action_logs: ActionLog[];
}

const STATUS_LABELS: Record<Case['status'], string> = {
  open: 'Offen',
  in_progress: 'In Bearbeitung',
  closed: 'Abgeschlossen',
  on_hold: 'Pausiert',
};

const App: React.FC = () => {
  const [data, setData] = useState<CompanionData | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/companion-data.json', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = (await res.json()) as CompanionData;
        setData(json);
        if (json.cases.length > 0) {
          setSelectedCaseId(json.cases[0].id);
        }
        setError(null);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Unbekannter Fehler');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const selectedCase = data?.cases.find((c) => c.id === selectedCaseId) ?? null;
  const incidentsForCase = selectedCase
    ? data?.incidents.filter((i) => i.case_id === selectedCase.id) ?? []
    : [];
  const evidenceForCase = selectedCase
    ? data?.evidence.filter((e) => e.case_id === selectedCase.id ||
        incidentsForCase.some((i) => i.id === e.incident_id)) ?? []
    : [];
  const logsForCase = selectedCase
    ? data?.action_logs.filter((log) => {
        if (log.entity_type === 'case' && log.entity_id === selectedCase.id) return true;
        if (log.entity_type === 'incident' &&
          incidentsForCase.some((i) => i.id === log.entity_id)) return true;
        if (log.entity_type === 'evidence' &&
          evidenceForCase.some((e) => e.id === log.entity_id)) return true;
        return false;
      }) ?? []
    : [];

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Sidebar: Cases */}
      <aside
        style={{
          width: '320px',
          borderRight: '1px solid #e5e7eb',
          padding: '16px',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      >
        <h1 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
          Companion Dashboard – RechtGPT
        </h1>
        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
          Datenquelle: <code>public/companion-data.json</code>
        </p>

        {loading && <p>Lade Daten…</p>}
        {error && !loading && (
          <p style={{ color: '#b91c1c', fontSize: '12px' }}>
            Fehler beim Laden: {error}
          </p>
        )}

        <h2 style={{ fontSize: '14px', fontWeight: 600, marginTop: '16px', marginBottom: '8px' }}>
          Fälle
        </h2>
        {data && data.cases.length === 0 && (
          <p style={{ fontSize: '12px', color: '#6b7280' }}>
            Noch keine Fälle vorhanden. Bitte Companion/Perplexity bitten, Fälle zu exportieren und die JSON-Datei zu aktualisieren.
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data?.cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              style={{
                textAlign: 'left',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: c.id === selectedCaseId ? '#2563eb' : '#e5e7eb',
                backgroundColor: c.id === selectedCaseId ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600 }}>{c.title}</div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>
                {c.client && <span>{c.client} · </span>}
                <span>{STATUS_LABELS[c.status]}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '16px', boxSizing: 'border-box', overflowY: 'auto' }}>
        {!selectedCase && (
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Wähle links einen Fall, um Details, Vorfälle, Beweise und Aktionslogs anzuzeigen.
          </p>
        )}

        {selectedCase && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Case Header */}
            <section>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                {selectedCase.title}
              </h2>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                <span>{selectedCase.client ?? 'Unbekannter Mandant'}</span>
                <span> · Status: {STATUS_LABELS[selectedCase.status]}</span>
                {selectedCase.created_at && (
                  <span> · Angelegt: {new Date(selectedCase.created_at).toLocaleString('de-DE')}</span>
                )}
              </div>
              {selectedCase.description && (
                <p style={{ fontSize: '13px', color: '#374151' }}>{selectedCase.description}</p>
              )}
            </section>

            {/* Incidents */}
            <section>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Vorfälle</h3>
              {incidentsForCase.length === 0 ? (
                <p style={{ fontSize: '12px', color: '#6b7280' }}>
                  Keine Vorfälle für diesen Fall hinterlegt.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {incidentsForCase.map((incident) => (
                    <div
                      key={incident.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        padding: '8px',
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{incident.type}</div>
                      <div style={{ fontSize: '11px', color: '#6b7280' }}>
                        {incident.date && (
                          <span>
                            Datum: {new Date(incident.date).toLocaleString('de-DE')}
                          </span>
                        )}
                        {incident.status && (
                          <span>
                            {incident.date ? ' · ' : ''}Status: {incident.status}
                          </span>
                        )}
                      </div>
                      {incident.description && (
                        <p style={{ fontSize: '12px', color: '#374151', marginTop: '4px' }}>
                          {incident.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Evidence */}
            <section>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Beweise</h3>
              {evidenceForCase.length === 0 ? (
                <p style={{ fontSize: '12px', color: '#6b7280' }}>
                  Keine Beweise für diesen Fall hinterlegt.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {evidenceForCase.map((ev) => (
                    <div
                      key={ev.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        padding: '8px',
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{ev.type}</div>
                      <div style={{ fontSize: '11px', color: '#6b7280' }}>
                        {ev.source && <span>Quelle: {ev.source}</span>}
                        {ev.added_at && (
                          <span>
                            {ev.source ? ' · ' : ''}Hinzugefügt: {new Date(ev.added_at).toLocaleString('de-DE')}
                          </span>
                        )}
                      </div>
                      {ev.description && (
                        <p style={{ fontSize: '12px', color: '#374151', marginTop: '4px' }}>
                          {ev.description}
                        </p>
                      )}
                      {ev.file_ref && (
                        <p style={{ fontSize: '12px', marginTop: '4px' }}>
                          Datei: <code>{ev.file_ref}</code>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Action Logs */}
            <section>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Aktionslog</h3>
              {logsForCase.length === 0 ? (
                <p style={{ fontSize: '12px', color: '#6b7280' }}>
                  Noch keine Aktionen für diesen Fall protokolliert.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {logsForCase
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
                    )
                    .map((log) => (
                      <div
                        key={log.id}
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          paddingBottom: '4px',
                          marginBottom: '4px',
                          fontSize: '12px',
                        }}
                      >
                        <div>
                          <strong>{log.action_type}</strong> durch {log.performed_by} ·{' '}
                          {new Date(log.timestamp).toLocaleString('de-DE')}
                        </div>
                        <div style={{ color: '#6b7280' }}>
                          Entität: {log.entity_type} ({log.entity_id})
                        </div>
                        {log.details && (
                          <div style={{ color: '#374151', marginTop: '2px' }}>{log.details}</div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
