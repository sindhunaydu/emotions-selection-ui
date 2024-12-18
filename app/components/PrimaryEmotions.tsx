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

const colorMap: { [key: string]: string } = {
  Blue: 'blue',
  Red: 'red',
  Yellow: 'yellow',
  Green: 'green',
  Purple: 'purple',
  Pink: 'pink',
  Gray: 'gray',
  Orange: 'orange', // Add this line
  // Add more color mappings as needed
}

const getColorClass = (color: string): string => {
  const mappedColor = colorMap[color] || 'gray'
  return `bg-${mappedColor}-200`
}

export default function PrimaryEmotions({ emotions, onSelect, selectedEmotions }: PrimaryEmotionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {emotions.map((emotion, index) => {
        const isSelected = selectedEmotions.some(e => e.name === emotion.name)
        const colorClass = getColorClass(emotion.color)
        console.log(`Emotion: ${emotion.name}, Color: ${emotion.color}, Class: ${colorClass}`) // Log color information
        return (
          <motion.button
            key={emotion.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${colorClass} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-800 font-semibold ${
              isSelected ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onSelect(emotion)}
          >
            {emotion.name}
          </motion.button>
        )
      })}
    </motion.div>
  )
}

