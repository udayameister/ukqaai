import { PageHero } from '@/components/PageHero'
import { ContactForm } from '@/components/ContactForm'
import { Icon } from '@/components/Icon'
import { Section } from '@/components/ui'
import { OfficeMap, mapsLink } from '@/components/OfficeMap'
import { getPageMeta } from '@/data/pages'
import { site } from '@/config/site'

export default function Contact() {
  const m = getPageMeta('/contact')
  const socials = site.social.filter((s) => s.url)
  return (
    <>
      <PageHero crumbs={m.crumbs} eyebrow="Contact us" title={<>Let’s talk about <span className="text-gradient">your next project.</span></>} intro="Whether you have a detailed brief or just an idea, tell us what you are trying to achieve." />
      <Section className="!pt-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <aside className="space-y-5" aria-label="Contact details">
            <div className="card p-6">
              <Icon name="mail" className="h-6 w-6 text-brand" />
              <h2 className="mt-4 text-lg font-semibold">Email</h2>
              <a href={`mailto:${site.contact.email}`} className="mt-1 block break-all text-brand hover:underline">{site.contact.email}</a>
            </div>
            {site.contact.phone && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold">Phone</h2>
                <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="mt-1 block text-brand">{site.contact.phone}</a>
              </div>
            )}
            <div className="card p-6">
              <Icon name="mapPin" className="h-6 w-6 text-brand" />
              <h2 className="mt-4 text-lg font-semibold">Location</h2>
              <address className="mt-1 not-italic text-muted">Melapalayam, Panruti,<br />Tamil Nadu – 607106, India</address>
              <p className="mt-2 text-sm text-muted">{site.contact.serviceArea}</p>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Get directions <Icon name="arrowUpRight" className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            {socials.length > 0 && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold">Follow us</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {socials.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-brand/50">{s.label}</a></li>)}
                </ul>
              </div>
            )}
          </aside>
          <ContactForm />
        </div>
      </Section>
      <Section className="!pt-0" labelledBy="map-title">
        <h2 id="map-title" className="mb-5 text-2xl font-semibold">Find us</h2>
        <OfficeMap />
      </Section>
    </>
  )
}
