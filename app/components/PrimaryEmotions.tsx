import { motion } from 'framer-motion'

interface Emotion {
  name: string
  color: string
}

interface PrimaryEmotionsProps {
  emotions: Emotion[]
  onSelect: (emotion: Emotion) => void
  selectedEmotions: Emotion[]
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

export default function PrimaryEmotions({ emotions, onSelect, selectedEmotions }: PrimaryEmotionsProps) {
  if (!emotions || emotions.length === 0) {
    return <div>No emotions available</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {emotions.map((emotion, index) => {
        const isSelected = selectedEmotions.some(e => e.name === emotion.name)
        
        return (
          <motion.button
            key={emotion.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-800 font-semibold ${
              isSelected ? 'ring-2 ring-blue-500' : ''
            }`}
            style={{ backgroundColor: getColorValue(emotion.color) }}
            onClick={() => onSelect(emotion)}
          >
            {emotion.name}
          </motion.button>
        )
      })}
    </motion.div>
  )
}

