import { motion } from 'framer-motion'
import { Banknote, Wallet, Gift, Lock, Star } from 'lucide-react'
import { useRewardsStore } from '@/stores/useRewardsStore'

const iconMap = {
  banknote: Banknote,
  wallet: Wallet,
  gift: Gift
}

export default function RewardCard({ reward }) {
  const points = useRewardsStore((state) => state.points)
  const unlockedRewards = useRewardsStore((state) => state.unlockedRewards) || []
  const Icon = iconMap[reward.icon] || Gift
  const isUnlocked = points >= reward.points || unlockedRewards.includes(reward.id)

  return (
    <motion.div
      whileHover={{ y: isUnlocked ? -4 : 0 }}
      className={`bg-white rounded-2xl p-6 shadow-sm border transition-all ${
        isUnlocked
          ? 'border-purple-200 hover:shadow-lg cursor-pointer'
          : 'border-gray-200 opacity-75'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
          isUnlocked ? 'bg-purple-100' : 'bg-gray-100'
        }`}>
          <Icon className={`w-8 h-8 ${isUnlocked ? 'text-purple-600' : 'text-gray-400'}`} />
        </div>

        <h3 className="font-semibold text-gray-900 mb-2">{reward.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{reward.description}</p>

        <div className="flex items-center gap-1 text-purple-600 font-medium mb-4">
          <Star className="w-4 h-4 fill-current" />
          <span>{reward.points} pts</span>
        </div>

        <button
          disabled={!isUnlocked}
          className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            isUnlocked
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isUnlocked ? (
            'Redeem'
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Locked
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}