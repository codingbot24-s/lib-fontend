"use client"

import { useState } from "react"
import { AdminQuickUploadModal } from "./admin-quick-uplaod-modal"

interface QuickUploadButtonProps {
  onSuccess?: () => void
}

export function QuickUploadButton({ onSuccess }: QuickUploadButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="w-full sm:w-auto">
      <AdminQuickUploadModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={() => {
          setIsModalOpen(false)
          onSuccess?.()
        }}
      />
    </div>
  )
}