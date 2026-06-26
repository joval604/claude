import { DAYS, LABEL_COLORS } from '../data'

const DAY_CARD = {
  'Key Meeting': {
    card: 'bg-purple-50 border-purple-200',
    heading: 'text-purple-700',
    bullet: 'text-purple-400',
    tag: 'text-purple-600',
    textarea: 'bg-white border-purple-200 focus:border-purple-400 focus:ring-purple-100 text-gray-700',
  },
  'Know It': {
    card: 'bg-indigo-50 border-indigo-200',
    heading: 'text-indigo-700',
    bullet: 'text-indigo-400',
    tag: 'text-indigo-600',
    textarea: 'bg-white border-indigo-200 focus:border-indigo-400 focus:ring-indigo-100 text-gray-700',
  },
  'Practice': {
    card: 'bg-emerald-50 border-emerald-200',
    heading: 'text-emerald-700',
    bullet: 'text-emerald-400',
    tag: 'text-emerald-600',
    textarea: 'bg-white border-emerald-200 focus:border-emerald-400 focus:ring-emerald-100 text-gray-700',
  },
  'Mental': {
    card: 'bg-rose-50 border-rose-200',
    heading: 'text-rose-700',
    bullet: 'text-rose-400',
    tag: 'text-rose-600',
    textarea: 'bg-white border-rose-200 focus:border-rose-400 focus:ring-rose-100 text-gray-700',
  },
  'Research': {
    card: 'bg-red-50 border-red-200',
    heading: 'text-red-700',
    bullet: 'text-red-400',
    tag: 'text-red-600',
    textarea: 'bg-white border-red-200 focus:border-red-400 focus:ring-red-100 text-gray-700',
  },
  'Apply': {
    card: 'bg-amber-50 border-amber-200',
    heading: 'text-amber-700',
    bullet: 'text-amber-400',
    tag: 'text-amber-600',
    textarea: 'bg-white border-amber-200 focus:border-amber-400 focus:ring-amber-100 text-gray-700',
  },
  'Intel': {
    card: 'bg-teal-50 border-teal-200',
    heading: 'text-teal-700',
    bullet: 'text-teal-400',
    tag: 'text-teal-600',
    textarea: 'bg-white border-teal-200 focus:border-teal-400 focus:ring-teal-100 text-gray-700',
  },
  'Rest': {
    card: 'bg-slate-50 border-slate-200',
    heading: 'text-slate-600',
    bullet: 'text-slate-400',
    tag: 'text-slate-500',
    textarea: 'bg-white border-slate-200 focus:border-slate-400 focus:ring-slate-100 text-gray-700',
  },
}

function TaskItem({ task, noteKey, note, onNoteChange, style }) {
  const match = task.match(/^\[([^\]]+)\]\s*(.+)$/)
  const tag = match ? match[1] : null
  const text = match ? match[2] : task

  return (
    <li className="space-y-1.5">
      <div className="flex items-start gap-2 text-sm text-gray-700">
        <span className={`mt-1 shrink-0 ${style.bullet}`}>·</span>
        <span>
          {tag && <span className={`font-semibold mr-1 ${style.tag}`}>[{tag}]</span>}
          {text}
        </span>
      </div>
      <div className="ml-4">
        <textarea
          value={note || ''}
          onChange={(e) => onNoteChange(noteKey, e.target.value)}
          placeholder="Add your notes here..."
          rows={2}
          className={`w-full text-xs border rounded-lg px-3 py-2 placeholder-slate-300 resize-none focus:outline-none focus:ring-1 transition-colors ${style.textarea}`}
        />
      </div>
    </li>
  )
}

export default function DailyPlan({ completedDays, setCompletedDays, taskNotes, setTaskNotes }) {
  const completed = Object.values(completedDays).filter(Boolean).length
  const total = DAYS.length

  const toggle = (idx) => setCompletedDays((prev) => ({ ...prev, [idx]: !prev[idx] }))
  const handleNoteChange = (key, value) => setTaskNotes((prev) => ({ ...prev, [key]: value }))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Day-by-Day Prep Schedule</h2>
        <span className="text-sm text-violet-600 font-semibold">{completed}/{total} days</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {Object.entries(LABEL_COLORS).map(([label, cls]) => (
          <span key={label} className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>
            {label}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        {DAYS.map((day, idx) => {
          const style = DAY_CARD[day.label] || DAY_CARD['Rest']
          return (
            <div key={idx}>
              <div className={`border rounded-xl p-4 shadow-sm transition-all ${style.card} ${completedDays[idx] ? 'opacity-70' : ''}`}>
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggle(idx)}
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      completedDays[idx] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-emerald-400'
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
                      <span className={`text-sm font-bold ${style.heading}`}>{day.date}</span>
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
                          style={style}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {day.milestone && (
                <div className={`mt-2 rounded-lg px-4 py-3 border-l-4 text-sm ${
                  day.milestone.type === 'alert'
                    ? 'bg-red-50 border-red-400 text-red-700'
                    : 'bg-amber-50 border-amber-400 text-amber-800'
                }`}>
                  <div className="flex items-start gap-2">
                    <span className="shrink-0">{day.milestone.type === 'alert' ? '⚡' : '🏅'}</span>
                    <p>{day.milestone.text}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
