import { ArrowLeft, ArrowRight } from 'lucide-react'

interface NavigationButtonsProps {
  onBack?: () => void
  onNext?: () => void
}

export default function NavigationButtons({ onBack, onNext }: NavigationButtonsProps) {
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
      {onNext && (
        <button
          onClick={onNext}
          className="p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300 ml-auto"
          aria-label="Go to next stage"
        >
          <ArrowRight size={24} />
        </button>
      )}
    </div>
  )
}

