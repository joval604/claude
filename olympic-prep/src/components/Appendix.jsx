import { useState } from 'react'
import { APPENDIX } from '../data'

const EXAMPLE_STYLE = {
  rose: {
    card: 'bg-rose-50 border-rose-200',
    heading: 'text-rose-700',
    label: 'bg-rose-100 text-rose-700',
    product: 'text-rose-600',
    tools: 'bg-white border-rose-100 text-rose-700',
    toolsLabel: 'text-rose-800',
    bullet: 'text-rose-400',
  },
  violet: {
    card: 'bg-violet-50 border-violet-200',
    heading: 'text-violet-700',
    label: 'bg-violet-100 text-violet-700',
    product: 'text-violet-600',
    tools: 'bg-white border-violet-100 text-violet-700',
    toolsLabel: 'text-violet-800',
    bullet: 'text-violet-400',
  },
  sky: {
    card: 'bg-sky-50 border-sky-200',
    heading: 'text-sky-700',
    label: 'bg-sky-100 text-sky-700',
    product: 'text-sky-600',
    tools: 'bg-white border-sky-100 text-sky-700',
    toolsLabel: 'text-sky-800',
    bullet: 'text-sky-400',
  },
}

const RESOURCE_STYLE = [
  { card: 'bg-rose-50 border-rose-200', heading: 'text-rose-700', bullet: 'text-rose-400', coming: 'text-rose-500 italic' },
  { card: 'bg-indigo-50 border-indigo-200', heading: 'text-indigo-700', bullet: 'text-indigo-400', coming: 'text-indigo-500 italic' },
  { card: 'bg-emerald-50 border-emerald-200', heading: 'text-emerald-700', bullet: 'text-emerald-400', coming: 'text-emerald-500 italic' },
  { card: 'bg-amber-50 border-amber-200', heading: 'text-amber-700', bullet: 'text-amber-400', coming: 'text-amber-500 italic' },
]

export default function Appendix() {
  const [showAnswer, setShowAnswer] = useState(false)
  const { oneSentenceSummary, epicDifference, sampleQA, patientExamples, commonThread, compliancePhrase, resources } = APPENDIX

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Appendix — Novartis HIT Value Proposition</h2>
        <p className="text-sm text-slate-500">Reference material for Q6, Q18, Q23, and the Epic comparison question. Practice the patient examples out loud until each takes 60 seconds.</p>
      </div>

      {/* One-sentence summary */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 shadow-sm">
        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">Memorize This Cold</p>
        <p className="text-sm text-amber-900 font-medium leading-relaxed">{oneSentenceSummary}</p>
      </div>

      {/* Epic Difference */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-3">
          <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider">{epicDifference.headline}</h3>
        </div>
        <div className="px-4 py-4 space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">{epicDifference.intro}</p>
          <div className="space-y-3">
            {epicDifference.points.map((pt) => (
              <div key={pt.number} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mt-0.5">{pt.number}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{pt.heading}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{pt.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Q&A */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="w-full text-left px-4 py-4 flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors"
        >
          <div>
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">Sample Interview Q&A</p>
            <p className="text-sm font-medium text-gray-800">{sampleQA.q}</p>
          </div>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform shrink-0 mt-1 ${showAnswer ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showAnswer && (
          <div className="px-4 pb-4 border-t border-slate-100">
            <div className="pt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">{sampleQA.a}</div>
            <div className="mt-3 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
              <p className="text-xs text-teal-700">
                <span className="font-semibold text-teal-800">Tip: </span>{sampleQA.tip}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Patient Examples */}
      <div>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Three Patient Examples — Practice Each in 60 Seconds</h3>
        <div className="space-y-4">
          {patientExamples.map((ex) => {
            const s = EXAMPLE_STYLE[ex.color]
            return (
              <div key={ex.id} className={`border rounded-xl shadow-sm overflow-hidden ${s.card}`}>
                <div className="px-4 pt-4 pb-2 flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.label}`}>{ex.label}</span>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${s.heading}`}>{ex.diagnosis}</h4>
                  <span className={`text-xs font-semibold ml-auto ${s.product}`}>{ex.product}</span>
                </div>
                <div className="px-4 pb-4 space-y-2">
                  {ex.story.map((para, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className={`mt-1.5 shrink-0 text-xs ${s.bullet}`}>▸</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{para}</p>
                    </div>
                  ))}
                  <div className={`mt-1 rounded-lg px-3 py-2 border text-xs ${s.tools}`}>
                    <span className={`font-semibold ${s.toolsLabel}`}>EHR Tools: </span>{ex.ehrTools}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Common Thread */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-4 shadow-sm space-y-3">
        <div>
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">The Common Thread</p>
          <p className="text-sm text-emerald-900 leading-relaxed">{commonThread}</p>
        </div>
        <div className="border-t border-emerald-200 pt-3">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Key Compliance Phrase — Memorize This</p>
          <p className="text-sm text-emerald-900 font-medium italic leading-relaxed">"{compliancePhrase}"</p>
        </div>
      </div>

      {/* Resources */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">HIT Resources to Read</h3>
          <a
            href={resources.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-violet-600 font-medium hover:underline"
          >
            novartis.com ↗
          </a>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {resources.categories.map((cat, i) => {
            const s = RESOURCE_STYLE[i % RESOURCE_STYLE.length]
            return (
              <div key={i} className={`border rounded-xl p-4 shadow-sm ${s.card}`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${s.heading}`}>{cat.name}</h4>
                <ul className="space-y-1">
                  {cat.guides.map((g, gi) => (
                    <li key={gi} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className={`mt-0.5 shrink-0 ${cat.comingSoon ? s.coming : s.bullet}`}>
                        {cat.comingSoon ? '…' : '·'}
                      </span>
                      <span className={cat.comingSoon ? 'italic text-gray-500' : ''}>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
