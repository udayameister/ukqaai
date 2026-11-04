import { PageHero } from '@/components/PageHero'
import { CTASection } from '@/components/CTASection'
import { ProductCard } from '@/components/ProductCard'
import { Section } from '@/components/ui'
import { getPageMeta } from '@/data/pages'
import { products } from '@/data/products'

export default function Products() {
  const m = getPageMeta('/products')
  return (
    <>
      <PageHero crumbs={m.crumbs} eyebrow="Products & platforms" title={<>Platforms built and run <span className="text-gradient">by UKQAAI.</span></>} intro="Our products apply AI to real problems in education and careers. Each one is something we operate ourselves." />
      <Section>
        <h2 className="sr-only">Our products</h2>
        <div className="grid gap-8">
          {products.map((p, i) => <ProductCard key={p.id} product={p} featured={i === 0} />)}
        </div>
      </Section>
      <CTASection title="Want to build a platform with us?" text="We bring the same product engineering to client platforms — from first prototype to production." secondary={{ label: 'Software development services', to: '/services/software-development' }} />
    </>
  )
}
