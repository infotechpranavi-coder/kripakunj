import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ImageSlider } from '@/components/image-slider'
import { VolunteerApplication } from '@/components/volunteer-application'
import Link from 'next/link'

export default function Volunteer() {
  const volunteerOpportunities = [
    {
      title: 'Education Mentor',
      description:
        'Help underprivileged children with their studies, guidance, and personal development in our open schools. Tutor subjects like Math, English, Science.',
      requirements: ['Basic education qualification', 'Patience and dedication', '2-3 hours per week'],
      area: 'Education',
      commitment: 'Flexible',
      impact: 'Direct impact on child\'s academic future',
    },
    {
      title: 'Health Awareness Ambassador',
      description:
        'Conduct awareness sessions on menstrual health, hygiene, and other health-related topics in communities. Project Lajja focus.',
      requirements: ['Public speaking skills', 'Health knowledge (training provided)', 'Commitment to awareness'],
      area: 'Health',
      commitment: 'Monthly',
      impact: 'Reach 50+ individuals per session',
    },
    {
      title: 'Environmental Advocate',
      description:
        'Organize and participate in beach cleanup drives, tree plantation, and waste management initiatives. Lead Project Kinaara efforts.',
      requirements: [
        'Environmental awareness',
        'Physical fitness',
        'Leadership qualities',
      ],
      area: 'Environment',
      commitment: 'Monthly',
      impact: 'Protect marine ecosystems',
    },
    {
      title: 'Skill Trainer - Sewing & Tailoring',
      description:
        'Teach vocational skills like sewing, tailoring, or handicrafts to women. Create economic empowerment opportunities.',
      requirements: [
        'Expertise in specific skill',
        'Teaching ability',
        'Patience and empathy',
      ],
      area: 'Empowerment',
      commitment: '4-5 hours/week',
      impact: 'Enable financial independence',
    },
    {
      title: 'Event Coordinator',
      description:
        'Help organize and manage community events, blood donation camps, and awareness programs. Work with diverse communities.',
      requirements: [
        'Organizational skills',
        'Problem-solving ability',
        'Team player mindset',
      ],
      area: 'Events',
      commitment: '6-8 hours/event',
      impact: 'Reach 200-500 people per event',
    },
    {
      title: 'Digital & Social Media Volunteer',
      description:
        'Help us reach more people by managing social media, creating content, designing graphics, and digital marketing campaigns.',
      requirements: ['Digital literacy', 'Creative thinking', 'Social media knowledge'],
      area: 'Communication',
      commitment: '5-6 hours/week',
      impact: 'Reach millions online',
    },
    {
      title: 'Food Distribution Coordinator',
      description:
        'Organize and lead food distribution drives for Kill Hunger initiative. Direct community engagement and meal support.',
      requirements: ['Organization skills', 'Compassion', 'Physical ability to manage food items'],
      area: 'Food Security',
      commitment: '4-6 hours/month',
      impact: 'Feed 200+ families monthly',
    },
    {
      title: 'Blood Donation Camp Manager',
      description:
        'Organize blood donation camps, recruit donors, and manage camp logistics. Save lives through blood donation.',
      requirements: ['Leadership skills', 'Medical awareness basics', 'Donor communication ability'],
      area: 'Health',
      commitment: '6-8 hours/event',
      impact: 'Collect 100+ units per camp',
    },
    {
      title: 'Content Writer & Copywriter',
      description:
        'Write compelling content about our programs, stories, blogs, and impact reports. Tell the stories of change.',
      requirements: ['Strong writing skills', 'Storytelling ability', 'Research capability'],
      area: 'Communication',
      commitment: '3-4 hours/week',
      impact: 'Inspire and inform 10K+ readers',
    },
    {
      title: 'Finance & Fundraising Assistant',
      description:
        'Help with fundraising campaigns, financial tracking, and grant writing. Support sustainable operations.',
      requirements: ['Basic financial knowledge', 'Attention to detail', 'Computer proficiency'],
      area: 'Administration',
      commitment: '4-5 hours/week',
      impact: 'Generate funds for programs',
    },
  ]

  const volunteerStats = [
    { number: '1100+', label: 'Active Volunteers' },
    { number: '9', label: 'Cities Covered' },
    { number: '5000+', label: 'Hours Contributed Monthly' },
    { number: '100K+', label: 'People Impacted' },
  ]

  const stepsToVolunteer = [
    {
      step: 1,
      title: 'Submit Your Profile',
      description: 'Fill out our volunteer application form with your details and interests.',
    },
    {
      step: 2,
      title: 'Initial Interview',
      description:
        'Have a conversation with our team to understand your skills and volunteer goals.',
    },
    {
      step: 3,
      title: 'Training & Orientation',
      description:
        'Receive orientation and necessary training for your chosen volunteer role.',
    },
    {
      step: 4,
      title: 'Start Making Impact',
      description:
        'Join our community and start making a real difference in people\'s lives!',
    },
  ]

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/10 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Become a <span className="text-primary">Volunteer</span>
              </h1>
              <p className="text-lg text-foreground/70">
                Join our community of 1100+ volunteers making a real difference. Whether you have 2 hours or 20 hours to spare, your contribution matters.
              </p>
            </div>
            <div>
              <ImageSlider
                images={[
                  {
                    src: '/slider-education.jpg',
                    alt: 'Volunteer in education',
                    caption: 'Make a Difference',
                  },
                  {
                    src: '/slider-community.jpg',
                    alt: 'Community volunteers',
                    caption: 'Join Us Today',
                  },
                  {
                    src: '/slider-environment.jpg',
                    alt: 'Environmental volunteering',
                    caption: 'Be the Change',
                  },
                ]}
                autoPlay={true}
                interval={4000}
                height="h-72 md:h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Stats */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {volunteerStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="bg-muted py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            Why <span className="text-primary">Volunteer With Us?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💝',
                title: 'Make a Real Impact',
                desc: 'See the tangible difference you create in communities and people\'s lives.',
              },
              {
                icon: '🤝',
                title: 'Be Part of a Community',
                desc: 'Join a passionate community of changemakers working towards sustainable development.',
              },
              {
                icon: '📚',
                title: 'Learn & Grow',
                desc: 'Develop new skills, gain experience, and grow as a person through volunteering.',
              },
              {
                icon: '🎯',
                title: 'Flexible Schedule',
                desc: 'Contribute as much as you can with flexible volunteering options that suit your lifestyle.',
              },
              {
                icon: '🏆',
                title: 'Recognition',
                desc: 'Get recognized for your contributions and receive volunteer certificates.',
              },
              {
                icon: '🌟',
                title: 'Build Networks',
                desc: 'Connect with like-minded individuals and build meaningful relationships.',
              },
            ].map((reason, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                <p className="text-foreground/70">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Volunteer <span className="text-primary">Opportunities</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-muted rounded-lg p-8 hover:shadow-md transition border border-border">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground flex-1">{opportunity.title}</h3>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold whitespace-nowrap ml-3">
                    {opportunity.area}
                  </span>
                </div>
                <p className="text-foreground/70 mb-6 text-sm">{opportunity.description}</p>
                
                <div className="bg-white rounded-lg p-4 mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Commitment:</span>
                    <span className="text-sm text-accent font-medium">{opportunity.commitment}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold text-lg">⭐</span>
                    <span className="text-sm text-primary font-medium">{opportunity.impact}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-sm">What We're Looking For:</h4>
                  <ul className="space-y-2">
                    {opportunity.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-foreground/70 text-sm">
                        <span className="text-primary">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps to Volunteer */}
      <section className="bg-muted py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            How to <span className="text-primary">Get Started?</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {stepsToVolunteer.map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-lg p-6 text-center h-full flex flex-col justify-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-foreground/70 text-sm">{item.description}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <span className="text-3xl text-primary">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative text-primary-foreground py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://tse2.mm.bing.net/th/id/OIP.HLET8n_kti1aFWOfUPDqQwHaEU?rs=1&pid=ImgDetMain&o=7&rm=3')`,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg opacity-90 mb-8 leading-relaxed">
            Every moment counts. Join thousands of volunteers who are already making a positive impact in communities. Apply now and start your volunteering journey!
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition"
          >
            Apply Now
          </Link>
        </div>
      </section>

      <VolunteerApplication />
      <Footer />
    </>
  )
}
