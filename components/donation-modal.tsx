'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface DonationModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    campaignTitle: string
}

export function DonationModal({ isOpen, onOpenChange, campaignTitle }: DonationModalProps) {
    const [donationAmount, setDonationAmount] = useState(500)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    // const [anonymous, setAnonymous] = useState(false)
    const [donationType, setDonationType] = useState('one-time')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const data = {
            firstName,
            lastName,
            email,
            phone,
            donationType,
            amount: donationAmount,
            campaign: campaignTitle
        }

        try {
            const response = await fetch('/api/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (result.success) {
                toast.success(`Thank you for your donation of ₹${donationAmount}!`)
                // Reset form
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
                setDonationAmount(500)
                onOpenChange(false)
            } else {
                toast.error(result.error || 'Failed to process donation')
            }
        } catch (error) {
            console.error('Donation error:', error)
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md mx-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-primary">
                        Make a Donation
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Donation Type</Label>
                        <RadioGroup value={donationType} onValueChange={setDonationType} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="one-time" id="one-time" />
                                <Label htmlFor="one-time">One-time</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="monthly" id="monthly" />
                                <Label htmlFor="monthly">Monthly</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label>Donation Amount (₹)</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {[500, 1000, 2500, 5000].map((amount) => (
                                <button
                                    key={amount}
                                    type="button"
                                    onClick={() => setDonationAmount(amount)}
                                    className={`px-3 py-1 rounded-md border text-sm ${donationAmount === amount
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    ₹{amount}
                                </button>
                            ))}
                        </div>
                        <Input
                            type="number"
                            min="100"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(Number(e.target.value))}
                            placeholder="Enter custom amount"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 mt-4"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            `Donate ₹${donationAmount}`
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
