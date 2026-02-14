import React, { useState } from 'react'
import {
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
import { Progress } from '@/components/ui/progress'

import { toast } from 'sonner'

export default function CreateCampaignModal() {
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([null, null, null])
    // Fixed list of categories as requested
    const categories = [
        { value: 'education', label: 'Education' },
        { value: 'health-hygiene', label: 'Health & Hygiene' },
        { value: 'environment', label: 'Environment' },
        { value: 'women-empowerment', label: 'Women Empowerment' },
        { value: 'food-security', label: 'Food Security' },
        { value: 'social-welfare', label: 'Social Welfare' },
        { value: 'animal-welfare', label: 'Animal Welfare' },
        { value: 'disaster-relief', label: 'Disaster Relief' },
        { value: 'technology', label: 'Technology' },
        { value: 'celebration', label: 'Celebration' },
        { value: 'others', label: 'Others' },
    ]

    const [formData, setFormData] = useState({
        campaignInformation: {
            title: "",
            shortDescription: "",
            aboutCampaign: "",
            images: [null, null, null] as (string | null)[]
        },
        campaignGoalsAndProgress: {
            goalAmount: 0,
            raisedAmount: 0,
            progressPercentage: 0
        },
        campaignDetails: {
            location: {
                city: "",
                state: "",
                country: "India",
                isOnline: false
            },
            organizer: {
                name: "",
                type: "individual",
                description: ""
            },
            category: "",
            status: "active"
        },
        expectedImpact: {
            beneficiaries: {
                count: 0,
                targetGroups: [] as string[]
            },
            duration: {
                startDate: "",
                endDate: ""
            },
            impactDescription: ""
        }
    })

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
        newImages[index] = null
        handleSectionChange('campaignInformation', 'images', newImages)

        const newFiles = [...selectedFiles]
        newFiles[index] = null
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

            selectedFiles.forEach(file => {
                if (file) data.append('images', file)
            })

            const response = await fetch('/api/campaigns', {
                method: 'POST',
                body: data
            })

            const result = await response.json()

            if (result.success) {
                toast.success('Campaign created successfully!')
                setOpen(false)
                // Optionally reset form here
                window.location.reload() // Quick way to refresh the list
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
                <Button className="bg-primary text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Campaign
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[85vw] max-h-[90vh] flex flex-col p-0">
                <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
                    <DialogHeader className="px-6 py-4 border-b">
                        <DialogTitle>Create New Campaign</DialogTitle>
                        <DialogDescription>
                            Fill in the details to launch a new campaign.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        <div className="space-y-8">
                            {/* 1. Campaign Information */}
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
                                            placeholder="Official name of the campaign"
                                            value={formData.campaignInformation.title}
                                            onChange={(e) => handleSectionChange('campaignInformation', 'title', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="shortDescription">Short Description</Label>
                                        <Textarea
                                            id="shortDescription"
                                            required
                                            placeholder="A brief overview (2-3 lines)"
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
                                            placeholder="Detailed explanation of the campaign's purpose..."
                                            className="min-h-[150px]"
                                            value={formData.campaignInformation.aboutCampaign}
                                            onChange={(e) => handleSectionChange('campaignInformation', 'aboutCampaign', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <Label>Campaign Images (Upload up to 3)</Label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {formData.campaignInformation.images.map((image, index) => (
                                                <div key={index} className="relative aspect-video rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                                    {image ? (
                                                        <>
                                                            <img src={image} alt={`Campaign ${index + 1}`} className="w-full h-full object-cover" />
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="icon"
                                                                className="absolute top-2 right-2 h-6 w-6 rounded-full"
                                                                onClick={() => handleRemoveImage(index)}
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
                                                                onChange={(e) => handleImageUpload(index, e)}
                                                            />
                                                        </label>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 2. Campaign Goals & Progress */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                                    Campaign Goals & Progress
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="goalAmount">Campaign Goal Amount (₹)</Label>
                                        <Input
                                            id="goalAmount"
                                            required
                                            type="number"
                                            placeholder="Total target amount"
                                            value={formData.campaignGoalsAndProgress.goalAmount}
                                            onChange={(e) => handleSectionChange('campaignGoalsAndProgress', 'goalAmount', Number(e.target.value))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="raisedAmount">Amount Raised So Far (₹)</Label>
                                        <Input
                                            id="raisedAmount"
                                            type="number"
                                            value={formData.campaignGoalsAndProgress.raisedAmount}
                                            onChange={(e) => handleSectionChange('campaignGoalsAndProgress', 'raisedAmount', Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* 3. Campaign Details */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                                    Campaign Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        <Label htmlFor="organizerName">Organizer Name</Label>
                                        <Input
                                            id="organizerName"
                                            placeholder="Name"
                                            value={formData.campaignDetails.organizer.name}
                                            onChange={(e) => handleNestedChange('campaignDetails', 'organizer', 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="organizerType">Organizer Type</Label>
                                        <Select
                                            value={formData.campaignDetails.organizer.type}
                                            onValueChange={(val) => handleNestedChange('campaignDetails', 'organizer', 'type', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="individual">Individual</SelectItem>
                                                <SelectItem value="organization">Organization</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">Campaign Category</Label>
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
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Campaign Status</Label>
                                        <Select
                                            value={formData.campaignDetails.status}
                                            onValueChange={(val) => handleSectionChange('campaignDetails', 'status', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </section>

                            {/* 4. Expected Impact */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                                    Expected Impact
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            placeholder="Explain the positive change..."
                                            value={formData.expectedImpact.impactDescription}
                                            onChange={(e) => handleSectionChange('expectedImpact', 'impactDescription', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <DialogFooter className="px-6 py-4 border-t gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create Campaign"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

