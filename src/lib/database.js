import { supabase } from './supabase'

// User Rewards Functions
export async function getUserRewards(userId) {
  const { data, error } = await supabase
    .from('user_rewards')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code === 'PGRST116') {
    // No record found, create one
    return await createUserRewards(userId)
  }

  return { data, error }
}

export async function createUserRewards(userId) {
  const { data, error } = await supabase
    .from('user_rewards')
    .insert([
      {
        user_id: userId,
        points: 0,
        streak: 0,
        last_claim_date: null
      }
    ])
    .select()
    .single()

  return { data, error }
}

export async function updateUserPoints(userId, points) {
  const { data, error } = await supabase
    .from('user_rewards')
    .update({ points })
    .eq('user_id', userId)
    .select()
    .single()

  return { data, error }
}

export async function claimDailyReward(userId) {
  const today = new Date().toISOString().split('T')[0]
  
  // Get current user rewards
  const { data: currentData } = await getUserRewards(userId)
  
  if (!currentData) {
    return { data: null, error: new Error('User rewards not found') }
  }

  // Check if already claimed today
  if (currentData.last_claim_date === today) {
    return { data: currentData, error: new Error('Already claimed today') }
  }

  // Update points and streak
  const newPoints = currentData.points + 5
  const newStreak = currentData.streak + 1

  const { data, error } = await supabase
    .from('user_rewards')
    .update({
      points: newPoints,
      streak: newStreak,
      last_claim_date: today
    })
    .eq('user_id', userId)
    .select()
    .single()

  return { data, error }
}

// Rewards Functions
export async function getAllRewards() {
  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .order('points_required', { ascending: true })

  return { data, error }
}

export async function redeemReward(userId, rewardId, pointsRequired) {
  // Get current user rewards
  const { data: userData } = await getUserRewards(userId)
  
  if (!userData || userData.points < pointsRequired) {
    return { data: null, error: new Error('Insufficient points') }
  }

  // Deduct points
  const newPoints = userData.points - pointsRequired
  await updateUserPoints(userId, newPoints)

  // Record redemption
  const { data, error } = await supabase
    .from('user_reward_redemptions')
    .insert([
      {
        user_id: userId,
        reward_id: rewardId,
        points_spent: pointsRequired
      }
    ])
    .select()
    .single()

  return { data, error }
}

// Referral Functions
export async function createReferral(referrerId, referralCode) {
  const { data, error } = await supabase
    .from('referrals')
    .insert([
      {
        referrer_id: referrerId,
        referral_code: referralCode,
        status: 'pending'
      }
    ])
    .select()
    .single()

  return { data, error }
}

export async function getReferralsByUser(userId) {
  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('referrer_id', userId)

  return { data, error }
}

export async function processReferralSignup(referralCode, referredId) {
  // Find the referral
  const { data: referral } = await supabase
    .from('referrals')
    .select('*')
    .eq('referral_code', referralCode)
    .eq('status', 'pending')
    .single()

  if (!referral) {
    return { data: null, error: new Error('Invalid referral code') }
  }

  // Update referral with referred user
  await supabase
    .from('referrals')
    .update({
      referred_id: referredId,
      status: 'completed'
    })
    .eq('id', referral.id)

  // Award points to referrer
  const { data: referrerRewards } = await getUserRewards(referral.referrer_id)
  if (referrerRewards) {
    await updateUserPoints(referral.referrer_id, referrerRewards.points + 25)
  }

  return { data: referral, error: null }
}

export async function getReferralStats(userId) {
  const { data: referrals } = await getReferralsByUser(userId)
  
  const totalReferrals = referrals?.length || 0
  const completedReferrals = referrals?.filter(r => r.status === 'completed').length || 0
  const pointsEarned = completedReferrals * 25

  return {
    totalReferrals,
    completedReferrals,
    pointsEarned
  }
}