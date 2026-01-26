import React, { createContext, useContext, useMemo, useState } from 'react';
import { AppState, CaseItem, Incident, EvidenceItem, ActionLog } from '../../model/types';
import { loadState, saveState, resetState } from '../../model/storage';

interface StoreContextValue {
  state: AppState;
  updateCase: (caseId: string, updates: Partial<CaseItem>, logText?: string) => void;
  updateIncident: (incidentId: string, updates: Partial<Incident>, logText?: string) => void;
  updateEvidence: (evidenceId: string, updates: Partial<EvidenceItem>, logText?: string) => void;
  archiveCase: (caseId: string) => void;
  archiveIncident: (incidentId: string) => void;
  resetDemo: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const trimLogs = (logs: ActionLog[]): ActionLog[] => {
  if (logs.length <= 200) {
    return logs;
  }
  return logs.slice(logs.length - 200);
};

const addLogEntry = (logs: ActionLog[], entry: ActionLog): ActionLog[] => {
  const updated = [...logs, entry];
  return trimLogs(updated);
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => loadState());

  const persist = (nextState: AppState) => {
    setState(nextState);
    saveState(nextState);
  };

  const updateCase = (caseId: string, updates: Partial<CaseItem>, logText?: string) => {
    const nextCases = state.cases.map((item) =>
      item.id === caseId
        ? { ...item, ...updates, last_update_at: new Date().toISOString() }
        : item,
    );
    const logs = logText
      ? addLogEntry(state.logs, {
          id: `log-${Date.now()}`,
          entity_type: 'case',
          entity_id: caseId,
          at: new Date().toISOString(),
          text: logText,
          author: 'Ich',
        })
      : state.logs;
    persist({ ...state, cases: nextCases, logs });
  };

  const updateIncident = (incidentId: string, updates: Partial<Incident>, logText?: string) => {
    const nextIncidents = state.incidents.map((item) =>
      item.id === incidentId
        ? { ...item, ...updates, last_update_at: new Date().toISOString() }
        : item,
    );
    const logs = logText
      ? addLogEntry(state.logs, {
          id: `log-${Date.now()}`,
          entity_type: 'incident',
          entity_id: incidentId,
          at: new Date().toISOString(),
          text: logText,
          author: 'Ich',
        })
      : state.logs;
    persist({ ...state, incidents: nextIncidents, logs });
  };

  const updateEvidence = (evidenceId: string, updates: Partial<EvidenceItem>, logText?: string) => {
    const nextEvidence = state.evidence.map((item) =>
      item.id === evidenceId ? { ...item, ...updates } : item,
    );
    const logs = logText
      ? addLogEntry(state.logs, {
          id: `log-${Date.now()}`,
          entity_type: 'incident',
          entity_id: evidenceId,
          at: new Date().toISOString(),
          text: logText,
          author: 'Ich',
        })
      : state.logs;
    persist({ ...state, evidence: nextEvidence, logs });
  };

  const archiveCase = (caseId: string) => {
    updateCase(caseId, { status: 'archiv' }, 'Fall archiviert.');
  };

  const archiveIncident = (incidentId: string) => {
    updateIncident(incidentId, { status: 'archiv' }, 'Schaden archiviert.');
  };

  const resetDemo = () => {
    const nextState = resetState();
    setState(nextState);
  };

  const value = useMemo(
    () => ({
      state,
      updateCase,
      updateIncident,
      updateEvidence,
      archiveCase,
      archiveIncident,
      resetDemo,
    }),
    [state],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('StoreProvider missing');
  }
  return ctx;
};
