import { useState } from 'react'
import { QA_CATEGORIES, QA_STEVEN_QUESTIONS } from '../data'

const CAT_STYLE = [
  { card: 'bg-violet-50 border-violet-200', heading: 'text-violet-700', tip: 'bg-violet-50 border-violet-200 text-violet-700', tipLabel: 'text-violet-600', btn: 'bg-violet-100 text-violet-700 hover:bg-violet-200', btnDone: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200', bar: 'from-violet-400 to-purple-400' },
  { card: 'bg-sky-50 border-sky-200', heading: 'text-sky-700', tip: 'bg-sky-50 border-sky-200 text-sky-700', tipLabel: 'text-sky-600', btn: 'bg-sky-100 text-sky-700 hover:bg-sky-200', btnDone: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200', bar: 'from-sky-400 to-cyan-400' },
  { card: 'bg-teal-50 border-teal-200', heading: 'text-teal-700', tip: 'bg-teal-50 border-teal-200 text-teal-700', tipLabel: 'text-teal-600', btn: 'bg-teal-100 text-teal-700 hover:bg-teal-200', btnDone: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200', bar: 'from-teal-400 to-emerald-400' },
  { card: 'bg-indigo-50 border-indigo-200', heading: 'text-indigo-700', tip: 'bg-indigo-50 border-indigo-200 text-indigo-700', tipLabel: 'text-indigo-600', btn: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200', btnDone: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200', bar: 'from-indigo-400 to-blue-400' },
  { card: 'bg-rose-50 border-rose-200', heading: 'text-rose-700', tip: 'bg-rose-50 border-rose-200 text-rose-700', tipLabel: 'text-rose-600', btn: 'bg-rose-100 text-rose-700 hover:bg-rose-200', btnDone: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200', bar: 'from-rose-400 to-pink-400' },
]

export default function QandA({ practicedQs, setPracticedQs }) {
  const [openQ, setOpenQ] = useState(null)

  const total = QA_CATEGORIES.reduce((acc, cat) => acc + cat.questions.length, 0)
  const practiced = Object.values(practicedQs).filter(Boolean).length

  let globalIdx = 0

  const togglePracticed = (key, e) => {
    e.stopPropagation()
    setPracticedQs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">23 Interview Q&As</h2>
        <span className="text-sm text-emerald-600 font-semibold">{practiced}/{total} practiced</span>
      </div>

      <div className="h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-400 to-pink-400 rounded-full transition-all duration-300"
          style={{ width: `${(practiced / total) * 100}%` }}
        />
      </div>

      <div className="space-y-6">
        {QA_CATEGORIES.map((cat, ci) => {
          const s = CAT_STYLE[ci % CAT_STYLE.length]
          return (
            <div key={ci} className={`border rounded-xl shadow-sm overflow-hidden ${s.card}`}>
              <div className="px-4 pt-4 pb-2">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${s.heading}`}>
                  {cat.name}
                </h3>
              </div>
              <div className="px-3 pb-3 space-y-2">
                {cat.questions.map((item, qi) => {
                  const key = `${ci}-${qi}`
                  const gIdx = globalIdx++
                  const isOpen = openQ === key

                  return (
                    <div
                      key={qi}
                      className={`bg-white border rounded-xl overflow-hidden transition-all ${
                        practicedQs[key] ? 'border-emerald-200' : 'border-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => setOpenQ(isOpen ? null : key)}
                        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-xs text-slate-400 font-mono mt-0.5 shrink-0 w-5">
                          {gIdx + 1}.
                        </span>
                        <span className="flex-1 text-sm font-medium text-gray-800 pr-2">{item.q}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          {practicedQs[key] && <span className="text-xs text-emerald-500">✓</span>}
                          <svg
                            className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 border-t border-slate-100">
                          <div className="pt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                            {item.a}
                          </div>
                          {item.tip && (
                            <div className={`mt-3 border rounded-lg px-3 py-2 ${s.tip}`}>
                              <p className="text-xs">
                                <span className={`font-bold ${s.tipLabel}`}>Tip: </span>
                                {item.tip}
                              </p>
                            </div>
                          )}
                          <button
                            onClick={(e) => togglePracticed(key, e)}
                            className={`mt-3 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                              practicedQs[key] ? s.btnDone : s.btn
                            }`}
                          >
                            {practicedQs[key] ? '✓ Marked as practiced' : 'Mark as practiced'}
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">
          Your 3 Questions for Steven
        </h3>
        <ol className="space-y-2">
          {QA_STEVEN_QUESTIONS.map((q, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-amber-900">
              <span className="text-amber-500 font-bold shrink-0">{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
