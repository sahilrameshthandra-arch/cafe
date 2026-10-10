import { Metadata } from 'next'
import { Container, Section } from '@/components/ui/Layout'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BUSINESS_INFO } from '@/lib/constants'
import { Shield, Mail, Cookie, Database, User, Eye, Lock, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Strelitzia privacy policy - how we collect, use, and protect your personal information.',
  robots: 'noindex',
}

const LAST_UPDATED = 'October 2026'

export default function PrivacyPage() {
  return (
    <>
      <PrivacyHero lastUpdated={LAST_UPDATED} />
      <PrivacyContent lastUpdated={LAST_UPDATED} />
    </>
  )
}

function PrivacyHero({ lastUpdated }: { lastUpdated: string }) {
  return (
    <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center overflow-hidden" aria-labelledby="privacy-hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary-50" aria-hidden="true" />
      <Container className="relative z-10 section-lg">
        <div className="max-w-3xl animate-fade-in">
          <Badge variant="primary" className="mb-6 animate-slide-up">Legal</Badge>
          <h1 id="privacy-hero-heading" className="heading-display text-balance mb-4 animate-slide-up stagger-1">
            Privacy Policy
          </h1>
          <p className="text-body-lg text-text-secondary animate-slide-up stagger-2">
            Your privacy matters to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-body-sm text-text-muted mt-4 animate-slide-up stagger-3">
            Last updated: {lastUpdated}
          </p>
        </div>
      </Container>
    </section>
  )
}

