// Renders every route to static HTML so each page has its own <title>, meta tags,
// structured data and crawlable content on GitHub Pages. Also writes sitemap.xml and robots.txt.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const SITE = 'https://www.ukqaai.com'

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render, routes } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const write = (url, outFile) => {
  const { html, head } = render(url)
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, page)
}

for (const r of routes) {
  const out = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, r.path.slice(1), 'index.html')
  write(r.path, out)
  console.log('  prerendered', r.path)
}
write('/404', path.join(dist, '404.html'))
console.log('  prerendered /404 -> 404.html')

const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .filter((r) => !r.noindex)
  .map((r) => {
    const loc = r.path === '/' ? `${SITE}/` : `${SITE}${r.path}/`
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq ?? 'monthly'}</changefreq>\n    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>\n  </url>`
  })
  .join('\n')
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
fs.writeFileSync(path.join(dist, '.nojekyll'), '')
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`  sitemap.xml with ${routes.filter((r) => !r.noindex).length} URLs, robots.txt written`)
