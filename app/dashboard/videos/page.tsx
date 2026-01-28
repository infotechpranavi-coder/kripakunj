'use client'

import React, { useState } from 'react'
import {
    Menu,
    Eye,
    EyeOff,
    Bell,
    Plus,
    Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import AdminSidebar from '@/components/admin-sidebar'

export default function VideosPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const toggleDarkMode = () => setDarkMode(!darkMode)

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
                            <h2 className="text-lg font-semibold">Videos</h2>
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
                            <Video className="mr-3 h-6 w-6 text-primary" />
                            Videos
                        </h1>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Video
                        </Button>
                    </div>

                    <Card>
                        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                                <Video className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No videos yet</h3>
                            <p className="text-gray-500 max-w-sm mb-6">Manage your video content and links here.</p>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Video
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