function PrivacyContent({ lastUpdated }: { lastUpdated: string }) {
  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      icon: Shield,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>
            Welcome to Strelitzia (<q>{BUSINESS_INFO.name}</q>, <q>we</q>, <q>us</q>, or <q>our</q>).
            We are committed to protecting your personal information and your right to privacy.
            If you have any questions or concerns about this privacy notice or our practices
            with regard to your personal information, please contact us at
            <a href={`mailto:${BUSINESS_INFO.email}`} className="link">{BUSINESS_INFO.email}</a>.
          </p>
          <p>
            This privacy notice describes how we might use your information if you:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Visit our website at <a href={BUSINESS_INFO.website} className="link" target="_blank" rel="noopener">{BUSINESS_INFO.website}</a></li>
            <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            <li>Visit our physical café at {BUSINESS_INFO.address.full}</li>
          </ul>
          <p>
            Please read this privacy notice carefully as it will help you understand what we do
            with the information that we collect.
          </p>
        </div>
      ),
    },
    {
      id: 'information-collected',
      title: '2. Information We Collect',
      icon: User,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>We collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Fill out our contact form</li>
            <li>Subscribe to our newsletter</li>
            <li>Communicate with us via email, phone, or social media</li>
            <li>Visit our café and use our WiFi</li>
          </ul>
          <p>The personal information we collect may include:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Name and contact information (email, phone number)</li>
            <li>Communication preferences</li>
            <li>Information you choose to share in messages to us</li>
          </ul>
          <p>
            We do not collect sensitive personal information (such as racial or ethnic origin,
            political opinions, religious beliefs, health data, or biometric data) unless
            you voluntarily provide it to us.
          </p>
        </div>
      ),
    },
    {
      id: 'automatic-collection',
      title: '3. Information Automatically Collected',
      icon: Globe,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>
            When you visit our website, we may automatically collect certain information
            about your device and browsing activity. This information may include:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages visited and time spent</li>
            <li>Date and time of access</li>
          </ul>
          <p>
            This information is collected using cookies and similar tracking technologies.
            See our <a href="#cookies" className="link">Cookie Policy</a> below for more details.
          </p>
        </div>
      ),
    },
    {
      id: 'how-we-use',
      title: '4. How We Use Your Information',
      icon: Database,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>To respond to your inquiries and communicate with you</li>
            <li>To send you our newsletter (with your consent)</li>
            <li>To improve our website, products, and services</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and property</li>
            <li>For analytics and understanding how our website is used</li>
          </ul>
          <p>
            We will not use your personal information for purposes other than those
            described in this policy without your consent.
          </p>
        </div>
      ),
    },
    {
      id: 'sharing',
      title: '5. Sharing Your Information',
      icon: Lock,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>We do not sell your personal information to third parties. We may share your information in the following circumstances:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Service Providers:</strong> We may share information with third-party vendors who perform services on our behalf (e.g., website hosting, email marketing, analytics). These providers are contractually obligated to protect your information.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, or legal process.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred.</li>
            <li><strong>With Your Consent:</strong> We may share information for any other purpose with your explicit consent.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'cookies',
      title: '6. Cookies and Tracking Technologies',
      icon: Cookie,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>
            Our website uses cookies and similar tracking technologies to track activity
            and hold certain information. Cookies are files with small amounts of data
            which may include an anonymous unique identifier.
          </p>
          <p>We use the following types of cookies:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Essential Cookies:</strong> Required for the website to function properly. Cannot be switched off.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (e.g., Google Analytics).</li>
            <li><strong>Preference Cookies:</strong> Remember your preferences (e.g., language, region).</li>
          </ul>
          <p>
            You can control cookies through your browser settings. However, disabling
            essential cookies may affect website functionality.
          </p>
        </div>
      ),
    },
    {
      id: 'data-retention',
      title: '7. Data Retention',
      icon: Database,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>
            We retain your personal information only for as long as necessary to fulfill
            the purposes outlined in this privacy notice, unless a longer retention period
            is required or permitted by law.
          </p>
          <p>
            Contact form submissions: retained for 12 months after last correspondence.
            Newsletter subscriptions: retained until you unsubscribe.
            Analytics data: retained for 26 months (Google Analytics default).
          </p>
        </div>
      ),
    },
    {
      id: 'your-rights',
      title: '8. Your Data Protection Rights',
      icon: Shield,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Right of Access:</strong> Request copies of your personal data.</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data.</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data.</li>
            <li><strong>Right to Restrict Processing:</strong> Request limitation of processing.</li>
            <li><strong>Right to Data Portability:</strong> Request transfer of your data.</li>
            <li><strong>Right to Object:</strong> Object to processing of your data.</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at
            <a href={`mailto:${BUSINESS_INFO.email}`} className="link">{BUSINESS_INFO.email}</a>.
            We will respond to your request within 30 days.
          </p>
        </div>
      ),
    },
    {
      id: 'security',
      title: '9. Security',
      icon: Lock,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>
            We implement appropriate technical and organisational security measures to
            protect your personal information against unauthorised access, alteration,
            disclosure, or destruction. However, no method of transmission over the Internet
            or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>
      ),
    },
    {
      id: 'third-party',
      title: '10. Third-Party Links',
      icon: Globe,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>
            Our website may contain links to third-party websites (e.g., Google Maps, Instagram, WhatsApp).
            We are not responsible for the privacy practices or content of these third-party sites.
            We encourage you to review their privacy policies before providing any personal information.
          </p>
        </div>
      ),
    },
    {
      id: 'changes',
      title: '11. Changes to This Policy',
      icon: Eye,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>
            We may update this privacy notice from time to time. The updated version will be
            indicated by an updated <q>Last updated</q> date at the top of this page.
            We encourage you to review this policy periodically for any changes.
          </p>
        </div>
      ),
    },
    {
      id: 'contact',
      title: '12. Contact Us',
      icon: Mail,
      content: (
        <div className="space-y-4 text-body text-text-secondary">
          <p>
            If you have any questions or concerns about this privacy notice or our data practices,
            please contact us:
          </p>
          <address className="not-italic space-y-2">
            <p><strong>{BUSINESS_INFO.name}</strong></p>
            <p>{BUSINESS_INFO.address.street}</p>
            <p>{BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.city} {BUSINESS_INFO.address.postcode}</p>
            <p>{BUSINESS_INFO.address.country}</p>
            <p>Email: <a href={`mailto:${BUSINESS_INFO.email}`} className="link">{BUSINESS_INFO.email}</a></p>
            <p>Phone: <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="link">{BUSINESS_INFO.phone}</a></p>
          </address>
        </div>
      ),
    },
  ]

  return (
    <Section className="section-lg" aria-labelledby="privacy-content-heading">
      <Container>
        <nav className="mb-10 lg:mb-16 animate-fade-in" aria-label="Privacy policy sections">
          <ul className="flex flex-wrap gap-2" role="tablist">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="px-4 py-2 rounded-full text-body-sm font-medium bg-secondary-100 text-text-secondary hover:bg-secondary-200 hover:text-text-primary transition-colors duration-fast"
                  role="tab"
                >
                  {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-12 lg:space-y-16">
          {sections.map((section, index) => (
            <Card
              key={section.id}
              id={section.id}
              variant="borderless"
              className="p-6 lg:p-8 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="pt-0">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary-50 shrink-0">
                    <section.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <h2 className="heading-h3">{section.title}</h2>
                </div>
                {section.content}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-secondary-50 border border-border text-center">
          <p className="text-body text-text-secondary">
            This privacy policy was last updated on {lastUpdated}.
            It applies to all information collected via our website and in our café.
          </p>
        </div>
      </Container>
    </Section>
  )
}