import { services } from './services'
import { openJobs } from './careers'

/**
 * SEO METADATA FOR EVERY PAGE.
 * `path` has no trailing slash (except home). Titles get " | UKQAAI Technologies" appended
 * automatically unless `fullTitle` is set. Keep descriptions 120–160 characters.
 */
export interface PageMeta {
  path: string
  title: string
  description: string
  fullTitle?: boolean
  /** Breadcrumb trail (excluding Home), used for BreadcrumbList schema. */
  crumbs?: { name: string; path: string }[]
  noindex?: boolean
  changefreq?: 'weekly' | 'monthly' | 'yearly'
  priority?: number
}

const servicePages: PageMeta[] = services.map((s) => ({
  path: `/services/${s.slug}`,
  title: s.seoTitle,
  description: s.seoDescription,
  crumbs: [
    { name: 'Services', path: '/services' },
    { name: s.shortTitle, path: `/services/${s.slug}` },
  ],
  priority: 0.8,
}))

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'UKQAAI Technologies — AI, Software Engineering & Research Innovation',
    fullTitle: true,
    description:
      'UKQAAI Technologies is an AI development company delivering machine learning, software engineering, EdTech and research-driven technology solutions.',
    changefreq: 'weekly',
    priority: 1,
  },
  {
    path: '/about',
    title: 'About Us',
    description:
      'Learn about UKQAAI Technologies — our vision, mission, research-driven approach, founder and commitment to responsible, ethical AI.',
    crumbs: [{ name: 'About', path: '/about' }],
    priority: 0.8,
  },
  {
    path: '/services',
    title: 'Services — AI, EdTech, Research, Software, IoT & Quantum',
    description:
      'Explore UKQAAI services: AI and machine learning, education technology, research computing, software development, IoT and quantum research.',
    crumbs: [{ name: 'Services', path: '/services' }],
    priority: 0.9,
  },
  ...servicePages,
  {
    path: '/products',
    title: 'Products & Platforms — AcadexMatch and More',
    description:
      'Products and platforms by UKQAAI Technologies, including AcadexMatch, the AI-powered academic career and recruitment platform.',
    crumbs: [{ name: 'Products', path: '/products' }],
    priority: 0.9,
  },
  {
    path: '/research',
    title: 'Research & Innovation',
    description:
      'Research at UKQAAI: deep learning, medical imaging, brain connectomics, scientific machine learning and physics-informed neural networks.',
    crumbs: [{ name: 'Research', path: '/research' }],
    priority: 0.7,
  },
  {
    path: '/industries',
    title: 'Industries We Serve',
    description:
      'AI and software solutions for education, healthcare research, IT, manufacturing, startups, enterprises and research organisations.',
    crumbs: [{ name: 'Industries', path: '/industries' }],
    priority: 0.7,
  },
  {
    path: '/careers',
    title: 'Careers, Internships & Research Collaboration',
    description:
      'Join UKQAAI Technologies. Learn about careers, internships and research collaboration opportunities, and send us your CV.',
    crumbs: [{ name: 'Careers', path: '/careers' }],
    priority: 0.6,
  },
  ...openJobs.map((j) => ({
    path: `/careers/${j.slug}`,
    title: `${j.title} — Apply Online`,
    description: j.seoDescription,
    crumbs: [{ name: 'Careers', path: '/careers' }, { name: 'Internship', path: `/careers/${j.slug}` }],
    changefreq: 'weekly' as const,
    priority: 0.7,
  })),
  {
    path: '/contact',
    title: 'Contact Us',
    description:
      'Contact UKQAAI Technologies to discuss an AI, software, EdTech or research project. We would be glad to hear about your goals.',
    crumbs: [{ name: 'Contact', path: '/contact' }],
    priority: 0.8,
  },
  { path: '/privacy-policy', title: 'Privacy Policy', description: 'How UKQAAI Technologies collects, uses and protects personal information submitted through this website.', crumbs: [{ name: 'Privacy policy', path: '/privacy-policy' }], changefreq: 'yearly', priority: 0.3 },
  { path: '/terms', title: 'Terms and Conditions', description: 'Terms and conditions governing the use of the UKQAAI Technologies website.', crumbs: [{ name: 'Terms and conditions', path: '/terms' }], changefreq: 'yearly', priority: 0.3 },
  { path: '/cookie-policy', title: 'Cookie Policy', description: 'How the UKQAAI Technologies website uses cookies and local storage, and how you can control them.', crumbs: [{ name: 'Cookie policy', path: '/cookie-policy' }], changefreq: 'yearly', priority: 0.3 },
  { path: '/disclaimer', title: 'Disclaimer', description: 'Disclaimer for information published on the UKQAAI Technologies website.', crumbs: [{ name: 'Disclaimer', path: '/disclaimer' }], changefreq: 'yearly', priority: 0.3 },
  { path: '/accessibility', title: 'Accessibility Statement', description: 'Our commitment to making the UKQAAI Technologies website accessible, targeting WCAG 2.2 AA.', crumbs: [{ name: 'Accessibility', path: '/accessibility' }], changefreq: 'yearly', priority: 0.3 },
]

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
  noindex: true,
}

const normalise = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p)
export const getPageMeta = (pathname: string): PageMeta =>
  pages.find((p) => p.path === normalise(pathname)) ?? notFoundMeta
