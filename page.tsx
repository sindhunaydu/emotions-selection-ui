'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PrimaryEmotions from './app/components/PrimaryEmotions'
import SecondaryEmotions from './app/components/SecondaryEmotions'
import TertiaryEmotions from './app/components/TertiaryEmotions'
import SelectedEmotions from './app/components/SelectedEmotions'
import NavigationButtons from './app/components/NavigationButtons'

interface Emotion {
  name: string
  color?: string
  secondaryEmotions?: Emotion[]
  tertiaryEmotions?: Emotion[]
}

export default function Home() {
  const [stage, setStage] = useState(0)
  const [selectedEmotions, setSelectedEmotions] = useState<Emotion[][]>([[]])
  const [backgroundColor, setBackgroundColor] = useState('bg-white')
  const [emotions, setEmotions] = useState<Emotion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/emotions/listAll')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch emotions')
        }
        return response.json()
      })
      .then(data => {
        // Adjust colors for all primary emotions and their secondary emotions
        const adjustedData = data.map((emotion: Emotion) => {
          const primaryColor = emotion.color || 'Gray'
          return {
            ...emotion,
            secondaryEmotions: emotion.secondaryEmotions?.map(se => ({ 
              ...se, 
              color: primaryColor,
              tertiaryEmotions: se.tertiaryEmotions?.map(te => ({ ...te, color: primaryColor }))
            }))
          }
        })
        setEmotions(adjustedData)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotions(prev => {
      const newSelected = [...prev]
      const index = newSelected[stage].findIndex(e => e.name === emotion.name)
      if (index !== -1) {
        // Deselect the emotion
        newSelected[stage] = newSelected[stage].filter(e => e.name !== emotion.name)
      } else {
        // Select the emotion
        newSelected[stage] = [...newSelected[stage], emotion]
      }
      return newSelected
    })
    if (emotion.color) {
      setBackgroundColor(`bg-${emotion.color.toLowerCase()}-200`)
    }
  }

  const handleNextStage = () => {
    setStage(prev => prev + 1)
    setSelectedEmotions(prev => [...prev, []])
  }

  const handleBack = () => {
    if (stage > 0) {
      setStage(prev => prev - 1)
      setSelectedEmotions(prev => {
        const newSelected = [...prev]
        newSelected.pop()
        return newSelected
      })
      const lastStageEmotions = selectedEmotions[stage - 1]
      if (lastStageEmotions && lastStageEmotions.length > 0) {
        const lastEmotion = lastStageEmotions[lastStageEmotions.length - 1]
        if (lastEmotion.color) {
          setBackgroundColor(`bg-${lastEmotion.color.toLowerCase()}-200`)
        }
      } else {
        setBackgroundColor('bg-white')
      }
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  }

  const getCurrentEmotions = () => {
    if (stage === 0) return emotions
    if (stage === 1) {
      return selectedEmotions[0].flatMap(e => e.secondaryEmotions || [])
    }
    if (stage === 2) {
      return selectedEmotions[1].flatMap(e => e.tertiaryEmotions || [])
    }
    return []
  }

  const getEmotionColor = () => {
    if (stage === 0) return ''
    const parentEmotion = selectedEmotions[stage - 1][0]
    return parentEmotion?.color ? `${parentEmotion.color.toLowerCase()}-100` : ''
  }

  return (
    <main className={`min-h-screen ${backgroundColor} transition-colors duration-500 flex flex-col items-center justify-center p-8 relative`}>
      <NavigationButtons 
        onBack={stage > 0 ? handleBack : undefined}
        onNext={stage < 2 && selectedEmotions[stage].length > 0 ? handleNextStage : undefined}
      />

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.h1
            key="question"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-4xl font-bold mb-12 text-gray-800"
          >
            How are you feeling now?
          </motion.h1>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <PrimaryEmotions 
            emotions={getCurrentEmotions()} 
            onSelect={handleEmotionSelect}
            selectedEmotions={selectedEmotions[stage]}
          />
        )}
        {stage === 1 && (
          <SecondaryEmotions 
            emotions={getCurrentEmotions()}
            onSelect={handleEmotionSelect}
            selectedEmotions={selectedEmotions[stage]}
            parentColor={getEmotionColor()}
          />
        )}
        {stage === 2 && (
          <TertiaryEmotions 
            emotions={getCurrentEmotions()}
            onSelect={handleEmotionSelect}
            selectedEmotions={selectedEmotions[stage]}
            parentColor={getEmotionColor()}
          />
        )}
      </AnimatePresence>

      <SelectedEmotions emotions={selectedEmotions.flat()} />
    </main>
  )
}

