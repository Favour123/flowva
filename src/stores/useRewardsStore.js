import { create } from 'zustand'
import { 
  getUserRewards, 
  claimDailyReward as claimDailyRewardDB,
  updateUserPoints as updateUserPointsDB
} from '@/lib/database'

export const useRewardsStore = create((set, get) => ({
  points: 0,
  streak: 0,
  lastClaimDate: null,
  unlockedRewards: [],
  loading: false,
  error: null,
  userId: null,
  
  // Initialize user rewards from database
  initializeRewards: async (userId) => {
    set({ loading: true, userId })
    const { data, error } = await getUserRewards(userId)
    
    if (error) {
      set({ loading: false, error: error.message })
      return
    }
    
    set({
      points: data.points,
      streak: data.streak,
      lastClaimDate: data.last_claim_date,
      unlockedRewards: data.unlocked_rewards || [],
      loading: false,
      error: null
    })
  },
  
  // Claim daily points with database sync
  claimDailyPoints: async () => {
    const { userId, lastClaimDate } = get()
    if (!userId) return
    
    const today = new Date().toISOString().split('T')[0]
    if (lastClaimDate === today) {
      return // Already claimed today
    }
    
    set({ loading: true })
    const { data, error } = await claimDailyRewardDB(userId)
    
    if (error) {
      set({ loading: false, error: error.message })
      return
    }
    
    set({
      points: data.points,
      streak: data.streak,
      lastClaimDate: data.last_claim_date,
      loading: false,
      error: null
    })
  },
  
  // Add points with database sync
  addPoints: async (amount) => {
    const { userId, points } = get()
    if (!userId) return
    
    const newPoints = points + amount
    set({ loading: true })
    
    const { data, error } = await updateUserPointsDB(userId, newPoints)
    
    if (error) {
      set({ loading: false, error: error.message })
      return
    }
    
    set({
      points: data.points,
      loading: false,
      error: null
    })
  },
  
  // Refresh rewards from database
  refreshRewards: async () => {
    const { userId } = get()
    if (!userId) return
    
    set({ loading: true })
    const { data, error } = await getUserRewards(userId)
    
    if (error) {
      set({ loading: false, error: error.message })
      return
    }
    
    set({
      points: data.points,
      streak: data.streak,
      lastClaimDate: data.last_claim_date,
      loading: false,
      error: null
    })
  },
  
  // Reset store
  resetStore: () => set({
    points: 0,
    streak: 0,
    lastClaimDate: null,
    loading: false,
    error: null,
    userId: null
  })
}))