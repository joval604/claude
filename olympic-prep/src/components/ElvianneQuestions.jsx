import { ELVIANNE_QUESTIONS } from '../data'

export default function ElvianneQuestions({ checked, setChecked }) {
  const total = ELVIANNE_QUESTIONS.reduce((acc, cat) => acc + cat.questions.length, 0)
  const done = Object.values(checked).filter(Boolean).length

  const toggle = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold text-white">Elvianne Call — Mon Jun 29</h2>
        <span className="text-sm text-[#f5c842] font-semibold">{done}/{total} asked</span>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Update these after Kathleen's call. Go deeper on process, tools, day-to-day workflow, and the interview itself. Build a real relationship — she is your referral processor and long-term ally.
      </p>

      <div className="h-1.5 bg-[#1a3464] rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-300"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>

      <div className="space-y-5">
        {ELVIANNE_QUESTIONS.map((cat, ci) => (
          <div key={ci}>
            <div className="flex items-center gap-2 mb-3">
              {cat.starred && <span className="text-[#f5c842] text-base">★</span>}
              <h3 className="text-xs font-bold text-[#f5c842] uppercase tracking-wider">
                {cat.category}
              </h3>
            </div>
            <div className="space-y-2">
              {cat.questions.map((item, qi) => {
                const key = `${ci}-${qi}`
                return (
                  <div
                    key={qi}
                    className={`bg-[#0d1f3c] border rounded-xl p-4 transition-all ${
                      checked[key] ? 'border-teal-600/50 opacity-80' : 'border-[#1a3464]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggle(key)}
                        className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          checked[key]
                            ? 'bg-teal-600 border-teal-600'
                            : 'border-gray-500 hover:border-teal-500'
                        }`}
                      >
                        {checked[key] && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-start gap-2 flex-wrap mb-1">
                          <p className={`text-sm font-medium ${checked[key] ? 'line-through text-gray-500' : 'text-white'}`}>
                            {item.q}
                          </p>
                          {item.note && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#f5c842]/20 text-[#f5c842] font-medium shrink-0">
                              {item.note}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 bg-[#112550] rounded-lg px-3 py-2">
                          <p className="text-xs text-blue-300">
                            <span className="font-semibold text-blue-200">Why ask: </span>
                            {item.why}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-red-950/40 border border-red-500 rounded-xl px-4 py-3">
        <div className="flex items-start gap-2">
          <span className="text-base shrink-0">⚡</span>
          <p className="text-sm text-red-200">
            <span className="font-bold">After this call: </span>
            Write up notes immediately. Thank you email within 2 hours. Update answers and cover letter tonight. Her words are your interview script.
          </p>
        </div>
      </div>
    </div>
  )
}
