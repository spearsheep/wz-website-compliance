import fs from "node:fs"
import path from "node:path"

export type Sector = "B2C" | "B2B"
export type FailureType =
  | "alt-text"
  | "contrast"
  | "keyboard"
  | "captions"
  | "form-labels"
  | "screen-reader"
  | "focus-order"
  | "link-text"
  | "headings"
  | "modal"
  | "documents"
  | "general"

interface RawSource {
  name: string
  url: string
  tier: number
}

interface RawLawsuit {
  case_name: string
  slug: string
  court: string
  docket?: string
  year_filed: number
  year_resolved: number | null
  industry: string
  defendant_name: string
  defendant_size?: string
  claim_type: string
  wcag_violations_alleged: string[]
  outcome: string
  settlement_disclosed: number | string | null
  estimated_defense_cost: string
  tier: number
  hero_anchor?: boolean
  sources: RawSource[]
  use_in_report?: boolean
  summary_one_line: string
  notes?: string
}

export interface Violation {
  type: FailureType
  wcag: string
  description: string
}

export interface Lawsuit {
  slug: string
  defendant: string
  caseName: string
  court: string
  docket?: string
  yearFiled: number
  yearResolved: number
  industry: string
  industryLabel: string
  sector: Sector
  oneLine: string
  summary: string
  outcome: string
  defenseCost: string
  cost: string
  costType: string
  settlementAmount: number | null
  violations: Violation[]
  rawViolations: string[]
  notes?: string
  sources: RawSource[]
  tier: number
  accent: string
}

const VIOLATION_MAP: Record<
  string,
  { type: FailureType; wcag: string; description: string }
> = {
  "alt-text-missing": {
    type: "alt-text",
    wcag: "1.1.1 Non-text Content",
    description:
      "Product images and key visuals had no alt text — screen readers announced 'image' or the file name instead of describing what users were looking at.",
  },
  "keyboard-nav": {
    type: "keyboard",
    wcag: "2.1.1 Keyboard",
    description:
      "Core interactions required a mouse. Keyboard-only users could not navigate menus, complete checkout, or operate widgets.",
  },
  "screen-reader-incompatible": {
    type: "screen-reader",
    wcag: "4.1.2 Name, Role, Value",
    description:
      "Custom controls had no ARIA roles, so screen readers could not announce what they were or what state they were in.",
  },
  "missing-captions": {
    type: "captions",
    wcag: "1.2.2 Captions (Prerecorded)",
    description:
      "Audio and video content had no closed captions — deaf and hard-of-hearing users got no access to the dialogue.",
  },
  "inaccurate-captions": {
    type: "captions",
    wcag: "1.2.2 Captions (Prerecorded)",
    description:
      "Captions existed but were machine-generated and full of errors — effectively useless for deaf users.",
  },
  "audio-description-missing": {
    type: "captions",
    wcag: "1.2.5 Audio Description",
    description:
      "Video content with significant visual storytelling had no audio description track for blind viewers.",
  },
  "popup-inaccessible": {
    type: "modal",
    wcag: "4.1.2 Name, Role, Value",
    description:
      "Pop-ups appeared without notifying screen readers, trapped keyboard focus, or had no way to dismiss without a mouse.",
  },
  "inaccessible-menus": {
    type: "screen-reader",
    wcag: "4.1.2 Name, Role, Value",
    description:
      "Dropdown menus were built as plain divs with no ARIA — keyboard and screen-reader users could not open them or choose options.",
  },
  "dead-links": {
    type: "link-text",
    wcag: "2.4.4 Link Purpose",
    description:
      "Broken or non-functional links left screen-reader users navigating into dead-ends with no feedback.",
  },
  "redundant-links": {
    type: "link-text",
    wcag: "2.4.4 Link Purpose",
    description:
      "Same destination linked multiple times with no distinguishing labels — disorienting for screen-reader users navigating by link list.",
  },
  "empty-links": {
    type: "link-text",
    wcag: "2.4.4 Link Purpose",
    description:
      "Links contained only an image or no text at all — screen readers announced 'link' with no information about where it went.",
  },
  "pdf-inaccessible": {
    type: "documents",
    wcag: "1.1.1 Non-text Content",
    description:
      "Critical documents — bills, statements, records — were posted as scanned PDFs that screen readers could not parse.",
  },
  "alternative-format-missing": {
    type: "documents",
    wcag: "1.1.1 Non-text Content",
    description:
      "Required communications were available only in inaccessible formats — no Braille, large print, or screen-reader-readable digital alternative.",
  },
  "captcha-inaccessible": {
    type: "form-labels",
    wcag: "1.1.1 Non-text Content",
    description:
      "CAPTCHAs were visual-only with no audio or accessible alternative — blocking blind users from signing up or logging in.",
  },
  "mobile-app-inaccessible": {
    type: "keyboard",
    wcag: "4.1.2 Name, Role, Value",
    description:
      "The mobile app had unlabeled buttons and broken VoiceOver/TalkBack support — blind users could not operate it.",
  },
  "wcag-2-1-aa-general": {
    type: "general",
    wcag: "WCAG 2.1 AA",
    description:
      "Multiple violations across the full WCAG 2.1 Level AA spec — the site failed to meet the federal de-facto standard for accessibility.",
  },
  "wcag-2-2-aa-general": {
    type: "general",
    wcag: "WCAG 2.2 AA",
    description:
      "Multiple violations across the full WCAG 2.2 Level AA spec — including newer criteria like target size and focus-appearance.",
  },
}

