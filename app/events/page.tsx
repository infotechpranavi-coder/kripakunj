import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HeroSlider } from '@/components/hero-slider'
import Link from 'next/link'

export default function Events() {
  const heroSlides = [
    {
      src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80',
      alt: 'Community events and gatherings',
      title: 'Our Events',
      subtitle: 'Join Us in Making a Difference',
      description: 'Be part of our community-driven events and help us create positive change in society. From educational workshops to environmental initiatives, every event is an opportunity to make an impact.',
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
      alt: 'Volunteers working together',
      title: 'Community Impact',
      subtitle: 'Monthly Events & Initiatives',
      description: 'Join hundreds of volunteers in our monthly events including beach cleanups, health camps, education drives, and community development programs across 9 cities.',
    },
    {
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80',
      alt: 'Environmental and social events',
      title: 'Make an Impact',
      subtitle: 'Events That Change Lives',
      description: 'Participate in events that create lasting change - from tree plantation drives to women empowerment workshops, blood donation camps to food distribution initiatives.',
    },
  ]
  const upcomingEvents = [
    {
      id: 1,
      title: 'Menstrual Health Awareness Drive',
      date: 'Feb 15, 2025',
      location: 'Mumbai, Maharashtra',
      description:
        'Join us for an informative session on menstrual health and breaking social taboos around menstruation. Interactive sessions with health experts.',
      category: 'Health',
      time: '10:00 AM - 2:00 PM',
      interested: '250+',
    },
    {
      id: 2,
      title: 'Open School Inauguration',
      date: 'Feb 20, 2025',
      location: 'Mira Road, Mumbai',
      description:
        'Celebrate the opening of our new open school with free education for 200+ underprivileged children. Meet students, volunteers, and educators.',
      category: 'Education',
      time: '9:00 AM - 12:00 PM',
      interested: '300+',
    },
    {
      id: 3,
      title: 'Beach Cleaning Drive - Kinaara',
      date: 'Feb 28, 2025',
      location: 'Juhu Beach, Mumbai',
      description:
        'Participate in our monthly beach cleaning initiative to protect our marine ecosystem. Bring gloves and enthusiasm!',
      category: 'Environment',
      time: '6:00 AM - 10:00 AM',
      interested: '150+',
    },
    {
      id: 4,
      title: 'Blood Donation Camp',
      date: 'Mar 5, 2025',
      location: 'Crystal Plaza, Mumbai',
      description:
        'Save lives! Donate blood and help us reach our target of 500 units this month. Medical professionals on-site, refreshments provided.',
      category: 'Health',
      time: '9:00 AM - 5:00 PM',
      interested: '400+',
    },
    {
      id: 5,
      title: 'Women Empowerment Workshop - Sewing Skills',
      date: 'Mar 10, 2025',
      location: 'Mumbai, Maharashtra',
      description:
        'Learn sewing skills and explore employment opportunities in our empowerment program. Free materials provided. Certificate upon completion.',
      category: 'Empowerment',
      time: '10:00 AM - 4:00 PM',
      interested: '100+',
    },
    {
      id: 6,
      title: 'Waste Management & Recycling Workshop (Project Shoonya)',
      date: 'Mar 15, 2025',
      location: 'Multiple Locations',
      description:
        'Educational sessions on proper waste disposal and recycling practices. Learn how to segregate waste and create a sustainable lifestyle.',
      category: 'Environment',
      time: '2:00 PM - 5:00 PM',
      interested: '180+',
    },
    {
      id: 7,
      title: 'Food Distribution Drive - Kill Hunger',
      date: 'Mar 20, 2025',
      location: 'Slum Areas, Mumbai',
      description:
        'Help us distribute food packages and nutrition support to underprivileged families. Direct community impact and personal fulfillment.',
      category: 'Food Security',
      time: '8:00 AM - 12:00 PM',
      interested: '200+',
    },
    {
      id: 8,
      title: 'Tree Plantation Campaign',
      date: 'Mar 25, 2025',
      location: 'Central Park, Mumbai',
      description:
        'Plant 1000+ trees with us to combat climate change. Saplings provided. Certificates and refreshments for all participants.',
      category: 'Environment',
      time: '6:00 AM - 10:00 AM',
      interested: '350+',
    },
    {
      id: 9,
      title: 'Children\'s Nutrition & Health Checkup Camp',
      date: 'Apr 2, 2025',
      location: 'Community Center, Mumbai',
      description:
        'Free health checkups, nutrition assessment, and health awareness for children. Parents consultation included. No registration required.',
      category: 'Health',
      time: '9:00 AM - 4:00 PM',
      interested: '320+',
    },
    {
      id: 10,
      title: 'Leadership Training for Young Volunteers',
      date: 'Apr 10, 2025',
      location: 'Head Office, Mira Road',
      description:
        'Develop leadership and organizational skills. Learn about community development and social impact. Limited seats - Early registration recommended.',
      category: 'Training',
      time: '10:00 AM - 5:00 PM',
      interested: '80+',
    },
  ]

  const pastEvents = [
    {
      title: 'Annual Charity Drive 2024',
      date: 'Dec 1, 2024',
      raised: '₹15 Lakhs',
      participants: '500+',
      impact: 'Funded 3 new classrooms',
    },
    {
      title: 'Children\'s Day Celebration',
      date: 'Nov 14, 2024',
      raised: 'Gifts & Education Supplies',
      participants: '300+',
      impact: 'Distributed to 500+ children',
    },
    {
      title: 'Tree Plantation Campaign',
      date: 'Oct 20, 2024',
      raised: '5,000 Trees Planted',
      participants: '200+',
      impact: 'Carbon offset equivalent to 5 homes',
    },
    {
      title: 'Health Checkup Camp',
      date: 'Sep 15, 2024',
      raised: 'Free Medical Checkups',
      participants: '400+',
      impact: 'Identified & treated 50+ cases',
    },
    {
      title: 'Beach Cleaning Drive - Summer 2024',
      date: 'Jun 15, 2024',
      raised: '2 Tons Waste Collected',
      participants: '150+',
      impact: 'Marine life protection',
    },
    {
      title: 'Women Empowerment Bazaar',
      date: 'May 20, 2024',
      raised: '₹5 Lakhs Sales',
      participants: '80+ Women',
      impact: 'Generated monthly income',
    },
    {
      title: 'Blood Donation Marathon',
      date: 'Apr 5, 2024',
      raised: '300 Units Collected',
      participants: '450+',
      impact: 'Saved ~900 lives',
    },
    {
      title: 'School Supply Drive',
      date: 'Jan 30, 2024',
      raised: 'Books & Stationery',
      participants: '250+',
      impact: 'Enabled 400+ children to attend school',
    },
  ]

  return (
    <>
      <Navigation />

      {/* Hero Section with Slider */}
      <section className="relative">
        <HeroSlider slides={heroSlides} autoPlay={true} interval={5000} />
      </section>

      {/* Upcoming Events */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-muted rounded-lg p-8 hover:shadow-lg transition border-l-4 border-primary overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground flex-1">{event.title}</h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold whitespace-nowrap ml-2">
                    {event.category}
                  </span>
                </div>
                <div className="space-y-3 mb-6 text-foreground/70">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold">📅</span>
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold">🕐</span>
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold">📍</span>
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-semibold">👥</span>
                    <span className="text-sm">{event.interested} Interested</span>
                  </div>
                </div>
                <p className="text-foreground/70 mb-6 text-sm leading-relaxed">{event.description}</p>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition text-sm"
                >
                  Register Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="bg-muted py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Past <span className="text-primary">Events & Impact</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold text-foreground mb-4">{event.title}</h3>
                <div className="space-y-3 text-foreground/70">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-semibold">📅</span>
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-semibold">👥</span>
                    <span className="text-sm">{event.participants} Participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-semibold">🎯</span>
                    <span className="text-sm">{event.raised}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-semibold">✨</span>
                      <span className="text-sm font-medium text-primary">{event.impact}</span>
                    </div>
                  </div>
                </div>
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
            backgroundImage: `url('/slider-community.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Participate?</h2>
          <p className="text-lg opacity-90 mb-8 leading-relaxed">
            Every event is an opportunity to make a difference. Sign up for any event above or get in touch to volunteer!
          </p>
          <Link
            href="/volunteer"
            className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition"
          >
            Join as Volunteer
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
