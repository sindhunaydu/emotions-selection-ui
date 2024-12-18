import { motion } from 'framer-motion'

interface Emotion {
  name: string
  color?: string
}

interface TertiaryEmotionsProps {
  emotions: Emotion[]
  onSelect: (emotion: Emotion) => void
  selectedEmotions: Emotion[]
  parentColor: string
}

const getColorClass = (emotion: Emotion, isSelected: boolean, parentColor: string) => {
  return `${emotion.color ? `bg-${emotion.color.toLowerCase()}-200` : `bg-${parentColor}-200`} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-800 font-semibold ${isSelected ? 'ring-2 ring-blue-500' : ''}`
}

export default function TertiaryEmotions({ emotions, onSelect, selectedEmotions, parentColor }: TertiaryEmotionsProps) {
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
            className={getColorClass(emotion, isSelected, parentColor)}
            onClick={() => onSelect(emotion)}
          >
            {emotion.name}
          </motion.button>
        )
      })}
    </motion.div>
  )
}

