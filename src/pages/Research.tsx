import { PageHero } from '@/components/PageHero'
import { CTASection } from '@/components/CTASection'
import { Icon } from '@/components/Icon'
import { ButtonLink, IconTile, Section, SectionHeader } from '@/components/ui'
import { getPageMeta } from '@/data/pages'
import { publications, researchAreas, scholarProfile } from '@/data/research'

export default function Research() {
  const m = getPageMeta('/research')
  return (
    <>
      <PageHero crumbs={m.crumbs} eyebrow="Research & innovation" title={<>Research that <span className="text-gradient">earns its way</span> into products.</>} intro="We investigate methods at the edge of AI — and only carry forward what holds up under rigorous evaluation." />

      <Section labelledBy="areas-title">
        <SectionHeader id="areas-title" eyebrow="Focus areas" title="What we work on" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((a) => (
            <div key={a.title} className="card reveal p-6">
              <IconTile name={a.icon} />
              <h3 className="mt-5 text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-muted">{a.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="pubs-title" className="border-y border-line bg-surface/50">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="reveal">
            <p className="eyebrow mb-4">Peer-reviewed work</p>
            <h2 id="pubs-title" className="text-3xl font-semibold">Founder publications</h2>
            <p className="mt-4 text-muted">Our research foundation comes from our founder’s peer-reviewed work on graph neural networks and deep learning for brain connectome analysis. Full citations are available on Google Scholar.</p>
            <a href={scholarProfile} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand">
              View Google Scholar profile <Icon name="arrowUpRight" className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
            {publications.map((p) => (
              <li key={p.title} className="reveal flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <p className="font-display font-semibold text-fg">{p.title}</p>
                  <p className="text-sm text-muted">{p.venue}</p>
                </div>
                <p className="shrink-0 text-sm text-muted">{p.type} · {p.year}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="collab-title">
        <div className="card reveal grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 id="collab-title" className="text-2xl font-semibold sm:text-3xl">Research collaboration</h2>
            <p className="mt-3 text-muted">We welcome collaboration with universities, hospitals and research groups on AI for neuroimaging, scientific machine learning and research software.</p>
          </div>
          <div className="flex lg:justify-end">
            <ButtonLink to="/contact?subject=Research%20collaboration">Propose a collaboration</ButtonLink>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
