import { Link } from 'react-router-dom'
import { HeroBackdrop } from '@/sections/HeroBackdrop'
import { HeroGlobe } from '@/sections/HeroGlobe'
import { CountUp, Marquee, RotatingWords } from '@/components/Motion'
import { CTASection } from '@/components/CTASection'
import { ServiceCard } from '@/components/ServiceCard'
import { ProductCard } from '@/components/ProductCard'
import { Icon, type IconName } from '@/components/Icon'
import { ButtonLink, IconTile, Section, SectionHeader } from '@/components/ui'
import { services } from '@/data/services'
import { products } from '@/data/products'
import { publications, researchAreas } from '@/data/research'
import { industries } from '@/data/industries'
import { site } from '@/config/site'

const pillars: { icon: IconName; title: string; text: string }[] = [
  { icon: 'flask', title: 'Research-driven', text: 'Methods grounded in peer-reviewed research in deep learning and graph neural networks.' },
  { icon: 'layers', title: 'Engineering discipline', text: 'Clean architecture, automated testing and deployment pipelines from day one.' },
  { icon: 'shield', title: 'Responsible by design', text: 'Privacy, transparency and human oversight built into every AI system we ship.' },
]

const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: 'microscope', title: 'Research depth', text: 'Our founder’s doctoral work in AI for neuroimaging shapes how rigorously we build and evaluate models.' },
  { icon: 'graduation', title: 'Real education experience', text: 'More than 16 years in higher education means our EdTech is designed around how institutions really work.' },
  { icon: 'rocket', title: 'Products we run ourselves', text: 'We build and operate our own platforms, so we know what it takes to keep software running in production.' },
  { icon: 'target', title: 'Outcome-focused', text: 'We start from the problem and the metric that matters, not from a technology we want to sell.' },
  { icon: 'scale', title: 'Honest about maturity', text: 'We clearly separate what is proven, what is developing and what is still research.' },
  { icon: 'handshake', title: 'You own the result', text: 'Documented code, clear hand-over and no unnecessary lock-in.' },
]

const stack: { group: string; items: string[] }[] = [
  { group: 'AI & data', items: ['Python', 'PyTorch', 'PyTorch Geometric', 'scikit-learn', 'Hugging Face', 'LLM APIs', 'Vector search'] },
  { group: 'Web & product', items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'FastAPI', 'Tailwind CSS'] },
  { group: 'Data & cloud', items: ['PostgreSQL', 'Docker', 'GitHub Actions', 'Cloud hosting', 'REST APIs'] },
  { group: 'Emerging', items: ['Qiskit', 'PennyLane', 'MQTT', 'Edge ML'] },
]

const process: { title: string; text: string }[] = [
  { title: 'Discover', text: 'A conversation about your goals, constraints and data.' },
  { title: 'Define', text: 'A written scope with priorities, success measures and an estimate.' },
  { title: 'Design', text: 'Architecture, user flows and prototypes reviewed with you.' },
  { title: 'Build', text: 'Iterative delivery with working software at every step.' },
  { title: 'Launch & evolve', text: 'Deployment, documentation, monitoring and ongoing support.' },
]

