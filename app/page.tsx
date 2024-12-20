'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PrimaryEmotions from './components/PrimaryEmotions'
import SecondaryEmotions from './components/SecondaryEmotions'
import TertiaryEmotions from './components/TertiaryEmotions'
import SelectedEmotions from './components/SelectedEmotions'
import NavigationButtons from './components/NavigationButtons'

interface Emotion {
  name: string
  color: string
  secondaryEmotions?: Emotion[]
  tertiaryEmotions?: Emotion[]
}

const colorMap: { [key: string]: string } = {
  Blue: 'blue',
  Red: 'red',
  Yellow: 'yellow',
  Green: 'green',
  Purple: 'purple',
  Pink: 'pink',
  Gray: 'gray',
  Orange: 'orange',
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

export default function Home() {
  const [stage, setStage] = useState(0)
  const [selectedEmotions, setSelectedEmotions] = useState<Emotion[][]>([[]])
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [emotions, setEmotions] = useState<Emotion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/emotions/listAll')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log('Fetched emotions:', data)
        setEmotions(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error fetching emotions:', err.message)
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  const handleEmotionSelect = (emotion: Emotion) => {
    console.log('Selected emotion:', emotion)
    setSelectedEmotions(prev => {
      const newSelected = [...prev]
      const index = newSelected[stage].findIndex(e => e.name === emotion.name)
      if (index !== -1) {
        newSelected[stage] = newSelected[stage].filter(e => e.name !== emotion.name)
      } else {
        newSelected[stage] = [...newSelected[stage], emotion]
      }
      return newSelected
    })
    setBackgroundColor(getColorValue(emotion.color))
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
        setBackgroundColor(getColorValue(lastEmotion.color))
      } else {
        setBackgroundColor('bg-white')
      }
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error fetching emotions</h2>
        <p>{error}</p>
        <p className="mt-4">Please check your API server and try again.</p>
      </div>
    )
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

  return (
    <>
      <main style={{ backgroundColor }} className="min-h-screen transition-colors duration-500 flex flex-col items-center justify-center p-8 relative">
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
            />
          )}
          {stage === 2 && (
            <TertiaryEmotions 
              emotions={getCurrentEmotions()}
              onSelect={handleEmotionSelect}
              selectedEmotions={selectedEmotions[stage]}
            />
          )}
        </AnimatePresence>

        <SelectedEmotions emotions={selectedEmotions.flat()} />
      </main>
    </>
  )
}

