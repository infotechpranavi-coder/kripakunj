'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface AddBoardMemberModalProps {
    onSuccess: () => void;
}

export default function AddBoardMemberModal({ onSuccess }: AddBoardMemberModalProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        bio: '',
        quote: '',
        linkedinUrl: '',
        email: '',
        order: '0'
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
            data.append('name', formData.name)
            data.append('designation', formData.designation)
            data.append('bio', formData.bio)
            data.append('quote', formData.quote)
            data.append('linkedinUrl', formData.linkedinUrl)
            data.append('email', formData.email)
            data.append('order', formData.order)
            data.append('image', selectedFile)

            const response = await fetch('/api/board', {
                method: 'POST',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Board member added successfully')
                setOpen(false)
                setFormData({
                    name: '',
                    designation: '',
                    bio: '',
                    quote: '',
                    linkedinUrl: '',
                    email: '',
                    order: '0'
                })
                setSelectedFile(null)
                onSuccess()
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('Failed to add board member')
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
                    Add Board Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Board Member</DialogTitle>
                    <DialogDescription>
                        Add a new member to your advisory board with their profile information.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[85vh]">
                    <div className="flex-1 overflow-y-auto px-1 pr-2 space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="designation">Designation</Label>
                            <Input
                                id="designation"
                                placeholder="e.g. Strategic Advisor"
                                value={formData.designation}
                                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Brief Bio (Optional)</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us about this member..."
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                rows={2}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quote">Inspirational Quote (Optional)</Label>
                            <Input
                                id="quote"
                                placeholder="e.g. Service before self"
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                                <Input
                                    id="linkedinUrl"
                                    placeholder="https://..."
                                    value={formData.linkedinUrl}
                                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="board-image">Profile Image</Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    id="board-image"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => document.getElementById('board-image')?.click()}
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    {selectedFile ? selectedFile.name : 'Upload Photo'}
                                </Button>
                            </div>
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
                                'Add Member'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
