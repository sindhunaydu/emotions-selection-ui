import { motion } from 'framer-motion'

interface Emotion {
  name: string
  color?: string
}

export default function SelectedEmotions({ emotions }: { emotions: Emotion[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 flex flex-wrap justify-center gap-2"
    >
      {emotions.map((emotion, index) => (
        <motion.span
          key={`${emotion.name}-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`${
            emotion.color ? `bg-${emotion.color.toLowerCase()}-100` : 'bg-gray-100'
          } px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm`}
        >
          {emotion.name}
        </motion.span>
      ))}
    </motion.div>
  )
}

