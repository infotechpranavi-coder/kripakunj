'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  LayoutDashboard,
  Heart,
  TrendingUp,
  MessageSquare,
  Settings,
  Menu,
  X,
  EyeOff,
  Bell,
  Save,
  Upload
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { toast } from "sonner"
import CreateCampaignModal from './CreateCampaignModal'
import EditCampaignModal from './EditCampaignModal'
import AdminSidebar from '@/components/admin-sidebar'

const campaigns = [
  {
    id: 1,
    name: 'Project GyanDaan - Education for All',
    category: 'Education',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-12-15',
    raised: 225000,
    goal: 500000,
    supporters: 450,
    progress: 45,
    image: '/slider-education.jpg'
  },
  {
    id: 2,
    name: 'Ek Ped Maa Ke Naam',
    category: 'Environment',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    raised: 63100,
    goal: 200000,
    supporters: 126,
    progress: 32,
    image: '/slider-environment.jpg'
  },
  {
    id: 3,
    name: 'Kill Hunger Initiative',
    category: 'Community',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    raised: 340000,
    goal: 500000,
    supporters: 680,
    progress: 68,
    image: '/slider-community.jpg'
  },
  {
    id: 4,
    name: 'Women Empowerment Program',
    category: 'Community',
    status: 'completed',
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    raised: 500000,
    goal: 500000,
    supporters: 1000,
    progress: 100,
    image: '/slider-education.jpg'
  },
  {
    id: 5,
    name: 'Project Shoonya - Waste Management',
    category: 'Environment',
    status: 'planned',
    startDate: '2024-03-01',
    endDate: '2024-08-31',
    raised: 0,
    goal: 200000,
    supporters: 0,
    progress: 0,
    image: '/slider-environment.jpg'
  }
]

const statusColors = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  planned: 'bg-yellow-100 text-yellow-800',
  paused: 'bg-red-100 text-red-800'
}

const categoryColors = {
  Education: 'bg-blue-100 text-blue-800',
  Environment: 'bg-green-100 text-green-800',
  Community: 'bg-purple-100 text-purple-800',
  Healthcare: 'bg-red-100 text-red-800'
}

export default function CampaignsPage() {
  const [dbCampaigns, setDbCampaigns] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/campaigns')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!")
        }

        const result = await response.json()
        if (result.success) {
          setDbCampaigns(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch campaigns:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCampaigns()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()
      if (result.success) {
        toast.success('Campaign deleted successfully')
        setDbCampaigns(prev => prev.filter(c => c._id !== id))
      } else {
        toast.error(`Error: ${result.error}`)
      }
    } catch (error) {
      toast.error('Failed to delete campaign')
      console.error(error)
    }
  }

  const filteredCampaigns = dbCampaigns.filter(campaign => {
    const title = campaign.title || campaign.name || ""
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || campaign.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

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
              <h2 className="text-lg font-semibold">Campaigns</h2>
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
                <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹2.4M</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">62%</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
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
                    placeholder="Search campaigns..."
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
                  <option value="completed">Completed</option>
                  <option value="planned">Planned</option>
                  <option value="paused">Paused</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  {Array.from(new Set(dbCampaigns.map(c => c.category).filter(Boolean))).map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>

              <CreateCampaignModal />
            </div>
          </div>

          {/* Campaigns Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Raised</TableHead>
                    <TableHead>Supporters</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">Loading campaigns...</TableCell>
                    </TableRow>
                  ) : filteredCampaigns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">No campaigns found.</TableCell>
                    </TableRow>
                  ) : filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign._id || campaign.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={campaign.images?.[0] || campaign.image || '/placeholder-campaign.jpg'}
                            alt={campaign.title || campaign.name}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium">{campaign.title || campaign.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : 'N/A'} - {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={categoryColors[campaign.category as keyof typeof categoryColors] || 'bg-gray-100'}>
                          {campaign.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[campaign.status as keyof typeof statusColors] || 'bg-gray-100'}>
                          {campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100} className="h-2" />
                          <div className="text-xs text-gray-500">{(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100).toFixed(0)}%</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">₹{(campaign.raisedAmount || 0).toLocaleString()}</div>
                          <div className="text-sm text-gray-500">of ₹{(campaign.goalAmount || 0).toLocaleString()}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{campaign.supporters || 0}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <EditCampaignModal campaign={campaign} onUpdate={() => window.location.reload()} />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the campaign
                                  "<strong>{campaign.title || campaign.name}</strong>" and remove its data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(campaign._id || campaign.id)}
                                  className="bg-red-500 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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