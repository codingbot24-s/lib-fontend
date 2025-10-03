import { AlertTriangle } from "lucide-react"
// TODO: uncomment banner line
// This website is under heavy development. Some features may be incomplete or change frequently. 
export default function DevelopmentBanner() {
  return (
    <div className="bg-amber-500 text-amber-900 px-4 py-3 text-center font-medium">
      <div className="flex items-center justify-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        <span>
          This is a test deployment. The backend hasn&apos;t been deployed yet, so functionality may not work.
        </span>
        <AlertTriangle className="h-5 w-5" />
      </div>
    </div>
  )
}
