import { PageHero } from '@/components/PageHero'
import { CTASection } from '@/components/CTASection'
import { ServiceCard } from '@/components/ServiceCard'
import { Badge, Section } from '@/components/ui'
import { getPageMeta } from '@/data/pages'
import { services } from '@/data/services'

export default function Services() {
  const m = getPageMeta('/services')
  return (
    <>
      <PageHero crumbs={m.crumbs} eyebrow="Services" title={<>Solutions across <span className="text-gradient">six technology domains.</span></>} intro="From production AI and software to research engineering and frontier exploration. Every service is clearly labelled by maturity.">
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Badge tone="green">Available now</Badge><span className="text-muted">We take on client projects today.</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          <Badge tone="amber">In development</Badge><span className="text-muted">Early-stage practice, scoped case by case.</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          <Badge tone="violet">Research initiative</Badge><span className="text-muted">Exploration — not yet a commercial service.</span>
        </div>
      </PageHero>
      <Section>
        <h2 className="sr-only">All services</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </Section>
      <CTASection title="Not sure which service fits?" text="Describe your challenge and we will suggest the right approach — even if that means a simpler solution than you expected." />
    </>
  )
}
