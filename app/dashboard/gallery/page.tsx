'use client'

import React, { useState, useEffect } from 'react'
import {
    Menu,
    Eye,
    EyeOff,
    Bell,
    Plus,
    Image as ImageIcon,
    Trash2,
    Filter,
    Pencil
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AdminSidebar from '@/components/admin-sidebar'
import AddImageModal from './AddImageModal'
import EditImageModal from './EditImageModal'
import { toast } from 'sonner'

interface GalleryImage {
    _id: string;
    title: string;
    imageUrl: string;
    category: string;
    createdAt: string;
}

export default function GalleryPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [images, setImages] = useState<GalleryImage[]>([])
    const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [isLoading, setIsLoading] = useState(true)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const toggleDarkMode = () => setDarkMode(!darkMode)

    const fetchImages = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/gallery')
            const result = await response.json()
            if (result.success) {
                setImages(result.data)
                setFilteredImages(result.data)
            }
        } catch (error) {
            console.error('Error fetching images:', error)
            toast.error('Failed to load images')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [])

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredImages(images)
        } else {
            setFilteredImages(images.filter(img => img.category === selectedCategory))
        }
    }, [selectedCategory, images])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return

        try {
            const response = await fetch(`/api/gallery/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Image deleted successfully')
                fetchImages()
            } else {
                toast.error('Failed to delete image')
            }
        } catch (error) {
            console.error('Error deleting image:', error)
            toast.error('Failed to delete image')
        }
    }

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'Events': 'bg-blue-500',
            'Programs': 'bg-green-500',
            'Community': 'bg-purple-500',
            'Impact': 'bg-orange-500',
            'Other': 'bg-gray-500'
        }
        return colors[category] || 'bg-gray-500'
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="lg:ml-64">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between h-16 px-4">
                        <div className="flex items-center">
                            <Button variant="ghost" size="sm" onClick={toggleSidebar} className="lg:hidden mr-2">
                                <Menu className="h-5 w-5" />
                            </Button>
                            <h2 className="text-lg font-semibold">Gallery</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                                {darkMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Bell className="h-5 w-5" />
                                <Badge className="ml-1">3</Badge>
                            </Button>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                                    A
                                </div>
                                <span className="text-sm font-medium">Admin</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h1 className="text-2xl font-bold flex items-center">
                            <ImageIcon className="mr-3 h-6 w-6 text-primary" />
                            Gallery
                        </h1>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-500" />
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Filter by category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        <SelectItem value="Events">Events</SelectItem>
                                        <SelectItem value="Programs">Programs</SelectItem>
                                        <SelectItem value="Community">Community</SelectItem>
                                        <SelectItem value="Impact">Impact</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <AddImageModal onSuccess={fetchImages} />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredImages.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                                    <ImageIcon className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    {selectedCategory === 'all' ? 'No images in gallery' : `No images in ${selectedCategory} category`}
                                </h3>
                                <p className="text-gray-500 max-w-sm mb-6">Upload and organize images for your photo gallery here.</p>
                                <AddImageModal
                                    onSuccess={fetchImages}
                                    trigger={
                                        <Button>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Image
                                        </Button>
                                    }
                                />
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredImages.map((image) => (
                                <Card key={image._id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={image.imageUrl}
                                            alt={image.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                            <EditImageModal 
                                                image={image} 
                                                onSuccess={fetchImages}
                                                trigger={
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                }
                                            />
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(image._id)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute top-2 left-2">
                                            <Badge className={`${getCategoryColor(image.category)} text-white`}>
                                                {image.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-sm truncate">{image.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(image.createdAt).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
