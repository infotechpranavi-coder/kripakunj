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
import { Plus, Layout } from 'lucide-react'
import { toast } from 'sonner'

interface AddProgramModalProps {
    onSuccess: () => void;
}

export default function AddProgramModal({ onSuccess }: AddProgramModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        tagline: '',
        description: '',
        stats: '',
        icon: '📚',
        color: 'from-blue-500/10 to-cyan-500/10',
        borderColor: 'border-blue-200',
        order: '0'
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/programs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Program added successfully')
                setIsOpen(false)
                setFormData({
                    name: '',
                    tagline: '',
                    description: '',
                    stats: '',
                    icon: '📚',
                    color: 'from-blue-500/10 to-cyan-500/10',
                    borderColor: 'border-blue-200',
                    order: '0'
                })
                onSuccess()
            } else {
                toast.error(result.error || 'Failed to add program')
            }
        } catch (error) {
            console.error('Error adding program:', error)
            toast.error('Failed to add program')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Program
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Program</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Program Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Project GyanDaan"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="icon">Icon (Emoji) *</Label>
                            <Input
                                id="icon"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                placeholder="📚"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tagline">Tagline *</Label>
                        <Input
                            id="tagline"
                            value={formData.tagline}
                            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                            placeholder="Education for All"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Detailed program description..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stats">Stats *</Label>
                        <Input
                            id="stats"
                            value={formData.stats}
                            onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                            placeholder="400+ kids educating"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="color">Gradient Color Classes</Label>
                            <Input
                                id="color"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                placeholder="from-blue-500/10 to-cyan-500/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="borderColor">Border Color Class</Label>
                            <Input
                                id="borderColor"
                                value={formData.borderColor}
                                onChange={(e) => setFormData({ ...formData, borderColor: e.target.value })}
                                placeholder="border-blue-200"
                            />
                        </div>
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
                            {isLoading ? 'Adding...' : 'Add Program'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
