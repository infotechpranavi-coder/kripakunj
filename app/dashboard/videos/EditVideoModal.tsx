'use client'

import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Loader2, Link2, Pencil } from 'lucide-react'
import { toast } from 'sonner'

interface VideoItem {
    _id: string
    title: string
    videoUrl?: string
    fileUrl?: string
}

interface EditVideoModalProps {
    video: VideoItem
    onSuccess?: () => void
    trigger?: React.ReactNode
}

export default function EditVideoModal({ video, onSuccess, trigger }: EditVideoModalProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: video.title,
        videoUrl: video.videoUrl || ''
    })
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    useEffect(() => {
        if (open) {
            setFormData({
                title: video.title,
                videoUrl: video.videoUrl || ''
            })
            setSelectedFile(null)
        }
    }, [open, video])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.videoUrl && !selectedFile && !video.fileUrl) {
            toast.error('Please provide a video URL or upload a video file')
            return
        }

        setIsLoading(true)
        try {
            const data = new FormData()
            data.append('title', formData.title)
            data.append('videoUrl', formData.videoUrl)
            if (selectedFile) {
                data.append('video', selectedFile)
            }

            const response = await fetch(`/api/videos/${video._id}`, {
                method: 'PUT',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Video updated successfully')
                setOpen(false)
                onSuccess && onSuccess()
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to update video')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {trigger ? (
                <div onClick={() => setOpen(true)}>
                    {trigger}
                </div>
            ) : (
                <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                </Button>
            )}
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Edit Video</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter video title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="videoUrl">Video URL (YouTube, Vimeo, etc.)</Label>
                        <div className="flex items-center gap-2">
                            <Link2 className="h-4 w-4 text-gray-400" />
                            <Input
                                id="videoUrl"
                                placeholder="https://youtube.com/..."
                                value={formData.videoUrl}
                                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                            />
                        </div>
                        <p className="text-xs text-gray-500">
                            You can either paste a video link here or upload a video file below.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="videoFile">Change Video File (optional)</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="editVideoFile"
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => document.getElementById('editVideoFile')?.click()}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                {selectedFile ? selectedFile.name : 'Choose New Video File'}
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Leave this empty to keep the existing uploaded video.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update Video'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

