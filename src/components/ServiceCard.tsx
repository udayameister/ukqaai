import { Link } from 'react-router-dom'
import type { Service } from '@/data/services'
import { statusLabels } from '@/data/services'
import { Icon } from './Icon'
import { Badge, IconTile } from './ui'

export function StatusBadge({ status }: { status: Service['status'] }) {
  const tone = status === 'available' ? 'green' : status === 'developing' ? 'amber' : 'violet'
  return <Badge tone={tone}>{statusLabels[status]}</Badge>
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link to={`/services/${service.slug}`} className="card card-hover reveal group flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <IconTile name={service.icon} />
        <StatusBadge status={service.status} />
      </div>
      <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
      <p className="mt-3 flex-1 text-[0.95rem] text-muted">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        Learn more <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-1" />
        <span className="sr-only"> about {service.title}</span>
      </span>
    </Link>
  )
}
