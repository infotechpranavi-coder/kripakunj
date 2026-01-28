'use client'

import React, { useState } from 'react'
import {
  Save,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Mail,
  Lock,
  CreditCard,
  Database,
  Upload,
  Eye,
  EyeOff,
  LayoutDashboard,
  Heart,
  Users,
  TrendingUp,
  MessageSquare,
  Settings,
  Menu,
  X
} from 'lucide-react'
import AdminSidebar from '@/components/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [showPassword, setShowPassword] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)



  const tabs = [
    { id: 'general', name: 'General', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'integrations', name: 'Integrations', icon: Globe },
  ]

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
              <h2 className="text-lg font-semibold">Settings</h2>
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
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                      >
                        <tab.icon className="mr-3 h-5 w-5" />
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'general' && (
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization Name</Label>
                        <Input id="organization" defaultValue="Kripa Kunj Charitable Trust" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="admin@kripakunj.org" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Organization Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="Kripa Kunj Charitable Trust is dedicated to making a difference in the lives of underprivileged communities through education, healthcare, and sustainable development initiatives."
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" defaultValue="https://kripakunj.org" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+91 98765 43210" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        defaultValue="123 Charity Lane, Mumbai, Maharashtra 400001"
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'security' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input id="current-password" type={showPassword ? "text" : "password"} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable 2FA</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Login Activity</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium">Mumbai, India</p>
                            <p className="text-sm text-gray-500">Feb 15, 2024 at 10:30 AM</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Current</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium">Delhi, India</p>
                            <p className="text-sm text-gray-500">Feb 14, 2024 at 3:45 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>
                        <Save className="h-4 w-4 mr-2" />
                        Update Security
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'notifications' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Donations</p>
                            <p className="text-sm text-gray-500">Get notified when someone makes a donation</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Volunteers</p>
                            <p className="text-sm text-gray-500">Get notified when someone joins as volunteer</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Event Reminders</p>
                            <p className="text-sm text-gray-500">Get reminded about upcoming events</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Monthly Reports</p>
                            <p className="text-sm text-gray-500">Receive monthly summary reports</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Campaign Updates</p>
                            <p className="text-sm text-gray-500">Real-time updates on campaign progress</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">System Alerts</p>
                            <p className="text-sm text-gray-500">Important system notifications</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'appearance' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select defaultValue="system">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="mr">Marathi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Dashboard Layout</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-primary rounded-lg p-4 cursor-pointer">
                          <div className="bg-gray-200 h-20 rounded mb-2"></div>
                          <p className="text-center font-medium">Compact</p>
                        </div>
                        <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer">
                          <div className="bg-gray-200 h-32 rounded mb-2"></div>
                          <p className="text-center font-medium">Spacious</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Customization</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Show Welcome Message</p>
                            <p className="text-sm text-gray-500">Display a welcome message on dashboard</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Compact Sidebar</p>
                            <p className="text-sm text-gray-500">Use compact sidebar navigation</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>
                        <Save className="h-4 w-4 mr-2" />
                        Save Appearance
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'integrations' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium mb-4">Payment Gateways</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">Razorpay</p>
                              <p className="text-sm text-gray-500">Payment processing</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center">
                              <Database className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">Google Analytics</p>
                              <p className="text-sm text-gray-500">Website analytics</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Not Connected</span>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium mb-4">Social Media</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                              <Mail className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">Facebook</p>
                              <p className="text-sm text-gray-500">Social sharing</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-sky-500 rounded flex items-center justify-center">
                              <Globe className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">Twitter</p>
                              <p className="text-sm text-gray-500">Social sharing</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Not Connected</span>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>
                        <Save className="h-4 w-4 mr-2" />
                        Save Integrations
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}