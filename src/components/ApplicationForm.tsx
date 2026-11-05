import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import type { JobOpening } from '@/data/careers'
import { submitToWeb3Forms } from '@/utils/web3forms'
import { Icon } from './Icon'

const fieldsInit = {
  name: '', email: '', phone: '', city: '', college: '', university: '', degree: 'B.E. / B.Tech', branch: '',
  year: '', gradYear: '', cgpa: '', track: '', duration: '', startMonth: '', resume: '', portfolio: '',
  skills: '', motivation: '', consent: false,
}
type Fields = typeof fieldsInit
type Key = keyof Fields
type Errors = Partial<Record<Key, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const URL_RE = /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i
const PHONE_RE = /^\+?[0-9][0-9\s-]{8,15}$/

function startMonths() {
  const out: string[] = []
  const d = new Date()
  for (let i = 0; i < 6; i++) {
    const m = new Date(d.getFullYear(), d.getMonth() + i, 1)
    out.push(m.toLocaleString('en-IN', { month: 'long', year: 'numeric' }))
  }
  return out
}

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (!PHONE_RE.test(f.phone.trim())) e.phone = 'Please enter a valid mobile number, e.g. +91 98765 43210.'
  if (f.college.trim().length < 3) e.college = 'Please enter your college name.'
  if (f.branch.trim().length < 2) e.branch = 'Please enter your branch / department.'
  if (!f.year) e.year = 'Please select your year of study.'
  if (!/^20\d{2}$/.test(f.gradYear.trim())) e.gradYear = 'Please enter your graduation year, e.g. 2027.'
  if (!f.track) e.track = 'Please choose an internship track.'
  if (!f.duration) e.duration = 'Please choose a duration.'
  if (!f.startMonth) e.startMonth = 'Please choose a preferred start month.'
  if (!URL_RE.test(f.resume.trim())) e.resume = 'Please paste a link to your resume (Google Drive, OneDrive or similar) starting with https://'
  if (f.portfolio.trim() && !URL_RE.test(f.portfolio.trim())) e.portfolio = 'Please enter a full link starting with https://'
  if (f.motivation.trim().length < 50) e.motivation = 'Please write at least 50 characters about why you want this internship.'
  if (!f.consent) e.consent = 'Please confirm you agree to us using your details for this application.'
  return e
}

