import { motion } from 'framer-motion'

export default function StatsCard({ icon: Icon, title, children, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 24px -8px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </motion.div>
  )
}