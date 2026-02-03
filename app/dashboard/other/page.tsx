'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminSidebar from '@/components/admin-sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import Image from 'next/image'
import AddCollaboratorModal from './AddCollaboratorModal'
import AddProgramModal from './AddProgramModal'
import AddImpactStatModal from './AddImpactStatModal'
import AddTrackRecordModal from './AddTrackRecordModal'
import { Layout, Menu, Eye, EyeOff, Bell, Trash2, Globe, Users, BarChart3, Award } from 'lucide-react'

interface Collaborator {
    _id: string;
    name: string;
    logo: string;
    link?: string;
    order: number;
}

interface Program {
    _id: string;
    name: string;
    tagline: string;
    description: string;
    stats: string;
    icon: string;
    order: number;
}

interface ImpactStat {
    _id: string;
    label: string;
    value: string;
    color: string;
    order: number;
}

interface TrackRecord {
    _id: string;
    title: string;
    value: string;
    description: string;
    order: number;
}

export default function OtherPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [collaborators, setCollaborators] = useState<Collaborator[]>([])
    const [programs, setPrograms] = useState<Program[]>([])
    const [impactStats, setImpactStats] = useState<ImpactStat[]>([])
    const [trackRecords, setTrackRecords] = useState<TrackRecord[]>([])
    const [isLoadingCollabs, setIsLoadingCollabs] = useState(true)
    const [isLoadingPrograms, setIsLoadingPrograms] = useState(true)
    const [isLoadingImpact, setIsLoadingImpact] = useState(true)
    const [isLoadingTrack, setIsLoadingTrack] = useState(true)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const toggleDarkMode = () => setDarkMode(!darkMode)

    useEffect(() => {
        fetchCollaborators()
        fetchPrograms()
        fetchImpactStats()
        fetchTrackRecords()
    }, [])

    const fetchCollaborators = async () => {
        try {
            const response = await fetch('/api/collaborators')
            const result = await response.json()
            if (result.success) {
                setCollaborators(result.data)
            }
        } catch (error) {
            console.error('Error fetching collaborators:', error)
            toast.error('Failed to load collaborators')
        } finally {
            setIsLoadingCollabs(false)
        }
    }

    const fetchPrograms = async () => {
        try {
            const response = await fetch('/api/programs')
            const result = await response.json()
            if (result.success) {
                setPrograms(result.data)
            }
        } catch (error) {
            console.error('Error fetching programs:', error)
            toast.error('Failed to load programs')
        } finally {
            setIsLoadingPrograms(false)
        }
    }

    const fetchImpactStats = async () => {
        try {
            const response = await fetch('/api/impact-stats')
            const result = await response.json()
            if (result.success) {
                setImpactStats(result.data)
            }
        } catch (error) {
            console.error('Error fetching impact stats:', error)
            toast.error('Failed to load impact stats')
        } finally {
            setIsLoadingImpact(false)
        }
    }

    const fetchTrackRecords = async () => {
        try {
            const response = await fetch('/api/track-records')
            const result = await response.json()
            if (result.success) {
                setTrackRecords(result.data)
            }
        } catch (error) {
            console.error('Error fetching track records:', error)
            toast.error('Failed to load track records')
        } finally {
            setIsLoadingTrack(false)
        }
    }

    const deleteCollaborator = async (id: string) => {
        if (!confirm('Are you sure you want to delete this collaborator?')) return

        try {
            const response = await fetch(`/api/collaborators/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Collaborator deleted successfully')
                fetchCollaborators()
            } else {
                toast.error(result.error || 'Failed to delete')
            }
        } catch (error) {
            toast.error('Error deleting collaborator')
        }
    }

    const deleteProgram = async (id: string) => {
        if (!confirm('Are you sure you want to delete this program?')) return

        try {
            const response = await fetch(`/api/programs/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Program deleted successfully')
                fetchPrograms()
            } else {
                toast.error(result.error || 'Failed to delete')
            }
        } catch (error) {
            toast.error('Error deleting program')
        }
    }

    const deleteImpactStat = async (id: string) => {
        if (!confirm('Are you sure you want to delete this impact stat?')) return

        try {
            const response = await fetch(`/api/impact-stats/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Impact stat deleted successfully')
                fetchImpactStats()
            } else {
                toast.error(result.error || 'Failed to delete')
            }
        } catch (error) {
            toast.error('Error deleting impact stat')
        }
    }

    const deleteTrackRecord = async (id: string) => {
        if (!confirm('Are you sure you want to delete this track record?')) return

        try {
            const response = await fetch(`/api/track-records/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            if (result.success) {
                toast.success('Track record deleted successfully')
                fetchTrackRecords()
            } else {
                toast.error(result.error || 'Failed to delete')
            }
        } catch (error) {
            toast.error('Error deleting track record')
        }
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Sidebar */}
            <AdminSidebar
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between h-16 px-4">
                        <div className="flex items-center">
                            <Button variant="ghost" size="sm" onClick={toggleSidebar} className="lg:hidden mr-2">
                                <Menu className="h-5 w-5" />
                            </Button>
                            <h2 className="text-lg font-semibold text-foreground">Other Management</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                                {darkMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Bell className="h-5 w-5" />
                                <Badge className="ml-1">0</Badge>
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-foreground">Other Management</h1>
                    </div>

                    {/* Our Impact Section */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-primary" />
                                Our Impact
                            </CardTitle>
                            <AddImpactStatModal onSuccess={fetchImpactStats} />
                        </CardHeader>
                        <CardContent>
                            {isLoadingImpact ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : impactStats.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                                    <p className="text-foreground/50 font-medium">No impact stats found.</p>
                                    <p className="text-xs text-foreground/40 mt-1">Add your impact numbers to show on the home page.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {impactStats.map((stat) => (
                                        <div key={stat._id} className="relative group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${stat.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                                                    stat.color === 'accent' ? 'bg-accent/10 text-accent' :
                                                        'bg-primary/10 text-primary'
                                                    }`}>
                                                    {stat.color} theme
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8 w-8"
                                                    onClick={() => deleteImpactStat(stat._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="text-center space-y-1">
                                                <p className={`text-4xl font-bold ${stat.color === 'secondary' ? 'text-secondary' :
                                                    stat.color === 'accent' ? 'text-accent' :
                                                        'text-primary'
                                                    }`}>{stat.value}</p>
                                                <p className="text-sm font-medium text-foreground/70">{stat.label}</p>
                                                <p className="text-[10px] text-gray-500 mt-2 pt-2 border-t border-gray-50 dark:border-gray-800">Order: {stat.order}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Our Track Record Section */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-primary" />
                                Our Track Record
                            </CardTitle>
                            <AddTrackRecordModal onSuccess={fetchTrackRecords} />
                        </CardHeader>
                        <CardContent>
                            {isLoadingTrack ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : trackRecords.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                                    <p className="text-foreground/50 font-medium">No track records found.</p>
                                    <p className="text-xs text-foreground/40 mt-1">Add your achievements to show on the about page.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {trackRecords.map((record) => (
                                        <div key={record._id} className="relative group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold uppercase">
                                                    Track Record
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8 w-8"
                                                    onClick={() => deleteTrackRecord(record._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="text-center space-y-1">
                                                <p className="text-4xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">{record.value}</p>
                                                <p className="text-sm font-bold text-foreground">{record.title}</p>
                                                <p className="text-xs text-foreground/60">{record.description}</p>
                                                <p className="text-[10px] text-gray-500 mt-2 pt-2 border-t border-gray-50 dark:border-gray-800">Order: {record.order}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Our Programs Section */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="flex items-center gap-2">
                                <Layout className="h-5 w-5 text-primary" />
                                Our Programs
                            </CardTitle>
                            <AddProgramModal onSuccess={fetchPrograms} />
                        </CardHeader>
                        <CardContent>
                            {isLoadingPrograms ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : programs.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                                    <p className="text-foreground/50 font-medium">No programs found.</p>
                                    <p className="text-xs text-foreground/40 mt-1">Add your first program to get started.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {programs.map((program) => (
                                        <div key={program._id} className="relative group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="text-4xl">{program.icon}</div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8 w-8"
                                                    onClick={() => deleteProgram(program._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-lg">{program.name}</h3>
                                                <p className="text-xs text-primary font-semibold">{program.tagline}</p>
                                                <p className="text-sm text-foreground/70 line-clamp-3 mt-2">{program.description}</p>
                                                <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 mt-4">
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{program.stats}</span>
                                                    <span className="text-[10px] text-gray-500">Order: {program.order}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Our Collaborators
                            </CardTitle>
                            <AddCollaboratorModal onSuccess={fetchCollaborators} />
                        </CardHeader>
                        <CardContent>
                            {isLoadingCollabs ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : collaborators.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                                    <p className="text-foreground/50 font-medium">No collaborators found.</p>
                                    <p className="text-xs text-foreground/40 mt-1">Add your first collaborator to get started.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {collaborators.map((collab) => (
                                        <div key={collab._id} className="relative group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="aspect-video relative mb-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                                                <Image
                                                    src={collab.logo}
                                                    alt={collab.name}
                                                    fill
                                                    className="object-contain p-4"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="font-semibold text-sm truncate">{collab.name}</h3>
                                                {collab.link && (
                                                    <a href={collab.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-primary hover:underline">
                                                        <Globe className="h-3 w-3 mr-1" />
                                                        Website
                                                    </a>
                                                )}
                                                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                                                    <span className="text-xs text-gray-500">Order: {collab.order}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8 w-8"
                                                        onClick={() => deleteCollaborator(collab._id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Layout className="h-5 w-5 text-primary" />
                                Page Content
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                                <p className="text-foreground/50 font-medium">This is the placeholder for additional management features.</p>
                                <p className="text-xs text-foreground/40 mt-1">Implement specific tools or settings here as needed.</p>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
