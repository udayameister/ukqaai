import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { Icon } from './Icon'

type Fields = { name: string; email: string; organisation: string; subject: string; message: string; consent: boolean }
type Errors = Partial<Record<keyof Fields, string>>
type Status = { state: 'idle' | 'sending' | 'success' | 'error'; message?: string }

const empty: Fields = { name: '', email: '', organisation: '', subject: '', message: '', consent: false }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address, e.g. name@example.com.'
  if (f.subject.trim().length < 3) e.subject = 'Please add a short subject.'
  if (f.message.trim().length < 20) e.message = 'Please write at least 20 characters so we can understand your request.'
  if (f.message.length > 5000) e.message = 'Please keep your message under 5,000 characters.'
  if (!f.consent) e.consent = 'Please confirm you agree to us using your details to reply.'
  return e
}

export function ContactForm() {
  const [params] = useSearchParams()
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef(Date.now())
  const summaryRef = useRef<HTMLDivElement>(null)
  const key = site.integrations.web3formsKey
  const connected = Boolean(key)

  useEffect(() => {
    const s = params.get('subject')
    if (s) setFields((f) => ({ ...f, subject: f.subject || s.slice(0, 120) }))
  }, [params])

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setFields((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length) {
      setStatus({ state: 'error', message: 'Please correct the highlighted fields.' })
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    if (!connected) {
      setStatus({ state: 'error', message: `The online form is not connected yet, so your message was not sent. Please email us at ${site.contact.email}.` })
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    // Spam protection: honeypot field + minimum fill time. Bots are told it failed, never that it succeeded.
    if (honeypot || Date.now() - startedAt.current < 3000) {
      setStatus({ state: 'error', message: 'Your message could not be sent. Please wait a moment and try again.' })
      return
    }
    setStatus({ state: 'sending' })
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          from_name: `${site.name} website`,
          subject: `[ukqaai.com] ${fields.subject.trim()}`,
          name: fields.name.trim(),
          email: fields.email.trim(),
          organisation: fields.organisation.trim() || '—',
          message: fields.message.trim(),
          consent: 'Yes — agreed to privacy policy',
          botcheck: '',
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
      if (res.ok && data.success) {
        setStatus({ state: 'success', message: 'Thank you — your message has been sent. We will reply by email.' })
        setFields(empty)
      } else {
        throw new Error(data.message || `Request failed (${res.status})`)
      }
    } catch {
      setStatus({ state: 'error', message: `Sorry, your message could not be sent. Please try again or email ${site.contact.email}.` })
    }
    requestAnimationFrame(() => summaryRef.current?.focus())
  }

  const input = 'mt-2 block w-full rounded-xl border bg-surface px-4 py-3 text-fg placeholder:text-muted/70 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30'
  const border = (k: keyof Fields) => (errors[k] ? 'border-red-500' : 'border-line')
  const err = (k: keyof Fields) =>
    errors[k] ? <p id={`${k}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors[k]}</p> : null
  const described = (k: keyof Fields) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-error` } : {})

  if (status.state === 'success') {
    return (
      <div ref={summaryRef} tabIndex={-1} role="status" className="card flex flex-col items-start gap-4 p-8 outline-none">
        <Icon name="check" className="h-10 w-10 text-emerald-500" />
        <h2 className="text-2xl font-semibold">Message sent</h2>
        <p className="text-muted">{status.message}</p>
        <button type="button" onClick={() => setStatus({ state: 'idle' })} className="font-semibold text-brand">Send another message</button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="card p-6 sm:p-8" aria-labelledby="form-title">
      <h2 id="form-title" className="text-2xl font-semibold">Send us a message</h2>
      {!connected && (
        <p className="mt-3 flex gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-900 dark:text-amber-200">
          <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>The online form is being set up. Until then, please email <a className="font-semibold underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</span>
        </p>
      )}
      <div ref={summaryRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status.state === 'error' && (
          <p className="mt-4 flex gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />{status.message}
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">Name <span aria-hidden="true" className="text-red-500">*</span></label>
          <input id="name" name="name" autoComplete="name" required maxLength={100} value={fields.name} onChange={(e) => set('name', e.target.value)} className={`${input} ${border('name')}`} {...described('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">Email <span aria-hidden="true" className="text-red-500">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} value={fields.email} onChange={(e) => set('email', e.target.value)} className={`${input} ${border('email')}`} {...described('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor="organisation" className="text-sm font-semibold">Organisation <span className="font-normal text-muted">(optional)</span></label>
          <input id="organisation" name="organisation" autoComplete="organization" maxLength={150} value={fields.organisation} onChange={(e) => set('organisation', e.target.value)} className={`${input} border-line`} />
        </div>
        <div>
          <label htmlFor="subject" className="text-sm font-semibold">Subject <span aria-hidden="true" className="text-red-500">*</span></label>
          <input id="subject" name="subject" required maxLength={120} value={fields.subject} onChange={(e) => set('subject', e.target.value)} className={`${input} ${border('subject')}`} {...described('subject')} />
          {err('subject')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold">Message <span aria-hidden="true" className="text-red-500">*</span></label>
          <textarea id="message" name="message" required rows={6} maxLength={5000} value={fields.message} onChange={(e) => set('message', e.target.value)} className={`${input} ${border('message')} resize-y`} {...described('message')} />
          {err('message')}
        </div>
        {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_website">Leave this field empty</label>
          <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input id="consent" name="consent" type="checkbox" checked={fields.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#1f5eff]" {...described('consent')} />
            <label htmlFor="consent" className="text-sm text-muted">
              I agree that {site.name} may use these details to reply to my enquiry, as described in the <Link to="/privacy-policy" className="text-brand underline underline-offset-4">privacy policy</Link>. <span aria-hidden="true" className="text-red-500">*</span>
            </label>
          </div>
          {err('consent')}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status.state === 'sending'} className="bg-brand-gradient inline-flex min-h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60">
          {status.state === 'sending' ? <><Icon name="loader" className="h-4 w-4 animate-spin" />Sending…</> : <>Send message<Icon name="send" className="h-4 w-4" /></>}
        </button>
        <p className="text-xs text-muted">Fields marked <span className="text-red-500">*</span> are required.</p>
      </div>
    </form>
  )
}
