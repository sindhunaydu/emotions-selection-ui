import { ArrowLeft, ArrowRight } from 'lucide-react'

interface NavigationButtonsProps {
  onBack?: () => void
  onNext?: () => void
  stage: number
}

export default function NavigationButtons({ onBack, onNext, stage }: NavigationButtonsProps) {
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
    <div className="absolute top-4 left-4 right-4 flex justify-between">
      {onBack && (
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
      )}
      <div className="flex-grow" />
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

