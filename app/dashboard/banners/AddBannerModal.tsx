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
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Upload, X, Link as LinkIcon } from 'lucide-react'
import { toast } from 'sonner'

interface AddBannerModalProps {
    onSuccess: () => void;
}

export default function AddBannerModal({ onSuccess }: AddBannerModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        alt: '',
        link: '',
        imageUrl: '',
        order: '0',
        isActive: true
    })
    const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null])
    const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null, null, null])

    const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const newFiles = [...imageFiles]
            newFiles[index] = file
            setImageFiles(newFiles)

            const reader = new FileReader()
            reader.onloadend = () => {
                const newPreviews = [...imagePreviews]
                newPreviews[index] = reader.result as string
                setImagePreviews(newPreviews)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = (index: number) => {
        const newFiles = [...imageFiles]
        newFiles[index] = null
        setImageFiles(newFiles)

        const newPreviews = [...imagePreviews]
        newPreviews[index] = null
        setImagePreviews(newPreviews)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const hasUpload = imageFiles.some(f => f !== null)
        if (!hasUpload && !formData.imageUrl) {
            toast.error('Please upload at least one image or provide an image URL')
            return
        }

        setIsLoading(true)
        const data = new FormData()
        data.append('title', formData.title)
        data.append('subtitle', formData.subtitle)
        data.append('description', formData.description)
        data.append('alt', formData.alt || formData.title)
        data.append('link', formData.link)
        data.append('imageUrl', formData.imageUrl)
        data.append('order', formData.order)
        data.append('isActive', String(formData.isActive))

        imageFiles.forEach((file, index) => {
            if (file) {
                data.append(`image${index + 1}`, file)
            }
        })

        try {
            const response = await fetch('/api/banners', {
                method: 'POST',
                body: data
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Banner added successfully')
                setIsOpen(false)
                setFormData({
                    title: '',
                    subtitle: '',
                    description: '',
                    alt: '',
                    link: '',
                    imageUrl: '',
                    order: '0',
                    isActive: true
                })
                setImageFiles([null, null, null])
                setImagePreviews([null, null, null])
                onSuccess()
            } else {
                toast.error(result.error || 'Failed to add banner')
            }
        } catch (error) {
            console.error('Error adding banner:', error)
            toast.error('Failed to add banner')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Banner
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Banner</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Main headline"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input
                            id="subtitle"
                            value={formData.subtitle}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                            placeholder="Secondary headline"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (optional)</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Short description displayed on slider"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Direct Image URL (Alternative to upload)</Label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="imageUrl"
                                className="pl-10"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Upload Images (Up to 3)</Label>
                        <div className="grid grid-cols-3 gap-4">
                            {[0, 1, 2].map((index) => (
                                <div key={index} className="space-y-2">
                                    <div className="aspect-square border-2 border-gray-300 border-dashed rounded-md flex items-center justify-center relative bg-gray-50">
                                        {imagePreviews[index] ? (
                                            <div className="w-full h-full relative p-1">
                                                <img
                                                    src={imagePreviews[index]!}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <label htmlFor={`image-upload-${index}`} className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                                                <Upload className="h-6 w-6 text-gray-400 mb-1" />
                                                <span className="text-[10px] text-gray-500 font-medium">Image {index + 1}</span>
                                                <input
                                                    id={`image-upload-${index}`}
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={(e) => handleFileChange(index, e)}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-gray-500">PNG, JPG, WebP up to 10MB per image</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="order">Order Index</Label>
                            <Input
                                id="order"
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="isActive">Status</Label>
                            <Select
                                value={String(formData.isActive)}
                                onValueChange={(val) => setFormData({ ...formData, isActive: val === 'true' })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Active</SelectItem>
                                    <SelectItem value="false">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Banner'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
