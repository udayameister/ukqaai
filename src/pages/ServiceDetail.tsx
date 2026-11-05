import { Link, useParams } from 'react-router-dom'
import { PageHero } from '@/components/PageHero'
import { CTASection } from '@/components/CTASection'
import { StatusBadge } from '@/components/ServiceCard'
import { Icon } from '@/components/Icon'
import { CheckList, Section, SectionHeader } from '@/components/ui'
import { getService, services } from '@/data/services'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug = '' } = useParams()
  const s = getService(slug)
  if (!s) return <NotFound />
  const crumbs = [{ name: 'Services', path: '/services' }, { name: s.shortTitle, path: `/services/${s.slug}` }]
  const others = services.filter((o) => o.slug !== s.slug)

  return (
    <>
      <PageHero crumbs={crumbs} title={s.title} intro={s.intro}>
        <div className="mt-6 flex items-center gap-3"><StatusBadge status={s.status} /></div>
      </PageHero>

      <Section labelledBy="problems-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="reveal">
            <p className="eyebrow mb-4">Problems we address</p>
            <h2 id="problems-title" className="text-3xl font-semibold">Challenges we help solve.</h2>
          </div>
          <div className="card reveal p-7"><CheckList items={s.problems} /></div>
        </div>
      </Section>

      <Section labelledBy="offer-title" className="border-y border-line bg-surface/50">
        <SectionHeader id="offer-title" eyebrow="Services offered" title={s.status === 'research' ? 'What this initiative covers' : 'What we offer'} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.offerings.map((o) => (
            <div key={o.title} className="card reveal p-6">
              <Icon name={s.icon} className="h-5 w-5 text-brand" />
              <h3 className="mt-4 text-lg font-semibold">{o.title}</h3>
              <p className="mt-2 text-sm text-muted">{o.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="stack-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow mb-4">Technology stack</p>
            <h2 id="stack-title" className="text-2xl font-semibold">Tools we use</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.stack.map((t) => <li key={t} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm">{t}</li>)}
            </ul>
          </div>
          <div className="reveal">
            <p className="eyebrow mb-4">Industry applications</p>
            <h2 className="text-2xl font-semibold">Where it applies</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.industries.map((t) => <li key={t} className="rounded-full border border-brand/25 bg-brand/10 px-3.5 py-1.5 text-sm">{t}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="approach-title" className="border-y border-line bg-surface/50">
        <SectionHeader id="approach-title" eyebrow="Development approach" title="How we work on it" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.approach.map((a, i) => (
            <li key={a.title} className="card reveal p-6">
              <span className="font-display text-sm font-semibold text-brand">Step {i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted">{a.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CTASection
        title={s.ctaTitle ?? (s.status === 'research' ? 'Interested in collaborating?' : `Discuss your ${s.shortTitle.toLowerCase()} project`)}
        text={s.status === 'research' ? 'We welcome conversations with researchers and organisations exploring this area.' : 'Tell us about your goals and we will outline a practical first step.'}
      />

      <Section className="pt-0">
        <h2 className="mb-6 text-xl font-semibold">Other services</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={`/services/${o.slug}`} className="card card-hover flex items-center gap-3 p-4 text-sm font-semibold">
                <Icon name={o.icon} className="h-5 w-5 text-brand" />{o.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
