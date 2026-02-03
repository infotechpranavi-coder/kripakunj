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

export function TermsModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    Terms & Conditions
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Terms and Conditions</DialogTitle>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar max-h-[60vh] my-4 px-2">
                    <div className="space-y-4 text-sm text-foreground/80 py-4 leading-relaxed">
                        <p>
                            Use of this site is provided by <strong>KRIPA KUNJ CHARITABLE TRUST</strong> subject to the following Terms and Conditions:
                        </p>

                        <ul className="list-disc pl-5 space-y-2">
                            <li>Your use constitutes acceptance of these terms and conditions as at the date of your first use of the site.</li>
                            <li><strong>KRIPA KUNJ CHARITABLE TRUST</strong> reserves the rights to change these terms and conditions at any time by posting changes online. Your continued use of this site after changes are posted constitutes your acceptance of this agreement as modified.</li>
                            <li>You agree to use this site only for lawful purposes, and in a manner which does not infringe the rights, or restrict, or inhibit the use and enjoyment of the site by any third party.</li>
                            <li>This site and the information, names, images, pictures, logos regarding or relating to <strong>KRIPA KUNJ CHARITABLE TRUST</strong> are provided “as is” without any representation or endorsement made and without warranty of any kind whether express or implied. In no event will <strong>KRIPA KUNJ CHARITABLE TRUST</strong> be liable for any damages including, without limitation, indirect or consequential damages, or any damages whatsoever arising from the use or in connection with such use or loss of use of the site, whether in contract or in negligence.</li>
                            <li><strong>KRIPA KUNJ CHARITABLE TRUST</strong> does not warrant that the functions contained in the material contained in this site will be uninterrupted or error free, that defects will be corrected, or that this site or the server that makes it available are free of viruses or bugs or represents the full functionality, accuracy and reliability of the materials.</li>
                        </ul>

                        <h3 className="text-base font-bold text-foreground">Copyright restrictions:</h3>
                        <p>
                            Commercial use or publication of all or any item displayed is strictly prohibited without prior authorization from <strong>KRIPA KUNJ CHARITABLE TRUST</strong>. Nothing contained herein shall be construed as conferring any license by <strong>KRIPA KUNJ CHARITABLE TRUST</strong> to use any item displayed.
                        </p>
                        <p>
                            Documents may be copied for personal use only on the condition that copyright and source indications are also copied, no modifications are made and the document is copied entirely. However, some documents and photos have been published on this site with the permission of the relevant copyright owners (who are not <strong>KRIPA KUNJ CHARITABLE TRUST</strong>). All rights are reserved on these documents and permission to copy them must be requested from the copyright owners (the sources are indicated within these documents/photographs).
                        </p>

                        <p>
                            <strong>KRIPA KUNJ CHARITABLE TRUST</strong> takes no responsibility for the content of external Internet sites.
                        </p>

                        <p>
                            Other websites that we link to are owned and operated by third parties and <strong>KRIPA KUNJ CHARITABLE TRUST</strong> has no control over them. The fact that we include links to other websites does not mean that <strong>KRIPA KUNJ CHARITABLE TRUST</strong> approves of or endorses any other third-party website or the content of that website. We accept no liability for any statements, information, products or services that are published on or are accessible through any websites owned or operated by third parties.
                        </p>

                        <p>
                            Any communication or material that you transmit to, or post on, any public area of the site including any data, questions, comments, suggestions, or the like, is, and will be treated as, non-confidential and non-proprietary information.
                        </p>

                        <p>
                            If there is any conflict between these terms and conditions and rules and/or specific terms of use appearing on this site relating to specific material then the latter shall prevail.
                        </p>

                        <p>
                            These terms and conditions shall be governed and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the Courts of Maharashtra.
                        </p>

                        <p>
                            If these terms and conditions are not accepted in full, the use of this site must be terminated immediately.
                        </p>

                        <p>
                            <strong>KRIPA KUNJ CHARITABLE TRUST</strong> is a registered NGO in Thane and registered under 12A & 80G of Income Tax Act, 1950 at Thane, Maharashtra, India.
                        </p>
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
