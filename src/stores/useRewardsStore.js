import { create } from 'zustand'

export const useRewardsStore = create((set) => ({
  points: 0,
  streak: 0,
  lastClaimDate: null,
  unlockedRewards: [],
  
  setPoints: (points) => set({ points }),
  
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
  
  setStreak: (streak) => set({ streak }),
  
  claimDailyPoints: () => set((state) => {
    const today = new Date().toDateString()
    if (state.lastClaimDate === today) {
      return state // Already claimed today
    }
    
    return {
      points: state.points + 5,
      streak: state.streak + 1,
      lastClaimDate: today
    }
  }),
  
  unlockReward: (rewardId) => set((state) => ({
    unlockedRewards: [...state.unlockedRewards, rewardId]
  })),
  
  isRewardUnlocked: (rewardId) => (state) => 
    state.unlockedRewards.includes(rewardId)
}))