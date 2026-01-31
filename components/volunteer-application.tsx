'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface VolunteerApplicationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VolunteerApplication({ isOpen, onOpenChange }: VolunteerApplicationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      area: formData.get('area'),
      experience: formData.get('experience'),
    };

    try {
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        toast.success('Application submitted successfully!');
        setTimeout(() => {
          onOpenChange(false);
          setSubmitted(false);
        }, 3000);
      } else {
        toast.error(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {submitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-green-600">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Application Received!</h3>
            <p className="text-foreground/70">Thank you for your interest in volunteering. We will contact you soon.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Volunteer Application</DialogTitle>
              <DialogDescription>
                Fill out the form below to join our mission. We'll get back to you shortly.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+91 98XXX XXXXX" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area of Interest</Label>
                  <Select name="area" required>
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="health">Health & Hygiene</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="empowerment">Women Empowerment</SelectItem>
                      <SelectItem value="food">Food Security</SelectItem>
                      <SelectItem value="events">Event Coordination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience / Why join us?</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  placeholder="Tell us a bit about yourself and why you want to volunteer..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              <DialogFooter className="pt-4">
                <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

