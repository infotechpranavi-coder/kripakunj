'use client'

import React, { useState, useEffect } from 'react'
import {
    Edit,
    Plus,
    Save,
    Upload,
    X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'

interface EditCampaignModalProps {
    campaign: any
    onUpdate?: () => void
}

export default function EditCampaignModal({ campaign, onUpdate }: EditCampaignModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([null, null, null])
    const [formData, setFormData] = useState({
        campaignInformation: {
            title: campaign.title || "",
            shortDescription: campaign.shortDescription || "",
            aboutCampaign: campaign.aboutCampaign || "",
            images: campaign.images || []
        },
        campaignGoalsAndProgress: {
            goalAmount: campaign.goalAmount || 0,
            raisedAmount: campaign.raisedAmount || 0,
        },
        campaignDetails: {
            location: {
                city: campaign.location?.city || "",
                state: campaign.location?.state || "",
                country: campaign.location?.country || "India",
                isOnline: campaign.location?.isOnline || false
            },
            organizer: {
                name: campaign.organizer?.name || "",
                type: campaign.organizer?.type || "individual",
                description: campaign.organizer?.description || ""
            },
            category: campaign.category || "",
            status: campaign.status || "active"
        },
        expectedImpact: {
            beneficiaries: {
                count: campaign.beneficiariesCount || 0,
            },
            duration: {
                startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : "",
                endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : ""
            },
            impactDescription: campaign.impactDescription || ""
        }
    })

    const [categories, setCategories] = useState([
        { value: 'education', label: 'Education' },
        { value: 'health', label: 'Health' },
        { value: 'environment', label: 'Environment' },
        { value: 'social-welfare', label: 'Social Welfare' },
        { value: 'technology', label: 'Technology' },
    ])
    const [isAddingCategory, setIsAddingCategory] = useState(false)
    const [newCategory, setNewCategory] = useState('')

    useEffect(() => {
        const fetchExistingCategories = async () => {
            try {
                const response = await fetch('/api/campaigns')
                const result = await response.json()
                if (result.success) {
                    const existingCats = Array.from(new Set(result.data.map((c: any) => c.category).filter(Boolean)))
                    const newOptions = existingCats.map(cat => ({
                        value: String(cat).toLowerCase().replace(/[^a-z0-9]/g, '-'),
                        label: String(cat).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                    }))

                    setCategories(prev => {
                        const merged = [...prev]
                        newOptions.forEach(opt => {
                            if (!merged.find(m => m.value === opt.value)) {
                                merged.push(opt)
                            }
                        })
                        return merged
                    })
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        }
        fetchExistingCategories()
    }, [])

    const handleAddCategory = () => {
        if (!newCategory.trim()) {
            setIsAddingCategory(false)
            return
        }

        const value = newCategory.toLowerCase().replace(/[^a-z0-9]/g, '-')
        const newCat = { value, label: newCategory.trim() }

        setCategories([...categories, newCat])
        handleSectionChange('campaignDetails', 'category', value)
        setNewCategory('')
        setIsAddingCategory(false)
        toast.success(`Category "${newCat.label}" added`)
    }

    const handleSectionChange = (section: keyof typeof formData, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...(prev[section] as object),
                [field]: value
            }
        }))
    }

    const handleNestedChange = (section: keyof typeof formData, subSection: string, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...(prev[section] as any),
                [subSection]: {
                    ...(prev[section] as any)[subSection],
                    [field]: value
                }
            }
        }))
    }

    const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            const newImages = [...formData.campaignInformation.images]
            newImages[index] = imageUrl
            handleSectionChange('campaignInformation', 'images', newImages)

            const newFiles = [...selectedFiles]
            newFiles[index] = file
            setSelectedFiles(newFiles)
        }
    }

    const handleRemoveImage = (index: number) => {
        const newImages = [...formData.campaignInformation.images]
        newImages.splice(index, 1)
        handleSectionChange('campaignInformation', 'images', newImages)

        const newFiles = [...selectedFiles]
        newFiles.splice(index, 1)
        newFiles.push(null)
        setSelectedFiles(newFiles)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const data = new FormData()
            data.append('title', formData.campaignInformation.title)
            data.append('shortDescription', formData.campaignInformation.shortDescription)
            data.append('aboutCampaign', formData.campaignInformation.aboutCampaign)
            data.append('goalAmount', formData.campaignGoalsAndProgress.goalAmount.toString())
            data.append('raisedAmount', formData.campaignGoalsAndProgress.raisedAmount.toString())
            data.append('locationCity', formData.campaignDetails.location.city)
            data.append('locationState', formData.campaignDetails.location.state)
            data.append('isOnline', formData.campaignDetails.location.isOnline.toString())
            data.append('organizerName', formData.campaignDetails.organizer.name)
            data.append('organizerType', formData.campaignDetails.organizer.type)
            data.append('organizerDescription', formData.campaignDetails.organizer.description)
            data.append('category', formData.campaignDetails.category)
            data.append('status', formData.campaignDetails.status)
            data.append('beneficiariesCount', formData.expectedImpact.beneficiaries.count.toString())
            data.append('startDate', formData.expectedImpact.duration.startDate)
            data.append('endDate', formData.expectedImpact.duration.endDate)
            data.append('impactDescription', formData.expectedImpact.impactDescription)

            // Existing images that were not removed
            formData.campaignInformation.images.forEach((img: any) => {
                if (typeof img === 'string' && img.startsWith('http')) {
                    data.append('existingImages', img)
                }
            })

            // New files
            selectedFiles.forEach(file => {
                if (file) data.append('images', file)
            })

            const response = await fetch(`/api/campaigns/${campaign._id}`, {
                method: 'PUT',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Campaign updated successfully!')
                setOpen(false)
                if (onUpdate) onUpdate()
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[85vw] max-h-[90vh] flex flex-col p-0">
                <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
                    <DialogHeader className="px-6 py-4 border-b">
                        <DialogTitle>Edit Campaign</DialogTitle>
                        <DialogDescription>
                            Update the details of the campaign.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        <div className="space-y-8">
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                                    Campaign Information
                                </h3>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Campaign Title</Label>
                                        <Input
                                            id="title"
                                            required
                                            value={formData.campaignInformation.title}
                                            onChange={(e) => handleSectionChange('campaignInformation', 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="shortDescription">Short Description</Label>
                                        <Textarea
                                            id="shortDescription"
                                            required
                                            className="h-20"
                                            value={formData.campaignInformation.shortDescription}
                                            onChange={(e) => handleSectionChange('campaignInformation', 'shortDescription', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="aboutCampaign">About This Campaign</Label>
                                        <Textarea
                                            id="aboutCampaign"
                                            required
                                            className="min-h-[150px]"
                                            value={formData.campaignInformation.aboutCampaign}
                                            onChange={(e) => handleSectionChange('campaignInformation', 'aboutCampaign', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Campaign Images</Label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[0, 1, 2].map((idx) => {
                                                const image = formData.campaignInformation.images[idx]
                                                return (
                                                    <div key={idx} className="relative aspect-video rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                                                        {image ? (
                                                            <>
                                                                <img src={image} alt="Campaign" className="w-full h-full object-cover" />
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    size="icon"
                                                                    className="absolute top-2 right-2 h-6 w-6 rounded-full"
                                                                    onClick={() => handleRemoveImage(idx)}
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                                                                <Upload className="h-6 w-6 text-gray-400 mb-2" />
                                                                <span className="text-xs text-gray-500">Upload Image</span>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    onChange={(e) => handleImageUpload(idx, e)}
                                                                />
                                                            </label>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                                    Goals & Progress
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="goalAmount">Goal (₹)</Label>
                                        <Input
                                            id="goalAmount"
                                            type="number"
                                            value={formData.campaignGoalsAndProgress.goalAmount}
                                            onChange={(e) => handleSectionChange('campaignGoalsAndProgress', 'goalAmount', Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="raisedAmount">Raised (₹)</Label>
                                        <Input
                                            id="raisedAmount"
                                            type="number"
                                            value={formData.campaignGoalsAndProgress.raisedAmount}
                                            onChange={(e) => handleSectionChange('campaignGoalsAndProgress', 'raisedAmount', Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                                    Campaign Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="locationCity">City</Label>
                                        <Input
                                            id="locationCity"
                                            placeholder="Mumbai"
                                            value={formData.campaignDetails.location.city}
                                            onChange={(e) => handleNestedChange('campaignDetails', 'location', 'city', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="locationState">State</Label>
                                        <Input
                                            id="locationState"
                                            placeholder="Maharashtra"
                                            value={formData.campaignDetails.location.state}
                                            onChange={(e) => handleNestedChange('campaignDetails', 'location', 'state', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Organizer Name</Label>
                                        <Input
                                            value={formData.campaignDetails.organizer.name}
                                            onChange={(e) => handleNestedChange('campaignDetails', 'organizer', 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Organizer Type</Label>
                                        <Select
                                            value={formData.campaignDetails.organizer.type}
                                            onValueChange={(val) => handleNestedChange('campaignDetails', 'organizer', 'type', val)}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="individual">Individual</SelectItem>
                                                <SelectItem value="organization">Organization</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>Organizer Description</Label>
                                        <Textarea
                                            placeholder="Describe the organizer..."
                                            value={formData.campaignDetails.organizer.description}
                                            onChange={(e) => handleNestedChange('campaignDetails', 'organizer', 'description', e.target.value)}
                                            className="min-h-[80px]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="category">Campaign Category</Label>
                                            {!isAddingCategory && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 px-2 text-xs text-primary"
                                                    onClick={() => setIsAddingCategory(true)}
                                                >
                                                    <Plus className="h-3 w-3 mr-1" /> New Category
                                                </Button>
                                            )}
                                        </div>

                                        {isAddingCategory ? (
                                            <div className="flex gap-2">
                                                <Input
                                                    value={newCategory}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                    placeholder="Enter category name"
                                                    className="h-10"
                                                    autoFocus
                                                />
                                                <Button type="button" size="sm" onClick={handleAddCategory}>
                                                    Add
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setIsAddingCategory(false)
                                                        setNewCategory('')
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <Select
                                                value={formData.campaignDetails.category}
                                                onValueChange={(val) => handleSectionChange('campaignDetails', 'category', val)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat.value} value={cat.value}>
                                                            {cat.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <Select
                                            value={formData.campaignDetails.status}
                                            onValueChange={(val) => handleSectionChange('campaignDetails', 'status', val)}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="isOnline"
                                                checked={formData.campaignDetails.location.isOnline}
                                                onChange={(e) => handleNestedChange('campaignDetails', 'location', 'isOnline', e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300"
                                            />
                                            <Label htmlFor="isOnline" className="cursor-pointer">This is an online campaign</Label>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                                    Expected Impact
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="beneficiariesCount">Expected Beneficiaries Count</Label>
                                        <Input
                                            id="beneficiariesCount"
                                            type="number"
                                            placeholder="1000"
                                            value={formData.expectedImpact.beneficiaries.count}
                                            onChange={(e) => handleNestedChange('expectedImpact', 'beneficiaries', 'count', Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Start Date</Label>
                                        <Input
                                            type="date"
                                            value={formData.expectedImpact.duration.startDate}
                                            onChange={(e) => handleNestedChange('expectedImpact', 'duration', 'startDate', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>End Date</Label>
                                        <Input
                                            type="date"
                                            value={formData.expectedImpact.duration.endDate}
                                            onChange={(e) => handleNestedChange('expectedImpact', 'duration', 'endDate', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="impactDescription">Impact Description</Label>
                                        <Textarea
                                            id="impactDescription"
                                            placeholder="Explain the positive change this campaign will create..."
                                            value={formData.expectedImpact.impactDescription}
                                            onChange={(e) => handleSectionChange('expectedImpact', 'impactDescription', e.target.value)}
                                            className="min-h-[120px]"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <DialogFooter className="px-6 py-4 border-t gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
