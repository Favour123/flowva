import { useState } from 'react'
import { Bell, Star, Share2, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AppSidebar from '@/components/AppSidebar'
import PointsBalance from '@/components/PointsBalance'
import DailyStreak from '@/components/DailyStreak'
import ToolSpotlight from '@/components/ToolSpotlight'
import RewardCard from '@/components/RewardCard'
import ReferralSection from '@/components/ReferralSection'
import { rewards, earnMoreActivities } from '@/data/mockData'

const tabs = [
  { id: 'earn', label: 'Earn Points' },
  { id: 'redeem', label: 'Redeem Rewards' }
]

const rewardFilters = [
  { id: 'all', label: 'All Rewards', count: 8 },
  { id: 'unlocked', label: 'Unlocked', count: 0 },
  { id: 'locked', label: 'Locked', count: 8 },
  { id: 'coming', label: 'Coming Soon', count: 0 }
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('earn')
  const [activeFilter, setActiveFilter] = useState('all')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar 
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Rewards Hub</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">Earn points, unlock rewards, and celebrate your progress!</p>
              </div>
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-8">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'earn' ? (
              <motion.div
                key="earn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Your Rewards Journey */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Rewards Journey</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <PointsBalance />
                    <DailyStreak />
                    <ToolSpotlight />
                  </div>
                </div>

                {/* Earn More Points */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Earn More Points</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {earnMoreActivities.map((activity) => {
                      const Icon = activity.id === 'referral' ? Star : Share2
                      return (
                        <motion.div
                          key={activity.id}
                          whileHover={{ y: -4 }}
                          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">{activity.title}</h3>
                              <p className="text-sm text-gray-600 mb-4">{activity.description}</p>
                              {activity.points && (
                                <div className="text-sm text-purple-600 font-medium">
                                  Earn +{activity.points} pts
                                </div>
                              )}
                            </div>
                            {activity.id === 'share-stack' && (
                              <button className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium">
                                Share
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Refer & Earn */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Refer & Earn</h2>
                  </div>
                  <ReferralSection />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="redeem"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Redeem Your Points */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Redeem Your Points</h2>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                    {rewardFilters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                          activeFilter === filter.id
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        {filter.label}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          activeFilter === filter.id
                            ? 'bg-white/20'
                            : 'bg-gray-100'
                        }`}>
                          {filter.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Rewards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rewards.map((reward) => (
                      <RewardCard key={reward.id} reward={reward} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}