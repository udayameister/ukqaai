import { site } from '@/config/site'
import type { PageMeta } from '@/data/pages'
import { services } from '@/data/services'
import { products } from '@/data/products'
import { openJobs } from '@/data/careers'

/** Public URL for a route — trailing slash to match GitHub Pages folder URLs. */
export const absoluteUrl = (path: string) => `${site.url}${path === '/' ? '/' : `${path}/`}`

export const pageTitle = (m: PageMeta) => (m.fullTitle ? m.title : `${m.title} | ${site.name}`)

const organization = {
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  ...(site.incorporated ? { legalName: site.legalName } : {}),
  url: `${site.url}/`,
  logo: `${site.url}/images/logo-512.png`,
  description: site.description,
  email: site.contact.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.contact.addressParts.locality,
    addressRegion: site.contact.addressParts.region,
    postalCode: site.contact.addressParts.postalCode,
    addressCountry: site.contact.addressParts.country,
  },
  areaServed: 'Worldwide',
  sameAs: site.social.map((s) => s.url).filter(Boolean),
  founder: site.leadership.map((l) => ({ '@type': 'Person', name: l.name })),
  owns: products.filter((p) => p.status === 'live').map((p) => ({ '@type': 'WebSite', name: p.name, url: p.url })),
}

export function structuredData(m: PageMeta) {
  const graph: Record<string, unknown>[] = [organization]
  if (m.path === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      publisher: { '@id': `${site.url}/#organization` },
      inLanguage: 'en',
    })
  }
  if (m.crumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...m.crumbs].map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: absoluteUrl(c.path),
      })),
    })
  }
  const svc = services.find((s) => `/services/${s.slug}` === m.path)
  if (svc && svc.status !== 'research') {
    graph.push({
      '@type': 'Service',
      name: svc.title,
      description: svc.seoDescription,
      provider: { '@id': `${site.url}/#organization` },
      areaServed: 'Worldwide',
      url: absoluteUrl(m.path),
    })
  }
  const job = openJobs.find((j) => `/careers/${j.slug}` === m.path)
  if (job) {
    graph.push({
      '@type': 'JobPosting',
      title: job.title,
      description: `<p>${job.about}</p><p>Duration: ${job.duration}. ${job.commitment}.</p><ul>${job.eligibility.map((e) => `<li>${e}</li>`).join('')}</ul>`,
      datePosted: job.datePosted,
      ...(job.applyBy ? { validThrough: job.applyBy } : {}),
      employmentType: job.employmentType,
      hiringOrganization: { '@type': 'Organization', name: site.name, sameAs: `${site.url}/`, logo: `${site.url}/images/logo-512.png` },
      ...(job.remote
        ? { jobLocationType: 'TELECOMMUTE', applicantLocationRequirements: { '@type': 'Country', name: 'India' } }
        : {}),
      directApply: true,
      url: absoluteUrl(m.path),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export interface HeadTag {
  tag: 'meta' | 'link'
  attrs: Record<string, string>
}

export function headTags(m: PageMeta): HeadTag[] {
  const url = absoluteUrl(m.path)
  const title = pageTitle(m)
  const image = `${site.url}${site.ogImage}`
  const tags: HeadTag[] = [
    { tag: 'meta', attrs: { name: 'description', content: m.description } },
    { tag: 'meta', attrs: { name: 'robots', content: m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' } },
    { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: site.name } },
    { tag: 'meta', attrs: { property: 'og:locale', content: site.locale } },
    { tag: 'meta', attrs: { property: 'og:title', content: title } },
    { tag: 'meta', attrs: { property: 'og:description', content: m.description } },
    { tag: 'meta', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: `${site.name} — ${site.slogan}` } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: m.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
  ]
  if (!m.noindex) {
    tags.push({ tag: 'meta', attrs: { property: 'og:url', content: url } })
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: url } })
  }
  return tags
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Serialised <head> fragment used by the prerender step. */
export function renderHead(m: PageMeta): string {
  const tags = headTags(m)
    .map((t) => `<${t.tag} ${Object.entries(t.attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(' ')} data-seo>`)
    .join('\n    ')
  const json = JSON.stringify(structuredData(m)).replace(/</g, '\\u003c')
  return `<title>${esc(pageTitle(m))}</title>\n    ${tags}\n    <script type="application/ld+json" data-seo>${json}</script>`
}
