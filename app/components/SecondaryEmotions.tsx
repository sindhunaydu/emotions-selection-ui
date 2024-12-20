import { motion } from 'framer-motion'

interface Emotion {
  name: string
  color: string
}

interface SecondaryEmotionsProps {
  emotions: Emotion[]
  onSelect: (emotion: Emotion) => void
  selectedEmotions: Emotion[]
}

const getColorValue = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    Blue: '#dbeafe',
    Red: '#fee2e2',
    Yellow: '#fef9c3',
    Green: '#dcfce7',
    Purple: '#f3e8ff',
    Pink: '#fce7f3',
    Gray: '#f3f4f6',
    Orange: '#ffedd5',
  }
  return colorMap[color] || '#ffffff'
}

export default function SecondaryEmotions({ emotions, onSelect, selectedEmotions }: SecondaryEmotionsProps) {
  if (!emotions || emotions.length === 0) {
    return <div>No secondary emotions available</div>
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