export function ApplicationForm({ job }: { job: JobOpening }) {
  const [f, setF] = useState<Fields>(fieldsInit)
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef(Date.now())
  const statusRef = useRef<HTMLDivElement>(null)
  const months = startMonths()

  const set = <K extends Key>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }
  const focusStatus = () => requestAnimationFrame(() => statusRef.current?.focus())

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    const errs = validate(f)
    setErrors(errs)
    if (Object.keys(errs).length) {
      setState('error'); setMsg(`Please correct the ${Object.keys(errs).length} highlighted field(s).`); focusStatus()
      const first = Object.keys(errs)[0]
      document.getElementById(`app-${first}`)?.focus()
      return
    }
    if (!site.integrations.web3formsKey) {
      setState('error'); setMsg(`Online applications are not connected yet. Please email your resume to ${site.contact.email}.`); focusStatus(); return
    }
    if (honeypot || Date.now() - startedAt.current < 5000) {
      setState('error'); setMsg('Your application could not be sent. Please wait a moment and try again.'); return
    }
    setState('sending')
    try {
      await submitToWeb3Forms({
        subject: `[Internship application] ${f.name.trim()} — ${f.track}`,
        'Position': job.title,
        'Full name': f.name.trim(),
        email: f.email.trim(),
        'Mobile number': f.phone.trim(),
        'City / State': f.city.trim() || '—',
        'College': f.college.trim(),
        'University': f.university.trim() || '—',
        'Degree': f.degree,
        'Branch / Department': f.branch.trim(),
        'Year of study': f.year,
        'Graduation year': f.gradYear.trim(),
        'CGPA / Percentage': f.cgpa.trim() || '—',
        'Preferred track': f.track,
        'Preferred duration': f.duration,
        'Preferred start month': f.startMonth,
        'Resume link': f.resume.trim(),
        'GitHub / LinkedIn / Portfolio': f.portfolio.trim() || '—',
        'Skills': f.skills.trim() || '—',
        'Why this internship': f.motivation.trim(),
        'Consent': 'Yes — agreed to privacy policy',
      })
      setState('success'); setF(fieldsInit)
    } catch {
      setState('error'); setMsg(`Sorry, your application could not be sent. Please try again, or email your resume to ${site.contact.email}.`)
    }
    focusStatus()
  }

  if (state === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card flex flex-col items-start gap-4 p-8 outline-none">
        <Icon name="check" className="h-10 w-10 text-emerald-500" />
        <h3 className="text-2xl font-semibold">Application submitted</h3>
        <p className="text-muted">Thank you for applying. Your application has been sent to our team. Shortlisted candidates will be contacted by email.</p>
        <button type="button" onClick={() => setState('idle')} className="font-semibold text-brand">Submit another application</button>
      </div>
    )
  }

  const input = 'mt-2 block w-full rounded-xl border bg-surface px-4 py-3 text-fg placeholder:text-muted/70 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30'
  const b = (k: Key) => (errors[k] ? 'border-red-500' : 'border-line')
  const aria = (k: Key) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `app-${k}-error` } : {})
  const Err = ({ k }: { k: Key }) => (errors[k] ? <p id={`app-${k}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors[k]}</p> : null)
  const Label = ({ k, children, optional }: { k: Key; children: ReactNode; optional?: boolean }) => (
    <label htmlFor={`app-${k}`} className="text-sm font-semibold">
      {children} {optional ? <span className="font-normal text-muted">(optional)</span> : <span aria-hidden="true" className="text-red-500">*</span>}
    </label>
  )
  const Text = ({ k, label, optional, ...rest }: { k: Exclude<Key, 'consent'>; label: string; optional?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <Label k={k} optional={optional}>{label}</Label>
      <input id={`app-${k}`} name={k} value={f[k] as string} onChange={(e) => set(k, e.target.value)} className={`${input} ${b(k)}`} {...aria(k)} {...rest} />
      <Err k={k} />
    </div>
  )
  const Select = ({ k, label, options }: { k: Exclude<Key, 'consent'>; label: string; options: string[] }) => (
    <div>
      <Label k={k}>{label}</Label>
      <select id={`app-${k}`} name={k} value={f[k] as string} onChange={(e) => set(k, e.target.value)} className={`${input} ${b(k)}`} {...aria(k)}>
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <Err k={k} />
    </div>
  )

  return (
    <form noValidate onSubmit={onSubmit} className="card p-6 sm:p-8" aria-labelledby="apply-title">
      <h2 id="apply-title" className="text-2xl font-semibold sm:text-3xl">Apply for this internship</h2>
      <p className="mt-2 text-sm text-muted">It takes about 5 minutes. Fields marked <span className="text-red-500">*</span> are required.</p>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state === 'error' && (
          <p className="mt-4 flex gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />{msg}
          </p>
        )}
      </div>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-semibold">1. Personal details</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {Text({ k: 'name', label: 'Full name', autoComplete: 'name', maxLength: 100 })}
          {Text({ k: 'email', label: 'Email', type: 'email', autoComplete: 'email', maxLength: 200 })}
          {Text({ k: 'phone', label: 'Mobile number', type: 'tel', autoComplete: 'tel', placeholder: '+91 98765 43210', maxLength: 20 })}
          {Text({ k: 'city', label: 'City / State', optional: true, autoComplete: 'address-level2', maxLength: 100 })}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-semibold">2. Education</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {Text({ k: 'college', label: 'College name', maxLength: 150 })}
          {Text({ k: 'university', label: 'University', optional: true, maxLength: 150 })}
          {Select({ k: 'degree', label: 'Degree', options: ['B.E. / B.Tech', 'Integrated M.Tech', 'Other engineering degree'] })}
          {Text({ k: 'branch', label: 'Branch / Department', placeholder: 'e.g. CSE, AI & DS, ECE, Mechanical', maxLength: 100 })}
          {Select({ k: 'year', label: 'Year of study', options: job.yearOptions })}
          {Text({ k: 'gradYear', label: 'Expected graduation year', inputMode: 'numeric', placeholder: 'e.g. 2027', maxLength: 4 })}
          {Text({ k: 'cgpa', label: 'CGPA / Percentage', optional: true, placeholder: 'e.g. 8.2 CGPA', maxLength: 20 })}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-semibold">3. Internship preferences</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">{Select({ k: 'track', label: 'Preferred track', options: job.tracks.map((t) => t.title) })}</div>
          {Select({ k: 'duration', label: 'Preferred duration', options: job.durationOptions })}
          {Select({ k: 'startMonth', label: 'Preferred start month', options: months })}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-semibold">4. Resume & skills</legend>
        <div className="mt-4 grid gap-5">
          <div>
            {Text({ k: 'resume', label: 'Resume link', type: 'url', placeholder: 'https://drive.google.com/…', maxLength: 500 })}
            <p className="mt-1.5 text-xs text-muted">Upload your resume (PDF) to Google Drive or OneDrive, set sharing to “Anyone with the link can view”, and paste the link here.</p>
          </div>
          {Text({ k: 'portfolio', label: 'GitHub / LinkedIn / Portfolio', optional: true, type: 'url', placeholder: 'https://github.com/yourname', maxLength: 300 })}
          <div>
            <Label k="skills" optional>Key skills</Label>
            <input id="app-skills" name="skills" value={f.skills} onChange={(e) => set('skills', e.target.value)} placeholder="e.g. Python, React, SQL, Arduino" maxLength={300} className={`${input} border-line`} />
          </div>
          <div>
            <Label k="motivation">Why do you want this internship?</Label>
            <textarea id="app-motivation" name="motivation" rows={5} maxLength={3000} value={f.motivation} onChange={(e) => set('motivation', e.target.value)} placeholder="Tell us about your interests, any projects you have done, and what you hope to learn." className={`${input} ${b('motivation')} resize-y`} {...aria('motivation')} />
            <Err k="motivation" />
          </div>
        </div>
      </fieldset>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="app-website">Leave this field empty</label>
        <input id="app-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="mt-8">
        <div className="flex items-start gap-3">
          <input id="app-consent" type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[var(--brand)]" {...aria('consent')} />
          <label htmlFor="app-consent" className="text-sm text-muted">
            I confirm the information above is accurate, and I agree that {site.name} may use these details to assess my application and contact me, as described in the <Link to="/privacy-policy" className="text-brand underline underline-offset-4">privacy policy</Link>. <span aria-hidden="true" className="text-red-500">*</span>
          </label>
        </div>
        <Err k="consent" />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === 'sending'} className="bg-brand-gradient inline-flex min-h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60">
          {state === 'sending' ? <><Icon name="loader" className="h-4 w-4 animate-spin" />Submitting…</> : <>Submit application<Icon name="send" className="h-4 w-4" /></>}
        </button>
        <p className="text-xs text-muted">Problems with the form? Email your resume to <a className="text-brand underline underline-offset-4" href={`mailto:${site.contact.email}?subject=${encodeURIComponent('Internship application')}`}>{site.contact.email}</a>.</p>
      </div>
    </form>
  )
}
