import React from 'react';
import { addDays, format, parseISO } from 'date-fns';
import { useStore } from '../state/Store';
import { deriveCaseState, kpis } from '../../model/derive';

export const Master: React.FC = () => {
  const { state } = useStore();
  const metrics = kpis(state.cases, state.incidents, state.evidence);

  const focusNow = [...state.cases]
    .filter((item) => item.status !== 'archiv')
    .sort((a, b) => {
      const aCritical = deriveCaseState(a) === 'kritisch' ? 0 : 1;
      const bCritical = deriveCaseState(b) === 'kritisch' ? 0 : 1;
      if (aCritical !== bCritical) {
        return aCritical - bCritical;
      }
      return a.title.localeCompare(b.title);
    })
    .slice(0, 3);

  const upcomingCutoff = addDays(new Date(), 14);
  const deadlineRows = state.cases
    .filter((item) => item.deadline_date && !['archiv', 'erledigt'].includes(item.status))
    .map((item) => ({
      ...item,
      deadline: parseISO(item.deadline_date!),
    }))
    .filter((item) => item.deadline <= upcomingCutoff)
    .sort((a, b) => a.deadline.getTime() - b.deadline.getTime());

  return (
    <div className="screen">
      <header className="screen-header">
        <h1>Master</h1>
        <p>Übersicht ohne Bearbeitung.</p>
      </header>
      <section className="kpi-grid">
        <div className="kpi-card">
          <span>Aktive Fälle</span>
          <strong>{metrics.activeCases}</strong>
        </div>
        <div className="kpi-card">
          <span>Kritische Fälle</span>
          <strong>{metrics.criticalCases}</strong>
        </div>
        <div className="kpi-card">
          <span>Fristen in 14 Tagen</span>
          <strong>{metrics.deadlines14}</strong>
        </div>
        <div className="kpi-card">
          <span>Offene Schäden</span>
          <strong>{metrics.incidentsOpen}</strong>
        </div>
        <div className="kpi-card">
          <span>Beweise ohne Zuordnung</span>
          <strong>{metrics.evidenceUntriaged}</strong>
        </div>
      </section>

      <section className="panel">
        <h2>Fokus JETZT</h2>
        <div className="focus-list">
          {focusNow.map((item) => (
            <div key={item.id} className="focus-item">
              <div>
                <strong>{item.title}</strong>
                <span className="muted">{item.domain} · {item.status}</span>
              </div>
              <div className="focus-action">{item.next_action}</div>
            </div>
          ))}
          {focusNow.length === 0 && <p className="muted">Keine offenen Fälle.</p>}
        </div>
      </section>

      <section className="panel">
        <h2>Deadlines & Risiken</h2>
        <div className="table">
          <div className="table-row table-head">
            <span>Fall</span>
            <span>Frist</span>
            <span>Status</span>
            <span>Risiko</span>
          </div>
          {deadlineRows.map((item) => (
            <div className="table-row" key={item.id}>
              <span>{item.title}</span>
              <span>{item.deadline_date ? format(parseISO(item.deadline_date), 'dd.MM.yyyy') : '-'}</span>
              <span>{item.status}</span>
              <span>{deriveCaseState(item)}</span>
            </div>
          ))}
          {deadlineRows.length === 0 && <p className="muted">Keine Fristen innerhalb von 14 Tagen.</p>}
        </div>
      </section>
    </div>
  );
};
