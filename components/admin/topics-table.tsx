"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Book, Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { Topic } from "@/types/topics"

interface TopicsTableProps {
  topics: Topic[]
  onEdit: (topic: Topic) => void
  onDelete: (topic: Topic) => void
}

export function TopicsTable({ topics, onEdit, onDelete }: TopicsTableProps) {
  if (topics.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No topics found. Create a new topic to get started.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Topic Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {topics.map((topic) => (
            <tr key={topic.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{topic.name}</div>
                {topic.description && (
                  <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {topic?.booksCount} books
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
                    <Link href={`/admin/topics/${topic.id}/books`}>
                      <Book className="h-4 w-4 mr-1" />
                      View Books
                    </Link>
                  </Button>

                  <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={() => onEdit(topic)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:inline-flex text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={() => onDelete(topic)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>

                  {/* Mobile dropdown menu */}
                  <div className="sm:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/topics/${topic.id}/books`}>
                            <Book className="h-4 w-4 mr-2" />
                            View Books
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(topic)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => onDelete(topic)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
