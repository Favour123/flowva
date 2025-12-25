import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  getReferralsByUser, 
  getReferralStats,
  createReferral 
} from '@/lib/database'

export function useReferrals() {
  const { user } = useAuth()
  const [referrals, setReferrals] = useState([])
  const [stats, setStats] = useState({
    totalReferrals: 0,
    completedReferrals: 0,
    pointsEarned: 0
  })
  const [loading, setLoading] = useState(true)
  const [referralCode, setReferralCode] = useState('')

  useEffect(() => {
    if (user?.id) {
      loadReferrals()
      generateReferralCode()
    }
  }, [user?.id])

  const generateReferralCode = () => {
    const code = user?.email?.split('@')[0]?.substring(0, 8) || 'user'
    setReferralCode(`${code}${Math.floor(Math.random() * 10000)}`)
  }

  const loadReferrals = async () => {
    setLoading(true)
    
    const { data } = await getReferralsByUser(user.id)
    setReferrals(data || [])
    
    const statsData = await getReferralStats(user.id)
    setStats(statsData)
    
    setLoading(false)
  }

  const createNewReferral = async () => {
    if (!user?.id || !referralCode) return
    
    const { error } = await createReferral(user.id, referralCode)
    
    if (!error) {
      await loadReferrals()
    }
    
    return { error }
  }

  return {
    referrals,
    stats,
    loading,
    referralCode,
    createNewReferral,
    refreshReferrals: loadReferrals
  }
}