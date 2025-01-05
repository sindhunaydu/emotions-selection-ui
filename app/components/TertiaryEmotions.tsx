import { motion } from 'framer-motion'

interface Emotion {
  name: string
  color: string
  secondaryEmotions?: Emotion[]
  tertiaryEmotions?: Emotion[]
}

interface TertiaryEmotionsProps {
  emotions: Emotion[]
  onSelect: (emotion: Emotion) => void
  selectedEmotions: Emotion[]
  parentColors: string[] | null
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

export default function TertiaryEmotions({ emotions, onSelect, selectedEmotions, parentColors }: TertiaryEmotionsProps) {
  if (!emotions || emotions.length === 0) {
    return <div>No tertiary emotions available</div>
  }

  // Group emotions by their parent primary emotion
  const groupedEmotions = emotions.reduce((acc, emotion, index) => {
    const parentColor = parentColors ? parentColors[Math.floor(index / (emotions.length / parentColors.length))] : 'default';
    if (!acc[parentColor]) {
      acc[parentColor] = [];
    }
    acc[parentColor].push(emotion);
    return acc;
  }, {} as Record<string, Emotion[]>);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-start gap-4 w-full"
    >
      {Object.entries(groupedEmotions).map(([parentColor, groupEmotions], groupIndex) => (
        <div key={parentColor || groupIndex} className="w-full">
          <div className="flex flex-wrap justify-start gap-4 w-full">
            {groupEmotions.map((emotion, index) => {
              const isSelected = selectedEmotions.some(e => e.name === emotion.name);
              const backgroundColor = getColorValue(parentColor || emotion.color);
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
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

