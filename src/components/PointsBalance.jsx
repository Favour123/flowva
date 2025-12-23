import { Trophy } from 'lucide-react'
import StatsCard from './StatsCard'
import { useRewardsStore } from '@/stores/useRewardsStore'

export default function PointsBalance() {
  const points = useRewardsStore((state) => state.points)
  const targetPoints = 5000
  const progress = (points / targetPoints) * 100

  return (
    <StatsCard icon={Trophy} title="Points Balance">
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-purple-600">{points}</span>
          <span className="text-gray-500">points</span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress to $5 Gift Card</span>
            <span className="font-medium text-gray-900">{points}/{targetPoints}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 bg-purple-50 rounded-lg p-3">
          <Trophy className="w-4 h-4 text-purple-600" />
          <span>Just getting started — keep earning points!</span>
        </div>
      </div>
    </StatsCard>
  )
}