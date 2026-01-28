'use client'

import React, { useState, useEffect } from 'react'
import {
    Menu,
    Eye,
    EyeOff,
    Bell,
    Plus,
    Newspaper,
    Trash2,
    ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import AdminSidebar from '@/components/admin-sidebar'
import AddArticleModal from './AddArticleModal'
import EditArticleModal from './EditArticleModal'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function MediaCoveragePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [articles, setArticles] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const toggleDarkMode = () => setDarkMode(!darkMode)

    const fetchArticles = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/media')
            const result = await response.json()
            if (result.success) {
                setArticles(result.data)
            }
        } catch (error) {
            console.error('Failed to fetch articles:', error)
            toast.error('Failed to load articles')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/media/${id}`, {
                method: 'DELETE',
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Article deleted successfully')
                setArticles(prev => prev.filter(a => a._id !== id))
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('Failed to delete article')
            console.error(error)
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
                            <h2 className="text-lg font-semibold">Media Coverage</h2>
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
                            <Newspaper className="mr-3 h-6 w-6 text-primary" />
                            Media Coverage
                        </h1>
                        <AddArticleModal onSuccess={fetchArticles} />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : articles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <Card key={article._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative h-48 bg-gray-100">
                                        <img
                                            src={article.imageUrl || '/placeholder-media.jpg'}
                                            alt={article.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-lg line-clamp-1">{article.title}</h3>
                                            <div className="flex items-center space-x-1">
                                                <EditArticleModal article={article} onSuccess={fetchArticles} />
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Article?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete this media article? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(article._id)}
                                                                className="bg-red-500 hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4">
                                            {new Date(article.date).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                        <Button variant="outline" size="sm" className="w-full" asChild>
                                            <a href={article.linkUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                View Article
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                                    <Newspaper className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No media articles yet</h3>
                                <p className="text-gray-500 max-w-sm mb-6">Start documenting your media mentions and press coverage here.</p>
                                <AddArticleModal onSuccess={fetchArticles} />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
