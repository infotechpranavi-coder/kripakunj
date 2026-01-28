import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { ShieldCheck, Download } from 'lucide-react'

export default function Compliance() {
  const complianceItems = [
    {
      title: 'Registration Certificate',
      ref: 'Reg No: E-XXXX/Mumbai',
      desc: 'Official registration as a Charitable Trust under the Bombay Public Trusts Act.',
    },
    {
      title: '12A Registration',
      ref: 'Income Tax Act, 1961',
      desc: 'Registration for income tax exemption for the trust.',
    },
    {
      title: '80G Certificate',
      ref: 'Tax Benefits for Donors',
      desc: 'Enabling donors to claim tax deductions on their contributions to Kripa Kunj.',
    },
    {
      title: 'NITI Aayog (NGO Darpan)',
      ref: 'Unique ID: MH/20XX/XXXXXXX',
      desc: 'Recognition and registration on the government of India\'s NGO portal.',
    },
    {
      title: 'FCRA Registration',
      ref: 'Foreign Contribution Regulation',
      desc: 'Compliance for receiving international donations for social development.',
    },
    {
      title: 'Annual Audited Statements',
      ref: 'FY 2024-25',
      desc: 'Complete financial transparency through certified annual audits.',
    },
  ]

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceItems.map((item, index) => (
                <AnimatedSection key={index} direction="up" delay={index * 100}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group h-full flex flex-col">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-primary font-bold text-xs uppercase tracking-wider mb-4">
                      {item.ref}
                    </p>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-6 grow">
                      {item.desc}
                    </p>
                    <button className="flex items-center gap-2 text-foreground/50 font-bold text-xs hover:text-primary transition-colors mt-auto">
                      <Download className="w-4 h-4" /> View Certificate
                    </button>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            
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
