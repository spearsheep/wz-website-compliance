/**
 * Complexity Detector — fetches a URL's HTML and counts the signals
 * that drive audit difficulty (and therefore audit cost).
 *
 * Operates on raw HTML via regex rather than a full DOM parser:
 * - No new dependencies (cheerio adds ~500kb)
 * - Counts are approximate but consistent — good enough for pricing
 * - Resilient to malformed markup (which is common on the sites we audit)
 */

import type { SiteComplexity } from "./quote-engine"

// Known third-party scripts that indicate embedded widgets
const WIDGET_SIGNATURES = [
  /maps\.googleapis\.com/i,
  /maps\.google\.com/i,
  /calendly\.com/i,
  /intercom\.io/i,
  /intercomcdn\.com/i,
  /tawk\.to/i,
  /drift\.com/i,
  /zendesk\.com/i,
  /hubspot\.com\/hubspot/i,
  /js\.stripe\.com/i,
  /squareup\.com/i,
  /paypal\.com\/sdk/i,
  /assets\.calendly/i,
  /typeform\.com/i,
  /jotform\.com/i,
  /opentable\.com/i,
  /resy\.com/i,
  /mindbodyonline\.com/i,
  /vagaro\.com/i,
  /acuityscheduling/i,
  /youtube\.com\/embed/i,
  /player\.vimeo\.com/i,
  /wistia\.com/i,
]

function countMatches(html: string, regex: RegExp): number {
  const m = html.match(regex)
  return m ? m.length : 0
}

function countUnique(html: string, regex: RegExp): number {
  const matches = html.match(regex)
  if (!matches) return 0
  return new Set(matches).size
}

export async function detectComplexity(url: string): Promise<SiteComplexity> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30_000)

  let html = ""
  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; JobsJuniorComplianceBot/1.0; +https://jobsjr-compliance.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    })
    clearTimeout(timeoutId)
    if (!res.ok) {
      return fallbackComplexity()
    }
    html = await res.text()
  } catch {
    clearTimeout(timeoutId)
    return fallbackComplexity()
  }

  // ─── COUNTS ──────────────────────────────────────────
  // Forms
  const forms = countMatches(html, /<form\b/gi)

  // Interactive components — buttons, dialog roles, dropdown patterns
  const buttons = countMatches(html, /<button\b/gi)
  const dialogRoles = countMatches(html, /role=["']dialog["']/gi)
  const tabRoles = countMatches(html, /role=["']tab(panel)?["']/gi)
  const menuRoles = countMatches(html, /role=["']menu(item)?["']/gi)
  const accordions = countMatches(
    html,
    /(aria-expanded=|class=["'][^"']*accordion)/gi,
  )
  const interactiveComponents =
    buttons + dialogRoles + tabRoles + menuRoles + accordions

  // Images
  const imgTags = countMatches(html, /<img\b/gi)
  const bgImages = countMatches(html, /background-image\s*:/gi)
  const images = imgTags + bgImages

  // Videos
  const videoTags = countMatches(html, /<video\b/gi)
  const youtubeEmbeds = countMatches(html, /youtube\.com\/embed\//gi)
  const vimeoEmbeds = countMatches(html, /player\.vimeo\.com\/video\//gi)
  const wistiaEmbeds = countMatches(html, /wistia\.com\/embed\//gi)
  const videos = videoTags + youtubeEmbeds + vimeoEmbeds + wistiaEmbeds

  // PDFs linked from page
  const pdfs = countUnique(html, /href=["'][^"']+\.pdf(\?[^"']*)?["']/gi)

  // Third-party widgets
  let thirdPartyWidgets = 0
  for (const sig of WIDGET_SIGNATURES) {
    if (sig.test(html)) thirdPartyWidgets++
  }

  // ─── PAGE COUNT ESTIMATE ─────────────────────────────
  // Sitemap is the most reliable source — try fetching it
  const pages = await estimatePageCount(url, html)

  return {
    pages,
    forms,
    interactiveComponents,
    images,
    videos,
    pdfs,
    thirdPartyWidgets,
  }
}

// ─── PAGE COUNT ESTIMATION ─────────────────────────────
async function estimatePageCount(url: string, html: string): Promise<number> {
  // Try sitemap.xml — gives authoritative page count when available
  try {
    const u = new URL(url)
    const sitemapUrl = `${u.protocol}//${u.host}/sitemap.xml`
    const res = await fetch(sitemapUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "JobsJuniorComplianceBot/1.0" },
    })
    if (res.ok) {
      const xml = await res.text()
      const urlCount = countMatches(xml, /<url>/gi)
      const locCount = countMatches(xml, /<loc>/gi)
      const count = Math.max(urlCount, locCount)
      if (count > 0) return Math.min(count, 500) // cap at 500 for SMB sites
    }
  } catch {
    // Fall through to internal-link heuristic
  }

  // Fallback — count unique internal anchor hrefs on the homepage
  try {
    const u = new URL(url)
    const internalLinkRegex = new RegExp(
      `href=["'](https?://${u.host.replace(/\./g, "\\.")})?[^"']*["']`,
      "gi",
    )
    const matches = html.match(internalLinkRegex)
    if (matches) {
      const unique = new Set(
        matches
          .map((m) => m.replace(/href=["']/i, "").replace(/["']$/, ""))
          .filter((h) => !h.startsWith("#") && !h.startsWith("mailto:")),
      )
      return Math.min(Math.max(unique.size, 1), 200)
    }
  } catch {
    // ignore
  }

  return 5 // conservative fallback
}

function fallbackComplexity(): SiteComplexity {
  // Used when we can't fetch the page (CORS, 403, etc.) — give a
  // mid-range estimate so the quote isn't laughably small.
  return {
    pages: 15,
    forms: 2,
    interactiveComponents: 8,
    images: 25,
    videos: 1,
    pdfs: 2,
    thirdPartyWidgets: 2,
  }
}
