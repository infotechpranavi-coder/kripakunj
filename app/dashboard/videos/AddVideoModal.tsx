'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Upload, Loader2, Link2 } from 'lucide-react'
import { toast } from 'sonner'

interface AddVideoModalProps {
    onSuccess?: () => void
    triggerLabel?: string
}

export default function AddVideoModal({ onSuccess, triggerLabel = 'Add Video' }: AddVideoModalProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        videoUrl: ''
    })
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.videoUrl && !selectedFile) {
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

            const response = await fetch('/api/videos', {
                method: 'POST',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Video added successfully')
                setOpen(false)
                setFormData({ title: '', videoUrl: '' })
                setSelectedFile(null)
                onSuccess && onSuccess()
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to add video')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {triggerLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Add Video</DialogTitle>
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
                        <Label htmlFor="videoFile">Upload Video File (optional)</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="videoFile"
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => document.getElementById('videoFile')?.click()}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                {selectedFile ? selectedFile.name : 'Choose Video File'}
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Large videos may take some time to upload. Prefer links for very big files.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Add Video'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

