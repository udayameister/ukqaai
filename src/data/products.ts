import type { IconName } from '@/components/Icon'

/**
 * PRODUCT CARDS — add a new object to this array to add a product.
 * status: 'live' | 'beta' | 'coming-soon'
 */
export type ProductStatus = 'live' | 'beta' | 'coming-soon'

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  ctaLabel: string
  status: ProductStatus
  icon: IconName
  features: { title: string; description: string; icon: IconName }[]
  audience: string[]
}

export const productStatusLabels: Record<ProductStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  'coming-soon': 'Launching soon',
}

export const products: Product[] = [
  {
    id: 'acadexmatch',
    name: 'AcadexMatch',
    tagline: 'AI-Powered Academic Career and Recruitment Platform',
    description:
      'AcadexMatch connects faculty, researchers and academic job seekers with colleges and universities. It brings academic openings into one place and uses AI to help candidates and institutions find the right fit.',
    url: 'https://www.acadexmatch.com',
    ctaLabel: 'Visit AcadexMatch',
    status: 'live',
    icon: 'graduation',
    features: [
      { title: 'Academic job discovery', description: 'Faculty and academic openings gathered in one searchable place.', icon: 'search' },
      { title: 'AI-based candidate matching', description: 'Matches profiles to roles using qualifications, subjects and experience.', icon: 'sparkles' },
      { title: 'Resume optimisation', description: 'Guidance to present academic CVs clearly for each application.', icon: 'file' },
      { title: 'Faculty career opportunities', description: 'Openings across disciplines and levels, from assistant professor upward.', icon: 'briefcase' },
      { title: 'Institutional recruitment', description: 'Tools for institutions and recruiters to post roles and reach candidates.', icon: 'building' },
      { title: 'Research opportunities', description: 'Research positions and fellowships alongside teaching roles.', icon: 'microscope' },
    ],
    audience: ['Faculty & job seekers', 'Researchers', 'Colleges & universities', 'Recruiters'],
  },
  {
    id: 'theschoolteacher',
    name: 'TheSchoolTeacher',
    tagline: 'School Teacher Recruitment and Career Platform',
    description:
      'TheSchoolTeacher is a recruitment and career platform for school teachers and the schools that hire them. It is currently in development.',
    url: 'https://www.theschoolteacher.com',
    ctaLabel: 'Visit TheSchoolTeacher',
    status: 'coming-soon',
    icon: 'school',
    features: [
      { title: 'Teaching job discovery', description: 'School teaching openings in one place.', icon: 'search' },
      { title: 'Teacher profiles', description: 'Profiles that highlight subjects, grades and experience.', icon: 'users' },
      { title: 'School recruitment', description: 'A simple way for schools to reach qualified teachers.', icon: 'building' },
    ],
    audience: ['School teachers', 'Schools', 'Education recruiters'],
  },
]
