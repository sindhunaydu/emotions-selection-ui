import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'

interface NavigationButtonsProps {
  onBack?: () => void
  onNext?: () => void
  onStartOver: () => void
  stage: number
}

export default function NavigationButtons({ onBack, onNext, onStartOver, stage }: NavigationButtonsProps) {
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

  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
      <div className="flex items-center">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-300 mr-2"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <button
          onClick={onStartOver}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-300 text-sm"
          aria-label="Start over"
        >
          <RotateCcw size={16} />
        </button>
      </div>
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

