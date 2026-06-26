import { DAYS, LABEL_COLORS } from '../data'

const TAG_COLORS = {
  'Research': 'text-red-500',
  'Know It': 'text-indigo-500',
  'Mental': 'text-rose-500',
  'Key Meeting': 'text-purple-600',
  'Intel': 'text-teal-600',
  'Practice': 'text-emerald-600',
  'Apply': 'text-amber-600',
  'Rest': 'text-slate-400',
}

function TaskItem({ task, noteKey, note, onNoteChange }) {
  const match = task.match(/^\[([^\]]+)\]\s*(.+)$/)
  const tag = match ? match[1] : null
  const text = match ? match[2] : task
  const tagColor = tag ? TAG_COLORS[tag] : null

  return (
    <li className="space-y-1.5">
      <div className="flex items-start gap-2 text-sm text-gray-700">
        <span className="text-violet-400 mt-1 shrink-0">·</span>
        <span>
          {tag && (
            <span className={`font-semibold mr-1 ${tagColor || 'text-gray-500'}`}>
              [{tag}]
            </span>
          )}
          {text}
        </span>
      </div>
      <div className="ml-4">
        <textarea
          value={note || ''}
          onChange={(e) => onNoteChange(noteKey, e.target.value)}
          placeholder="Add your notes here..."
          rows={2}
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-gray-700 placeholder-slate-300 resize-none focus:outline-none focus:border-violet-300 focus:ring-1 focus:ring-violet-200 transition-colors"
        />
      </div>
    </li>
  )
}

export default function DailyPlan({ completedDays, setCompletedDays, taskNotes, setTaskNotes }) {
  const completed = Object.values(completedDays).filter(Boolean).length
  const total = DAYS.length

  const toggle = (idx) => {
    setCompletedDays((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const handleNoteChange = (key, value) => {
    setTaskNotes((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Day-by-Day Prep Schedule</h2>
        <span className="text-sm text-violet-600 font-semibold">{completed}/{total} days</span>
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
              className={`bg-white border rounded-xl p-4 shadow-sm transition-all ${
                completedDays[idx] ? 'border-emerald-200 opacity-75' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggle(idx)}
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                    completedDays[idx]
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-300 hover:border-violet-400'
                  }`}
                >
                  {completedDays[idx] && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-3">
                    <span className="text-sm font-bold text-gray-800">{day.date}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LABEL_COLORS[day.label]}`}>
                      {day.label}
                    </span>
                    {completedDays[idx] && (
                      <span className="text-xs text-emerald-600 font-medium">✓ Complete</span>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {day.tasks.map((task, ti) => (
                      <TaskItem
                        key={ti}
                        task={task}
                        noteKey={`${idx}-${ti}`}
                        note={taskNotes[`${idx}-${ti}`]}
                        onNoteChange={handleNoteChange}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {day.milestone && (
              <div
                className={`mt-2 rounded-lg px-4 py-3 border-l-4 text-sm ${
                  day.milestone.type === 'alert'
                    ? 'bg-red-50 border-red-400 text-red-700'
                    : 'bg-amber-50 border-amber-400 text-amber-800'
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
