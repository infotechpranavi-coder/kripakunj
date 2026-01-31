'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, User, BookOpen } from 'lucide-react';

interface ViewVolunteerModalProps {
    volunteer: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ViewVolunteerModal({ volunteer, open, onOpenChange }: ViewVolunteerModalProps) {
    if (!volunteer) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-xl border-none shadow-2xl">
                <div className="bg-primary/5 p-6 border-b border-primary/10">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-bold text-foreground">{volunteer.name}</DialogTitle>
                                <DialogDescription className="text-primary/70 font-medium">
                                    Volunteer Application
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Email Address</p>
                                    <p className="text-sm font-medium text-foreground">{volunteer.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Phone Number</p>
                                    <p className="text-sm font-medium text-foreground">{volunteer.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <BookOpen className="w-4 h-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Area of Interest</p>
                                    <Badge variant="secondary" className="mt-1 capitalize px-3 py-0.5 bg-primary/10 text-primary border-none">
                                        {volunteer.area}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 mt-1 text-muted-foreground" />
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Applied On</p>
                                    <p className="text-sm font-medium text-foreground">
                                        {new Date(volunteer.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <p className="text-sm font-bold text-foreground">Relevant Experience & Motivation</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                            <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
                                {volunteer.experience}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">Current Status:</span>
                            <Badge className={
                                volunteer.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                                    volunteer.status === 'reviewed' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                        volunteer.status === 'contacted' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                            'bg-gray-100 text-gray-800 hover:bg-gray-100'
                            }>
                                {volunteer.status}
                            </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium italic">
                            Reference ID: {volunteer._id}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
