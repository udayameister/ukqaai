import { PageHero } from '@/components/PageHero'
import { CTASection } from '@/components/CTASection'
import { IconTile, Section } from '@/components/ui'
import { getPageMeta } from '@/data/pages'
import { industries } from '@/data/industries'

export default function Industries() {
  const m = getPageMeta('/industries')
  return (
    <>
      <PageHero crumbs={m.crumbs} eyebrow="Industries" title={<>Technology shaped by <span className="text-gradient">sector knowledge.</span></>} intro="We focus on sectors where our research and experience give us real insight." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((i) => (
            <section key={i.id} id={i.id} aria-labelledby={`${i.id}-t`} className="card reveal scroll-mt-28 p-7 sm:p-8">
              <IconTile name={i.icon} />
              <h2 id={`${i.id}-t`} className="mt-5 text-2xl font-semibold">{i.title}</h2>
              <p className="mt-3 text-muted">{i.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {i.examples.map((e) => <li key={e} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm">{e}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  )
}
