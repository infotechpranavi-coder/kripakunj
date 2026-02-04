'use client'

import React, { useState } from 'react'
import {
  Search,
  Filter,
  Eye,
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
  Bell,
  Phone,
  MessageCircle
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { toast } from 'sonner'

const categoryColors: Record<string, string> = {
  'Volunteer': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Donation': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Partnership': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Feedback': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Media': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'General': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const priorityColors: Record<string, string> = {
  'high': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'low': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
}

const statusColors: Record<string, string> = {
  'unread': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'read': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  'archived': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  React.useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      const result = await response.json()
      if (result.success) {
        setMessages(result.data.map((msg: any) => ({
          id: msg._id,
          sender: msg.name,
          email: msg.email,
          phone: msg.phone || '',
          subject: msg.subject,
          message: msg.message,
          date: msg.createdAt,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: msg.read ? 'read' : 'unread',
          category: msg.category || 'General',
          priority: 'medium' // Default for now
        })))
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      toast.error('Failed to load messages')
    }
  }

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message)
    setViewModalOpen(true)
  }

  const handleDeleteClick = (messageId: string) => {
    setMessageToDelete(messageId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/messages/${messageToDelete}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      if (result.success) {
        toast.success('Message deleted successfully')
        setMessages(messages.filter(m => m.id !== messageToDelete))
      } else {
        toast.error(result.error || 'Failed to delete message')
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      toast.error('An error occurred while deleting the message')
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setMessageToDelete(null)
    }
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || message.category === categoryFilter
    // const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter // Priority not yet implemented in backend
    return matchesSearch && matchesStatus && matchesCategory
  })

  const unreadCount = messages.filter(m => m.status === 'unread').length
  const totalMessages = messages.length
  const highPriority = messages.filter(m => m.priority === 'high').length
  const responseRate = totalMessages > 0 
    ? Math.round((messages.filter(m => m.status === 'read').length / messages.length) * 100)
    : 0

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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewMessage(message)}
                          title="View message"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteClick(message.id)}
                          title="Delete message"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
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

    {/* View Message Modal */}
    <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {selectedMessage && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold">{selectedMessage.sender}</DialogTitle>
                  <DialogDescription className="text-primary/70 font-medium">
                    Message Details
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Subject */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</p>
                </div>
                <p className="text-base font-semibold text-foreground pl-6">{selectedMessage.subject}</p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</p>
                  </div>
                  <p className="text-sm font-medium text-foreground pl-6 break-all">{selectedMessage.email}</p>
                </div>
                {selectedMessage.phone && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</p>
                    </div>
                    <p className="text-sm font-medium text-foreground pl-6">{selectedMessage.phone}</p>
                  </div>
                )}
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</p>
                  </div>
                  <p className="text-sm font-medium text-foreground pl-6">
                    {new Date(selectedMessage.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time</p>
                  </div>
                  <p className="text-sm font-medium text-foreground pl-6">{selectedMessage.time}</p>
                </div>
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</p>
                  <Badge className={categoryColors[selectedMessage.category as keyof typeof categoryColors]}>
                    {selectedMessage.category}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</p>
                  <Badge className={statusColors[selectedMessage.status as keyof typeof statusColors]}>
                    {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <p className="text-sm font-bold text-foreground">Message</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                  <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Message ID */}
              <div className="pt-4 border-t border-border">
                <p className="text-[10px] text-muted-foreground font-medium italic">
                  Message ID: {selectedMessage.id}
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>

    {/* Delete Confirmation Dialog */}
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the message from the system.
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