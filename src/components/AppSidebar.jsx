import { useState } from 'react'
import { Home, Compass, Library, Layers, CreditCard, Diamond, Settings, LogOut, MoreVertical, MessageSquare, HelpCircle, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import flowvaLogo from '@/assets/flowva_logo-xVpZI3-U.png'

const menuItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Compass, label: 'Discover', path: '/discover' },
  { icon: Library, label: 'Library', path: '/library' },
  { icon: Layers, label: 'Tech Stack', path: '/tech-stack' },
  { icon: CreditCard, label: 'Subscriptions', path: '/subscriptions' },
  { icon: Diamond, label: 'Rewards Hub', path: '/dashboard' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function AppSidebar({ isMobileOpen, onClose }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const handleNavigation = (path) => {
    navigate(path)
    if (onClose) onClose()
  }
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 h-screen flex flex-col transform transition-transform duration-300 lg:transform-none ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <img src={flowvaLogo} alt="Flowva Logo" className="w-10 h-10" />
        
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {user?.user_metadata?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.email.split('@')[0]}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* User Menu Dropdown */}
        <AnimatePresence>
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={() => {
                  setShowUserMenu(false)
                  // Handle feedback
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <MessageSquare className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-900">Feedback</span>
              </button>
              <button
                onClick={() => {
                  setShowUserMenu(false)
                  // Handle support
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
              >
                <HelpCircle className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-900">Support</span>
              </button>
              <button
                onClick={() => {
                  setShowUserMenu(false)
                  handleSignOut()
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-100"
              >
                <LogOut className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-900">Log Out</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  )
}

