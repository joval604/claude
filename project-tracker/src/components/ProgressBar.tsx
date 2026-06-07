import React from 'react';

export function ProgressBar({ value }: { value: number }) {
  const color = value === 100 ? '#10b981' : value >= 60 ? '#3b82f6' : value >= 30 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, background: '#e5e7eb', borderRadius: 8, height: 8, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, background: color, height: '100%', borderRadius: 8, transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#374151', minWidth: 36 }}>{value}%</span>
    </div>
  );
}
