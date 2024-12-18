import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  onClick: () => void
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300"
    >
      <ArrowLeft className="mr-2" size={16} />
      Back
    </button>
  )
}

