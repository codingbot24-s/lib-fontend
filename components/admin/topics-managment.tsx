"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TopicsTable } from "@/components/admin/topics-table"
import { CreateTopicModal } from "@/components/admin/create-topic-modal"
import { EditTopicModal } from "@/components/admin/edit-topic-modal"
import { DeleteTopicModal } from "@/components/admin/delete-topic-modal"
import { Plus, Search } from "lucide-react"
import { Topic } from "@/types/topics"
import axios from "axios"
import { toast } from "sonner"

// Mock topic data



export function TopicsManagement() {
    const [topics, setTopics] = useState<Topic[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

    const itemsPerPage = 5

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
                const response = await axios.get(`${BACKEND_URL}/api/topics`)
                if (response.status !== 200) {
                    throw new Error('Failed to fetch topics')
                }

                const data = response.data
                if (!data.topics || !Array.isArray(data.topics)) {
                    throw new Error('Invalid response format')
                }

                setTopics(data.topics)
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to fetch topics'
                setError(message)
                console.error('Error fetching topics:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTopics()
    }, []) // Empty dependency array means this runs once on mount

    // Filter topics with null checks
    const filteredTopics = topics.filter((topic) => {
        if (!topic || !topic.name) return false;
        
        const nameMatch = topic.name.toLowerCase().includes(searchQuery.toLowerCase());
        const descriptionMatch = topic.description ? 
            topic.description.toLowerCase().includes(searchQuery.toLowerCase()) : 
            false;
            
        return nameMatch || descriptionMatch;
    })

    // Calculate pagination
    const totalPages = Math.ceil(filteredTopics.length / itemsPerPage)
    const paginatedTopics = filteredTopics.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Handle create topic
    const handleCreateTopic = async (newTopic: { name: string; description?: string }) => {
        try {
            setIsLoading(true);
            const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
            const response = await axios.post(`${BACKEND_URL}/api/topics`, {
                name: newTopic.name,
                description: newTopic.description || ""
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201 || response.status === 200) {
                setTopics(prevTopics => [...prevTopics, response.data]);
                toast.success('Topic created successfully', {
                    description: `"${newTopic.name}" has been added to topics.`
                });
                setIsCreateModalOpen(false);
            }
        } catch (error) {
            toast.error('Failed to create topic', {
                description: error instanceof Error ? error.message : 'An unexpected error occurred'
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle edit topic
    const handleEditTopic = async (updatedTopic: Topic) => {
        try {
            const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
            const response = await axios.put(`${BACKEND_URL}/api/topics/${updatedTopic.id}`, updatedTopic, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setTopics(prevTopics => 
                    prevTopics.map(topic => 
                        topic.id === updatedTopic.id ? updatedTopic : topic
                    )
                );
                toast.success('Topic updated successfully', {
                    description: `Changes to "${updatedTopic.name}" have been saved.`,
                    duration: 3000,
                });
                setIsEditModalOpen(false);
                setSelectedTopic(null);
            }
        } catch (error) {
            toast.error('Failed to update topic', {
                description: error instanceof Error ? error.message : 'An unexpected error occurred',
                duration: 4000,
            });
            console.error('Error updating topic:', error);
        }
    };

    // Handle delete topic
    const handleDeleteTopic = async (id: number) => {
        try {
            setIsLoading(true);
            const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
            const response = await axios.delete(`${BACKEND_URL}/api/topics/${id}`);

            if (response.status === 200 || response.status === 204) {
                setTopics(prevTopics => prevTopics.filter(topic => topic.id !== id));
                toast.success('Topic deleted successfully', {
                    description: `The topic has been permanently removed.`
                });
                setIsDeleteModalOpen(false);
                setSelectedTopic(null);
            }
        } catch (error) {
            toast.error('Failed to delete topic', {
                description: error instanceof Error ? error.message : 'An unexpected error occurred'
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Open edit modal
    const openEditModal = (topic: Topic) => {
        setSelectedTopic(topic)
        setIsEditModalOpen(true)
    }

    // Open delete modal
    const openDeleteModal = (topic: Topic) => {
        setSelectedTopic(topic);
        setIsDeleteModalOpen(true);
    }

    // Add loading state handler
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
                    <p className="text-sm text-gray-500">Loading topics...</p>
                </div>
            </div>
        )
    }

    // Add error state handler
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-2 text-center">
                    <p className="text-red-500">Error loading topics</p>
                    <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                        className="mt-2"
                    >
                        Retry
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Page header with Islamic pattern */}
            <div className="relative">
                <div className="islamic-pattern-top h-1.5 w-full rounded-full mb-6"></div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Manage Topics</h1>
                    <Button onClick={() => setIsCreateModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Topic
                    </Button>
                </div>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-black p-4 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setCurrentPage(1) // Reset to first page on search
                        }}
                        className="pl-9 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-emerald-500"
                    />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 w-full sm:w-auto text-center sm:text-right">
                    Showing {filteredTopics.length} topics
                </div>
            </div>

            {/* Topics table */}
            <div className="bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <TopicsTable topics={paginatedTopics} onEdit={openEditModal} onDelete={openDeleteModal} />

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800 sm:px-6">
                        <div className="hidden sm:block">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredTopics.length)}</span> of{" "}
                                <span className="font-medium">{filteredTopics.length}</span> topics
                            </p>
                        </div>
                        <div className="flex flex-1 justify-between sm:justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <CreateTopicModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreateTopic={handleCreateTopic}
            />

            {selectedTopic && (
                <>
                    <EditTopicModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        topic={selectedTopic}
                        onEditTopic={handleEditTopic}
                    />

                    <DeleteTopicModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        topic={selectedTopic}
                        onDeleteTopic={() => handleDeleteTopic(selectedTopic.id)}
                    />
                </>
            )}
        </div>
    )
}
