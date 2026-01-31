'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  XCircle,
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
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AdminSidebar from '@/components/admin-sidebar'
import AddEventModal from './AddEventModal'
import ViewEventDetailsModal from './ViewEventDetailsModal'
import EditEventModal from './EditEventModal'


const events = [
  {
    id: 1,
    name: 'Monthly Beach Cleanup - Kinaara',
    description: 'Monthly cleanup drive at Kinaara beach with community participation',
    date: '2024-02-15',
    time: '09:00 AM - 12:00 PM',
    location: 'Kinaara Beach, Mumbai',
    category: 'Environment',
    status: 'upcoming',
    registered: 45,
    capacity: 100,
    volunteers: 12,
    image: '/slider-environment.jpg'
  },
  {
    id: 2,
    name: 'Educational Workshop for Underprivileged Children',
    description: 'Interactive learning session for children in slum areas',
    date: '2024-02-20',
    time: '10:00 AM - 4:00 PM',
    location: 'Community Center, Delhi',
    category: 'Education',
    status: 'upcoming',
    registered: 30,
    capacity: 50,
    volunteers: 8,
    image: '/slider-education.jpg'
  },
  {
    id: 3,
    name: 'Health Camp - Free Medical Checkups',
    description: 'Free health checkup camp for senior citizens',
    date: '2024-01-28',
    time: '9:00 AM - 5:00 PM',
    location: 'Old Age Home, Bangalore',
    category: 'Healthcare',
    status: 'completed',
    registered: 85,
    capacity: 100,
    volunteers: 15,
    image: '/slider-community.jpg'
  },
  {
    id: 4,
    name: 'Women Empowerment Seminar',
    description: 'Seminar on financial literacy and career guidance for women',
    date: '2024-02-10',
    time: '2:00 PM - 6:00 PM',
    location: 'Community Hall, Chennai',
    category: 'Community',
    status: 'completed',
    registered: 65,
    capacity: 80,
    volunteers: 10,
    image: '/slider-education.jpg'
  },
  {
    id: 5,
    name: 'Tree Plantation Drive',
    description: 'Planting 1000 saplings in local parks and schools',
    date: '2024-03-05',
    time: '7:00 AM - 11:00 AM',
    location: 'City Parks, Pune',
    category: 'Environment',
    status: 'planned',
    registered: 0,
    capacity: 200,
    volunteers: 0,
    image: '/slider-environment.jpg'
  }
]

const statusColors = {
  upcoming: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  planned: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800'
}

const categoryColors = {
  Education: 'bg-blue-100 text-blue-800',
  Environment: 'bg-green-100 text-green-800',
  Community: 'bg-purple-100 text-purple-800',
  Healthcare: 'bg-red-100 text-red-800'
}

export default function EventsPage() {
  const [eventList, setEventList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [viewEvent, setViewEvent] = useState<any>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [editEvent, setEditEvent] = useState<any>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/events')
      const result = await response.json()
      if (result.success) {
        // Map backend fields to frontend if necessary
        const mappedEvents = result.data.map((e: any) => ({
          ...e,
          id: e._id, // Add this for consistency with links
          name: e.title // dashboard uses 'name'
        }))
        setEventList(mappedEvents)
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Event deleted successfully');
        fetchEvents();
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error('Failed to delete event');
      console.error(error);
    }
  }


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)



  const filteredEvents = eventList.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const upcomingEventsCount = eventList.filter(e => e.status === 'upcoming').length
  const completedEventsCount = eventList.filter(e => e.status === 'completed').length
  const totalParticipants = eventList.reduce((sum, event) => sum + event.registered, 0)
  const totalVolunteers = eventList.reduce((sum, event) => sum + event.volunteers, 0)


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
              <h2 className="text-lg font-semibold">Events</h2>
              <div className="ml-4">
                <AddEventModal onSuccess={() => {
                  fetchEvents()
                }} />
              </div>
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
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eventList.length}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingEventsCount}</div>
                <p className="text-xs text-muted-foreground">{Math.round((upcomingEventsCount / eventList.length) * 100)}% upcoming</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalParticipants}</div>
                <p className="text-xs text-muted-foreground">+45 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalVolunteers}</div>
                <p className="text-xs text-muted-foreground">Avg. {Math.round(totalVolunteers / eventList.length)} per event</p>

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
                    placeholder="Search events..."
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
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="planned">Planned</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="Education">Education</option>
                  <option value="Environment">Environment</option>
                  <option value="Community">Community</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>

          {/* Events Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Volunteers</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={event.image}
                            alt={event.name}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium">{event.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {event.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={categoryColors[event.category as keyof typeof categoryColors]}>
                          {event.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            {event.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {event.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[event.status as keyof typeof statusColors]}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{event.registered}/{event.capacity}</div>
                          <Progress value={(event.registered / event.capacity) * 100} className="h-2" />
                          <div className="text-xs text-gray-500">
                            {Math.round((event.registered / event.capacity) * 100)}% full
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{event.volunteers}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setViewEvent(event)
                              setIsViewOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditEvent(event)
                              setIsEditOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
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
      <ViewEventDetailsModal
        event={viewEvent}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
      />
      <EditEventModal
        event={editEvent}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={fetchEvents}
      />
    </div>
  )
}