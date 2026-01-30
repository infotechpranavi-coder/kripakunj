'use client'

import React, { useState, useEffect } from 'react'
import {
    Menu,
    Eye,
    EyeOff,
    Bell,
    Plus,
    Video,
    Pencil,
    Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import AdminSidebar from '@/components/admin-sidebar'
import AddVideoModal from './AddVideoModal'
import EditVideoModal from './EditVideoModal'

interface VideoItem {
    _id: string
    title: string
    videoUrl?: string
    fileUrl?: string
    createdAt: string
}

export default function VideosPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [videos, setVideos] = useState<VideoItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const toggleDarkMode = () => setDarkMode(!darkMode)

    const fetchVideos = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/videos')
            const data = await res.json()
            if (data.success) {
                setVideos(data.data)
            }
        } catch (error) {
            console.error('Error loading videos', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchVideos()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this video?')) return

        try {
            const res = await fetch(`/api/videos/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if (data.success) {
                setVideos((prev) => prev.filter((v) => v._id !== id))
            } else {
                console.error('Failed to delete video', data.error)
            }
        } catch (error) {
            console.error('Failed to delete video', error)
        }
    }

    const renderVideoMedia = (video: VideoItem) => {
        if (video.videoUrl) {
            // Simple iframe for external links (works well for YouTube/Vimeo embeds)
            return (
                <div className="relative w-full aspect-video overflow-hidden rounded-t-lg bg-black">
                    <iframe
                        src={video.videoUrl}
                        title={video.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )
        }

        if (video.fileUrl) {
            return (
                <div className="relative w-full aspect-video overflow-hidden rounded-t-lg bg-black">
                    <video
                        controls
                        src={video.fileUrl}
                        className="w-full h-full"
                    />
                </div>
            )
        }

        return (
            <div className="relative w-full aspect-video flex items-center justify-center rounded-t-lg bg-gray-100">
                <Video className="h-10 w-10 text-gray-400" />
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="lg:ml-64">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between h-16 px-4">
                        <div className="flex items-center">
                            <Button variant="ghost" size="sm" onClick={toggleSidebar} className="lg:hidden mr-2">
                                <Menu className="h-5 w-5" />
                            </Button>
                            <h2 className="text-lg font-semibold">Videos</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                                {darkMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Bell className="h-5 w-5" />
                                <Badge className="ml-1">3</Badge>
                            </Button>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                                    A
                                </div>
                                <span className="text-sm font-medium">Admin</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center">
                            <Video className="mr-3 h-6 w-6 text-primary" />
                            Videos
                        </h1>
                        <AddVideoModal onSuccess={fetchVideos} />
                    </div>

                    {isLoading ? (
                        <Card>
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4" />
                                <p className="text-gray-500">Loading videos...</p>
                            </CardContent>
                        </Card>
                    ) : videos.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                                    <Video className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    No videos yet
                                </h3>
                                <p className="text-gray-500 max-w-sm mb-6">
                                    Manage your video content and links here.
                                </p>
                                <AddVideoModal triggerLabel="Add Video" onSuccess={fetchVideos} />
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((video) => (
                                <Card key={video._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative">
                                        {renderVideoMedia(video)}
                                        <div className="absolute top-2 right-2 flex gap-2">
                                            <EditVideoModal
                                                video={video}
                                                onSuccess={fetchVideos}
                                                trigger={
                                                    <Button
                                                        variant="secondary"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                                                    >
                                                        <Pencil className="h-4 w-4 text-gray-700" />
                                                    </Button>
                                                }
                                            />
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => handleDelete(video._id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                                            {video.title}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {new Date(video.createdAt).toLocaleDateString()}
                                        </p>
                                        {video.videoUrl && (
                                            <a
                                                href={video.videoUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs text-primary mt-2 inline-block"
                                            >
                                                Open video link
                                            </a>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
