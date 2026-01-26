import { addDays, isBefore, parseISO } from 'date-fns';
import { CaseItem, Incident, EvidenceItem } from './types';

export type CaseDerivedState = 'wartend' | 'kritisch' | 'ruhig';

export const deriveCaseState = (item: CaseItem): CaseDerivedState => {
  if (item.status === 'wartet') {
    return 'wartend';
  }
  if (item.risk_level === 'hoch') {
    return 'kritisch';
  }
  if (item.deadline_date) {
    const deadline = parseISO(item.deadline_date);
    const cutoff = addDays(new Date(), 7);
    if (isBefore(deadline, cutoff) || deadline.toDateString() === cutoff.toDateString()) {
      return 'kritisch';
    }
  }
  return 'ruhig';
};

export const countDeadlinesWithin = (cases: CaseItem[], days: number): number => {
  const cutoff = addDays(new Date(), days);
  return cases.filter((item) => {
    if (!item.deadline_date || item.status === 'archiv') {
      return false;
    }
    const deadline = parseISO(item.deadline_date);
    return isBefore(deadline, cutoff) || deadline.toDateString() === cutoff.toDateString();
  }).length;
};

export const countOpenIncidents = (incidents: Incident[]): number =>
  incidents.filter((item) => item.status !== 'archiv' && item.status !== 'abgeschlossen').length;

export const countUnassignedEvidence = (evidence: EvidenceItem[]): number =>
  evidence.filter((item) => !item.case_id && !item.incident_id).length;
