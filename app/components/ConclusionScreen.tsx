import { motion } from 'framer-motion'

interface Emotion {
  name: string
  color: string
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
  const allSelectedEmotions = selectedEmotions.flat()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-100 to-purple-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 text-center"
      >
        Your Emotional Journey
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl md:text-2xl text-gray-600 mb-12 text-center max-w-2xl"
      >
        Congratulations on exploring and identifying your emotions. This self-awareness is a powerful tool for personal growth and well-being.
      </motion.p>
      <div className="flex flex-wrap justify-center gap-4">
        {allSelectedEmotions.map((emotion, index) => (
          <motion.div
            key={`${emotion.name}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="px-6 py-3 rounded-full text-2xl font-bold shadow-lg"
            style={{ backgroundColor: getColorValue(emotion.color) }}
          >
            {emotion.name}
          </motion.div>
        ))}
      </div>
      <button
  onClick={onStartOver}
  className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 mt-12"
>
  Start Over
</button>
    </div>
  )
}

