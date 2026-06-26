import { useState } from 'react'
import { QA_CATEGORIES, QA_STEVEN_QUESTIONS } from '../data'

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
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300"
          style={{ width: `${(practiced / total) * 100}%` }}
        />
      </div>

      <div className="space-y-6">
        {QA_CATEGORIES.map((cat, ci) => (
          <div key={ci}>
            <h3 className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-3 px-1">
              {cat.name}
            </h3>
            <div className="space-y-2">
              {cat.questions.map((item, qi) => {
                const key = `${ci}-${qi}`
                const gIdx = globalIdx++
                const isOpen = openQ === key

                return (
                  <div
                    key={qi}
                    className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all ${
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
                        {practicedQs[key] && (
                          <span className="text-xs text-emerald-500">✓</span>
                        )}
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
                          <div className="mt-3 bg-violet-50 border border-violet-200 rounded-lg px-3 py-2">
                            <p className="text-xs text-violet-700">
                              <span className="font-bold text-violet-600">Tip: </span>
                              {item.tip}
                            </p>
                          </div>
                        )}
                        <button
                          onClick={(e) => togglePracticed(key, e)}
                          className={`mt-3 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            practicedQs[key]
                              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
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
        ))}
      </div>

      {/* 3 Questions for Steven */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
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
