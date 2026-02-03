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
import { Plus, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AddImpactStatModalProps {
    onSuccess: () => void;
}

export default function AddImpactStatModal({ onSuccess }: AddImpactStatModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        label: '',
        value: '',
        color: 'primary',
        order: '0'
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/impact-stats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Impact stat added successfully')
                setIsOpen(false)
                setFormData({
                    label: '',
                    value: '',
                    color: 'primary',
                    order: '0'
                })
                onSuccess()
            } else {
                toast.error(result.error || 'Failed to add impact stat')
            }
        } catch (error) {
            console.error('Error adding impact stat:', error)
            toast.error('Failed to add impact stat')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Impact Stat
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Add New Impact Stat
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="label">Label (e.g., Cities Covered) *</Label>
                        <Input
                            id="label"
                            value={formData.label}
                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                            placeholder="Cities Covered"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="value">Value (e.g., 9 or 1100+) *</Label>
                        <Input
                            id="value"
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                            placeholder="1100+"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="color">Color Theme *</Label>
                        <Select
                            value={formData.color}
                            onValueChange={(val) => setFormData({ ...formData, color: val })}
                        >
                            <SelectTrigger id="color">
                                <SelectValue placeholder="Select Color" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="primary">Primary (Green)</SelectItem>
                                <SelectItem value="secondary">Secondary (Orange)</SelectItem>
                                <SelectItem value="accent">Accent (Teal/Blue)</SelectItem>
                            </SelectContent>
                        </Select>
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
                            {isLoading ? 'Adding...' : 'Add Stat'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
