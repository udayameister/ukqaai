import { PageHero } from '@/components/PageHero'
import { CTASection } from '@/components/CTASection'
import { Icon, type IconName } from '@/components/Icon'
import { CheckList, IconTile, Section, SectionHeader } from '@/components/ui'
import { getPageMeta } from '@/data/pages'
import { site } from '@/config/site'

const approach: { icon: IconName; title: string; text: string }[] = [
  { icon: 'compass', title: 'Understand first', text: 'We invest time in the problem, the people affected and the data available before proposing technology.' },
  { icon: 'workflow', title: 'Deliver iteratively', text: 'Small, reviewable increments keep risk low and let priorities change as we learn.' },
  { icon: 'gauge', title: 'Measure what matters', text: 'Each project has explicit success measures that we track and report honestly.' },
  { icon: 'book', title: 'Document and hand over', text: 'Clear documentation and knowledge transfer so you are never dependent on us.' },
]

const ethics = [
  'Human oversight for consequential decisions — AI assists, people decide.',
  'Transparency about how systems work, what data they use and their known limitations.',
  'Privacy by design: collect the minimum data needed and protect it properly.',
  'Testing for bias and failure modes before deployment, and monitoring afterwards.',
  'No claims beyond the evidence — research results are reported as research.',
]

export default function About() {
  const m = getPageMeta('/about')
  return (
    <>
      <PageHero crumbs={m.crumbs} eyebrow="About us" title={<>Intelligent technology, <span className="text-gradient">responsibly built.</span></>} intro={`${site.name} is a technology company working across artificial intelligence, software engineering, education technology and scientific research.`} />

      <Section labelledBy="overview-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow mb-4">Company overview</p>
            <h2 id="overview-title" className="text-3xl font-semibold">From research lab to real-world product.</h2>
            <p className="mt-5 text-lg text-muted">
              We started where research meets practice: years of work on deep learning for brain imaging, and years in classrooms and academic administration. That combination shapes everything we do — careful methods, practical software and a deep respect for the people who use it.
            </p>
            <p className="mt-4 text-muted">
              Our first product, AcadexMatch, helps academics and institutions find each other. Alongside our own platforms, we work with organisations on AI, software and research engineering projects.
            </p>
          </div>
          <div className="grid gap-5">
            <div className="card reveal p-7">
              <div className="flex items-center gap-3"><IconTile name="target" /><h3 className="text-xl font-semibold">Our vision</h3></div>
              <p className="mt-4 text-muted">To empower businesses, educational institutions, researchers and individuals through accessible, intelligent and responsible technology.</p>
            </div>
            <div className="card reveal p-7">
              <div className="flex items-center gap-3"><IconTile name="rocket" /><h3 className="text-xl font-semibold">Our mission</h3></div>
              <p className="mt-4 text-muted">To transform complex challenges into practical solutions through artificial intelligence, software engineering, research innovation and emerging technologies.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="approach-title" className="border-y border-line bg-surface/50">
        <SectionHeader id="approach-title" eyebrow="Our approach" title="How we turn ideas into dependable systems." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((a) => (
            <div key={a.title} className="card reveal p-6">
              <Icon name={a.icon} className="h-6 w-6 text-brand" />
              <h3 className="mt-4 text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="innovation-title">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow mb-4">Innovation philosophy</p>
            <h2 id="innovation-title" className="text-3xl font-semibold">Curious about the frontier. Careful about claims.</h2>
            <p className="mt-5 text-muted">
              We explore emerging areas such as physics-informed learning and quantum computing because tomorrow’s solutions start as today’s research. But we only call something a product when it is ready, and we label research as research.
            </p>
          </div>
          <div className="reveal">
            <p className="eyebrow mb-4">Research-driven development</p>
            <h2 className="text-3xl font-semibold">Evidence before features.</h2>
            <p className="mt-5 text-muted">
              Our development practice borrows from scientific method: state the hypothesis, establish a baseline, test properly and report results truthfully — including when something does not work.
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="leadership-title" className="border-y border-line bg-surface/50">
        <SectionHeader id="leadership-title" eyebrow="Leadership" title="Meet our Founder & CEO" />
        <div className="grid gap-6 lg:max-w-4xl">
          {site.leadership.map((p) => (
            <article key={p.name} className="card reveal grid gap-8 p-7 sm:p-8 md:grid-cols-[240px_1fr]">
              <div>
                {p.photo ? (
                  <picture>
                    <source srcSet={p.photo.replace(/\.jpe?g$/, '.webp')} type="image/webp" />
                    <img src={p.photo} alt={`${p.name}, ${p.role} of ${site.name}`} width={436} height={447} loading="lazy" decoding="async" className="aspect-[4/5] w-full max-w-[280px] rounded-2xl border border-line object-cover object-top shadow-xl shadow-black/20" />
                  </picture>
                ) : (
                  <span className="bg-brand-gradient inline-flex h-16 w-16 items-center justify-center rounded-2xl font-display text-xl font-bold text-white" aria-hidden="true">
                    {p.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{p.name}</h3>
                <p className="mt-1 font-display text-sm font-semibold uppercase tracking-wider text-brand">{p.role}</p>
              <p className="mt-5 text-muted">{p.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.focus.map((f) => <li key={f} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm">{f}</li>)}
              </ul>
              {p.highlights.length > 0 && (
                <>
                  <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted">Awards & certifications</h4>
                  <div className="mt-3"><CheckList items={p.highlights} /></div>
                </>
              )}
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {p.links.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      {l.label} <Icon name="arrowUpRight" className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section labelledBy="ethics-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="reveal">
            <p className="eyebrow mb-4">Ethics & responsible AI</p>
            <h2 id="ethics-title" className="text-3xl font-semibold">Principles we hold ourselves to.</h2>
            <p className="mt-5 text-muted">Responsible AI is not a compliance checkbox for us. It is part of building systems people can trust.</p>
          </div>
          <div className="card reveal p-7"><CheckList items={ethics} /></div>
        </div>
      </Section>

      <CTASection title="Let's build something meaningful." />
    </>
  )
}
