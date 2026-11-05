/**
 * LEGAL PAGES — plain-language starting points.
 * Have them reviewed by a qualified professional before relying on them,
 * and update `lastUpdated` whenever you change a page.
 * Tokens {{name}}, {{email}} and {{url}} are replaced from src/config/site.ts.
 */
export interface LegalSection {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export interface LegalPage {
  path: string
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}

const lastUpdated = '4 November 2026'

export const legalPages: LegalPage[] = [
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    lastUpdated,
    intro:
      'This policy explains what personal information {{name}} ("we", "us") collects through {{url}}, why we collect it and how we protect it. We aim to comply with applicable law, including India’s Digital Personal Data Protection Act, 2023.',
    sections: [
      {
        heading: 'Information we collect',
        list: [
          'Information you give us through the contact form or by email: your name, email address, organisation, subject and message.',
          'If you accept analytics cookies: aggregated usage data such as pages visited, approximate location (country/city), device and browser type.',
          'Technical data processed by our hosting provider (GitHub Pages), such as IP addresses in server logs, for security and reliability.',
        ],
      },
      {
        heading: 'How we use information',
        list: [
          'To reply to your enquiry and discuss potential projects, collaborations or applications.',
          'To understand how the website is used and improve it (only with your consent for analytics).',
          'To keep the website secure and prevent spam or abuse.',
        ],
        paragraphs: ['We do not sell personal information, and we do not use your enquiry for marketing without your separate consent.'],
      },
      {
        heading: 'Service providers',
        paragraphs: [
          'Contact form submissions are delivered to our inbox through a form-processing service (Web3Forms). The website is hosted on GitHub Pages. If analytics is enabled and you consent, Google Analytics 4 is used. The Contact page embeds Google Maps. These providers process data on our behalf under their own privacy terms and may process it outside India.',
        ],
      },
      {
        heading: 'Retention',
        paragraphs: ['We keep enquiry correspondence only as long as needed to respond and for reasonable record-keeping, after which it is deleted.'],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You may ask to access, correct or delete the personal information we hold about you, or withdraw consent, by emailing {{email}}. We will respond within a reasonable time.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: ['The website is served only over HTTPS, and we limit third-party scripts. No method of transmission over the internet is completely secure, but we take reasonable measures to protect your information.'],
      },
      {
        heading: 'Contact',
        paragraphs: ['Questions about this policy can be sent to {{email}}.'],
      },
    ],
  },
  {
    path: '/terms',
    title: 'Terms and Conditions',
    lastUpdated,
    intro: 'By using {{url}} you agree to these terms. If you do not agree, please do not use the website.',
    sections: [
      { heading: 'Use of the website', paragraphs: ['You may browse the website for lawful purposes. You must not attempt to disrupt it, gain unauthorised access to it or use it to transmit harmful or unlawful content.'] },
      { heading: 'Intellectual property', paragraphs: ['The UKQAAI name, logo, website design and content belong to {{name}} unless stated otherwise. Product names such as AcadexMatch are our marks. You may not reuse them without written permission.'] },
      { heading: 'No offer or contract', paragraphs: ['Information about services and products is general. Any engagement is governed by a separate written agreement.'] },
      { heading: 'Third-party links', paragraphs: ['Links to other websites are provided for convenience. We are not responsible for their content or practices.'] },
      { heading: 'Limitation of liability', paragraphs: ['The website is provided "as is". To the extent permitted by law, we are not liable for any loss arising from use of, or inability to use, the website.'] },
      { heading: 'Changes and governing law', paragraphs: ['We may update these terms from time to time. These terms are governed by the laws of India.'] },
      { heading: 'Contact', paragraphs: ['Questions about these terms can be sent to {{email}}.'] },
    ],
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy',
    lastUpdated,
    intro: 'This policy explains how {{url}} uses cookies and similar browser storage.',
    sections: [
      { heading: 'Essential storage', paragraphs: ['We store your theme choice (light or dark) and your cookie choice in your browser’s local storage. This stays on your device and is not used to track you.'] },
      { heading: 'Analytics cookies (optional)', paragraphs: ['If analytics is enabled on this website, Google Analytics 4 cookies are set only after you select "Accept" in the cookie banner. They help us understand which pages are useful. If you select "Decline", no analytics scripts are loaded.'] },
      { heading: 'Embedded Google Maps', paragraphs: ['The Contact page shows an embedded Google Map of our location. When the map loads, Google may set its own cookies under Google\u2019s privacy policy. If you prefer, use the address shown in text instead of the map.'] },
      { heading: 'Managing your choice', paragraphs: ['You can change your choice at any time with the "Cookie settings" link in the footer, or by clearing this site’s data in your browser settings.'] },
      { heading: 'Contact', paragraphs: ['Questions about cookies can be sent to {{email}}.'] },
    ],
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer',
    lastUpdated,
    intro: 'The information on {{url}} is provided for general information only.',
    sections: [
      { heading: 'General information', paragraphs: ['While we try to keep information accurate and current, we make no warranties about its completeness, reliability or suitability for any purpose.'] },
      { heading: 'Services in development and research', paragraphs: ['Some services and products described on this website are in development or are research initiatives. They are labelled as such and should not be taken as commercially available until stated otherwise.'] },
      { heading: 'Not professional advice', paragraphs: ['Nothing on this website is medical, legal or financial advice. Research described here is for scientific and informational purposes and is not a clinical diagnostic tool.'] },
      { heading: 'External links', paragraphs: ['We are not responsible for the content of external websites linked from this site.'] },
    ],
  },
  {
    path: '/accessibility',
    title: 'Accessibility Statement',
    lastUpdated,
    intro: '{{name}} wants this website to be usable by everyone. We target conformance with the Web Content Accessibility Guidelines (WCAG) 2.2, level AA.',
    sections: [
      {
        heading: 'What we do',
        list: [
          'Semantic HTML with a logical heading structure and landmarks.',
          'A "Skip to content" link and full keyboard navigation with visible focus indicators.',
          'Colour contrast checked against AA requirements in both light and dark themes.',
          'Text alternatives for meaningful images, and labelled form fields with clear error messages.',
          'Animations are reduced or removed when your device requests reduced motion.',
          'Layouts that adapt to screen sizes and allow zoom up to 400%.',
        ],
      },
      { heading: 'Known limitations', paragraphs: ['We review the site regularly, but some content may not yet fully meet every guideline. If you find a barrier, please tell us.'] },
      { heading: 'Feedback', paragraphs: ['Email {{email}} with the page address and a description of the problem, and we will do our best to fix it or provide the information in another format.'] },
    ],
  },
]

export const getLegalPage = (path: string) => legalPages.find((p) => p.path === path)
