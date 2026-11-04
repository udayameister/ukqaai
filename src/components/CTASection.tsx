import { ButtonLink } from './ui'

export function CTASection({
  title = 'Have a problem worth solving?',
  text = 'Tell us what you are working on. We will help you decide whether AI, software or research engineering is the right tool — and how to approach it.',
  primary = { label: 'Contact our team', to: '/contact' },
  secondary = { label: 'Explore our solutions', to: '/services' },
}: { title?: string; text?: string; primary?: { label: string; to: string }; secondary?: { label: string; to: string } }) {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="cta-title">
      <div className="container-x">
        <div className="reveal relative overflow-hidden rounded-3xl bg-navy-deep px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(61_123_255/0.35),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgb(138_92_255/0.3),transparent_55%)]" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-title" className="text-3xl font-semibold !text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-[#c3cbe4]">{text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink to={primary.to}>{primary.label}</ButtonLink>
              <ButtonLink to={secondary.to} variant="secondary" className="!border-white/20 !bg-white/5 !text-white hover:!border-white/40">{secondary.label}</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
