import { Github, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import './App.css'
import APIInterfaceGenerator from './components/Interface'
import Mention from './components/Mention'
import Usage from './components/Usage'

function App() {
  const [isUsageOpen, setIsUsageOpen] = useState(false)

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg fixed top-0 left-0 right-0 border-b border-gray-200 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* Logo */}
                <div className="text-2xl font-bold text-gray-800">
                  TS<span className="text-blue-600">Gen</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-left ">
              {/* Help Icon */}
              <button
                onClick={() => setIsUsageOpen(true)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Usage Guide"
              >
                <HelpCircle className="h-6 w-6" />
              </button>

              {/* Github Link */}

              <a href="https://github.com/AmanKadam-16/TimeSavers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600  hover:text-gray-900 transition-colors duration-200"
              >
                <Github className="h-6 w-6" />
              </a>
              <Mention />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <APIInterfaceGenerator />

      {/* Usage Modal */}
      {isUsageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Usage Guide</h2>
              <button
                onClick={() => setIsUsageOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <Usage />
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end">
              <button
                onClick={() => setIsUsageOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App