import { motion } from 'framer-motion'
import { UserPlus, Gift } from 'lucide-react'
import { toolSpotlight } from '@/data/mockData'

export default function ToolSpotlight() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-2xl p-6 shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)'
      }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24" />
      
      <div className="relative">
        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-4">
          Featured
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Top Tool Spotlight</h2>
        <h3 className="text-xl font-semibold text-white/90 mb-3">{toolSpotlight.title}</h3>
        
        <p className="text-white/80 text-sm mb-6 leading-relaxed">
          {toolSpotlight.details}
        </p>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-purple-600 rounded-lg font-medium hover:shadow-xl transition-shadow"
          >
            <UserPlus className="w-4 h-4" />
            Sign up
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
          >
            <Gift className="w-4 h-4" />
            Claim 50 pts
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}