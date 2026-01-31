'use client'

import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Loader2, Upload } from 'lucide-react'
import { toast } from 'sonner'

interface EditEventModalProps {
    event: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function EditEventModal({ event, open, onOpenChange, onSuccess }: EditEventModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>('')
    const [highlights, setHighlights] = useState<string[]>([])
    const [currentHighlight, setCurrentHighlight] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: '',
        interested: '',
        status: '',
        image: ''
    })

    useEffect(() => {
        if (event && open) {
            setFormData({
                title: event.title || event.name || '',
                description: event.description || '',
                date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
                time: event.time || '',
                location: event.location || '',
                category: event.category || '',
                interested: event.interested || '0+',
                status: event.status || 'upcoming',
                image: event.image || '/placeholder.svg'
            })
            setHighlights(event.highlights || [])
            setPreviewUrl(event.image || '/placeholder.svg')
            setSelectedFile(null)
        }
    }, [event, open])

    const addHighlight = () => {
        if (currentHighlight.trim()) {
            setHighlights([...highlights, currentHighlight.trim()])
            setCurrentHighlight('')
        }
    }

    const removeHighlight = (index: number) => {
        setHighlights(highlights.filter((_, i) => i !== index))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedFile(file)

            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const categories = [
        'Education',
        'Health',
        'Environment',
        'Empowerment',
        'Food Security',
        'Training',
        'Community'
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const data = new FormData()
            data.append('title', formData.title)
            data.append('description', formData.description)
            data.append('date', formData.date)
            data.append('time', formData.time)
            data.append('location', formData.location)
            data.append('category', formData.category)
            data.append('interested', formData.interested)
            data.append('status', formData.status)

            highlights.forEach(h => data.append('highlights', h))

            if (selectedFile) {
                data.append('image', selectedFile)
            }

            const response = await fetch(`/api/events/${event.id || event._id}`, {
                method: 'PUT',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Event updated successfully')
                onSuccess()
                onOpenChange(false)
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('Failed to update event')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-title">Event Title</Label>
                        <Input
                            id="edit-title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Event Highlights</Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add a highlight"
                                value={currentHighlight}
                                onChange={(e) => setCurrentHighlight(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        addHighlight()
                                    }
                                }}
                            />
                            <Button type="button" onClick={addHighlight} size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {highlights.map((h, i) => (
                                <Badge key={i} variant="secondary" className="pl-3 pr-2 py-1 flex items-center gap-2">
                                    {h}
                                    <button
                                        type="button"
                                        onClick={() => removeHighlight(i)}
                                        className="hover:text-destructive focus:outline-none"
                                    >
                                        <Plus className="h-3 w-3 rotate-45" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-date">Date</Label>
                            <Input
                                id="edit-date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-time">Time</Label>
                            <Input
                                id="edit-time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-location">Location</Label>
                            <Input
                                id="edit-location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-interested">Interested Count</Label>
                            <Input
                                id="edit-interested"
                                value={formData.interested}
                                onChange={(e) => setFormData({ ...formData, interested: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="planned">Planned</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-image">Event Image</Label>
                        {previewUrl && (
                            <div className="h-48 w-full bg-gray-100 rounded-md overflow-hidden mb-2">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <input
                            id="edit-image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => document.getElementById('edit-image')?.click()}
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            {selectedFile ? selectedFile.name : 'Change Image'}
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                            id="edit-description"
                            className="min-h-[100px]"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Update Event
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
