'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface AddArticleModalProps {
    onSuccess: () => void;
}

export default function AddArticleModal({ onSuccess }: AddArticleModalProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        linkUrl: '',
        date: new Date().toISOString().split('T')[0]
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedFile) {
            toast.error('Please select an image')
            return
        }

        setIsLoading(true)
        try {
            const data = new FormData()
            data.append('title', formData.title)
            data.append('linkUrl', formData.linkUrl)
            data.append('date', formData.date)
            data.append('image', selectedFile)

            const response = await fetch('/api/media', {
                method: 'POST',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Article added successfully')
                setOpen(false)
                setFormData({
                    title: '',
                    linkUrl: '',
                    date: new Date().toISOString().split('T')[0]
                })
                setSelectedFile(null)
                onSuccess()
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('Failed to add article')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Article
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Media Article</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Article Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter article title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkUrl">Article Link URL</Label>
                        <Input
                            id="linkUrl"
                            placeholder="https://example.com/article"
                            value={formData.linkUrl}
                            onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Publication Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image">Article Image / Clipping</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => document.getElementById('image')?.click()}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                {selectedFile ? selectedFile.name : 'Upload Image'}
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                'Add Article'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
