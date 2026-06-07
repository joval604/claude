import React from 'react';
import { Status } from '../types';

const colors: Record<Status, string> = {
  'Not Started': '#6b7280',
  'In Progress': '#3b82f6',
  'On Hold': '#f59e0b',
  'Completed': '#10b981',
  'At Risk': '#ef4444',
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span style={{
      backgroundColor: colors[status],
      color: '#fff',
      padding: '2px 10px',
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  );
}

export function StatusSelect({ value, onChange }: { value: Status; onChange: (s: Status) => void }) {
  const statuses: Status[] = ['Not Started', 'In Progress', 'On Hold', 'Completed', 'At Risk'];
  return (
    <select value={value} onChange={e => onChange(e.target.value as Status)}
      style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, cursor: 'pointer' }}>
      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
