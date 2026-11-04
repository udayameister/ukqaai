import { PageHero } from '@/components/PageHero'
import { Icon, type IconName } from '@/components/Icon'
import { ButtonLink, IconTile, Section, SectionHeader } from '@/components/ui'
import { getPageMeta } from '@/data/pages'
import { site } from '@/config/site'

/** Add real openings here when available. While empty, the page says there are none. */
const openings: { title: string; type: string; location: string; summary: string }[] = []

const tracks: { icon: IconName; title: string; text: string }[] = [
  { icon: 'briefcase', title: 'Career opportunities', text: 'We hire as projects grow, for AI/ML engineering, full-stack development and research software roles.' },
  { icon: 'graduation', title: 'Internships', text: 'Students in computer science, AI and data science can express interest in project-based internships.' },
  { icon: 'handshake', title: 'Research collaboration', text: 'Researchers and PhD scholars interested in deep learning, neuroimaging or scientific ML are welcome to reach out.' },
]

export default function Careers() {
  const m = getPageMeta('/careers')
  const cvMail = `mailto:${site.contact.email}?subject=${encodeURIComponent('CV submission — UKQAAI Careers')}`
  return (
    <>
      <PageHero crumbs={m.crumbs} eyebrow="Careers" title={<>Do work that is <span className="text-gradient">technically serious</span> and genuinely useful.</>} intro="We are a growing team. Even when there is no listed opening, we like hearing from talented people." />

      <Section labelledBy="tracks-title">
        <SectionHeader id="tracks-title" eyebrow="Ways to join" title="Opportunities at UKQAAI" />
        <div className="grid gap-5 md:grid-cols-3">
          {tracks.map((t) => (
            <div key={t.title} className="card reveal p-7">
              <IconTile name={t.icon} />
              <h3 className="mt-5 text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-muted">{t.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="open-title" className="border-y border-line bg-surface/50">
        <h2 id="open-title" className="text-2xl font-semibold sm:text-3xl">Current openings</h2>
        {openings.length === 0 ? (
          <div className="card reveal mt-6 flex items-start gap-4 p-7">
            <Icon name="search" className="mt-1 h-5 w-5 shrink-0 text-brand" />
            <p className="text-muted">There are no open positions listed at the moment. You are welcome to send your CV for future opportunities, internships or research collaboration.</p>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4">
            {openings.map((o) => (
              <li key={o.title} className="card p-6">
                <h3 className="text-lg font-semibold">{o.title}</h3>
                <p className="text-sm text-muted">{o.type} · {o.location}</p>
                <p className="mt-2 text-muted">{o.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section labelledBy="cv-title">
        <div className="card reveal mx-auto max-w-3xl p-8 text-center sm:p-12">
          <h2 id="cv-title" className="text-3xl font-semibold">Submit your CV</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">Email your CV with a short note about your interests and the kind of role, internship or collaboration you are looking for.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to={cvMail} icon="mail">Email your CV</ButtonLink>
            <ButtonLink to="/contact?subject=Careers" variant="secondary" icon={null}>Use the contact form</ButtonLink>
          </div>
          <p className="mt-4 text-sm text-muted">{site.contact.email}</p>
        </div>
      </Section>
    </>
  )
}
