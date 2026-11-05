import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { submitToWeb3Forms } from '@/utils/web3forms'
import { Icon } from './Icon'

/** Options shown in the collaboration request form — edit freely. */
export const collaborationOptions = {
  orgTypes: ['University / College', 'Hospital / Clinical centre', 'Research institute / Lab', 'Industry / Company', 'Government / Non-profit', 'Individual researcher', 'Other'],
  areas: [
    'AI for neuroimaging (fMRI, DTI, sMRI, MRS)',
    'Brain connectomics & graph neural networks',
    'Medical image analysis',
    'Scientific machine learning / physics-informed neural networks',
    'Healthcare data science',
    'Generative AI & LLM applications',
    'Research software & data pipelines',
    'Other',
  ],
  types: ['Joint research project', 'Co-authored publication', 'Funded / grant proposal', 'Student or PhD co-supervision', 'Research software development', 'Dataset analysis / consultancy', 'Workshop or training', 'Other'],
  data: ['Yes — data is available', 'Data collection is planned', 'No — need public datasets', 'Not sure yet'],
  funding: ['Funded', 'Grant application planned', 'Not funded yet', 'Not sure'],
  timelines: ['Within 1 month', '1–3 months', '3–6 months', 'More than 6 months', 'Flexible'],
}

const init = {
  name: '', email: '', phone: '', designation: '', organisation: '', orgType: '', country: 'India',
  area: '', topic: '', description: '', collabType: '', data: '', funding: '', timeline: '', links: '', consent: false,
}
type Fields = typeof init
type Key = keyof Fields
type Errors = Partial<Record<Key, string>>
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (f.designation.trim().length < 2) e.designation = 'Please enter your designation or role.'
  if (f.organisation.trim().length < 2) e.organisation = 'Please enter your organisation or institution.'
  if (!f.orgType) e.orgType = 'Please select the type of organisation.'
  if (!f.area) e.area = 'Please select a research area.'
  if (f.topic.trim().length < 5) e.topic = 'Please give your proposed topic a short title.'
  if (f.description.trim().length < 80) e.description = 'Please describe the topic and objectives in at least 80 characters.'
  if (!f.collabType) e.collabType = 'Please select the type of collaboration.'
  if (!f.consent) e.consent = 'Please confirm you agree to us using your details to respond.'
  return e
}

