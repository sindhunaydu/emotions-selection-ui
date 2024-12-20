import { motion } from 'framer-motion'

interface Emotion {
  name: string
  color: string
}

interface TertiaryEmotionsProps {
  emotions: Emotion[]
  onSelect: (emotion: Emotion) => void
  selectedEmotions: Emotion[]
  parentColors: string[] | null
}

const getColorValue = (color: string, parentColors: string[] | null): string => {
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
  const baseColor = colorMap[color] || '#ffffff'
  return lightenColor(baseColor, 0.4)
}

const lightenColor = (color: string, amount: number): string => {
  const num = parseInt(color.replace('#', ''), 16)
  const r = Math.min(255, Math.round((num >> 16) + (255 - (num >> 16)) * amount))
  const g = Math.min(255, Math.round((num >> 8 & 255) + (255 - (num >> 8 & 255)) * amount))
  const b = Math.min(255, Math.round((num & 255) + (255 - (num & 255)) * amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export default function TertiaryEmotions({ emotions, onSelect, selectedEmotions, parentColors }: TertiaryEmotionsProps) {
  if (!emotions || emotions.length === 0) {
    return <div>No tertiary emotions available</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-wrap justify-center gap-4 w-full"
    >
      {emotions.map((emotion, index) => {
        const isSelected = selectedEmotions.some(e => e.name === emotion.name)
        const parentColor = parentColors ? parentColors[Math.floor(index / (emotions.length / parentColors.length))] : null
        const backgroundColor = getColorValue(parentColor || emotion.color, parentColors)
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
    </motion.div>
  )
}

