import { ELVIANNE_QUESTIONS } from '../data'

const CAT_STYLE = [
  { card: 'bg-teal-50 border-teal-200', heading: 'text-teal-700', inner: 'bg-white border-teal-100', why: 'text-teal-700', whyLabel: 'text-teal-800' },
  { card: 'bg-cyan-50 border-cyan-200', heading: 'text-cyan-700', inner: 'bg-white border-cyan-100', why: 'text-cyan-700', whyLabel: 'text-cyan-800' },
  { card: 'bg-sky-50 border-sky-200', heading: 'text-sky-700', inner: 'bg-white border-sky-100', why: 'text-sky-700', whyLabel: 'text-sky-800' },
  { card: 'bg-emerald-50 border-emerald-200', heading: 'text-emerald-700', inner: 'bg-white border-emerald-100', why: 'text-emerald-700', whyLabel: 'text-emerald-800' },
]

export default function ElvianneQuestions({ checked, setChecked }) {
  const total = ELVIANNE_QUESTIONS.reduce((acc, cat) => acc + cat.questions.length, 0)
  const done = Object.values(checked).filter(Boolean).length
  const toggle = (key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold text-gray-800">Elvianne Call — Mon Jun 29</h2>
        <span className="text-sm text-teal-600 font-semibold">{done}/{total} asked</span>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        Update these after Kathleen's call. Go deeper on process, tools, day-to-day workflow, and the interview itself. Build a real relationship — she is your referral processor and long-term ally.
      </p>

      <div className="h-1.5 bg-slate-100 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-300"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>

      <div className="space-y-4">
        {ELVIANNE_QUESTIONS.map((cat, ci) => {
          const s = CAT_STYLE[ci % CAT_STYLE.length]
          return (
            <div key={ci} className={`border rounded-xl shadow-sm overflow-hidden ${s.card}`}>
              <div className="px-4 pt-4 pb-2 flex items-center gap-2">
                {cat.starred && <span className="text-amber-400 text-base">★</span>}
                <h3 className={`text-xs font-bold uppercase tracking-wider ${s.heading}`}>
                  {cat.category}
                </h3>
              </div>
              <div className="px-3 pb-3 space-y-2">
                {cat.questions.map((item, qi) => {
                  const key = `${ci}-${qi}`
                  return (
                    <div
                      key={qi}
                      className={`bg-white border rounded-xl p-4 shadow-sm transition-all ${
                        checked[key] ? 'border-emerald-200 opacity-70' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggle(key)}
                          className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                            checked[key] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-teal-400'
                          }`}
                        >
                          {checked[key] && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start gap-2 flex-wrap mb-2">
                            <p className={`text-sm font-medium ${checked[key] ? 'line-through text-slate-400' : 'text-gray-800'}`}>
                              {item.q}
                            </p>
                            {item.note && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium shrink-0">
                                {item.note}
                              </span>
                            )}
                          </div>
                          <div className={`rounded-lg px-3 py-2 border ${s.inner}`}>
                            <p className={`text-xs ${s.why}`}>
                              <span className={`font-semibold ${s.whyLabel}`}>Why ask: </span>
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
          )
        })}
      </div>

      <div className="mt-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 shadow-sm">
        <div className="flex items-start gap-2">
          <span className="text-base shrink-0">⚡</span>
          <p className="text-sm text-red-700">
            <span className="font-bold">After this call: </span>
            Write up notes immediately. Thank you email within 2 hours. Update answers and cover letter tonight. Her words are your interview script.
          </p>
        </div>
      </div>
    </div>
  )
}
