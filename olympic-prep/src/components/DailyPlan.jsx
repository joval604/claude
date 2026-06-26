import { DAYS, LABEL_COLORS } from '../data'

export default function DailyPlan({ completedDays, setCompletedDays }) {
  const completed = Object.values(completedDays).filter(Boolean).length
  const total = DAYS.length

  const toggle = (idx) => {
    setCompletedDays((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Day-by-Day Prep Schedule</h2>
        <span className="text-sm text-[#f5c842] font-semibold">{completed}/{total} days</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {Object.entries(LABEL_COLORS).map(([label, cls]) => (
          <span key={label} className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>
            {label}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        {DAYS.map((day, idx) => (
          <div key={idx}>
            <div
              className={`bg-[#0d1f3c] border rounded-xl p-4 transition-all ${
                completedDays[idx] ? 'border-[#f5c842]/50 opacity-80' : 'border-[#1a3464]'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <button
                  onClick={() => toggle(idx)}
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                    completedDays[idx]
                      ? 'bg-[#f5c842] border-[#f5c842]'
                      : 'border-gray-500 hover:border-[#f5c842]'
                  }`}
                >
                  {completedDays[idx] && (
                    <svg className="w-3 h-3 text-[#0a1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <span className="text-sm font-bold text-white">{day.date}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LABEL_COLORS[day.label]}`}>
                      {day.label}
                    </span>
                    {completedDays[idx] && (
                      <span className="text-xs text-[#f5c842] font-medium">✓ Complete</span>
                    )}
                  </div>
                  <ul className="space-y-1">
                    {day.tasks.map((task, ti) => (
                      <li key={ti} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-[#f5c842] mt-1 shrink-0">·</span>
                        <span className={completedDays[idx] ? 'line-through text-gray-500' : ''}>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Milestone callout */}
            {day.milestone && (
              <div
                className={`mt-2 rounded-lg px-4 py-3 border-l-4 text-sm ${
                  day.milestone.type === 'alert'
                    ? 'bg-red-950/40 border-red-500 text-red-200'
                    : 'bg-amber-950/40 border-[#f5c842] text-amber-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="shrink-0 text-base">
                    {day.milestone.type === 'alert' ? '⚡' : '🏅'}
                  </span>
                  <p>{day.milestone.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
