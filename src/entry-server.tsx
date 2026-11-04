import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { getPageMeta, notFoundMeta, pages } from './data/pages'
import { renderHead } from './utils/seo'

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  const meta = url === '/404' ? notFoundMeta : getPageMeta(url)
  return { html, head: renderHead(meta) }
}

export const routes = pages
