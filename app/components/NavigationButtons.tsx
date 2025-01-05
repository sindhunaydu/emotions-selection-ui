import { ArrowLeft, ArrowRight, RotateCcw, Info } from 'lucide-react'

interface NavigationButtonsProps {
  onBack?: () => void
  onNext?: () => void
  onStartOver?: () => void
  stage: number
  position: 'top' | 'bottom'
}

export default function NavigationButtons({ onBack, onNext, onStartOver, stage, position }: NavigationButtonsProps) {
  const getNextButtonText = () => {
    switch (stage) {
      case 0:
        return "Explore Deeper"
      case 1:
        return "Refine Further"
      case 2:
        return "Conclude Journey"
      default:
        return "Next"
    }
  }

  if (position === 'top') {
    return (
      <div className="flex items-center">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-slate-400 text-white hover:bg-blue-600 transition-colors duration-300 mr-2"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        {onStartOver && (
          <button
            onClick={onStartOver}
            className="p-2 rounded-full bg-slate-400 text-white hover:bg-blue-600 transition-colors duration-300 mr-2"
            aria-label="Start over"
          >
            <RotateCcw size={20} />
          </button>
        )}
        <button
            onClick={() => window.open("https://www.calm.com/blog/the-feelings-wheel", "_blank")}
            className="p-2 rounded-full bg-slate-400 text-white hover:bg-blue-600 transition-colors duration-300 mr-2"
            aria-label="Info"
          >
            <Info size={20} />
          </button>
      </div>
    )
  }

  return (
    <div className="flex items-start">
      {onNext && (
        <button
          onClick={onNext}
          className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 flex items-center"
          aria-label="Go to next stage"
        >
          {getNextButtonText()}
          <ArrowRight size={20} className="ml-2" />
        </button>
      )}
    </div>
  )
}

