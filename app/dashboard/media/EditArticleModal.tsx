'use client'

import React, { useState, useEffect } from 'react'
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
import { Edit, Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface EditArticleModalProps {
    article: any;
    onSuccess: () => void;
}

export default function EditArticleModal({ article, onSuccess }: EditArticleModalProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        title: article.title || '',
        linkUrl: article.linkUrl || '',
        date: article.date ? new Date(article.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const data = new FormData()
            data.append('title', formData.title)
            data.append('linkUrl', formData.linkUrl)
            data.append('date', formData.date)
            data.append('existingImageUrl', article.imageUrl || '')
            if (selectedFile) {
                data.append('image', selectedFile)
            }

            const response = await fetch(`/api/media/${article._id}`, {
                method: 'PUT',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Article updated successfully')
                setOpen(false)
                onSuccess()
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('Failed to update article')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-auto text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Media Article</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-title">Article Title</Label>
                        <Input
                            id="edit-title"
                            placeholder="Enter article title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-linkUrl">Article Link URL</Label>
                        <Input
                            id="edit-linkUrl"
                            placeholder="https://example.com/article"
                            value={formData.linkUrl}
                            onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-date">Publication Date</Label>
                        <Input
                            id="edit-date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Current Image</Label>
                        <div className="h-24 w-full bg-gray-100 rounded-md overflow-hidden mb-2">
                            <img
                                src={article.imageUrl || '/placeholder-media.jpg'}
                                alt="Current"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <Label htmlFor="edit-image">Replace Image (Optional)</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="edit-image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => document.getElementById('edit-image')?.click()}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                {selectedFile ? selectedFile.name : 'Choose New Image'}
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
