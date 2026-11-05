/**
 * ============================================================
 *  SITE SETTINGS — edit this one file for company-wide details.
 * ============================================================
 * Anything left as an empty string / empty array is simply not shown
 * on the website (e.g. phone, address, social links).
 */

export const site = {
  /** Brand name used across the site. */
  name: 'UKQAAI Technologies',
  shortName: 'UKQAAI',

  /**
   * Set to true ONLY after incorporation is confirmed. While false, the site
   * never shows the "Private Limited" suffix publicly.
   */
  incorporated: false,
  legalName: 'UKQAAI Technologies Private Limited',

  tagline: 'Quantum and AI solution for everything',
  slogan: 'Engineering Intelligence. Empowering Innovation.',
  description:
    'UKQAAI Technologies builds intelligent, scalable and research-driven digital solutions across artificial intelligence, software engineering, education technology and scientific computing.',

  /** Canonical origin — always the www version, no trailing slash. */
  url: 'https://www.ukqaai.com',
  locale: 'en_IN',

  contact: {
    /** Public contact address. Change here and it updates everywhere. */
    email: 'info@ukqaai.com',
    /** Optional — leave empty to hide. */
    phone: '',
    /** Office address shown on the Contact page, footer and in search-engine data. */
    address: 'Melapalayam, Panruti, Tamil Nadu 607106, India',
    addressParts: { locality: 'Melapalayam, Panruti', region: 'Tamil Nadu', postalCode: '607106', country: 'IN' },
    /** Google Maps search used for the embedded map and the "Open in Google Maps" link. */
    mapQuery: 'Melapalayam, Panruti, Tamil Nadu 607106',
    /** Short, confirmed location line. */
    region: 'India',
    serviceArea: 'Clients in India and internationally',
  },

  /** Social profiles — add full URLs; empty entries are hidden. */
  social: [
    { label: 'LinkedIn', url: '' },
    { label: 'GitHub', url: '' },
    { label: 'X (Twitter)', url: '' },
    { label: 'YouTube', url: '' },
  ],

  /** Shown on the About page. Keep details limited to what you want public. */
  leadership: [
    {
      name: 'Udayakumar Palanivelu',
      role: 'Founder & CEO',
      /** Photo in public/images/team/ — a .webp with the same name is used where supported. */
      photo: '/images/team/udayakumar-palanivelu.jpg',
      bio: 'AI researcher and computer science educator with more than 16 years of academic experience in India and abroad. His PhD research at Vellore Institute of Technology, "Human brain connectome mapping using deep learning", produced graph neural network models for Alzheimer’s disease and schizophrenia classification published in IEEE Access, Results in Engineering and the Journal of X-Ray Science and Technology. He leads UKQAAI’s work in AI, healthcare data science and generative AI, and founded the AcadexMatch academic recruitment platform.',
      focus: ['Neuroimaging & brain connectomics', 'Healthcare data science', 'Graph neural networks', 'Generative AI', 'Multimodal medical imaging'],
      highlights: [
        'Raman Research Award, VIT (2024, 2025, 2026)',
        'Dr. APJ Abdul Kalam Award, VIT (2024)',
        'Oracle Cloud Infrastructure Generative AI Certified Professional',
        'NPTEL (IIT Ropar): Deep Learning; Introduction to Machine Learning',
      ],
      links: [
        { label: 'Portfolio', url: 'https://udayakumar.vercel.app/' },
        { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=cV5MPAQAAAAJ' },
        { label: 'ORCID', url: 'https://orcid.org/0000-0002-6270-9336' },
      ],
    },
  ],

  /** Integrations (values come from environment variables at build time). */
  integrations: {
    // Web3Forms access keys are public by design (they can only email info@ukqaai.com).
    web3formsKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '04461f73-4d5a-496e-af60-ff49c50b8c9a',
    gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID ?? '',
  },

  ogImage: '/images/og-image.png',
  themeColor: '#050a1c',
}

/** Name to display publicly — respects the incorporation flag. */
export const displayLegalName = site.incorporated ? site.legalName : site.name
