'use client'

import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Loader2, Pencil, Plus } from 'lucide-react'
import { toast } from 'sonner'

interface GalleryImage {
    _id: string;
    title: string;
    imageUrl: string;
    category: string;
    createdAt: string;
}

interface EditImageModalProps {
    image: GalleryImage;
    onSuccess: () => void;
    trigger?: React.ReactNode;
}

export default function EditImageModal({ image, onSuccess, trigger }: EditImageModalProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>(image.imageUrl)
    const [formData, setFormData] = useState({
        title: image.title,
        category: image.category
    })
    const [customCategories, setCustomCategories] = useState<string[]>([
        'Events',
        'Programs',
        'Community',
        'Impact',
        'Other'
    ])
    const [showCustomCategory, setShowCustomCategory] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState('')

    useEffect(() => {
        if (open) {
            setFormData({
                title: image.title,
                category: image.category
            })
            setPreviewUrl(image.imageUrl)
            setSelectedFile(null)
            setShowCustomCategory(false)
            setNewCategoryName('')
        }
    }, [open, image])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedFile(file)

            // Create preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.category) {
            toast.error('Please select a category')
            return
        }

        setIsLoading(true)
        try {
            const data = new FormData()
            data.append('title', formData.title)
            data.append('category', formData.category)
            if (selectedFile) {
                data.append('image', selectedFile)
            }

            const response = await fetch(`/api/gallery/${image._id}`, {
                method: 'PUT',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Image updated successfully')
                setOpen(false)
                onSuccess()
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('Failed to update image')
            console.error(error)
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
                <Button onClick={() => setOpen(true)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Image
                </Button>
            )}
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Image</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Image Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter image title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <div className="flex gap-2">
                            <Select
                                value={formData.category}
                                onValueChange={(value) => {
                                    if (value === '__add_new__') {
                                        setShowCustomCategory(true)
                                        setFormData({ ...formData, category: '' })
                                    } else {
                                        setFormData({ ...formData, category: value })
                                    }
                                }}
                                required={!showCustomCategory}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {customCategories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                    <SelectItem value="__add_new__" className="text-primary font-medium">
                                        <div className="flex items-center">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add New Category
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {showCustomCategory && (
                            <div className="flex gap-2 animate-in slide-in-from-top-2">
                                <Input
                                    placeholder="Enter new category name"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        if (newCategoryName.trim()) {
                                            const trimmedName = newCategoryName.trim()
                                            setCustomCategories([...customCategories, trimmedName])
                                            setFormData({ ...formData, category: trimmedName })
                                            setNewCategoryName('')
                                            setShowCustomCategory(false)
                                            toast.success(`Category "${trimmedName}" added`)
                                        }
                                    }}
                                >
                                    Add
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                        setShowCustomCategory(false)
                                        setNewCategoryName('')
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Upload New Image (Optional)</Label>
                        {previewUrl && (
                            <div className="h-48 w-full bg-gray-100 rounded-md overflow-hidden mb-2">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
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
                                {selectedFile ? selectedFile.name : 'Change Image'}
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">Leave empty to keep current image</p>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update Image'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
