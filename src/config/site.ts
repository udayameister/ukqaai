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
    /** Only fill in once a registered office address is confirmed. */
    address: '',
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
      name: 'Udayakumar P.',
      role: 'Founder',
      bio: 'Computer scientist and educator with more than 15 years of teaching experience. His doctoral research focuses on deep learning and graph neural networks for multimodal brain connectome analysis, and he is the founder of the AcadexMatch academic recruitment platform.',
      focus: ['Graph neural networks', 'Medical imaging & connectomics', 'AI for education'],
      profileUrl: 'https://scholar.google.com/citations?user=cV5MPAQAAAAJ',
      profileLabel: 'Google Scholar profile',
    },
  ],

  /** Integrations (values come from environment variables at build time). */
  integrations: {
    web3formsKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '',
    gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID ?? '',
  },

  ogImage: '/images/og-image.png',
  themeColor: '#050a1c',
}

/** Name to display publicly — respects the incorporation flag. */
export const displayLegalName = site.incorporated ? site.legalName : site.name
