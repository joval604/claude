import { useState } from 'react'
import { QA_CATEGORIES } from '../data'

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
        <h2 className="text-lg font-bold text-white">23 Interview Q&As</h2>
        <span className="text-sm text-[#f5c842] font-semibold">{practiced}/{total} practiced</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#1a3464] rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${(practiced / total) * 100}%` }}
        />
      </div>

      <div className="space-y-6">
        {QA_CATEGORIES.map((cat, ci) => (
          <div key={ci}>
            <h3 className="text-xs font-bold text-[#f5c842] uppercase tracking-wider mb-3 px-1">
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
                    className={`bg-[#0d1f3c] border rounded-xl overflow-hidden transition-all ${
                      practicedQs[key] ? 'border-green-600/50' : 'border-[#1a3464]'
                    }`}
                  >
                    <button
                      onClick={() => setOpenQ(isOpen ? null : key)}
                      className="w-full text-left px-4 py-3 flex items-start gap-3"
                    >
                      <span className="text-xs text-gray-500 font-mono mt-0.5 shrink-0 w-5">
                        {gIdx + 1}.
                      </span>
                      <span className="flex-1 text-sm font-medium text-white pr-2">{item.q}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        {practicedQs[key] && (
                          <span className="text-xs text-green-400">✓</span>
                        )}
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 border-t border-[#1a3464]">
                        <div className="pt-3 text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                          {item.a}
                        </div>
                        {item.tip && (
                          <div className="mt-3 bg-indigo-950/50 border border-indigo-500/40 rounded-lg px-3 py-2">
                            <p className="text-xs text-indigo-300">
                              <span className="font-bold text-indigo-400">Tip: </span>
                              {item.tip}
                            </p>
                          </div>
                        )}
                        <button
                          onClick={(e) => togglePracticed(key, e)}
                          className={`mt-3 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            practicedQs[key]
                              ? 'bg-green-800 text-green-200 hover:bg-green-700'
                              : 'bg-[#1a3464] text-gray-300 hover:bg-green-900 hover:text-green-300'
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
    </div>
  )
}
