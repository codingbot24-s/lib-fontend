"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminQuickUploadModal } from "./admin-quick-uplaod-modal"

interface QuickUploadButtonProps {
  onSuccess?: () => void
}

export function QuickUploadButton({ onSuccess }: QuickUploadButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Quick Upload Book
      </Button>

      <AdminQuickUploadModal 
        open={open} 
        onOpenChange={setOpen}
        onSuccess={onSuccess}
      />
    </>
  )
}