export function CollaborationForm() {
  const [f, setF] = useState<Fields>(init)
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef(Date.now())
  const statusRef = useRef<HTMLDivElement>(null)

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
      setState('error'); setMsg(`Please correct the ${Object.keys(errs).length} highlighted field(s).`)
      document.getElementById(`col-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    if (!site.integrations.web3formsKey) {
      setState('error'); setMsg(`Online requests are not connected yet. Please email ${site.contact.email}.`); focusStatus(); return
    }
    if (honeypot || Date.now() - startedAt.current < 5000) {
      setState('error'); setMsg('Your request could not be sent. Please wait a moment and try again.'); return
    }
    setState('sending')
    try {
      await submitToWeb3Forms({
        subject: `[Research collaboration] ${f.topic.trim()} — ${f.organisation.trim()}`,
        'Name': f.name.trim(),
        email: f.email.trim(),
        'Phone': f.phone.trim() || '—',
        'Designation / Role': f.designation.trim(),
        'Organisation': f.organisation.trim(),
        'Organisation type': f.orgType,
        'Country': f.country.trim() || '—',
        'Research area': f.area,
        'Proposed topic': f.topic.trim(),
        'Description & objectives': f.description.trim(),
        'Collaboration type': f.collabType,
        'Data availability': f.data || '—',
        'Funding status': f.funding || '—',
        'Expected timeline': f.timeline || '—',
        'Links (papers, lab page, proposal)': f.links.trim() || '—',
        'Consent': 'Yes — agreed to privacy policy',
      })
      setState('success'); setF(init)
    } catch {
      setState('error'); setMsg(`Sorry, your request could not be sent. Please try again or email ${site.contact.email}.`)
    }
    focusStatus()
  }

  if (state === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card flex flex-col items-start gap-4 p-8 outline-none">
        <Icon name="check" className="h-10 w-10 text-emerald-500" />
        <h3 className="text-2xl font-semibold">Request received</h3>
        <p className="text-muted">Thank you for your collaboration proposal. It has been sent to our research team, and we will reply by email.</p>
        <button type="button" onClick={() => setState('idle')} className="font-semibold text-brand">Submit another topic</button>
      </div>
    )
  }

  const input = 'mt-2 block w-full rounded-xl border bg-surface px-4 py-3 text-fg placeholder:text-muted/70 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30'
  const b = (k: Key) => (errors[k] ? 'border-red-500' : 'border-line')
  const aria = (k: Key) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `col-${k}-error` } : {})
  const err = (k: Key) => (errors[k] ? <p id={`col-${k}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors[k]}</p> : null)
  const label = (k: Key, text: ReactNode, optional = false) => (
    <label htmlFor={`col-${k}`} className="text-sm font-semibold">
      {text} {optional ? <span className="font-normal text-muted">(optional)</span> : <span aria-hidden="true" className="text-red-500">*</span>}
    </label>
  )
  const text = (k: Exclude<Key, 'consent'>, l: string, opts: { optional?: boolean; full?: boolean } & React.InputHTMLAttributes<HTMLInputElement> = {}) => {
    const { optional, full, ...rest } = opts
    return (
      <div className={full ? 'sm:col-span-2' : ''}>
        {label(k, l, optional)}
        <input id={`col-${k}`} name={k} value={f[k] as string} onChange={(e) => set(k, e.target.value)} className={`${input} ${optional ? 'border-line' : b(k)}`} {...aria(k)} {...rest} />
        {err(k)}
      </div>
    )
  }
  const select = (k: Exclude<Key, 'consent'>, l: string, options: string[], opts: { optional?: boolean; full?: boolean } = {}) => (
    <div className={opts.full ? 'sm:col-span-2' : ''}>
      {label(k, l, opts.optional)}
      <select id={`col-${k}`} name={k} value={f[k] as string} onChange={(e) => set(k, e.target.value)} className={`${input} ${opts.optional ? 'border-line' : b(k)}`} {...aria(k)}>
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {err(k)}
    </div>
  )
  const o = collaborationOptions

  return (
    <form noValidate onSubmit={onSubmit} className="card p-6 sm:p-8" aria-labelledby="collab-form-title">
      <h3 id="collab-form-title" className="text-2xl font-semibold">Propose a research topic</h3>
      <p className="mt-2 text-sm text-muted">Tell us about the problem you want to work on together. Fields marked <span className="text-red-500">*</span> are required.</p>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state === 'error' && (
          <p className="mt-4 flex gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />{msg}
          </p>
        )}
      </div>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-semibold">1. About you</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {text('name', 'Full name', { autoComplete: 'name', maxLength: 100 })}
          {text('email', 'Email', { type: 'email', autoComplete: 'email', maxLength: 200 })}
          {text('designation', 'Designation / Role', { placeholder: 'e.g. Associate Professor, Radiologist, PhD scholar', maxLength: 120 })}
          {text('phone', 'Phone', { optional: true, type: 'tel', autoComplete: 'tel', maxLength: 20 })}
          {text('organisation', 'Organisation / Institution', { autoComplete: 'organization', maxLength: 150 })}
          {select('orgType', 'Organisation type', o.orgTypes)}
          {text('country', 'Country', { optional: true, autoComplete: 'country-name', maxLength: 60 })}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-semibold">2. Proposed topic</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {select('area', 'Research area', o.areas, { full: true })}
          {text('topic', 'Topic title', { full: true, placeholder: 'e.g. Graph neural networks for early Alzheimer’s detection from multimodal MRI', maxLength: 200 })}
          <div className="sm:col-span-2">
            {label('description', 'Description & objectives')}
            <textarea id="col-description" name="description" rows={6} maxLength={4000} value={f.description} onChange={(e) => set('description', e.target.value)} placeholder="The research question, what you hope to achieve, and how we could contribute." className={`${input} ${b('description')} resize-y`} {...aria('description')} />
            {err('description')}
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-semibold">3. Collaboration details</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {select('collabType', 'Type of collaboration', o.types)}
          {select('data', 'Data availability', o.data, { optional: true })}
          {select('funding', 'Funding status', o.funding, { optional: true })}
          {select('timeline', 'Expected start', o.timelines, { optional: true })}
          {text('links', 'Relevant links', { optional: true, full: true, placeholder: 'Papers, lab website, proposal document (Google Drive) — separate with commas', maxLength: 600 })}
        </div>
      </fieldset>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="col-website">Leave this field empty</label>
        <input id="col-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="mt-8">
        <div className="flex items-start gap-3">
          <input id="col-consent" type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#1f5eff]" {...aria('consent')} />
          <label htmlFor="col-consent" className="text-sm text-muted">
            I agree that {site.name} may use these details to review my proposal and contact me, as described in the <Link to="/privacy-policy" className="text-brand underline underline-offset-4">privacy policy</Link>. Please do not include patient-identifiable or confidential data in this form. <span aria-hidden="true" className="text-red-500">*</span>
          </label>
        </div>
        {err('consent')}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === 'sending'} className="bg-brand-gradient inline-flex min-h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60">
          {state === 'sending' ? <><Icon name="loader" className="h-4 w-4 animate-spin" />Sending…</> : <>Submit proposal<Icon name="send" className="h-4 w-4" /></>}
        </button>
        <p className="text-xs text-muted">Prefer email? Write to <a className="text-brand underline underline-offset-4" href={`mailto:${site.contact.email}?subject=${encodeURIComponent('Research collaboration')}`}>{site.contact.email}</a>.</p>
      </div>
    </form>
  )
}
