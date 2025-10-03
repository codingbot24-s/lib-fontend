import { AlertTriangle } from "lucide-react"
// TODO: uncomment banner line
export default function DevelopmentBanner() {
  return (
    <div className="bg-amber-500 text-amber-900 px-4 py-3 text-center font-medium">
      <div className="flex items-center justify-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        <span>
          {/* This website is under heavy development. Some features may be incomplete or change frequently.  */}
          This is Test deployment backend has'nt be deployed nothing will work
        </span>
        <AlertTriangle className="h-5 w-5" />
      </div>
    </div>
  )
}
