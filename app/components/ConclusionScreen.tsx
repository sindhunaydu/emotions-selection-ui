import { useState } from 'react'
import { motion } from 'framer-motion'
import TertiaryEmotionsImage from './TertiaryEmotionsImage'
import { Share2 } from 'lucide-react'

interface Emotion {
  name: string
  color: string
  secondaryEmotions?: Emotion[]
  tertiaryEmotions?: Emotion[]
}

interface ConclusionScreenProps {
  selectedEmotions: Emotion[][]
  onStartOver: () => void
}

const getColorValue = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    Blue: '#bfdbfe',
    Red: '#fecaca',
    Yellow: '#fef08a',
    Green: '#bbf7d0',
    Purple: '#e9d5ff',
    Pink: '#fbcfe8',
    Gray: '#e5e7eb',
    Orange: '#fed7aa',
  }
  return colorMap[color] || '#ffffff'
}

export default function ConclusionScreen({ selectedEmotions, onStartOver }: ConclusionScreenProps) {
  const [shareImageUrl, setShareImageUrl] = useState<string | null>(null)

  const tertiaryEmotions = selectedEmotions[2] || []
  const secondaryEmotions = selectedEmotions[1] || []
  const primaryEmotions = selectedEmotions[0] || []

  const findPrimaryColor = (emotion: Emotion): string => {
    const primaryEmotion = primaryEmotions.find(pe =>
      pe.name === emotion.name ||
      pe.secondaryEmotions?.some(se => se.name === emotion.name) ||
      pe.secondaryEmotions?.some(se => se.tertiaryEmotions?.some(te => te.name === emotion.name))
    )
    return primaryEmotion ? primaryEmotion.color : emotion.color
  }

  const handleShare = async () => {
    if (shareImageUrl) {
      try {
        const blob = await (await fetch(shareImageUrl)).blob()
        const file = new File([blob], 'my-emotions.png', { type: blob.type })
        
        if (navigator.share) {
          await navigator.share({
            title: 'My Emotions',
            text: 'This is how I feel right now.',
            files: [file]
          })
        } else {
          // Fallback for browsers that don't support Web Share API
          const link = document.createElement('a')
          link.href = shareImageUrl
          link.download = 'my-emotions.png'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 text-center"
      >
        Knowledge is Powerful
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl md:text-2xl text-gray-600 mb-12 text-center max-w-2xl"
      >
        You've taken a powerful step in understanding your emotions. Self-awareness opens doors to personal growth. Take your journey forward with confidence.
      </motion.p>

      {tertiaryEmotions.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            You feel
          </h2>
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-4">
              {tertiaryEmotions.map((emotion, index) => (
                <motion.div
                  key={`tertiary-${emotion.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-6 py-3 rounded-full text-2xl text-gray-800 font-bold shadow-lg"
                  style={{ backgroundColor: getColorValue(findPrimaryColor(emotion)) }}
                >
                  {emotion.name}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(secondaryEmotions.length > 0 || primaryEmotions.length > 0) && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 text-center">Your Emotional Journey</h2>
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-3">
              {primaryEmotions.map((emotion, index) => (
                <motion.div
                  key={`primary-${emotion.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 rounded-full text-lg text-gray-800 font-medium shadow-md"
                  style={{ backgroundColor: getColorValue(emotion.color) }}
                >
                  {emotion.name}
                </motion.div>
              ))}
              {secondaryEmotions.map((emotion, index) => (
                <motion.div
                  key={`secondary-${emotion.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (primaryEmotions.length + index) * 0.1 }}
                  className="px-4 py-2 rounded-full text-lg text-gray-800 font-medium shadow-md"
                  style={{ backgroundColor: getColorValue(findPrimaryColor(emotion)) }}
                >
                  {emotion.name}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-5 flex gap-4"
      >
        <button
          onClick={onStartOver}
          className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300"
        >
          Start Over
        </button>
        {tertiaryEmotions.length > 0 && (
          <button
            onClick={handleShare}
            className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center"
          >
            <Share2 className="mr-2" size={20} />
            Share with someone you trust
          </button>
        )}
      </motion.div>

      <TertiaryEmotionsImage
        emotions={tertiaryEmotions.map(emotion => ({
          ...emotion,
          color: getColorValue(findPrimaryColor(emotion))
        }))}
        onImageGenerated={setShareImageUrl}
      />
    </div>
  )
}