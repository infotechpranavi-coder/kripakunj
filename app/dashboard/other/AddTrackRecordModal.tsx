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
import { Plus, Award } from 'lucide-react'
import { toast } from 'sonner'

interface AddTrackRecordModalProps {
    onSuccess: () => void;
}

export default function AddTrackRecordModal({ onSuccess }: AddTrackRecordModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        value: '',
        description: '',
        order: '0'
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/track-records', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Track record added successfully')
                setIsOpen(false)
                setFormData({
                    title: '',
                    value: '',
                    description: '',
                    order: '0'
                })
                onSuccess()
            } else {
                toast.error(result.error || 'Failed to add track record')
            }
        } catch (error) {
            console.error('Error adding track record:', error)
            toast.error('Failed to add track record')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Track Record
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Add New Track Record
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title (e.g., Open Schools) *</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Open Schools"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="value">Value (e.g., 15+ or 10Yrs+) *</Label>
                        <Input
                            id="value"
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                            placeholder="15+"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Short Description *</Label>
                        <Input
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Providing free quality education"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="order">Sort Order</Label>
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
                            {isLoading ? 'Adding...' : 'Add Record'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
