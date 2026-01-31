'use client'

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, Users, CheckCircle2 } from 'lucide-react'

interface ViewEventDetailsModalProps {
    event: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ViewEventDetailsModal({ event, open, onOpenChange }: ViewEventDetailsModalProps) {
    if (!event) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{event.name || event.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Hero Image */}
                    <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-md">
                        <img
                            src={event.image}
                            alt={event.name || event.title}
                            className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-4 right-4 bg-primary text-white">
                            {event.category}
                        </Badge>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Calendar className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-xs text-gray-500">Date</p>
                                <p className="text-sm font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Clock className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-xs text-gray-500">Time</p>
                                <p className="text-sm font-semibold">{event.time}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <MapPin className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-xs text-gray-500">Location</p>
                                <p className="text-sm font-semibold truncate max-w-[100px]">{event.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Users className="h-5 w-5 text-accent" />
                            <div>
                                <p className="text-xs text-gray-500">Attendance</p>
                                <p className="text-sm font-semibold">{event.interested} Interested</p>
                            </div>
                        </div>
                    </div>

                    {/* Highlights Section */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            Event Highlights
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                            {event.highlights && event.highlights.length > 0 ? (
                                event.highlights.map((h: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        {h}
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 italic">No custom highlights specified.</p>
                            )}
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">About This Event</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                            {event.description}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
