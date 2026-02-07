'use client'

import React, { useState, useEffect } from 'react'
import {
    Menu,
    Eye,
    EyeOff,
    Bell,
    Plus,
    Megaphone,
    Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import AdminSidebar from '@/components/admin-sidebar'
import AddPressReleaseModal from './AddPressReleaseModal'
import { toast } from 'sonner'

interface PressRelease {
    _id: string
    title: string
    imageUrl: string
    date: string
    createdAt?: string
    updatedAt?: string
}

export default function PressReleasePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [releases, setReleases] = useState<PressRelease[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [pressReleaseToDelete, setPressReleaseToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const toggleDarkMode = () => setDarkMode(!darkMode)

    const fetchReleases = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/press')
            const data = await res.json()
            if (data.success) {
                setReleases(data.data)
            }
        } catch (error) {
            console.error('Error loading press releases', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchReleases()
    }, [])

    const handleDeleteClick = (id: string) => {
        setPressReleaseToDelete(id)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!pressReleaseToDelete) return

        setIsDeleting(true)
        try {
            const response = await fetch(`/api/press/${pressReleaseToDelete}`, {
                method: 'DELETE',
            })
            const result = await response.json()

            if (result.success) {
                toast.success('Press release deleted successfully')
                setReleases(releases.filter(r => r._id !== pressReleaseToDelete))
            } else {
                toast.error(result.error || 'Failed to delete press release')
            }
        } catch (error) {
            console.error('Error deleting press release:', error)
            toast.error('An error occurred while deleting the press release')
        } finally {
            setIsDeleting(false)
            setDeleteDialogOpen(false)
            setPressReleaseToDelete(null)
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
                            <h2 className="text-lg font-semibold">Press Release</h2>
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
                            <Megaphone className="mr-3 h-6 w-6 text-primary" />
                            Press Release
                        </h1>
                        <AddPressReleaseModal onSuccess={fetchReleases} />
                    </div>

                    {isLoading ? (
                        <Card>
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4" />
                                <p className="text-gray-500">Loading press releases...</p>
                            </CardContent>
                        </Card>
                    ) : releases.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                                    <Megaphone className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    No press releases yet
                                </h3>
                                <p className="text-gray-500 max-w-sm mb-6">
                                    Publish and manage your official press releases here.
                                </p>
                                <AddPressReleaseModal onSuccess={fetchReleases} />
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {releases.map((item) => (
                                <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow relative group">
                                    <div className="h-48 w-full bg-gray-100 overflow-hidden relative">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteClick(item._id)}
                                            className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete press release"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(item.date || item.createdAt || item.updatedAt || Date.now()).toLocaleDateString?.() ?? ''}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteClick(item._id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0"
                                                title="Delete press release"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the press release from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
