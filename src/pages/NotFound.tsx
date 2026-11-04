import { ButtonLink } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-gradient font-display text-7xl font-bold sm:text-8xl">404</p>
      <h1 className="mt-6 text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">The page you are looking for may have moved or no longer exists.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">Back to home</ButtonLink>
        <ButtonLink to="/contact" variant="secondary" icon={null}>Contact us</ButtonLink>
      </div>
    </section>
  )
}
