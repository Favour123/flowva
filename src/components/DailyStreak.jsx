import { Calendar, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import StatsCard from './StatsCard'
import { useRewardsStore } from '@/stores/useRewardsStore'
import { useState } from 'react'

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function DailyStreak() {
  const { streak, claimDailyPoints, lastClaimDate, loading } = useRewardsStore()
  const [claiming, setClaiming] = useState(false)
  
  const today = new Date().toISOString().split('T')[0]
  const canClaim = lastClaimDate !== today

  const handleClaim = async () => {
    if (!canClaim || claiming) return
    
    setClaiming(true)
    await claimDailyPoints()
    
    setTimeout(() => {
      setClaiming(false)
    }, 1000)
  }

  return (
    <StatsCard icon={Calendar} title="Daily Streak">
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-purple-600">{streak}</span>
          <span className="text-gray-500">day{streak !== 1 ? 's' : ''}</span>
        </div>

        <div className="flex justify-between gap-2">
          {weekdays.map((day, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                index === new Date().getDay() - 1
                  ? 'bg-purple-600 text-white ring-2 ring-purple-200'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 text-center">
          Check in daily to earn +5 points
        </p>

        <motion.button
          whileHover={{ scale: canClaim ? 1.02 : 1 }}
          whileTap={{ scale: canClaim ? 0.98 : 1 }}
          onClick={handleClaim}
          disabled={!canClaim || claiming}
          className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            canClaim
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Zap className="w-4 h-4" />
          {claiming ? 'Claiming...' : canClaim ? "Claim Today's Points" : 'Already Claimed'}
        </motion.button>
      </div>
    </StatsCard>
  )
}