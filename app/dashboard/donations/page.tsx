'use client'

import React, { useState } from 'react'
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

const donations = [
  {
    id: 1,
    donor: 'John Doe',
    email: 'john.doe@example.com',
    amount: 5000,
    currency: 'INR',
    date: '2024-02-15',
    campaign: 'Project GyanDaan',
    method: 'Credit Card',
    status: 'completed',
    receipt: 'RCPT-001'
  },
  {
    id: 2,
    donor: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    amount: 2500,
    currency: 'INR',
    date: '2024-02-14',
    campaign: 'Ek Ped Maa Ke Naam',
    method: 'UPI',
    status: 'completed',
    receipt: 'RCPT-002'
  },
  {
    id: 3,
    donor: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    amount: 10000,
    currency: 'INR',
    date: '2024-02-13',
    campaign: 'Kill Hunger Initiative',
    method: 'Bank Transfer',
    status: 'completed',
    receipt: 'RCPT-003'
  },
  {
    id: 4,
    donor: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    amount: 7500,
    currency: 'INR',
    date: '2024-02-12',
    campaign: 'Women Empowerment Program',
    method: 'Credit Card',
    status: 'pending',
    receipt: 'RCPT-004'
  },
  {
    id: 5,
    donor: 'David Brown',
    email: 'david.brown@example.com',
    amount: 3000,
    currency: 'INR',
    date: '2024-02-11',
    campaign: 'Project Shoonya',
    method: 'UPI',
    status: 'completed',
    receipt: 'RCPT-005'
  },
  {
    id: 6,
    donor: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    amount: 15000,
    currency: 'INR',
    date: '2024-02-10',
    campaign: 'Project GyanDaan',
    method: 'Credit Card',
    status: 'completed',
    receipt: 'RCPT-006'
  }
]

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800'
}

const methodColors = {
  'Credit Card': 'bg-blue-100 text-blue-800',
  'UPI': 'bg-green-100 text-green-800',
  'Bank Transfer': 'bg-purple-100 text-purple-800',
  'PayPal': 'bg-indigo-100 text-indigo-800'
}

export default function DonationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)



  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.campaign.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter
    const matchesMethod = methodFilter === 'all' || donation.method === methodFilter
    return matchesSearch && matchesStatus && matchesMethod
  })

  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const completedAmount = donations.filter(d => d.status === 'completed').reduce((sum, donation) => sum + donation.amount, 0)
  const pendingAmount = donations.filter(d => d.status === 'pending').reduce((sum, donation) => sum + donation.amount, 0)
  const completedDonations = donations.filter(d => d.status === 'completed').length

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
              <h2 className="text-lg font-semibold">Donations</h2>
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
                <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{donations.length} total donations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{completedAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{Math.round((completedAmount / totalAmount) * 100)}% of total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Waiting for payment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed %</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((completedDonations / donations.length) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">Transaction success rate</p>
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
                    placeholder="Search donations..."
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
                  <option value="refunded">Refunded</option>
                </select>
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Methods</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>

          {/* Donations Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Receipt</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{donation.donor}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{donation.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-lg">
                          ₹{donation.amount.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {new Date(donation.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{donation.campaign}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={methodColors[donation.method as keyof typeof methodColors]}>
                          {donation.method}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[donation.status as keyof typeof statusColors]}>
                          {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">{donation.receipt}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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