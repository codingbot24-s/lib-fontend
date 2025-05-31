interface ReadingProgressBarProps {
  progress: number
}

export default function ReadingProgressBar({ progress }: ReadingProgressBarProps) {
  // Determine color based on progress
  const getColorClass = () => {
    if (progress < 25) return "bg-emerald-300 dark:bg-emerald-700"
    if (progress < 50) return "bg-emerald-400 dark:bg-emerald-600"
    if (progress < 75) return "bg-emerald-500 dark:bg-emerald-500"
    return "bg-emerald-600 dark:bg-emerald-400"
  }

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-300 ${getColorClass()}`}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  )
}
