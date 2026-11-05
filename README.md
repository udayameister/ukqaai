# UKQAAI Technologies — Official Website

Official corporate website of **UKQAAI Technologies**: AI, machine learning, software engineering, EdTech and research innovation.

- **Live site:** https://www.ukqaai.com
- **Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · React Router 7 · Lucide icons
- **Hosting:** GitHub Pages, deployed automatically by GitHub Actions on every push to `main`

Every page is **prerendered to static HTML** at build time, so each URL has its own title, description, Open Graph tags, canonical link and Schema.org data, and is fully readable by search engines. React then takes over in the browser for fast navigation.

---

## 1. Run it on your computer

Requirements: [Node.js 22](https://nodejs.org) and Git.

```bash
git clone https://github.com/udayameister/ukqaai.git
cd ukqaai
npm install        # install dependencies (first time only)
npm run dev        # local dev server at http://localhost:5173
npm run build      # type-check + production build + prerender into dist/
npm run preview    # preview the production build at http://localhost:4173
```

## 2. Publish an update (the permanent workflow)

1. Edit the files (see section 3 for where things live).
2. Check locally with `npm run dev` (and optionally `npm run build`).
3. Commit and push:

```bash
git add .
git commit -m "Update website"
git push origin main
```

4. GitHub Actions builds the site (**Actions** tab → *Build and deploy to GitHub Pages*).
5. When the run is green, the change is live at **https://www.ukqaai.com**, usually within 1–3 minutes.

If a run fails, the site keeps showing the last good version. Open the failed run, read the red step, fix, and push again. You can also re-run it manually with **Run workflow** (workflow_dispatch).

## 3. Where to change things

All content lives in plain data files — no design changes needed for content updates.

| What | File |
|---|---|
| Company name, tagline, **contact email**, phone, address, social links, founder profile, incorporation flag | `src/config/site.ts` |
| Homepage text (hero, "Why choose", tech stack, process) | `src/pages/Home.tsx` |
| Services (6 pages generated automatically) and their status labels | `src/data/services.ts` |
| Product cards (add a new object to add a product) | `src/data/products.ts` |
| Research areas and publications | `src/data/research.ts` |
| Industries | `src/data/industries.ts` |
| Header / footer navigation | `src/data/navigation.ts` |
| **SEO** titles and descriptions for every page | `src/data/pages.ts` |
| Privacy, terms, cookie, disclaimer, accessibility text | `src/data/legal.ts` |
| Job openings / internships (each gets its own page + application form; set `open: false` to close) | `src/data/careers.ts` |
| Research collaboration form options (areas, collaboration types…) | `collaborationOptions` in `src/components/CollaborationForm.tsx` |
| Office address and Google Map location | `contact.address`, `contact.mapQuery` in `src/config/site.ts` |
| Colours, fonts (DM Sans, self-hosted), design tokens | `src/styles/index.css` (top of file) |
| Logo component / favicon / social image | `src/components/Logo.tsx`, `public/favicon.svg`, `public/images/og-image.png` |
| Images | put files in `public/images/` and reference them as `/images/name.png` |

Notes:
- **Incorporation:** while `incorporated: false` in `site.ts`, the site never shows "Private Limited". Set it to `true` once the company is registered.
- **Service maturity:** each service has `status: 'available' | 'developing' | 'research'`. Change it as offerings mature; badges update everywhere.
- **New page:** add a component in `src/pages/`, a `<Route>` in `src/App.tsx` and an entry in `src/data/pages.ts` (that also adds it to the sitemap).
- Empty values (phone, address, social URLs) are simply hidden.

## 4. Contact form and analytics (optional settings)

GitHub Pages only hosts static files, so the contact form posts to **[Web3Forms](https://web3forms.com)** (free), which emails each submission to you.

1. Go to web3forms.com, enter the inbox that should receive enquiries, and copy the **access key** it emails you.
2. In GitHub: **Settings → Secrets and variables → Actions → Variables → New repository variable**
   - Name `VITE_WEB3FORMS_ACCESS_KEY`, value = your key.
3. Re-run the workflow (or push any change).

The current key (form "UKQAAI Website", delivering to info@ukqaai.com) is set in `src/config/site.ts`; a `VITE_WEB3FORMS_ACCESS_KEY` repository variable overrides it. Until a key is set, the form clearly says it is not connected and shows the email address — it never shows a false "sent" message. Spam protection: honeypot field, minimum fill time, server-side checks by Web3Forms, plus validation and a required consent checkbox.

**Google Analytics 4 (optional):** add a repository variable `VITE_GA_MEASUREMENT_ID` (e.g. `G-XXXXXXXXXX`). A consent banner then appears, and GA loads only after a visitor clicks *Accept*. Without the variable, the site loads no tracking scripts and sets no cookies.

For local testing, copy `.env.example` to `.env.local` and fill in the values. Never commit `.env.local`.

### Where form submissions go

All three forms send email to **info@ukqaai.com** through Web3Forms (free plan: 250 submissions/month):

| Form | Page | Email subject |
|---|---|---|
| Contact | `/contact` | `[ukqaai.com] <subject>` |
| Internship application | `/careers/<job-slug>` | `[Internship application] <name> — <track>` |
| Research collaboration | `/research#collaborate` | `[Research collaboration] <topic> — <organisation>` |

## 5. One-time GitHub Pages setup

1. Repository → **Settings → Pages**
2. **Build and deployment → Source:** select **GitHub Actions**.
3. **Custom domain:** enter `www.ukqaai.com` → **Save**. (With Actions deployments the domain must be set here; the `public/CNAME` file is kept as a record of it.)
4. After DNS is working and GitHub shows the certificate is ready, tick **Enforce HTTPS**.
5. Recommended: verify the domain at **Your profile → Settings → Pages → Add a domain** (GitHub gives you a TXT record to add at GoDaddy). This prevents domain takeover.

## 6. GoDaddy DNS for www.ukqaai.com

GoDaddy → **My Products → ukqaai.com → DNS → Manage DNS**.

**First, look at the existing records.** Do **not** delete `MX`, `TXT` (SPF / DKIM / DMARC / verification), `SRV` or any email-related `CNAME` records. Only remove records that conflict with the website:
- the GoDaddy "Parked" `A` record on `@`, and any other `A`/`AAAA` record on `@` that is not listed below;
- an existing `CNAME` on `www` (replace it);
- any **Forwarding** set up for the domain (Domain → Forwarding), which overrides these records.

Add these records (TTL: 1 hour / default):

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | udayameister.github.io |

The `www` CNAME points to `udayameister.github.io` — **without** the repository name. With both apex and www configured, GitHub automatically redirects `ukqaai.com` → `https://www.ukqaai.com` (the canonical address).

**Check propagation** (can take from minutes up to 24–48 hours):

```bash
dig www.ukqaai.com +noall +answer      # → CNAME udayameister.github.io
dig ukqaai.com +noall +answer -t A     # → the four 185.199.x.153 addresses
```

Then return to **Settings → Pages**: wait for "DNS check successful", wait for the HTTPS certificate, and tick **Enforce HTTPS**.

## 7. SEO checklist after launch

- Add the site to **Google Search Console** (Domain property → verify with a TXT record at GoDaddy) and submit `https://www.ukqaai.com/sitemap.xml`.
- Add it to **Bing Webmaster Tools** (it can import from Search Console).
- Test the social preview with LinkedIn Post Inspector / an X card validator.
- `sitemap.xml` and `robots.txt` are regenerated on every build from `src/data/pages.ts`.

## 8. Project structure

```
src/
  components/   reusable UI (Logo, cards, form, SEO, icons)
  layouts/      header, footer, page shell
  pages/        one file per page
  sections/     larger home-page sections (hero visual)
  data/         all editable content + SEO metadata
  config/       site.ts — company-wide settings
  hooks/        scroll / reveal behaviour
  utils/        SEO + analytics helpers
  styles/       Tailwind + design tokens
  entry-client.tsx / entry-server.tsx   browser and prerender entries
scripts/prerender.mjs   writes per-page HTML, 404.html, sitemap.xml, robots.txt
public/                 favicon, icons, images, CNAME, manifest
.github/workflows/deploy.yml   CI/CD to GitHub Pages
```

## 9. Ready for later

The data-driven structure leaves room for a CMS (e.g. a headless CMS feeding the `src/data` files), a blog, publications database, testimonials, job listings, newsletter, multilingual content, chatbot, CRM or client portal — without rebuilding the site. Backend features need an external service, because GitHub Pages cannot run server code.

## 10. Security notes

- No secrets are stored in the repository. Build-time values come from GitHub Actions variables.
- The Web3Forms access key is designed to be public in browser code; it can only send email to your registered inbox.
- GitHub Pages does not allow custom HTTP security headers; the site sets a strict referrer policy, uses HTTPS only, and loads no third-party scripts unless analytics is enabled and accepted.