const INDUSTRY_LABELS: Record<string, string> = {
  "retail-ecommerce": "Retail / E-commerce",
  "retail-specialty": "Specialty Retail",
  "retail-appliance-ecommerce": "Appliances / E-commerce",
  "retail-furniture": "Furniture Retail",
  "food-service": "Restaurant",
  "food-delivery-ecommerce": "Food Delivery",
  "grocery-retail": "Grocery Retail",
  "grocery-ecommerce": "Online Grocery",
  "streaming-entertainment": "Streaming",
  "entertainment-media": "Entertainment",
  "media-news": "Media / News",
  "healthcare-beauty": "Healthcare / Beauty",
  "higher-education": "Higher Education",
  "accounting": "Accounting",
  "insurance": "Insurance",
  "financial-services": "Financial Services",
  "healthcare": "Healthcare",
  "government-public-sector": "Government",
  "other-b2b": "B2B Software",
}

const ACCENT_BY_INDUSTRY: Record<string, string> = {
  "retail-ecommerce": "#DC2626",
  "retail-specialty": "#DC2626",
  "retail-appliance-ecommerce": "#DC2626",
  "retail-furniture": "#7C3AED",
  "food-service": "#C2410C",
  "food-delivery-ecommerce": "#C2410C",
  "grocery-retail": "#B45309",
  "grocery-ecommerce": "#B45309",
  "streaming-entertainment": "#E50914",
  "entertainment-media": "#0F172A",
  "media-news": "#1D4ED8",
  "healthcare-beauty": "#BE185D",
  "higher-education": "#A41034",
  "accounting": "#115E59",
  "insurance": "#1E40AF",
  "financial-services": "#015DF1",
  "healthcare": "#078250",
  "government-public-sector": "#475569",
  "other-b2b": "#4F46E5",
}

// Cases stored in /research/b2b-lawsuits/ vs /research/lawsuits/. We rely on
// known B2B slugs to classify. New B2B cases must be added here.
const B2B_SLUGS = new Set<string>([
  "aicpa-nasba-cpa-exam-doj",
  "bone-v-unc-health-care",
  "doj-service-oklahoma-mobile-app",
  "doj-v-medstar-health",
  "doj-v-springfield-clinic-b2b",
  "fowler-v-california-dept-insurance",
  "frazier-v-hca-holdings",
  "mckenney-v-exact-care-pharmacy",
  "morgan-lewis-financial-services-wave",
  "nash-hospitals-blind-patient",
  "nfb-v-epic-systems",
  "schwab-blind-clients-structured-negotiation",
  "tenet-healthcare-american-blind-community",
  "wellpoint-anthem-structured-negotiation",
])

function parseSettlementAmount(raw: number | string | null): number | null {
  if (raw === null) return null
  if (typeof raw === "number") return raw
  const match = String(raw).replace(/[,$]/g, "").match(/\d+/)
  return match ? Number(match[0]) : null
}

