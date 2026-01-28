'use client'

import React, { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Heart,
  TrendingUp,
  Calendar,
  MessageSquare,
  Settings,
  Menu,
  X,
  Eye,
  EyeOff,
  Bell,
  Search,
  Filter,
  Download,
  Plus
} from 'lucide-react'
import AdminSidebar from '@/components/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart'
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Cell } from 'recharts'

// Mock data for the dashboard
const statsData = [
  { title: 'Total Campaigns', value: '24', change: '+12%', icon: Heart, color: 'text-red-500' },
  { title: 'Active Volunteers', value: '1,150', change: '+8%', icon: Users, color: 'text-blue-500' },
  { title: 'Funds Raised', value: '₹2.4M', change: '+15%', icon: TrendingUp, color: 'text-green-500' },
  { title: 'Upcoming Events', value: '8', change: '+3', icon: Calendar, color: 'text-purple-500' },
]

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'donated ₹5,000', time: '2 minutes ago', type: 'donation' },
  { id: 2, user: 'Sarah Smith', action: 'joined as volunteer', time: '15 minutes ago', type: 'volunteer' },
  { id: 3, user: 'Mike Johnson', action: 'attended cleanup drive', time: '1 hour ago', type: 'event' },
  { id: 4, user: 'Emma Wilson', action: 'donated ₹2,500', time: '3 hours ago', type: 'donation' },
  { id: 5, user: 'David Brown', action: 'shared campaign', time: '5 hours ago', type: 'share' },
]

const campaignData = [
  { name: 'Jan', raised: 40000, goal: 100000 },
  { name: 'Feb', raised: 30000, goal: 80000 },
  { name: 'Mar', raised: 20000, goal: 90000 },
  { name: 'Apr', raised: 27800, goal: 85000 },
  { name: 'May', raised: 18900, goal: 75000 },
  { name: 'Jun', raised: 23900, goal: 95000 },
]

const volunteerDistribution = [
  { name: 'Education', value: 35, color: '#3b82f6' },
  { name: 'Healthcare', value: 25, color: '#ef4444' },
  { name: 'Environment', value: 20, color: '#10b981' },
  { name: 'Community', value: 20, color: '#8b5cf6' },
]

const topCampaigns = [
  { id: 1, name: 'Project GyanDaan', raised: 225000, goal: 500000, progress: 45 },
  { id: 2, name: 'Ek Ped Maa Ke Naam', raised: 63100, goal: 200000, progress: 32 },
  { id: 3, name: 'Kill Hunger Initiative', raised: 340000, goal: 500000, progress: 68 },
  { id: 4, name: 'Women Empowerment', raised: 300000, goal: 500000, progress: 60 },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)



  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
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
              <h2 className="text-lg font-semibold">Dashboard Overview</h2>
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

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts and Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Campaign Performance Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Campaign Performance
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={campaignData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="raised" fill="#3b82f6" name="Raised" />
                        <Bar dataKey="goal" fill="#9ca3af" name="Goal" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Volunteer Distribution */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={volunteerDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {volunteerDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activities and Top Campaigns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Activities
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'donation' ? 'bg-green-500' :
                        activity.type === 'volunteer' ? 'bg-blue-500' :
                          activity.type === 'event' ? 'bg-purple-500' : 'bg-yellow-500'
                        }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.action}</p>
                      </div>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Top Campaigns
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCampaigns.map((campaign) => (
                    <div key={campaign.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm">{campaign.name}</h4>
                        <span className="text-sm text-gray-500">
                          ₹{campaign.raised.toLocaleString()} / ₹{campaign.goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{campaign.progress}% funded</span>
                        <span>Goal: ₹{campaign.goal.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}