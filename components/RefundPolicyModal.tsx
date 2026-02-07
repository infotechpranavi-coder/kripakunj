'use client'

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

export function RefundPolicyModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    Refund Policy
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Refund and Cancellation Policy</DialogTitle>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar max-h-[60vh] my-4 px-2">
                    <div className="space-y-4 text-sm text-foreground/80 py-4 leading-relaxed">
                        <p>
                            Welcome to this web-site of <strong>Kripa Kunj Charitable Trust</strong>. We make public our policy on refund and cancellation of donations received for the social cause on payment gateway as under:
                        </p>

                        <ul className="list-disc pl-5 space-y-3">
                            <li>
                                <strong>No refund/cancellation for the donated amount by any donor will not be entertained</strong>, the online donations through the online payment gateway.
                            </li>
                            <li>
                                <strong>No cash or refund of money will be allowed.</strong>
                            </li>
                            <li>
                                If any in-kind support received by the donor from anywhere the material will be reached to the poorest of the poorer communities.
                            </li>
                            <li>
                                Once received the donation for a cause will not be refunded to the donor. <strong>No cancellation to be made.</strong>
                            </li>
                            <li>
                                The donation will be used for the social cause.
                            </li>
                        </ul>

                        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                            <p className="text-sm font-medium text-foreground">
                                <strong>Note:</strong> All donations made to <strong>Kripa Kunj Charitable Trust</strong> are final and non-refundable. Your generous contribution directly supports our social causes and helps us make a meaningful impact in the lives of underprivileged communities.
                            </p>
                        </div>
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <Button type="button" onClick={(e) => {
                        const target = e.currentTarget.closest('[role="dialog"]') as HTMLElement;
                        const closeButton = target?.querySelector('button[aria-label="Close"]') as HTMLButtonElement;
                        closeButton?.click();
                    }}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
