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
import { Edit, Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface EditBoardMemberModalProps {
    member: any;
    onSuccess: () => void;
}

export default function EditBoardMemberModal({ member, onSuccess }: EditBoardMemberModalProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        name: member.name || '',
        designation: member.designation || '',
        bio: member.bio || '',
        quote: member.quote || '',
        linkedinUrl: member.linkedinUrl || '',
        email: member.email || '',
        order: member.order?.toString() || '0'
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
            data.append('name', formData.name)
            data.append('designation', formData.designation)
            data.append('bio', formData.bio)
            data.append('quote', formData.quote)
            data.append('linkedinUrl', formData.linkedinUrl)
            data.append('email', formData.email)
            data.append('order', formData.order)
            data.append('existingImageUrl', member.imageUrl || '')
            if (selectedFile) {
                data.append('image', selectedFile)
            }

            const response = await fetch(`/api/board/${member._id}`, {
                method: 'PUT',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Board member updated successfully')
                setOpen(false)
                onSuccess()
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('Failed to update board member')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Board Member</DialogTitle>
                    <DialogDescription>
                        Update the profile information for this board member.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[85vh]">
                    <div className="flex-1 overflow-y-auto px-1 pr-2 space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Full Name</Label>
                            <Input
                                id="edit-name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-designation">Designation</Label>
                            <Input
                                id="edit-designation"
                                placeholder="e.g. Strategic Advisor"
                                value={formData.designation}
                                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-bio">Brief Bio (Optional)</Label>
                            <Textarea
                                id="edit-bio"
                                placeholder="Tell us about this member..."
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                rows={2}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-quote">Inspirational Quote</Label>
                            <Input
                                id="edit-quote"
                                placeholder="e.g. Service before self"
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-linkedinUrl">LinkedIn URL</Label>
                                <Input
                                    id="edit-linkedinUrl"
                                    placeholder="https://..."
                                    value={formData.linkedinUrl}
                                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-email">Email Address</Label>
                                <Input
                                    id="edit-email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Current Photo</Label>
                            <div className="h-24 w-24 bg-gray-100 rounded-full overflow-hidden mb-2 mx-auto">
                                <img
                                    src={member.imageUrl || '/placeholder-avatar.jpg'}
                                    alt="Current"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <Label htmlFor="edit-board-image">Change Photo (Optional)</Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    id="edit-board-image"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => document.getElementById('edit-board-image')?.click()}
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    {selectedFile ? selectedFile.name : 'Choose New Photo'}
                                </Button>
                            </div>
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
