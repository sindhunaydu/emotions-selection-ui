import { motion } from 'framer-motion'

interface Emotion {
  name: string
  color: string
}

interface EmotionHierarchyProps {
  selectedEmotions: Emotion[][]
  stage: number
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

export default function EmotionHierarchy({ selectedEmotions, stage }: EmotionHierarchyProps) {
  return (
    <div className="flex flex-col items-center justify-center ml-8 w-1/3">
      {selectedEmotions.map((stageEmotions, stageIndex) => (
        <motion.div
          key={stageIndex}
          className="mb-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: stageIndex * 0.2 }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {stageEmotions.map((emotion, index) => {
              const primaryColor = selectedEmotions[0].find(e => 
                e.name === emotion.name || 
                e.secondaryEmotions?.some(se => se.name === emotion.name) ||
                e.secondaryEmotions?.some(se => se.tertiaryEmotions?.some(te => te.name === emotion.name))
              )?.color || emotion.color;
              
              return (
                <motion.div
                  key={`${emotion.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md ${
                    stageIndex === 0 ? 'text-lg' : stageIndex === 1 ? 'text-base' : 'text-sm'
                  }`}
                  style={{
                    backgroundColor: getColorValue(primaryColor),
                    border: `2px solid ${getColorValue(primaryColor)}`,
                  }}
                >
                  {emotion.name}
                </motion.div>
              );
            })}
          </div>
          {stageIndex < stage && stageIndex < 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 40 }}
              className="flex justify-center items-center my-2"
            >
              <motion.div
                className="w-0.5 bg-gray-300"
                initial={{ height: 0 }}
                animate={{ height: 40 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

