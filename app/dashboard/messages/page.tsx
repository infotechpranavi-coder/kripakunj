'use client'

import React, { useState } from 'react'
import {
  Search,
  Filter,
  Eye,
  Reply,
  Archive,
  Trash2,
  Mail,
  User,
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
  LayoutDashboard,
  Heart,
  Users,
  TrendingUp,
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

const messages = [
  {
    id: 1,
    sender: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Inquiry about volunteering opportunities',
    message: 'I would like to know more about volunteering opportunities in your organization...',
    date: '2024-02-15',
    time: '10:30 AM',
    status: 'unread',
    category: 'Volunteer',
    priority: 'medium'
  },
  {
    id: 2,
    sender: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    subject: 'Donation receipt request',
    message: 'Could you please send me the donation receipt for my recent contribution...',
    date: '2024-02-14',
    time: '3:45 PM',
    status: 'read',
    category: 'Donation',
    priority: 'high'
  },
  {
    id: 3,
    sender: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    subject: 'Partnership proposal',
    message: 'We are interested in partnering with your organization for our upcoming CSR initiative...',
    date: '2024-02-13',
    time: '11:20 AM',
    status: 'unread',
    category: 'Partnership',
    priority: 'high'
  },
  {
    id: 4,
    sender: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    subject: 'Feedback on recent event',
    message: 'I attended the beach cleanup event last weekend and wanted to share my experience...',
    date: '2024-02-12',
    time: '8:15 PM',
    status: 'read',
    category: 'Feedback',
    priority: 'low'
  },
  {
    id: 5,
    sender: 'David Brown',
    email: 'david.brown@example.com',
    subject: 'Media inquiry',
    message: 'I am a journalist from Times of India and would like to interview someone from your organization...',
    date: '2024-02-11',
    time: '2:30 PM',
    status: 'unread',
    category: 'Media',
    priority: 'high'
  }
]

const statusColors = {
  read: 'bg-green-100 text-green-800',
  unread: 'bg-blue-100 text-blue-800',
  archived: 'bg-gray-100 text-gray-800'
}

const categoryColors = {
  Volunteer: 'bg-blue-100 text-blue-800',
  Donation: 'bg-green-100 text-green-800',
  Partnership: 'bg-purple-100 text-purple-800',
  Feedback: 'bg-yellow-100 text-yellow-800',
  Media: 'bg-red-100 text-red-800'
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
}

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)



  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || message.category === categoryFilter
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })

  const unreadCount = messages.filter(m => m.status === 'unread').length
  const totalMessages = messages.length
  const highPriority = messages.filter(m => m.priority === 'high').length
  const responseRate = Math.round((messages.filter(m => m.status === 'read').length / messages.length) * 100)

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
              <h2 className="text-lg font-semibold">Messages</h2>
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
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMessages}</div>
                <p className="text-xs text-muted-foreground">+3 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{unreadCount}</div>
                <p className="text-xs text-muted-foreground">{Math.round((unreadCount / totalMessages) * 100)}% unread</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{highPriority}</div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{responseRate}%</div>
                <p className="text-xs text-muted-foreground">Messages responded to</p>
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
                    placeholder="Search messages..."
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
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="archived">Archived</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Donation">Donation</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Media">Media</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>

          {/* Messages Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id} className={message.status === 'unread' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                            {message.sender.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{message.sender}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{message.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{message.subject}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                            {message.message}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={categoryColors[message.category as keyof typeof categoryColors]}>
                          {message.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityColors[message.priority as keyof typeof priorityColors]}>
                          {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {new Date(message.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            {message.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[message.status as keyof typeof statusColors]}>
                          {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Reply className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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