import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { FileText, Download } from 'lucide-react'

export default function PressRelease() {
  const releases = [
    {
      title: 'Kripa Kunj Charitable Trust Receives National Award for Social Impact',
      date: 'January 10, 2026',
      category: 'Recognition',
      summary: 'Honored for outstanding contribution to rural education and women empowerment through Project GyanDaan and Lajja.',
    },
    {
      title: 'New Strategic Partnership for Coastal Conservation Announced',
      date: 'December 22, 2025',
      category: 'Partnership',
      summary: 'Collaborating with international environmental bodies to scale Project Kinaara across Indian coasts.',
    },
    {
      title: 'Annual Impact Report 2025 Released',
      date: 'December 05, 2025',
      category: 'Report',
      summary: 'Detailed analysis of our progress, financial transparency, and lives impacted over the past year.',
    },
    {
      title: 'Expansion of #KillHunger Initiative to 5 More Cities',
      date: 'November 15, 2025',
      category: 'Expansion',
      summary: 'Scaling our food security program to reach 5000+ more families every month.',
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <section className="bg-accent/10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Press <span className="text-primary">Releases</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Official announcements, reports, and statements from Kripa Kunj Charitable Trust.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {releases.map((release, index) => (
                <AnimatedSection key={index} direction="up" delay={index * 100}>
                  <div className="group bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div className="grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {release.category}
                        </span>
                        <span className="text-xs text-foreground/50">{release.date}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                        {release.summary}
                      </p>
                      <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                        <Download className="w-4 h-4" /> Download PDF
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
