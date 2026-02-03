'use client'

import React, { useState, useEffect } from 'react'
import {
    Menu,
    Eye,
    EyeOff,
    Bell,
    Plus,
    LayoutDashboard,
    Trash2,
    Pencil,
    Link as LinkIcon,
    Image as ImageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import AdminSidebar from '@/components/admin-sidebar'
import AddBannerModal from './AddBannerModal'
import EditBannerModal from './EditBannerModal'
import { toast } from 'sonner'

interface Banner {
    _id: string;
    title: string;
    subtitle?: string;
    description?: string;
    images?: string[];
    imageUrl?: string;
    image: string; // Legacy support
    alt: string;
    link?: string;
    order: number;
    isActive: boolean;
    createdAt: string;
}

export default function BannersPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [banners, setBanners] = useState<Banner[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const toggleDarkMode = () => setDarkMode(!darkMode)

    const fetchBanners = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/banners')
            const result = await response.json()
            if (result.success) {
                setBanners(result.data)
            }
        } catch (error) {
            console.error('Error fetching banners:', error)
            toast.error('Failed to load banners')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBanners()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this banner?')) return

        try {
            const response = await fetch(`/api/banners/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Banner deleted successfully')
                fetchBanners()
            } else {
                toast.error('Failed to delete banner')
            }
        } catch (error) {
            console.error('Error deleting banner:', error)
            toast.error('Failed to delete banner')
        }
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
                            <h2 className="text-lg font-semibold">Banners</h2>
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
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold flex items-center">
                            <ImageIcon className="mr-3 h-6 w-6 text-primary" />
                            Home Page Banners
                        </h1>
                        <AddBannerModal onSuccess={fetchBanners} />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : banners.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                                    <ImageIcon className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No banners found</h3>
                                <p className="text-gray-500 max-w-sm mb-6">Create banners to display in the home page hero slider.</p>
                                <AddBannerModal onSuccess={fetchBanners} />
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {banners.map((banner) => (
                                <Card key={banner._id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                                        <img
                                            src={banner.imageUrl || (banner.images && banner.images[0]) || banner.image}
                                            alt={banner.alt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {banner.images && banner.images.length > 1 && (
                                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] rounded flex items-center gap-1">
                                                <ImageIcon className="h-3 w-3" />
                                                +{banner.images.length - 1} more
                                            </div>
                                        )}
                                        {banner.imageUrl && (
                                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-[10px] rounded flex items-center gap-1">
                                                <LinkIcon className="h-3 w-3" />
                                                External URL
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                            <EditBannerModal banner={banner} onSuccess={fetchBanners} />
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(banner._id)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute top-2 left-2">
                                            <Badge variant={banner.isActive ? 'default' : 'secondary'}>
                                                {banner.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-lg">{banner.title}</h3>
                                                {banner.subtitle && <p className="text-sm text-gray-600 dark:text-gray-400">{banner.subtitle}</p>}
                                            </div>
                                            <Badge variant="outline">Order: {banner.order}</Badge>
                                        </div>
                                        {banner.description && <p className="text-sm text-gray-500 line-clamp-2 mt-2">{banner.description}</p>}
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
