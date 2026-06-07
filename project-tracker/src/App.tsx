import React, { useState } from 'react';
import { Division, Program, Project } from './types';
import { initialData } from './data';
import { StatusBadge } from './components/StatusBadge';
import { ProgressBar } from './components/ProgressBar';
import { ProjectModal } from './components/ProjectModal';
import { ProgramModal } from './components/ProgramModal';

export default function App() {
  const [divisions, setDivisions] = useState<Division[]>(initialData);
  const [expandedDivisions, setExpandedDivisions] = useState<Set<string>>(new Set(['d1', 'd2']));
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set(['p1', 'p2', 'p3']));
  const [editingProject, setEditingProject] = useState<{ project: Project; divId: string; progId: string } | null>(null);
  const [editingProgram, setEditingProgram] = useState<{ program: Program; divId: string } | null>(null);

  const toggleDiv = (id: string) => setExpandedDivisions(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleProg = (id: string) => setExpandedPrograms(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const saveProject = (updated: Project, divId: string, progId: string) => {
    setDivisions(divs => divs.map(d => d.id !== divId ? d : {
      ...d, programs: d.programs.map(p => p.id !== progId ? p : {
        ...p, projects: p.projects.map(pr => pr.id !== updated.id ? pr : updated)
      })
    }));
  };

  const saveProgram = (updated: Program, divId: string) => {
    setDivisions(divs => divs.map(d => d.id !== divId ? d : {
      ...d, programs: d.programs.map(p => p.id !== updated.id ? p : updated)
    }));
  };

  const programProgress = (prog: Program) => {
    if (!prog.projects.length) return 0;
    return Math.round(prog.projects.reduce((sum, p) => sum + p.percentComplete, 0) / prog.projects.length);
  };

  const formatDate = (iso: string) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${m}/${d}/${y}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#1e293b', color: '#fff', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Project Tracker</div>
        <div style={{ marginLeft: 'auto', fontSize: 13, color: '#94a3b8' }}>
          {divisions.reduce((a, d) => a + d.programs.reduce((b, p) => b + p.projects.length, 0), 0)} projects across {divisions.reduce((a, d) => a + d.programs.length, 0)} programs
        </div>
      </div>

      <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
        {divisions.map(division => {
          const divExpanded = expandedDivisions.has(division.id);
          const totalProjects = division.programs.reduce((a, p) => a + p.projects.length, 0);

          return (
            <div key={division.id} style={{ marginBottom: 24 }}>
              {/* Division Header */}
              <div
                onClick={() => toggleDiv(division.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', background: '#1e293b', color: '#fff', borderRadius: divExpanded ? '10px 10px 0 0' : 10, cursor: 'pointer', userSelect: 'none' }}>
                <span style={{ fontSize: 16, transition: 'transform 0.2s', transform: divExpanded ? 'rotate(90deg)' : 'rotate(0)' }}>▶</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{division.name}</span>
                <span style={{ marginLeft: 'auto', fontSize: 13, color: '#94a3b8' }}>{division.programs.length} programs · {totalProjects} projects</span>
              </div>

              {divExpanded && (
                <div style={{ border: '1px solid #e2e8f0', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
                  {division.programs.map((program, pi) => {
                    const progExpanded = expandedPrograms.has(program.id);
                    const avgProgress = programProgress(program);
                    const isLast = pi === division.programs.length - 1;

                    return (
                      <div key={program.id} style={{ borderBottom: isLast ? 'none' : '1px solid #e2e8f0' }}>
                        {/* Program Row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', background: '#f1f5f9', cursor: 'pointer', userSelect: 'none' }}
                          onClick={() => toggleProg(program.id)}>
                          <span style={{ fontSize: 13, color: '#64748b', transition: 'transform 0.2s', transform: progExpanded ? 'rotate(90deg)' : 'rotate(0)' }}>▶</span>
                          <span style={{ fontSize: 14, fontWeight: 600, color: '#334155', flex: 1 }}>{program.name}</span>
                          <div style={{ width: 140 }}>
                            <ProgressBar value={avgProgress} />
                          </div>
                          <StatusBadge status={program.status} />
                          <button
                            onClick={e => { e.stopPropagation(); setEditingProgram({ program, divId: division.id }); }}
                            style={editBtnStyle}>
                            Edit
                          </button>
                        </div>

                        {/* Projects Table */}
                        {progExpanded && program.projects.length > 0 && (
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                              <thead>
                                <tr style={{ background: '#f8fafc' }}>
                                  {['Project', 'Status', 'Progress', 'Go-Live', 'Teams', 'Resources', ''].map(h => (
                                    <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {program.projects.map((project, ri) => (
                                  <tr key={project.id} style={{ background: ri % 2 === 0 ? '#fff' : '#fafafa' }}>
                                    <td style={tdStyle}>
                                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{project.name}</div>
                                      {project.description && <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>{project.description}</div>}
                                    </td>
                                    <td style={tdStyle}><StatusBadge status={project.status} /></td>
                                    <td style={{ ...tdStyle, minWidth: 140 }}><ProgressBar value={project.percentComplete} /></td>
                                    <td style={{ ...tdStyle, whiteSpace: 'nowrap', color: '#374151' }}>{formatDate(project.goLiveDate)}</td>
                                    <td style={tdStyle}>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                        {project.teams.map(t => (
                                          <span key={t.id} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500 }}>{t.name}</span>
                                        ))}
                                        {project.teams.length === 0 && <span style={{ color: '#d1d5db' }}>—</span>}
                                      </div>
                                    </td>
                                    <td style={tdStyle}>
                                      {project.resources.length > 0 ? (
                                        <div>
                                          {project.resources.map(r => (
                                            <div key={r.id} style={{ color: '#374151' }}>{r.name} <span style={{ color: '#9ca3af', fontSize: 11 }}>({r.role})</span></div>
                                          ))}
                                        </div>
                                      ) : <span style={{ color: '#d1d5db' }}>—</span>}
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                                      <button
                                        onClick={() => setEditingProject({ project, divId: division.id, progId: program.id })}
                                        style={editBtnStyle}>
                                        Edit
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {progExpanded && program.projects.length === 0 && (
                          <div style={{ padding: '16px 32px', color: '#9ca3af', fontSize: 13, fontStyle: 'italic' }}>No projects yet.</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {editingProject && (
        <ProjectModal
          project={editingProject.project}
          onSave={p => saveProject(p, editingProject.divId, editingProject.progId)}
          onClose={() => setEditingProject(null)}
        />
      )}
      {editingProgram && (
        <ProgramModal
          program={editingProgram.program}
          onSave={p => saveProgram(p, editingProgram.divId)}
          onClose={() => setEditingProgram(null)}
        />
      )}
    </div>
  );
}

const editBtnStyle: React.CSSProperties = {
  padding: '4px 12px', borderRadius: 6, border: '1px solid #e2e8f0',
  background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600,
  color: '#374151', whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 16px', verticalAlign: 'top', borderBottom: '1px solid #f1f5f9',
};
