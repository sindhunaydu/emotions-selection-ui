'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PrimaryEmotions from './components/PrimaryEmotions'
import SecondaryEmotions from './components/SecondaryEmotions'
import TertiaryEmotions from './components/TertiaryEmotions'
import NavigationButtons from './components/NavigationButtons'
import EmotionHierarchy from './components/EmotionHierarchy'
import ConclusionScreen from './components/ConclusionScreen'

interface Emotion {
  name: string
  color: string
  secondaryEmotions?: Emotion[]
  tertiaryEmotions?: Emotion[]
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
  const [isComplete, setIsComplete] = useState(false)

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
    if (stage < 2) {
      setStage(prev => prev + 1)
      setSelectedEmotions(prev => [...prev, []])
    } else {
      setIsComplete(true)
    }
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
        setBackgroundColor('#ffffff') 
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
    if (stage === 0) return { emotions, parentColors: null }
    if (stage === 1) {
      const secondaryEmotions = selectedEmotions[0].flatMap(e => e.secondaryEmotions || [])
      const parentColors = selectedEmotions[0].map(e => e.color)
      return { 
        emotions: secondaryEmotions, 
        parentColors 
      }
    }
    if (stage === 2) {
      const tertiaryEmotions = selectedEmotions[1].flatMap(e => e.tertiaryEmotions || [])
      const parentColors = selectedEmotions[1].map(e => e.color)
      return { 
        emotions: tertiaryEmotions, 
        parentColors 
      }
    }
    return { emotions: [], parentColors: null }
  }

  const resetState = () => {
    setStage(0)
    setSelectedEmotions([[]])
    setBackgroundColor('#ffffff')
    setIsComplete(false)
  }

  useEffect(() => {
    resetState()
  }, [])

  if (isComplete) {
    return <ConclusionScreen selectedEmotions={selectedEmotions} onStartOver={resetState} />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative" style={{ backgroundColor }}>
      <NavigationButtons 
        onBack={stage > 0 ? handleBack : undefined}
        onNext={selectedEmotions[stage].length > 0 ? handleNextStage : undefined}
        stage={stage}
      />

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.h1
            key="question"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-gray-800 text-center"
          >
            How are you feeling now?
          </motion.h1>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
        <div className="w-full md:w-2/3 mb-8 md:mb-0">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <PrimaryEmotions 
                emotions={getCurrentEmotions().emotions} 
                onSelect={handleEmotionSelect}
                selectedEmotions={selectedEmotions[stage]}
              />
            )}
            {stage === 1 && (
              <SecondaryEmotions 
                emotions={getCurrentEmotions().emotions}
                onSelect={handleEmotionSelect}
                selectedEmotions={selectedEmotions[stage]}
                parentColors={getCurrentEmotions().parentColors}
              />
            )}
            {stage === 2 && (
              <TertiaryEmotions 
                emotions={getCurrentEmotions().emotions}
                onSelect={handleEmotionSelect}
                selectedEmotions={selectedEmotions[stage]}
                parentColors={getCurrentEmotions().parentColors}
              />
            )}
          </AnimatePresence>
        </div>

        <EmotionHierarchy 
          selectedEmotions={selectedEmotions} 
          stage={stage}
        />
      </div>
    </div>
  )
}