export default function Home() {
  const [featured, ...others] = products
  return (
    <>
      {/* Hero — full-bleed, video-style motion */}
      <section className="relative flex min-h-[calc(100svh-104px)] flex-col overflow-hidden" aria-labelledby="hero-title">
        <HeroBackdrop />
        <div className="container-x relative grid flex-1 items-center gap-10 pb-10 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:pb-16">
          <div className="hero-rise">
            <p className="eyebrow mb-6">
              <span className="h-px w-8 bg-brand" aria-hidden="true" /> AI · Software · Research · Training
            </p>
            <h1 id="hero-title" className="text-[2.6rem] font-semibold leading-[1.06] sm:text-6xl lg:text-[4.1rem]">
              Engineering Intelligence. <span className="text-gradient">Empowering Innovation.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
              Transforming ideas into intelligent solutions through Artificial Intelligence, advanced software engineering and research-driven innovation.
            </p>
            <p className="mt-5 text-base text-muted sm:text-lg">
              We build <RotatingWords words={['AI agents & automation', 'machine learning models', 'research software', 'EdTech platforms', 'FDPs & workshops', 'web & SaaS products']} />
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/services">Explore Our Solutions</ButtonLink>
              <ButtonLink to="/contact" variant="secondary" icon={null}>Contact Our Team</ButtonLink>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden="true">
            <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]" />
            <HeroGlobe />
            {[
              { label: 'Machine Learning', cls: 'left-[2%] top-[14%]' },
              { label: 'Research', cls: 'right-[4%] top-[8%]' },
              { label: 'Software', cls: 'right-[0%] bottom-[18%]' },
              { label: 'Quantum R&D', cls: 'left-[0%] bottom-[12%]' },
            ].map((c, i) => (
              <span key={c.label} className={`card anim-float absolute hidden px-3 py-1.5 text-xs font-semibold text-fg shadow-lg shadow-black/10 backdrop-blur sm:block ${c.cls}`} style={{ animationDelay: `${i * -1.7}s` }}>
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="container-x relative pb-8">
          <dl className="stagger grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {[
              { n: 16, suffix: '+', label: 'Years in academia & research' },
              { n: publications.length, suffix: '', label: 'Peer-reviewed publications' },
              { n: services.length, suffix: '', label: 'Technology domains' },
              { n: products.length, suffix: '', label: 'Platforms of our own' },
            ].map((s) => (
              <div key={s.label} className="reveal bg-bg/80 px-5 py-5 backdrop-blur">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-fg sm:text-4xl"><CountUp to={s.n} suffix={s.suffix} /></dd>
              </div>
            ))}
          </dl>
          <a href="#intro-title" className="mx-auto mt-6 hidden w-fit flex-col items-center gap-1 text-xs text-muted hover:text-fg sm:flex">
            Scroll to explore
            <svg viewBox="0 0 24 24" className="scroll-cue h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </a>
        </div>
      </section>

      {/* Technology ticker */}
      <div className="border-y border-line bg-surface/50 py-6" aria-label="Technologies we work with">
        <Marquee items={['Python', 'PyTorch', 'Graph Neural Networks', 'Generative AI', 'LLM Agents', 'React', 'Next.js', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Docker', 'Computer Vision', 'NLP', 'IoT', 'Qiskit', 'Medical Imaging', 'MLOps']} />
      </div>

      {/* Intro */}
      <Section labelledBy="intro-title" className="border-b border-line">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="reveal">
            <p className="eyebrow mb-4">Who we are</p>
            <h2 id="intro-title" className="text-3xl font-semibold sm:text-4xl">A technology company built on research and engineering.</h2>
          </div>
          <div className="reveal">
            <p className="text-lg text-muted">
              {site.name} helps businesses, educational institutions, researchers and individuals put intelligent technology to work. We combine applied AI, modern software engineering and scientific rigour to turn complex challenges into practical, dependable solutions.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {pillars.map((p) => (
                <div key={p.title}>
                  <IconTile name={p.icon} />
                  <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section labelledBy="services-title">
        <SectionHeader id="services-title" eyebrow="Core technology services" title="Seven domains, one engineering standard." intro="Each service is labelled by maturity, so you always know what is available today and what is still in development or research." />
        <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </Section>

      {/* Products */}
      <Section labelledBy="products-title" className="border-y border-line bg-surface/50">
        <SectionHeader id="products-title" eyebrow="Featured products & platforms" title="Platforms we build and run." intro="Our own products put our technology in front of real users every day." />
        <ProductCard product={featured} featured />
        {others.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {others.map((p) => <ProductCard key={p.id} product={p} />)}
            <div className="card reveal flex flex-col justify-center border-dashed p-8">
              <h3 className="text-xl font-semibold">More on the way</h3>
              <p className="mt-2 text-muted">New platforms in education, research and AI tooling are in development.</p>
              <Link to="/products" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">See all products <Icon name="arrowRight" className="h-4 w-4" /></Link>
            </div>
          </div>
        )}
      </Section>

      {/* Why choose */}
      <Section labelledBy="why-title">
        <SectionHeader id="why-title" eyebrow="Why choose UKQAAI?" title="Focused, research-led and serious about quality." />
        <div className="stagger grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="reveal bg-bg p-7">
              <Icon name={r.icon} className="h-6 w-6 text-brand" />
              <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-muted">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Stack */}
      <Section labelledBy="stack-title" className="border-y border-line bg-surface/50">
        <SectionHeader id="stack-title" eyebrow="Technology stack" title="Proven tools, chosen for each problem." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stack.map((g) => (
            <div key={g.group} className="card reveal p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">{g.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((i) => <li key={i} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm">{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Research */}
      <Section labelledBy="research-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal">
            <p className="eyebrow mb-4">Research & innovation</p>
            <h2 id="research-title" className="text-3xl font-semibold sm:text-4xl">Where new ideas are tested before they reach products.</h2>
            <p className="mt-4 text-lg text-muted">Our research spans graph neural networks for brain connectomics, medical imaging, physics-informed learning and emerging quantum methods.</p>
            <ButtonLink to="/research" variant="secondary" className="mt-8">Explore our research</ButtonLink>
          </div>
          <ul className="stagger grid gap-4 sm:grid-cols-2">
            {researchAreas.map((a) => (
              <li key={a.title} className="card reveal p-5">
                <div className="flex items-center gap-3"><Icon name={a.icon} className="h-5 w-5 text-accent" /><h3 className="text-base font-semibold">{a.title}</h3></div>
                <p className="mt-2 text-sm text-muted">{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Industries */}
      <Section labelledBy="ind-title" className="border-y border-line bg-surface/50">
        <SectionHeader id="ind-title" eyebrow="Industry solutions" title="Built for the sectors we understand." />
        <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link key={i.id} to={`/industries#${i.id}`} className="card card-hover reveal flex items-start gap-4 p-6">
              <IconTile name={i.icon} />
              <span>
                <span className="block font-display font-semibold text-fg">{i.title}</span>
                <span className="mt-1 block text-sm text-muted">{i.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section labelledBy="process-title">
        <SectionHeader id="process-title" eyebrow="How we work" title="A clear, collaborative engagement process." />
        <ol className="stagger grid gap-5 md:grid-cols-5">
          {process.map((p, i) => (
            <li key={p.title} className="reveal relative">
              <span className="font-display text-sm font-semibold text-brand">0{i + 1}</span>
              <div className="my-3 h-px bg-gradient-to-r from-brand to-transparent" aria-hidden="true" />
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CTASection />
    </>
  )
}
