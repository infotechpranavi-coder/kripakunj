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

interface AddMemberModalProps {
    onSuccess: () => void;
}

export default function AddMemberModal({ onSuccess }: AddMemberModalProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
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
            data.append('order', formData.order)
            data.append('image', selectedFile)

            const response = await fetch('/api/team', {
                method: 'POST',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Member added successfully')
                setOpen(false)
                setFormData({
                    name: '',
                    designation: '',
                    order: '0'
                })
                setSelectedFile(null)
                onSuccess()
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('Failed to add team member')
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
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter member's name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input
                            id="designation"
                            placeholder="e.g. Founder, Director"
                            value={formData.designation}
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="order">Display Order (optional)</Label>
                        <Input
                            id="order"
                            type="number"
                            placeholder="0"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="team-image">Profile Image</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="team-image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => document.getElementById('team-image')?.click()}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                {selectedFile ? selectedFile.name : 'Upload Photo'}
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
                                'Add Member'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
