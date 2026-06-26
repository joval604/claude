import { RITUALS } from '../data'

function Card({ title, icon, children }) {
  return (
    <div className="bg-[#0d1f3c] border border-[#1a3464] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <h3 className="text-sm font-bold text-[#f5c842] uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function DailyRituals() {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Daily Rituals & Mental Game</h2>

      <div className="space-y-4">
        <Card title="Morning Ritual — 5 Minutes, Every Day" icon="🌅">
          <ol className="space-y-2">
            {RITUALS.morning.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-[#f5c842] shrink-0 font-bold">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Evening Ritual — 10 Minutes, Every Day" icon="🌙">
          <ol className="space-y-2">
            {RITUALS.evening.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-[#f5c842] shrink-0 font-bold">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        </Card>

        <Card title="When You Feel Anxious" icon="🧠">
          <ol className="space-y-2">
            {RITUALS.anxiety.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-rose-400 shrink-0 font-bold">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Recommended Viewing — In Order" icon="🎥">
          <div className="space-y-3">
            {RITUALS.tedTalks.map((talk, i) => (
              <div key={i} className="bg-[#112550] rounded-lg p-3">
                <a
                  href={talk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-300 hover:text-[#f5c842] transition-colors underline decoration-dotted"
                >
                  {talk.title}
                </a>
                <p className="text-xs text-gray-400 mt-1">{talk.note}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recommended Listening" icon="🎙️">
          <ul className="space-y-2">
            {RITUALS.podcasts.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-teal-400 shrink-0 font-bold">·</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Physical Performance Rules" icon="💪">
          <ul className="space-y-2">
            {RITUALS.physical.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-green-400 shrink-0 font-bold">·</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
