import { useLocation } from 'react-router-dom'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/ui'
import { getLegalPage } from '@/data/legal'
import { site } from '@/config/site'
import NotFound from './NotFound'

const fill = (s: string) => s.replace(/\{\{name\}\}/g, site.name).replace(/\{\{email\}\}/g, site.contact.email).replace(/\{\{url\}\}/g, 'www.ukqaai.com')

export default function Legal() {
  const { pathname } = useLocation()
  const page = getLegalPage(pathname.replace(/\/+$/, ''))
  if (!page) return <NotFound />
  return (
    <>
      <PageHero crumbs={[{ name: page.title, path: page.path }]} title={page.title} intro={fill(page.intro)}>
        <p className="mt-4 text-sm text-muted">Last updated: {page.lastUpdated}</p>
      </PageHero>
      <Section className="!pt-8">
        <div className="prose-legal max-w-3xl">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs?.map((p) => <p key={p}>{fill(p)}</p>)}
              {s.list && <ul>{s.list.map((l) => <li key={l}>{fill(l)}</li>)}</ul>}
            </section>
          ))}
        </div>
      </Section>
    </>
  )
}
