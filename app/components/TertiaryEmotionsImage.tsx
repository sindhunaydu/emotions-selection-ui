import { useRef, useEffect } from 'react'

interface Emotion {
  name: string
  color: string
}

interface TertiaryEmotionsImageProps {
  emotions: Emotion[]
  onImageGenerated: (imageUrl: string) => void
}

export default function TertiaryEmotionsImage({ emotions, onImageGenerated }: TertiaryEmotionsImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Set canvas size (increased for better quality)
        canvas.width = 1200
        canvas.height = 800

        // Draw background
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw title
        ctx.fillStyle = '#000000'
        ctx.font = 'bold 48px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('I feel', canvas.width / 2, 80)

        // Draw emotions
        const startY = 160
        const emotionHeight = 100
        const padding = 20
        emotions.forEach((emotion, index) => {
          const y = startY + index * (emotionHeight + padding)
          
          // Draw emotion bubble
          ctx.fillStyle = emotion.color
          ctx.beginPath()
          ctx.roundRect(100, y, canvas.width - 200, emotionHeight, 50)
          ctx.fill()

          // Draw emotion text
          ctx.fillStyle = '#000000'
          ctx.font = 'bold 40px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(emotion.name, canvas.width / 2, y + emotionHeight / 2 + 14)
        })

        // Draw footer
        ctx.fillStyle = '#666666'
        ctx.font = '32px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('whatfeeling.com', canvas.width / 2, canvas.height - 40)

        // Generate high-quality image URL
        const imageUrl = canvas.toDataURL('image/png', 1.0)
        onImageGenerated(imageUrl)
      }
    }
  }, [emotions, onImageGenerated])

  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}

