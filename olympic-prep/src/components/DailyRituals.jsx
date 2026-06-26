import { RITUALS } from '../data'

const CARD_STYLES = {
  morning: 'border-amber-200 bg-amber-50',
  evening: 'border-indigo-200 bg-indigo-50',
  anxiety: 'border-rose-200 bg-rose-50',
  ted: 'border-sky-200 bg-sky-50',
  podcasts: 'border-teal-200 bg-teal-50',
  physical: 'border-emerald-200 bg-emerald-50',
}

const HEADING_STYLES = {
  morning: 'text-amber-700',
  evening: 'text-indigo-700',
  anxiety: 'text-rose-700',
  ted: 'text-sky-700',
  podcasts: 'text-teal-700',
  physical: 'text-emerald-700',
}

const BULLET_STYLES = {
  morning: 'text-amber-500',
  evening: 'text-indigo-500',
  anxiety: 'text-rose-500',
  ted: 'text-sky-500',
  podcasts: 'text-teal-500',
  physical: 'text-emerald-500',
}

function Card({ title, icon, cardKey, children }) {
  return (
    <div className={`border rounded-xl p-4 shadow-sm ${CARD_STYLES[cardKey]}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <h3 className={`text-sm font-bold uppercase tracking-wider ${HEADING_STYLES[cardKey]}`}>{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function DailyRituals() {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Daily Rituals & Mental Game</h2>

      <div className="space-y-4">
        <Card title="Morning Ritual — 5 Minutes, Every Day" icon="🌅" cardKey="morning">
          <ol className="space-y-2">
            {RITUALS.morning.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className={`shrink-0 font-bold ${BULLET_STYLES.morning}`}>{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Evening Ritual — 10 Minutes, Every Day" icon="🌙" cardKey="evening">
          <ol className="space-y-2">
            {RITUALS.evening.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className={`shrink-0 font-bold ${BULLET_STYLES.evening}`}>{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        </Card>

        <Card title="When You Feel Anxious" icon="🧠" cardKey="anxiety">
          <ol className="space-y-2">
            {RITUALS.anxiety.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className={`shrink-0 font-bold ${BULLET_STYLES.anxiety}`}>{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Recommended Viewing — In Order" icon="🎥" cardKey="ted">
          <div className="space-y-3">
            {RITUALS.tedTalks.map((talk, i) => (
              <div key={i} className="bg-white rounded-lg p-3 border border-sky-100">
                <a
                  href={talk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors underline decoration-dotted"
                >
                  {talk.title}
                </a>
                <p className="text-xs text-slate-500 mt-1">{talk.note}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recommended Listening" icon="🎙️" cardKey="podcasts">
          <ul className="space-y-2">
            {RITUALS.podcasts.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={`shrink-0 font-bold ${BULLET_STYLES.podcasts}`}>·</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Physical Performance Rules" icon="💪" cardKey="physical">
          <ul className="space-y-2">
            {RITUALS.physical.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={`shrink-0 font-bold ${BULLET_STYLES.physical}`}>·</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
