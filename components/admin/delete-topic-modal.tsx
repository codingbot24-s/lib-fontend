"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Topic } from "@/types/topics"

interface DeleteTopicModalProps {
  isOpen: boolean
  onClose: () => void
  topic: Topic
  onDeleteTopic: () => void
}

export function DeleteTopicModal({ isOpen, onClose, topic, onDeleteTopic }: DeleteTopicModalProps) {
  const hasBooks = (topic?.booksCount ?? 0) > 0

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Topic</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            {hasBooks ? (
              <>
                <span className="block">
                  This topic contains <strong>{topic.booksCount} books</strong>. Deleting it will remove the topic
                  association from these books.
                </span>
                <span className="block">
                  Are you sure you want to delete <strong>{topic.name}</strong>?
                </span>
              </>
            ) : (
              <>
                <span className="block">
                  Are you sure you want to delete <strong>{topic.name}</strong>?
                </span>
                <span className="block">This action cannot be undone.</span>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDeleteTopic}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Topic
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