function formatCost(raw: number | string | null): { display: string; type: string } {
  if (raw === null) return { display: "Undisclosed", type: "Settlement" }
  if (typeof raw === "number") {
    if (raw >= 1_000_000) return { display: `$${(raw / 1_000_000).toFixed(raw % 1_000_000 === 0 ? 0 : 2).replace(/\.?0+$/, "")}M`, type: "Settlement" }
    if (raw >= 1_000) return { display: `$${(raw / 1_000).toFixed(0)}K`, type: "Settlement" }
    return { display: `$${raw.toLocaleString()}`, type: "Settlement" }
  }
  // raw is a descriptive string
  const trimmed = raw.length > 64 ? raw.slice(0, 60) + "…" : raw
  return { display: trimmed, type: "Settlement" }
}

function mapViolations(rawIds: string[]): Violation[] {
  const seen = new Set<string>()
  const out: Violation[] = []
  for (const id of rawIds) {
    const v = VIOLATION_MAP[id]
    if (!v) continue
    if (seen.has(v.type)) continue
    seen.add(v.type)
    out.push({ ...v })
  }
  return out
}

const LAWSUITS_DIR = path.join(process.cwd(), "content", "lawsuits")

let cachedLawsuits: Lawsuit[] | null = null

function loadLawsuits(): Lawsuit[] {
  if (cachedLawsuits) return cachedLawsuits
  if (!fs.existsSync(LAWSUITS_DIR)) {
    cachedLawsuits = []
    return cachedLawsuits
  }
  const files = fs.readdirSync(LAWSUITS_DIR).filter((f) => f.endsWith(".json"))
  const cases: Lawsuit[] = files
    .map((file) => {
      const raw = JSON.parse(fs.readFileSync(path.join(LAWSUITS_DIR, file), "utf8")) as RawLawsuit
      const settlement = parseSettlementAmount(raw.settlement_disclosed)
      const { display: cost, type: costType } = formatCost(raw.settlement_disclosed)
      const yearResolved = raw.year_resolved || raw.year_filed
      const sector: Sector = B2B_SLUGS.has(raw.slug) ? "B2B" : "B2C"
      return {
        slug: raw.slug,
        defendant: raw.defendant_name,
        caseName: raw.case_name,
        court: raw.court,
        docket: raw.docket,
        yearFiled: raw.year_filed,
        yearResolved,
        industry: raw.industry,
        industryLabel: INDUSTRY_LABELS[raw.industry] || raw.industry,
        sector,
        oneLine: raw.summary_one_line,
        summary: raw.notes ? `${raw.claim_type}\n\n${raw.notes}` : raw.claim_type,
        outcome: raw.outcome,
        defenseCost: raw.estimated_defense_cost,
        cost,
        costType,
        settlementAmount: settlement,
        violations: mapViolations(raw.wcag_violations_alleged || []),
        rawViolations: raw.wcag_violations_alleged || [],
        notes: raw.notes,
        sources: raw.sources || [],
        tier: raw.tier,
        accent: ACCENT_BY_INDUSTRY[raw.industry] || "#015DF1",
      } satisfies Lawsuit
    })
    // Sort: cases with disclosed dollar settlements first (largest to smallest),
    // then everything else by tier then year.
    .sort((a, b) => {
      const aHasAmount = a.settlementAmount != null
      const bHasAmount = b.settlementAmount != null
      if (aHasAmount && !bHasAmount) return -1
      if (!aHasAmount && bHasAmount) return 1
      if (aHasAmount && bHasAmount) {
        return (b.settlementAmount as number) - (a.settlementAmount as number)
      }
      if (a.tier !== b.tier) return a.tier - b.tier
      if (a.yearResolved !== b.yearResolved) return b.yearResolved - a.yearResolved
      return a.slug.localeCompare(b.slug)
    })
  cachedLawsuits = cases
  return cases
}

export function getAllLawsuits(): Lawsuit[] {
  return loadLawsuits()
}

export function getLawsuitBySlug(slug: string): Lawsuit | undefined {
  return loadLawsuits().find((l) => l.slug === slug)
}

export function getLawsuitsBySector(sector: Sector): Lawsuit[] {
  return loadLawsuits().filter((l) => l.sector === sector)
}

export function getTotalKnownSettlements(): number {
  return loadLawsuits().reduce((sum, l) => sum + (l.settlementAmount ?? 0), 0)
}
