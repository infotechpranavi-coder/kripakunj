'use client'

import React, { useState, useEffect } from 'react'
import {
    Menu,
    Eye,
    EyeOff,
    Bell,
    FileCheck,
    ExternalLink,
    Pencil,
    Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import AdminSidebar from '@/components/admin-sidebar'
import AddComplianceModal from './AddComplianceModal'
import { Skeleton } from '@/components/ui/skeleton'

import { toast } from 'sonner'
import EditComplianceModal from './EditComplianceModal'
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
} from '@/components/ui/alert-dialog'

interface ComplianceDocument {
    _id: string
    title: string
    imageUrl: string
    date: string
    docUrl?: string
}

export default function CompliancePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [documents, setDocuments] = useState<ComplianceDocument[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingDocument, setEditingDocument] = useState<ComplianceDocument | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const toggleDarkMode = () => setDarkMode(!darkMode)

    const fetchDocuments = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/compliance')
            const data = await res.json()
            if (data.success) {
                setDocuments(data.data)
            }
        } catch (error) {
            console.error('Error fetching compliance documents:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/compliance/${id}`, {
                method: 'DELETE',
            })
            const data = await res.json()

            if (data.success) {
                toast.success('Document deleted successfully')
                fetchDocuments()
            } else {
                toast.error(data.error || 'Failed to delete document')
            }
        } catch (error) {
            console.error('Error deleting document:', error)
            toast.error('Something went wrong')
        } finally {
            setDeletingId(null)
        }
    }

    useEffect(() => {
        fetchDocuments()
    }, [])

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
                            <h2 className="text-lg font-semibold">Compliance</h2>
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
                            <FileCheck className="mr-3 h-6 w-6 text-primary" />
                            Compliance documents
                        </h1>
                        <AddComplianceModal onSuccess={fetchDocuments} />
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-46 w-full rounded-xl" />
                            ))}
                        </div>
                    ) : documents.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                                    <FileCheck className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No compliance documents</h3>
                                <p className="text-gray-500 max-w-sm mb-6">Upload legal and regulatory compliance documents here.</p>
                                <AddComplianceModal onSuccess={fetchDocuments} />
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {documents.map((doc) => (
                                <Card key={doc._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="relative h-48 w-full bg-gray-100 group">
                                        <img
                                            src={doc.imageUrl}
                                            alt={doc.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => setEditingDocument(doc)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => setDeletingId(doc._id)}
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the compliance document.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel onClick={() => setDeletingId(null)}>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => deletingId && handleDelete(deletingId)}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-lg line-clamp-1 mr-2">{doc.title}</h3>
                                            {doc.docUrl && (
                                                <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                                                    <a href={doc.docUrl} target="_blank" rel="noopener noreferrer" title="View Document">
                                                        <ExternalLink className="h-4 w-4 text-primary" />
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Added on {new Date(doc.date).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <EditComplianceModal
                    document={editingDocument}
                    onClose={() => setEditingDocument(null)}
                    onSuccess={fetchDocuments}
                />
            </div>
        </div>
    )
}
