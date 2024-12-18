import { motion } from 'framer-motion'

interface Emotion {
  name: string
  color?: string
}

interface SecondaryEmotionsProps {
  emotions: Emotion[]
  onSelect: (emotion: Emotion) => void
  selectedEmotions: Emotion[]
  parentColor: string
}

const getColorClass = (color: string | undefined, isSelected: boolean): string => {
  if (isSelected) {
    return `ring-2 ring-blue-500`;
  }
  if (color) {
    return `bg-${color.toLowerCase()}-200`;
  }
  return `bg-gray-200`;
};

export default function SecondaryEmotions({ emotions, onSelect, selectedEmotions, parentColor }: SecondaryEmotionsProps) {
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
            className={`${getColorClass(emotion.color, isSelected)} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-800 font-semibold`}
            onClick={() => onSelect(emotion)}
          >
            {emotion.name}
          </motion.button>
        )
      })}
    </motion.div>
  )
}

