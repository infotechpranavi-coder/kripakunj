'use client'

import React, { useState, useEffect } from 'react'
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
import { Pencil, Upload, X, Link as LinkIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

interface Banner {
    _id: string;
    title: string;
    subtitle?: string;
    description?: string;
    images?: string[];
    imageUrl?: string;
    alt: string;
    link?: string;
    order: number;
    isActive: boolean;
}

interface EditBannerModalProps {
    banner: Banner;
    onSuccess: () => void;
}

export default function EditBannerModal({ banner, onSuccess }: EditBannerModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: banner.title,
        subtitle: banner.subtitle || '',
        description: banner.description || '',
        alt: banner.alt || '',
        link: banner.link || '',
        imageUrl: banner.imageUrl || '',
        order: String(banner.order),
        isActive: banner.isActive
    })
    const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null])
    const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null, null, null])

    useEffect(() => {
        if (banner.images && banner.images.length > 0) {
            const previews = [...imagePreviews]
            banner.images.forEach((img, i) => {
                if (i < 3) previews[i] = img
            })
            setImagePreviews(previews)
        }
    }, [banner])

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
            const response = await fetch(`/api/banners/${banner._id}`, {
                method: 'PUT',
                body: data
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Banner updated successfully')
                setIsOpen(false)
                onSuccess()
            } else {
                toast.error(result.error || 'Failed to update banner')
            }
        } catch (error) {
            console.error('Error updating banner:', error)
            toast.error('Failed to update banner')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Banner</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-title">Title *</Label>
                        <Input
                            id="edit-title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-subtitle">Subtitle</Label>
                        <Input
                            id="edit-subtitle"
                            value={formData.subtitle}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                            id="edit-description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-imageUrl">Direct Image URL</Label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="edit-imageUrl"
                                className="pl-10"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Update Uploaded Images (Up to 3)</Label>
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
                                            <label htmlFor={`edit-image-upload-${index}`} className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                                                <Upload className="h-6 w-6 text-gray-400 mb-1" />
                                                <span className="text-[10px] text-gray-500 font-medium">Image {index + 1}</span>
                                                <input
                                                    id={`edit-image-upload-${index}`}
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
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-order">Order Index</Label>
                            <Input
                                id="edit-order"
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-isActive">Status</Label>
                            <Select
                                value={String(formData.isActive)}
                                onValueChange={(val) => setFormData({ ...formData, isActive: val === 'true' })}
                            >
                                <SelectTrigger id="edit-isActive">
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
                            {isLoading ? 'Updating...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
