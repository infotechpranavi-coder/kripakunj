'use client'

import React, { useState, useEffect } from 'react'
import {
    Menu,
    Eye,
    EyeOff,
    Bell,
    Plus,
    Briefcase,
    Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import AdminSidebar from '@/components/admin-sidebar'
import AddMemberModal from './AddMemberModal'
import EditMemberModal from './EditMemberModal'
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

export default function TeamMembersPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [members, setMembers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const toggleDarkMode = () => setDarkMode(!darkMode)

    const fetchMembers = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/team')
            const result = await response.json()
            if (result.success) {
                setMembers(result.data)
            }
        } catch (error) {
            console.error('Failed to fetch members:', error)
            toast.error('Failed to load team members')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchMembers()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/team/${id}`, {
                method: 'DELETE',
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Member deleted successfully')
                setMembers(prev => prev.filter(m => m._id !== id))
            } else {
                toast.error(`Error: ${result.error}`)
            }
        } catch (error) {
            toast.error('Failed to delete member')
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
                            <h2 className="text-lg font-semibold">Team Members</h2>
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
                            <Briefcase className="mr-3 h-6 w-6 text-primary" />
                            Team Members
                        </h1>
                        <AddMemberModal onSuccess={fetchMembers} />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : members.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {members.map((member) => (
                                <Card key={member._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative h-64 bg-gray-100 dark:bg-gray-800">
                                        <img
                                            src={member.imageUrl || '/placeholder-avatar.jpg'}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-4 text-center">
                                        <h3 className="font-bold text-lg">{member.name}</h3>
                                        <p className="text-sm text-primary font-medium mb-4">{member.designation}</p>

                                        <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <div className="flex-1">
                                                <EditMemberModal member={member} onSuccess={fetchMembers} />
                                            </div>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" size="sm" className="flex-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Remove Member?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to remove {member.name} from the team list?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(member._id)}
                                                            className="bg-red-500 hover:bg-red-700"
                                                        >
                                                            Remove
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                                    <Briefcase className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No team members yet</h3>
                                <p className="text-gray-500 max-w-sm mb-6">Add profiles for your core team members here.</p>
                                <AddMemberModal onSuccess={fetchMembers} />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
