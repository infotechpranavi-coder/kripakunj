'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  TrendingUp,
  DollarSign,
  CreditCard,
  Calendar,
  CheckCircle,
  LayoutDashboard,
  Heart,
  Users,
  MessageSquare,
  Settings,
  Menu,
  X,
  EyeOff,
  Bell,
  Clock,
  Loader2
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

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800'
}

export default function DonationsPage() {
  const [donationsList, setDonationsList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    fetchDonations()
  }, [])

  const fetchDonations = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/donations')
      const result = await response.json()
      if (result.success) {
        setDonationsList(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch donations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  const filteredDonations = donationsList.filter(donation => {
    const fullName = `${donation.firstName} ${donation.lastName}`.toLowerCase()
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.campaign.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: donationsList.reduce((sum, d) => sum + d.amount, 0),
    count: donationsList.length,
    completed: donationsList.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.amount, 0),
    pending: donationsList.filter(d => d.status === 'pending').reduce((sum, d) => sum + d.amount, 0),
    successRate: donationsList.length > 0
      ? Math.round((donationsList.filter(d => d.status === 'completed').length / donationsList.length) * 100)
      : 0
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
              <h2 className="text-lg font-semibold">Donations</h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                {darkMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.total.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{stats.count} total donations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{stats.completed.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Successfully received</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">₹{stats.pending.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Awaiting payment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.successRate}%</div>
                <p className="text-xs text-muted-foreground">Transaction completion</p>
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
                    placeholder="Search donor, email, campaign..."
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
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <Button variant="outline" onClick={fetchDonations}>
                <Filter className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Donations Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Donations</CardTitle>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading donations...
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredDonations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                          No donations found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDonations.map((donation) => (
                        <TableRow key={donation._id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{donation.firstName} {donation.lastName}</div>
                              <div className="text-xs text-muted-foreground">{donation.email}</div>
                              {donation.phone && <div className="text-[10px] text-muted-foreground/70">{donation.phone}</div>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-bold text-primary">
                              ₹{donation.amount.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize text-[10px] px-2 py-0">
                              {donation.donationType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium max-w-[150px] truncate" title={donation.campaign}>
                              {donation.campaign}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${statusColors[donation.status as keyof typeof statusColors]} capitalize border-none`}>
                              {donation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs text-muted-foreground">
                              {new Date(donation.createdAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
