import { useState, useEffect } from 'react'
import { Copy, Check, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useReferrals } from '@/hooks/useReferrals'

const socialIcons = [
  { name: 'Facebook', color: '#1877F2', icon: '📘' },
  { name: 'Twitter', color: '#000000', icon: '𝕏' },
  { name: 'LinkedIn', color: '#0A66C2', icon: '💼' },
  { name: 'WhatsApp', color: '#25D366', icon: '💬' }
]

export default function ReferralSection() {
  const [copied, setCopied] = useState(false)
  const { referralCode, stats, loading, createNewReferral } = useReferrals()
  
  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`

  useEffect(() => {
    // Create referral record if it doesn't exist
    if (referralCode) {
      createNewReferral()
    }
  }, [referralCode])

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Share Your Link</h3>
            <p className="text-sm text-gray-600">Invite friends and earn 25 points when they join!</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600">
              {loading ? '...' : stats.completedReferrals}
            </div>
            <div className="text-sm text-gray-600 mt-1">Referrals</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">
              {loading ? '...' : stats.pointsEarned}
            </div>
            <div className="text-sm text-gray-600 mt-1">Points Earned</div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Your personal referral link:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          {socialIcons.map((social) => (
            <motion.button
              key={social.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-md hover:shadow-lg transition-shadow"
              style={{ backgroundColor: social.color }}
              title={`Share on ${social.name}`}
            >
              {social.icon}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}