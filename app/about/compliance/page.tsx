'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { ShieldCheck, Download, ExternalLink, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface ComplianceDocument {
  _id: string
  title: string
  imageUrl: string
  date: string
  docUrl?: string
}

export default function Compliance() {
  const [documents, setDocuments] = useState<ComplianceDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch('/api/compliance')
        const data = await res.json()
        if (data.success) {
          setDocuments(data.data)
        }
      } catch (error) {
        console.error('Error fetching compliance documents:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-primary/5 py-16 md:py-24 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Legal & <span className="text-primary">Compliance</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We maintain the highest standards of transparency and accountability through regular audits and government registrations.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
            ) : documents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {documents.map((doc, index) => (
                  <AnimatedSection key={doc._id} direction="up" delay={index * 100}>
                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-none hover:shadow-xl transition-all duration-300 border-4 border-black group h-full flex flex-col relative scale-95 hover:scale-100">
                      <div className="relative h-[500px] w-full bg-white overflow-hidden flex items-center justify-center p-8">
                        <img
                          src={doc.imageUrl}
                          alt={doc.title}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Overlay Title */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 text-center">
                            {doc.title}
                          </h3>
                          {doc.docUrl ? (
                            <div className="flex items-center justify-center gap-2 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                              <ExternalLink className="w-4 h-4" /> View Document
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                              <ShieldCheck className="w-4 h-4" /> Verified
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Clickable Overlay Link */}
                      {doc.docUrl && (
                        <a
                          href={doc.docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-10"
                          title={`View ${doc.title}`}
                        >
                          <span className="sr-only">View {doc.title}</span>
                        </a>
                      )}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No compliance documents available at the moment.</p>
              </div>
            )}

            <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-primary/10">
              <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Transparency Commitment</h2>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Kripa Kunj Charitable Trust is committed to the highest levels of ethical conduct. We believe that transparency is the foundation of trust between us and our donors, volunteers, and the communities we serve.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-sm text-foreground/80">Quarterly impact reporting to all stakeholders</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-sm text-foreground/80">Zero tolerance policy for financial misconduct</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-sm text-foreground/80">Regular third-party project evaluations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-sm text-foreground/80">100% data privacy for all our contributors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
