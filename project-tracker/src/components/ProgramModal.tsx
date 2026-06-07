import React, { useState } from 'react';
import { Program } from '../types';
import { StatusSelect } from './StatusBadge';

interface Props {
  program: Program;
  onSave: (updated: Program) => void;
  onClose: () => void;
}

export function ProgramModal({ program, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<Program>({ ...program });

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 12, width: 420, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, color: '#111827' }}>Edit Program</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#9ca3af' }}>✕</button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Program Name</label>
          <input value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} style={inputStyle} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Status</label>
          <StatusSelect value={draft.status} onChange={v => setDraft(d => ({ ...d, status: v }))} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
          <button onClick={() => { onSave(draft); onClose(); }} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Save</button>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280',
  marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em',
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #d1d5db',
  fontSize: 14, boxSizing: 'border-box',
};
