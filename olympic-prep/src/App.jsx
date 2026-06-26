import { useState, useEffect } from 'react'
import DailyPlan from './components/DailyPlan'
import QandA from './components/QandA'
import KathleenQuestions from './components/KathleenQuestions'
import ElvianneQuestions from './components/ElvianneQuestions'
import DailyRituals from './components/DailyRituals'
import { DAYS, QA_CATEGORIES, KATHLEEN_QUESTIONS, ELVIANNE_QUESTIONS } from './data'

const TABS = [
  { id: 'daily', label: 'Daily Plan' },
  { id: 'qa', label: '23 Q&As' },
  { id: 'kathleen', label: 'Kathleen' },
  { id: 'elvianne', label: 'Elvianne' },
  { id: 'rituals', label: 'Rituals' },
]

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

export default function App() {
  const [activeTab, setActiveTab] = useState('daily')
  const [completedDays, setCompletedDays] = useLocalStorage('completedDays', {})
  const [practicedQs, setPracticedQs] = useLocalStorage('practicedQs', {})
  const [kathleenChecked, setKathleenChecked] = useLocalStorage('kathleenChecked', {})
  const [elvianneChecked, setElvianneChecked] = useLocalStorage('elvianneChecked', {})

  const totalDays = DAYS.length
  const totalQs = QA_CATEGORIES.reduce((acc, cat) => acc + cat.questions.length, 0)
  const totalKathleen = KATHLEEN_QUESTIONS.reduce((acc, cat) => acc + cat.questions.length, 0)
  const totalElvianne = ELVIANNE_QUESTIONS.reduce((acc, cat) => acc + cat.questions.length, 0)
  const totalItems = totalDays + totalQs + totalKathleen + totalElvianne

  const doneCount =
    Object.values(completedDays).filter(Boolean).length +
    Object.values(practicedQs).filter(Boolean).length +
    Object.values(kathleenChecked).filter(Boolean).length +
    Object.values(elvianneChecked).filter(Boolean).length

  const progress = Math.round((doneCount / totalItems) * 100)

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Header */}
      <div className="bg-[#0d1f3c] border-b border-[#1a3464] px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-base font-bold text-[#f5c842] leading-tight">
                Joanna's Olympic Interview Prep
              </h1>
              <p className="text-xs text-blue-300 mt-0.5">Novartis AD HIT 2026 · July 14 Interview</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl font-bold text-[#f5c842]">{progress}%</span>
              <p className="text-xs text-gray-400">complete</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="h-2 bg-[#1a3464] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#f5c842] to-[#e8b800] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Motivational banner */}
          <div className="mt-3 bg-[#1a3464] border border-[#f5c842]/30 rounded-lg px-3 py-2">
            <p className="text-xs text-[#f5c842] font-medium text-center italic leading-relaxed">
              "You have done the work. You know the material. You are the right person for this role."
            </p>
          </div>
        </div>
      </div>

      {/* Sticky tabs */}
      <div className="sticky top-0 z-50 bg-[#0d1f3c] border-b border-[#1a3464] shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#f5c842] text-[#f5c842]'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'daily' && (
          <DailyPlan completedDays={completedDays} setCompletedDays={setCompletedDays} />
        )}
        {activeTab === 'qa' && (
          <QandA practicedQs={practicedQs} setPracticedQs={setPracticedQs} />
        )}
        {activeTab === 'kathleen' && (
          <KathleenQuestions checked={kathleenChecked} setChecked={setKathleenChecked} />
        )}
        {activeTab === 'elvianne' && (
          <ElvianneQuestions checked={elvianneChecked} setChecked={setElvianneChecked} />
        )}
        {activeTab === 'rituals' && <DailyRituals />}
      </div>
    </div>
  )
}
