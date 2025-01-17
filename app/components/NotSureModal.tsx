import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader } from 'lucide-react'

interface NotSureModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotSureModal({ isOpen, onClose }: NotSureModalProps) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setInput('')
      setResult(null)
      setError(null)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)
    try {
      const response = await fetch('https://api.whatfeeling.com/api/emotions/generateSuggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.text()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Describe your feelings</h2>
              <button
                onClick={() => {
                  setInput('')
                  setResult(null)
                  setError(null)
                  onClose()
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-md text-red-600 mb-4">
              WARNING: Perplexity AI will be used to analyze your text and return a result. Please do not share any private information.
              AI may make mistakes. Please use with discretion.
            </p>
            <form onSubmit={handleSubmit}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe how you're feeling..."
                className="w-full p-2 border border-gray-300 rounded-md mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <button
                type="submit"
                disabled={isLoading || input.trim() === ''}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    Analyzing...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <h3 className="font-semibold mb-2">Error:</h3>
                <p>{error}</p>
              </div>
            )}
            {result && (
              <div className="mt-4 p-3 bg-fuchsia-100 border border-fuchsia-400 text-fuchsia-700 rounded-md">
                <h3 className="font-semibold mb-2">You could be feeling {result}</h3>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

