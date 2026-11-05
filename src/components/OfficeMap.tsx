import { site } from '@/config/site'
import { Icon } from './Icon'

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapQuery)}`

/** Embedded Google Map of the office location (no API key needed). */
export function OfficeMap() {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&z=14&output=embed`
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="space-y-1">
          <p className="flex items-center gap-2 font-semibold"><Icon name="mapPin" className="h-5 w-5 text-brand" />{site.contact.address}</p>
          <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 text-sm text-brand hover:underline"><Icon name="mail" className="h-5 w-5" />{site.contact.email}</a>
        </div>
        <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          Open in Google Maps <Icon name="arrowUpRight" className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <iframe
        title={`Map showing ${site.name} location: ${site.contact.address}`}
        src={src}
        className="block h-[340px] w-full border-0 sm:h-[420px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
