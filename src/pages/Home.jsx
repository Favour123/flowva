import { useState } from 'react'
import AppSidebar from '@/components/AppSidebar'
import { Menu } from 'lucide-react'

export default function Home() {
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Home</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex items-center justify-center p-8" style={{ minHeight: 'calc(100vh - 100px)' }}>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🚧</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Coming Soon</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              This feature is currently under development. Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}