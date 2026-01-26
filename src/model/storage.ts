import { AppState, CaseItem, Incident, EvidenceItem } from './types';
import { addDays, formatISO } from 'date-fns';

const STORAGE_KEY = 'companion-system-state';

const nowIso = () => new Date().toISOString();

const seedCase: CaseItem = {
  id: 'case-1',
  title: 'Räumung Pullach',
  domain: 'recht',
  category: 'raeumung',
  status: 'aktiv',
  risk_level: 'hoch',
  next_action: 'Fristverlängerung beim Gericht beantragen.',
  deadline_date: formatISO(addDays(new Date(), 10), { representation: 'date' }),
  deadline_type: 'Einspruch',
  last_update_at: nowIso(),
  owner: 'Ich',
  court: 'AG München',
  file_reference: 'AZ-2024-001',
  counterparty: 'Vermieter GmbH',
  lawyer: 'Kanzlei Lorenz',
};

const seedIncident: Incident = {
  id: 'incident-1',
  title: 'USB-Buchse beschädigt',
  incident_date: formatISO(addDays(new Date(), -4), { representation: 'date' }),
  status: 'offen',
  evidence_strength: 'mittel',
  summary: 'USB-Port am Laptop wackelt seit dem Umzug.\nStecker sitzt locker.\nGerät lädt nur in bestimmter Position.',
  related_case_id: 'case-1',
  last_update_at: nowIso(),
  location: 'Wohnung Pullach',
  estimated_damage_eur: 120,
};

const seedEvidence: EvidenceItem = {
  id: 'evidence-1',
  title: 'Foto USB-Abdeckung',
  type: 'foto',
  source: 'kamera',
  date_created: formatISO(addDays(new Date(), -3), { representation: 'date' }),
  incident_id: 'incident-1',
  is_attachment_ready: false,
  label: 'Nahaufnahme',
};

export const getSeedState = (): AppState => ({
  cases: [seedCase],
  incidents: [seedIncident],
  evidence: [seedEvidence],
  logs: [],
});

export const loadState = (): AppState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return getSeedState();
  }
  try {
    const parsed = JSON.parse(stored) as AppState;
    if (!parsed.cases || !parsed.incidents || !parsed.evidence || !parsed.logs) {
      return getSeedState();
    }
    return parsed;
  } catch {
    return getSeedState();
  }
};

export const saveState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const resetState = () => {
  const state = getSeedState();
  saveState(state);
  return state;
};
