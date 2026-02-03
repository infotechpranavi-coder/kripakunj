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
import { Plus, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface AddCollaboratorModalProps {
    onSuccess: () => void;
}

export default function AddCollaboratorModal({ onSuccess }: AddCollaboratorModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        link: '',
        order: '0'
    })
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setLogoFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeLogo = () => {
        setLogoFile(null)
        setLogoPreview(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!logoFile) {
            toast.error('Please upload a logo')
            return
        }

        setIsLoading(true)
        const data = new FormData()
        data.append('name', formData.name)
        data.append('link', formData.link)
        data.append('order', formData.order)
        data.append('logo', logoFile)

        try {
            const response = await fetch('/api/collaborators', {
                method: 'POST',
                body: data
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Collaborator added successfully')
                setIsOpen(false)
                setFormData({
                    name: '',
                    link: '',
                    order: '0'
                })
                setLogoFile(null)
                setLogoPreview(null)
                onSuccess()
            } else {
                toast.error(result.error || 'Failed to add collaborator')
            }
        } catch (error) {
            console.error('Error adding collaborator:', error)
            toast.error('Failed to add collaborator')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Collaborator
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Collaborator</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Collaborator name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="link">Website Link (optional)</Label>
                        <Input
                            id="link"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>Logo *</Label>
                        <div className="flex items-center gap-4">
                            <div className="w-32 h-32 border-2 border-gray-300 border-dashed rounded-md flex items-center justify-center relative bg-gray-50">
                                {logoPreview ? (
                                    <div className="w-full h-full relative p-1">
                                        <Image
                                            src={logoPreview}
                                            alt="Preview"
                                            fill
                                            className="object-contain rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeLogo}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <label htmlFor="logo-upload" className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                                        <Upload className="h-6 w-6 text-gray-400 mb-1" />
                                        <span className="text-[10px] text-gray-500 font-medium">Upload Logo</span>
                                        <input
                                            id="logo-upload"
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                )}
                            </div>
                            <div className="text-xs text-gray-500">
                                <p>PNG, JPG, WebP</p>
                                <p>Recommend square or rectangular logo</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="order">Order Index</Label>
                        <Input
                            id="order"
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Collaborator'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
