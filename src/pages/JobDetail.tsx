import { useParams } from 'react-router-dom'
import { PageHero } from '@/components/PageHero'
import { ApplicationForm } from '@/components/ApplicationForm'
import { Icon, type IconName } from '@/components/Icon'
import { Badge, ButtonLink, CheckList, Section } from '@/components/ui'
import { getJob } from '@/data/careers'
import NotFound from './NotFound'

export default function JobDetail() {
  const { slug = '' } = useParams()
  const job = getJob(slug)
  if (!job) return <NotFound />
  const facts: { icon: IconName; label: string; value: string }[] = [
    { icon: 'briefcase', label: 'Type', value: job.type },
    { icon: 'gauge', label: 'Duration', value: job.duration },
    { icon: 'globe', label: 'Location', value: job.location },
    { icon: 'graduation', label: 'Eligibility', value: 'Pre-final & final year engineering students' },
    { icon: 'workflow', label: 'Time commitment', value: job.commitment },
    { icon: 'compass', label: 'Start date', value: job.startDate },
    { icon: 'sparkles', label: 'Stipend', value: job.stipend },
    { icon: 'file', label: 'Apply by', value: job.applyBy ? new Date(job.applyBy).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Rolling — apply any time' },
  ]
  return (
    <>
      <PageHero crumbs={[{ name: 'Careers', path: '/careers' }, { name: 'Internship', path: `/careers/${job.slug}` }]} eyebrow="Now hiring · Internship" title={job.title} intro={job.summary}>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge tone="green">Applications open</Badge>
          <ButtonLink to="#apply" icon="arrowRight">Apply now</ButtonLink>
        </div>
      </PageHero>

      <Section className="!pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-12">
            <section aria-labelledby="about-role">
              <h2 id="about-role" className="text-2xl font-semibold">About the internship</h2>
              <p className="mt-4 text-muted">{job.about}</p>
            </section>

            <section aria-labelledby="who">
              <h2 id="who" className="text-2xl font-semibold">Who can apply</h2>
              <div className="mt-4"><CheckList items={job.eligibility} /></div>
            </section>

            <section aria-labelledby="tracks">
              <h2 id="tracks" className="text-2xl font-semibold">Internship tracks</h2>
              <p className="mt-2 text-muted">Choose one track in the application form.</p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {job.tracks.map((t) => (
                  <li key={t.title} className="card p-5">
                    <h3 className="text-base font-semibold">{t.title}</h3>
                    <p className="mt-2 text-sm text-muted">{t.description}</p>
                    <p className="mt-3 text-xs text-muted"><span className="font-semibold text-fg">Helpful skills:</span> {t.skills}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="resp">
              <h2 id="resp" className="text-2xl font-semibold">What you will do</h2>
              <div className="mt-4"><CheckList items={job.responsibilities} /></div>
            </section>

            <section aria-labelledby="skills">
              <h2 id="skills" className="text-2xl font-semibold">Skills we look for</h2>
              <div className="mt-4"><CheckList items={job.skills} /></div>
            </section>

            <section aria-labelledby="benefits">
              <h2 id="benefits" className="text-2xl font-semibold">What you will gain</h2>
              <div className="mt-4"><CheckList items={job.benefits} /></div>
            </section>

            <section aria-labelledby="process">
              <h2 id="process" className="text-2xl font-semibold">Selection process</h2>
              <ol className="mt-5 grid gap-4 sm:grid-cols-2">
                {job.process.map((p, i) => (
                  <li key={p.title} className="card p-5">
                    <span className="font-display text-sm font-semibold text-brand">Step {i + 1}</span>
                    <h3 className="mt-1 text-base font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted">{p.description}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside aria-label="Internship summary" className="lg:sticky lg:top-32 lg:self-start">
            <div className="card p-6">
              <h2 className="text-lg font-semibold">At a glance</h2>
              <dl className="mt-4 space-y-4">
                {facts.map((x) => (
                  <div key={x.label}>
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted"><Icon name={x.icon} className="h-4 w-4 shrink-0 text-brand" />{x.label}</dt>
                    <dd className="mt-1 pl-6 text-sm text-fg">{x.value}</dd>
                  </div>
                ))}
              </dl>
              <ButtonLink to="#apply" className="mt-6 w-full">Apply now</ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      <section id="apply" className="scroll-mt-32 border-t border-line bg-surface/50 py-16 sm:py-20" aria-label="Application form">
        <div className="container-x max-w-4xl">
          <ApplicationForm job={job} />
        </div>
      </section>
    </>
  )
}
