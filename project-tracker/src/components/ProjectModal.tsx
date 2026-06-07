import React, { useState } from 'react';
import { Project, Resource, Status, Team } from '../types';
import { StatusSelect } from './StatusBadge';

interface Props {
  project: Project;
  onSave: (updated: Project) => void;
  onClose: () => void;
}

export function ProjectModal({ project, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<Project>({ ...project, resources: [...project.resources], teams: [...project.teams] });
  const [newResource, setNewResource] = useState({ name: '', role: '' });
  const [newTeam, setNewTeam] = useState('');

  const field = (key: keyof Project, value: any) => setDraft(d => ({ ...d, [key]: value }));

  const addResource = () => {
    if (!newResource.name.trim()) return;
    field('resources', [...draft.resources, { id: Date.now().toString(), ...newResource }]);
    setNewResource({ name: '', role: '' });
  };

  const removeResource = (id: string) => field('resources', draft.resources.filter(r => r.id !== id));

  const addTeam = () => {
    if (!newTeam.trim()) return;
    field('teams', [...draft.teams, { id: Date.now().toString(), name: newTeam }]);
    setNewTeam('');
  };

  const removeTeam = (id: string) => field('teams', draft.teams.filter(t => t.id !== id));

  const updateResource = (id: string, key: keyof Resource, value: string) => {
    field('resources', draft.resources.map(r => r.id === id ? { ...r, [key]: value } : r));
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 12, width: '90%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, color: '#111827' }}>Edit Project</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}>✕</button>
        </div>

        <Section label="Project Name">
          <input value={draft.name} onChange={e => field('name', e.target.value)} style={inputStyle} />
        </Section>

        <Section label="Description">
          <textarea value={draft.description} onChange={e => field('description', e.target.value)}
            style={{ ...inputStyle, height: 72, resize: 'vertical' }} />
        </Section>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Section label="Status">
            <StatusSelect value={draft.status} onChange={v => field('status', v)} />
          </Section>
          <Section label="Go-Live Date">
            <input type="date" value={draft.goLiveDate} onChange={e => field('goLiveDate', e.target.value)} style={inputStyle} />
          </Section>
        </div>

        <Section label={`% Complete: ${draft.percentComplete}%`}>
          <input type="range" min={0} max={100} value={draft.percentComplete}
            onChange={e => field('percentComplete', Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }} />
        </Section>

        <Section label="Resources">
          {draft.resources.map(r => (
            <div key={r.id} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <input value={r.name} onChange={e => updateResource(r.id, 'name', e.target.value)} placeholder="Name" style={{ ...inputStyle, flex: 1 }} />
              <input value={r.role} onChange={e => updateResource(r.id, 'role', e.target.value)} placeholder="Role" style={{ ...inputStyle, flex: 1 }} />
              <button onClick={() => removeResource(r.id)} style={removeBtnStyle}>✕</button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <input value={newResource.name} onChange={e => setNewResource(n => ({ ...n, name: e.target.value }))}
              placeholder="Name" style={{ ...inputStyle, flex: 1 }} onKeyDown={e => e.key === 'Enter' && addResource()} />
            <input value={newResource.role} onChange={e => setNewResource(n => ({ ...n, role: e.target.value }))}
              placeholder="Role" style={{ ...inputStyle, flex: 1 }} onKeyDown={e => e.key === 'Enter' && addResource()} />
            <button onClick={addResource} style={addBtnStyle}>+ Add</button>
          </div>
        </Section>

        <Section label="Teams">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
            {draft.teams.map(t => (
              <span key={t.id} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '4px 10px', borderRadius: 20, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                {t.name}
                <button onClick={() => removeTeam(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={newTeam} onChange={e => setNewTeam(e.target.value)} placeholder="Team name"
              style={{ ...inputStyle, flex: 1 }} onKeyDown={e => e.key === 'Enter' && addTeam()} />
            <button onClick={addTeam} style={addBtnStyle}>+ Add</button>
          </div>
        </Section>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button onClick={onClose} style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
          <button onClick={() => { onSave(draft); onClose(); }} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #d1d5db',
  fontSize: 14, boxSizing: 'border-box', outline: 'none',
};

const removeBtnStyle: React.CSSProperties = {
  background: '#fee2e2', border: 'none', borderRadius: 6, color: '#ef4444',
  cursor: 'pointer', padding: '0 8px', fontWeight: 700, fontSize: 14,
};

const addBtnStyle: React.CSSProperties = {
  background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 6, color: '#1d4ed8',
  cursor: 'pointer', padding: '0 12px', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
};
