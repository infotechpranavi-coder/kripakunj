'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Users,
  Clock,
  LayoutDashboard,
  Heart,
  TrendingUp,
  MessageSquare,
  Settings,
  Menu,
  X,
  EyeOff,
  Bell
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"
import AdminSidebar from '@/components/admin-sidebar'
import ViewVolunteerModal from './ViewVolunteerModal'



export default function VolunteersPage() {
  const [volunteersList, setVolunteersList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/volunteers')
      const result = await response.json()
      if (result.success) {
        setVolunteersList(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch volunteers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewVolunteer = async (volunteer: any) => {
    setSelectedVolunteer(volunteer)
    setViewModalOpen(true)

    // Update status to active if not already active
    if (volunteer.status !== 'active') {
      try {
        const response = await fetch(`/api/volunteers/${volunteer._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'active' }),
        })

        const result = await response.json()
        if (result.success) {
          // Update local state
          setVolunteersList(prev => prev.map(v =>
            v._id === volunteer._id ? { ...v, status: 'active' } : v
          ))
          // Also update the selected volunteer so the modal shows the new status immediately
          setSelectedVolunteer({ ...volunteer, status: 'active' })
        }
      } catch (error) {
        console.error('Failed to update volunteer status:', error)
      }
    }
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  const filteredVolunteers = volunteersList.filter(volunteer => {
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.area.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || volunteer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: volunteersList.length,
    pending: volunteersList.filter(v => v.status === 'pending').length,
    reviewed: volunteersList.filter(v => v.status === 'reviewed').length,
    contacted: volunteersList.filter(v => v.status === 'contacted').length,
    active: volunteersList.filter(v => v.status === 'active').length
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="lg:ml-64">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={toggleSidebar} className="lg:hidden mr-2">
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold">Volunteer Applications</h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                {darkMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        <ViewVolunteerModal
          volunteer={selectedVolunteer}
          open={viewModalOpen}
          onOpenChange={setViewModalOpen}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Apps</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.reviewed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contacted</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.contacted}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">{stats.active}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search name, email, area..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Contact Detail</TableHead>
                    <TableHead>Interest Area</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Applied</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Loading applications...
                      </TableCell>
                    </TableRow>
                  ) : filteredVolunteers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No applications found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVolunteers.map((v) => (
                      <TableRow key={v._id}>
                        <TableCell>
                          <div className="font-medium text-primary">{v.name}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-2" />
                              {v.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-2" />
                              {v.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {v.area}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            v.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                              v.status === 'reviewed' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                v.status === 'contacted' ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100' :
                                  v.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                    'bg-gray-100 text-gray-800 hover:bg-gray-100'
                          }>
                            {v.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(v.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewVolunteer(v)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
