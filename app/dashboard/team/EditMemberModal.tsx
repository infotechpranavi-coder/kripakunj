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
import { Edit, Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface EditMemberModalProps {
    member: any;
    onSuccess: () => void;
}

export default function EditMemberModal({ member, onSuccess }: EditMemberModalProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        name: member.name || '',
        designation: member.designation || '',
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
            data.append('order', formData.order)
            data.append('existingImageUrl', member.imageUrl || '')
            if (selectedFile) {
                data.append('image', selectedFile)
            }

            const response = await fetch(`/api/team/${member._id}`, {
                method: 'PUT',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Member updated successfully')
                setOpen(false)
                onSuccess()
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('Failed to update member')
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
                    <DialogTitle>Edit Team Member</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
                            placeholder="e.g. Founder, Director"
                            value={formData.designation}
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-order">Display Order</Label>
                        <Input
                            id="edit-order"
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                        />
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
                        <Label htmlFor="edit-member-image">Change Photo (Optional)</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="edit-member-image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => document.getElementById('edit-member-image')?.click()}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                {selectedFile ? selectedFile.name : 'Choose New Photo'}
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
