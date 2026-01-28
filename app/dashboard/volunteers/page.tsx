'use client'

import React, { useState } from 'react'
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

const volunteers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    joinDate: '2023-06-15',
    status: 'active',
    hours: 120,
    campaigns: 8,
    skills: ['Education', 'Community Service'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    phone: '+91 98765 43211',
    location: 'Delhi, Delhi',
    joinDate: '2023-08-22',
    status: 'active',
    hours: 85,
    campaigns: 5,
    skills: ['Environment', 'Event Management'],
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+91 98765 43212',
    location: 'Bangalore, Karnataka',
    joinDate: '2023-04-10',
    status: 'active',
    hours: 200,
    campaigns: 12,
    skills: ['Healthcare', 'Education'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '+91 98765 43213',
    location: 'Chennai, Tamil Nadu',
    joinDate: '2023-12-01',
    status: 'pending',
    hours: 0,
    campaigns: 0,
    skills: ['Community Service'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+91 98765 43214',
    location: 'Kolkata, West Bengal',
    joinDate: '2023-02-18',
    status: 'inactive',
    hours: 45,
    campaigns: 3,
    skills: ['Environment'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  }
]

const statusColors = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-red-100 text-red-800'
}

export default function VolunteersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [skillFilter, setSkillFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)



  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || volunteer.status === statusFilter
    const matchesSkill = skillFilter === 'all' || volunteer.skills.includes(skillFilter)
    return matchesSearch && matchesStatus && matchesSkill
  })

  const totalHours = volunteers.reduce((sum, volunteer) => sum + volunteer.hours, 0)
  const totalCampaigns = volunteers.reduce((sum, volunteer) => sum + volunteer.campaigns, 0)
  const activeVolunteers = volunteers.filter(v => v.status === 'active').length

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={toggleSidebar} className="lg:hidden mr-2">
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold">Volunteers</h2>
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{volunteers.length}</div>
                <p className="text-xs text-muted-foreground">+5 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeVolunteers}</div>
                <p className="text-xs text-muted-foreground">{Math.round((activeVolunteers / volunteers.length) * 100)}% active rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalHours}</div>
                <p className="text-xs text-muted-foreground">+120 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Campaigns Participated</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCampaigns}</div>
                <p className="text-xs text-muted-foreground">Avg. {Math.round(totalCampaigns / volunteers.length)} per volunteer</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search volunteers..."
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
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Skills</option>
                  <option value="Education">Education</option>
                  <option value="Environment">Environment</option>
                  <option value="Community Service">Community Service</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Event Management">Event Management</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>

          {/* Volunteers Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Volunteers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Volunteer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Campaigns</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVolunteers.map((volunteer) => (
                    <TableRow key={volunteer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={volunteer.image}
                            alt={volunteer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium">{volunteer.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Joined {new Date(volunteer.joinDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            {volunteer.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {volunteer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {volunteer.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[volunteer.status as keyof typeof statusColors]}>
                          {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{volunteer.hours} hrs</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{volunteer.campaigns}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {volunteer.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}