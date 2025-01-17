import { motion } from 'framer-motion'

interface Emotion {
  name: string
  color: string
  parentColor?: string
  secondaryEmotions?: Emotion[]
  tertiaryEmotions?: Emotion[]
}

interface PrimaryEmotionsProps {
  emotions: Emotion[]
  onSelect: (emotion: Emotion) => void
  selectedEmotions: Emotion[]
  onNotSureClick: () => void
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

export default function PrimaryEmotions({ emotions, onSelect, selectedEmotions, onNotSureClick }: PrimaryEmotionsProps) {
  if (!emotions || emotions.length === 0) {
    return <div>No emotions available</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-start"
    >
      <div className="flex flex-wrap justify-start gap-4 mb-4">
        {emotions.map((emotion, index) => {
          const isSelected = selectedEmotions.some(e => e.name === emotion.name)
          const backgroundColor = getColorValue(emotion.color)
          
          return (
            <motion.button
              key={emotion.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-800 font-semibold ${
                isSelected ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{ backgroundColor }}
              onClick={() => onSelect(emotion)}
            >
              <motion.span
                initial={{ scale: 1 }}
                animate={{ scale: isSelected ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {emotion.name}
              </motion.span>
            </motion.button>
          )
        })}
      </div>
      <button
        onClick={onNotSureClick}
        className="text-sm text-blue-500 hover:text-blue-600 transition-colors mt-2"
      >
        Not sure?
      </button>
    </motion.div>
  )
}

