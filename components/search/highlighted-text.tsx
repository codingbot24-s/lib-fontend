import { Fragment } from "react"

interface HighlightedTextProps {
  text: string
  highlight: string
}

export default function HighlightedText({ text, highlight }: HighlightedTextProps) {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }

  // Escape special characters in the highlight string for regex
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

  // Create a regex that's case insensitive
  const regex = new RegExp(`(${escapedHighlight})`, "gi")

  // Split the text by the regex
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) => {
        // Check if this part matches the highlight (case insensitive)
        const isHighlight = part.toLowerCase() === highlight.toLowerCase()

        return (
          <Fragment key={i}>
            {isHighlight ? (
              <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 rounded px-0.5">
                {part}
              </span>
            ) : (
              part
            )}
          </Fragment>
        )
      })}
    </>
  )
}
