import { site } from '@/config/site'

/** Sends a submission to Web3Forms, which emails it to the inbox registered for the access key. */
export async function submitToWeb3Forms(payload: Record<string, string>): Promise<void> {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: site.integrations.web3formsKey, from_name: `${site.name} website`, botcheck: '', ...payload }),
  })
  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok || !data.success) throw new Error(data.message || `Request failed (${res.status})`)
}
