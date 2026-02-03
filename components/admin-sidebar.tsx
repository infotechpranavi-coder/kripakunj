import React from 'react'
import {
    LayoutDashboard,
    Users,
    Heart,
    TrendingUp,
    Calendar,
    MessageSquare,
    Settings,
    X,
    Newspaper,
    Briefcase,
    UserCheck,
    Image as ImageIcon,
    Video,
    Megaphone,
    FileCheck,
    Menu,
    LogOut,
    Layout
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

interface AdminSidebarProps {
    sidebarOpen: boolean
    toggleSidebar: () => void
}

export default function AdminSidebar({ sidebarOpen, toggleSidebar }: AdminSidebarProps) {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST' })
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const sidebarItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'Campaigns', icon: Heart, href: '/dashboard/campaigns' },
        { name: 'Volunteers', icon: Users, href: '/dashboard/volunteers' },
        { name: 'Events', icon: Calendar, href: '/dashboard/events' },
        { name: 'Donations', icon: TrendingUp, href: '/dashboard/donations' },
        { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages' },
        { name: 'Media Coverage', icon: Newspaper, href: '/dashboard/media' },
        { name: 'Team Members', icon: Briefcase, href: '/dashboard/team' },
        { name: 'Board Members', icon: UserCheck, href: '/dashboard/board' },
        { name: 'Gallery', icon: ImageIcon, href: '/dashboard/gallery' },
        { name: 'Banners', icon: ImageIcon, href: '/dashboard/banners' },
        { name: 'Videos', icon: Video, href: '/dashboard/videos' },
        { name: 'Press Release', icon: Megaphone, href: '/dashboard/press' },
        { name: 'Compliance', icon: FileCheck, href: '/dashboard/compliance' },
        { name: 'Other', icon: Layout, href: '/dashboard/other' },
        { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
    ]

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
                <Button variant="ghost" size="sm" onClick={toggleSidebar} className="lg:hidden">
                    <X className="h-5 w-5" />
                </Button>
            </div>
            <nav className="mt-5 px-2 pb-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <ul className="space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`} />
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}
