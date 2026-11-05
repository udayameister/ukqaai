import { PageHero } from '@/components/PageHero'
import { CTASection } from '@/components/CTASection'
import { Icon } from '@/components/Icon'
import { IconTile, Section, SectionHeader } from '@/components/ui'
import { CollaborationForm } from '@/components/CollaborationForm'
import { getPageMeta } from '@/data/pages'
import { publications, researchAreas, scholarProfile } from '@/data/research'

export default function Research() {
  const m = getPageMeta('/research')
  return (
    <>
      <PageHero crumbs={m.crumbs} eyebrow="Research & innovation" title={<>Research that <span className="text-gradient">earns its way</span> into products.</>} intro="We investigate methods at the edge of AI — and only carry forward what holds up under rigorous evaluation.">
        <a href="#collaborate" className="bg-brand-gradient mt-8 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white">Propose a research topic <Icon name="arrowRight" className="h-4 w-4" /></a>
      </PageHero>

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
            <p className="mt-4 text-muted">Our research foundation comes from the peer-reviewed work of our Founder & CEO, Udayakumar Palanivelu, on graph neural networks and deep learning for brain connectome analysis.</p>
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
                  {p.doi && <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className="text-sm text-brand hover:underline">DOI: {p.doi}<span className="sr-only"> (opens in a new tab)</span></a>}
                </div>
                <p className="shrink-0 text-sm text-muted">{p.type} · {p.year}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <section id="collaborate" aria-labelledby="collab-title" className="scroll-mt-32 border-t border-line py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow mb-4">Research collaboration</p>
            <h2 id="collab-title" className="text-3xl font-semibold">Propose a new research topic</h2>
            <p className="mt-4 text-muted">We welcome collaboration with universities, hospitals and research groups on AI for neuroimaging, scientific machine learning and research software.</p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="flex gap-3"><Icon name="handshake" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />Joint research, co-authored publications and grant proposals</li>
              <li className="flex gap-3"><Icon name="graduation" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />Student and PhD co-supervision</li>
              <li className="flex gap-3"><Icon name="code" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />Research software, data pipelines and model development</li>
              <li className="flex gap-3"><Icon name="lock" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />Sensitive data is discussed and shared only under a proper agreement</li>
            </ul>
          </div>
          <CollaborationForm />
        </div>
      </section>

      <CTASection />
    </>
  )
}
