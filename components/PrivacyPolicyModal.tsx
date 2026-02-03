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

export function PrivacyPolicyModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    Privacy Policy
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar my-4 px-2">
                    <div className="space-y-6 text-sm text-foreground/80 leading-relaxed">
                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-foreground">Our Commitment</h3>
                            <p>
                                <strong>KRIPA KUNJ CHARITABLE TRUST</strong> is committed to the highest levels of customer service. This includes protecting your privacy. Any information you provide to us remains private and is only used for the purposes outlined below. We don’t rent, sell or exchange our contact lists.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-lg font-bold text-foreground">Your Personal Information</h3>
                            <p>
                                The information collected enables <strong>KRIPA KUNJ CHARITABLE TRUST</strong> to provide and improve its services to you such as processing donations, providing receipts, sending information about <strong>KRIPA KUNJ CHARITABLE TRUST</strong> and providing new opportunities for you to assist disadvantaged children and their communities in India.
                            </p>
                            <p>
                                Occasionally, we may use external suppliers to contact you or help with mailing or texting information to you. These suppliers are required to sign an agreement to keep your personal information confidential.
                            </p>
                            <p>
                                The personal information we typically ask you for is:
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Contact details (name, address, e-mail, phone numbers, PAN Card)</li>
                                </ul>
                            </p>
                            <p>
                                You may request a copy of the personal information we have for you at any time by emailing <strong>kripakunjcharitabletrust@gmail.com</strong>. If any personal information changes or you find our records are out of date, please let us know.
                            </p>
                            <p>
                                We will ensure your personal information is held securely, in accordance with the Data Protection Act.
                            </p>
                        </section>

                        <section className="space-y-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                            <h3 className="text-lg font-bold text-primary">PAYMENT PROCESS</h3>
                            <p>
                                By proceeding with the transaction, the Donor understands that the transaction is final and once the payment is made, the donor is not eligible for any claims. Further, the donor confirms that all personal details provided in this form are true and correct.
                            </p>
                            <p>
                                Donor further agrees to indemnify <strong>KRIPA KUNJ CHARITABLE TRUST</strong> against any and all claims, losses and damages that may arise out of false or incorrect information submitted by the donor.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <p>
                                We would like to let you know how your donation has been put hard to work changing lives. We promise not to spam you, pass on your details to someone else or constantly pester you for more money.
                            </p>
                        </section>
                    </div>
                </div>
                <DialogFooter>
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
