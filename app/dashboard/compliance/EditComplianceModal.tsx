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
import { Loader2, Upload } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface ComplianceDocument {
    _id: string
    title: string
    imageUrl: string
    date: string
    docUrl?: string
}

interface EditComplianceModalProps {
    document: ComplianceDocument | null
    onClose: () => void
    onSuccess: () => void
}

export default function EditComplianceModal({ document, onClose, onSuccess }: EditComplianceModalProps) {
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [docUrl, setDocUrl] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        if (document) {
            setTitle(document.title)
            setDocUrl(document.docUrl || '')
            setImagePreview(document.imageUrl)
            setImage(null)
        }
    }, [document])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!document) return
        if (!title) {
            toast.error('Please fill in title')
            return
        }

        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('docUrl', docUrl)
            formData.append('existingImageUrl', document.imageUrl)
            if (image) {
                formData.append('image', image)
            }

            const res = await fetch(`/api/compliance/${document._id}`, {
                method: 'PUT',
                body: formData,
            })

            const data = await res.json()

            if (data.success) {
                toast.success('Document updated successfully')
                onSuccess()
                onClose()
            } else {
                toast.error(data.error || 'Failed to update document')
            }
        } catch (error) {
            console.error('Error updating document:', error)
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={!!document} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Compliance Document</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-title">Document Title</Label>
                        <Input
                            id="edit-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Annual Report 2024"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-docUrl">Document URL (Optional)</Label>
                        <Input
                            id="edit-docUrl"
                            value={docUrl}
                            onChange={(e) => setDocUrl(e.target.value)}
                            placeholder="https://example.com/document.pdf"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-image">Document Image</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors relative">
                            <input
                                type="file"
                                id="edit-image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {imagePreview ? (
                                <div className="relative w-full h-48">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        layout="fill"
                                        objectFit="contain"
                                        className="rounded-md"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
                                        <p className="text-white font-medium">Click to change</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload new image</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                                </>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
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
