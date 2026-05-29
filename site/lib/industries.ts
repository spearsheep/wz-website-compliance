export interface IndustryConcern {
  title: string
  description: string
  /** Short severity tag shown as badge (e.g. "Screen reader: blocked") */
  severity?: string
}

export interface IndustryStat {
  value: string
  label: string
}

export interface Industry {
  slug: string
  /** Full display name */
  name: string
  /** Short label for nav */
  shortName: string
  /** Tagline shown under name in dropdown */
  oneLiner: string
  /** Hero description — 1 sentence, plain English, no jargon */
  description: string
  /** Why this industry is targeted — single paragraph (legacy, used as fallback) */
  whyTargeted: string
  /** Structured bullet points for "why targeted" — 2-3 short reasons */
  whyTargetedPoints: string[]
  /** Brief risk callout for small businesses — 1-2 sentences, bridges "big company lawsuits" to "your practice" */
  riskCallout: string
  /** Industry codes (from lawsuit JSON `industry` field) that belong here */
  caseIndustryCodes: string[]
  /** Stats specific to this industry — prefer concrete numbers, avoid vague labels */
  stats: IndustryStat[]
  /** Specific WCAG/compliance concerns for this industry */
  concerns: IndustryConcern[]
  /** Brand color */
  accent: string
  /** Lucide icon name */
  icon: "ShoppingBag" | "UtensilsCrossed" | "Stethoscope" | "GraduationCap" | "Tv" | "Landmark" | "Building2" | "Cpu"
  /** Optional deadline for countdown display (ISO date string) */
  deadline?: string
  /** Optional deadline label */
  deadlineLabel?: string
}

export const industries: Industry[] = [
  {
    slug: "retail",
    name: "Retail & E-commerce",
    shortName: "Retail",
    oneLiner: "Most-sued sector. Target, Fashion Nova, Hobby Lobby.",
    description:
      "Online stores are the #1 target for ADA lawsuits — and plaintiff firms know exactly which platforms to scan.",
    whyTargeted:
      "Product images without descriptions are an easy violation to allege. Checkout flows that depend on a mouse fail keyboard tests. And every state with strong consumer-protection laws (California, New York, Florida) has plaintiff firms specializing in retail.",
    whyTargetedPoints: [
      "Product images without descriptions are the easiest violation to file against — one missing alt tag can trigger a lawsuit.",
      "Checkout flows built for mouse users fail keyboard-only tests, which is a documented WCAG violation.",
      "Plaintiff firms in California, New York, and Florida specialize in retail and scan Shopify stores at scale.",
    ],
    riskCallout: "You don't need to be Fashion Nova to get a demand letter. Plaintiff firms use automated tools to scan thousands of Shopify and WooCommerce stores — small shops are easier targets because they settle faster.",
    caseIndustryCodes: [
      "retail-ecommerce",
      "retail-specialty",
      "retail-appliance-ecommerce",
      "retail-furniture",
    ],
    stats: [
      { value: "$11M+", label: "Combined retail settlements documented" },
      { value: "32%", label: "of ADA web suits target Shopify stores" },
      { value: "2,400+", label: "ADA retail lawsuits filed in 2024" },
    ],
    concerns: [
      {
        title: "Product images need alt text",
        description:
          "Screen readers can't describe \"product-2391.jpg\" — every product image needs a real description.",
        severity: "Alt text: missing",
      },
      {
        title: "Checkout must work without a mouse",
        description:
          "Cart, shipping, payment, and review steps must all be completable by keyboard alone.",
        severity: "Keyboard: fails",
      },
      {
        title: "Cart updates must be announced",
        description:
          "When prices, quantities, or stock change dynamically, screen readers need to announce it.",
        severity: "Screen reader: silent",
      },
      {
        title: "Filters need accessible labels",
        description:
          "Size pickers, color swatches, and price sliders are invisible to assistive tech without ARIA roles.",
        severity: "ARIA: missing",
      },
    ],
    accent: "#DC2626",
    icon: "ShoppingBag",
  },
  {
    slug: "restaurants",
    name: "Restaurants & Food",
    shortName: "Restaurants",
    oneLiner: "Domino's, Five Guys, Sweetgreen. #1 most-sued sector in 2025.",
    description:
      "1 in 3 ADA web lawsuits in 2025 targeted a restaurant — the moment you added online ordering, you became a target.",
    whyTargeted:
      "Online ordering flows are full of custom controls — pizza toppings, salad ingredients, dietary modifications — that are almost always inaccessible. Loyalty programs and rewards apps add another vulnerable surface.",
    whyTargetedPoints: [
      "Online ordering menus with toppings, modifications, and allergen options almost always fail screen reader and keyboard tests.",
      "PDF and image-based menus are completely invisible to blind customers — an easy violation to prove.",
      "Third-party widgets (OpenTable, Resy, Toast) count as your responsibility — \"it's our vendor's fault\" isn't a legal defense.",
    ],
    riskCallout: "Demand letters don't just go to chains. A single-location restaurant with online ordering is just as exposed — especially if you use a platform with known accessibility gaps.",
    caseIndustryCodes: [
      "food-service",
      "food-delivery-ecommerce",
      "grocery-retail",
      "grocery-ecommerce",
    ],
    stats: [
      { value: "34.6%", label: "of 2025 ADA web suits target restaurants" },
      { value: "2×", label: "Sweetgreen sued twice in 8 years" },
      { value: "$10K+", label: "Five Guys settlement (publicly disclosed)" },
    ],
    concerns: [
      {
        title: "Online ordering customization",
        description:
          "Toppings, ingredients, and allergen selectors are usually inaccessible custom dropdowns.",
        severity: "Screen reader: blocked",
      },
      {
        title: "Menus posted as images or PDFs",
        description:
          "A PDF menu with no text layer is invisible to blind customers.",
        severity: "Alt text: missing",
      },
      {
        title: "Reservation widgets",
        description:
          "OpenTable, Resy, and SevenRooms embeds count — if they're not accessible, you're liable.",
        severity: "Keyboard: fails",
      },
      {
        title: "Loyalty app accessibility",
        description:
          "App-exclusive deals that don't work with VoiceOver create a different price for disabled customers.",
        severity: "Mobile: inaccessible",
      },
    ],
    accent: "#C2410C",
    icon: "UtensilsCrossed",
  },
  {
    slug: "healthcare",
    name: "Healthcare & Pharmacy",
    shortName: "Healthcare",
    oneLiner: "Federal deadline May 2026. Active DOJ enforcement.",
    description:
      "If you accept Medicare or Medicaid, your website must meet federal accessibility standards by May 2026 — or face enforcement.",
    whyTargeted:
      "Patient portals contain protected information that must reach the patient — not just be \"posted.\" Blind patients have a legal right to access their own medical records, billing, and prescription instructions in a format they can read.",
    whyTargetedPoints: [
      "Patient portals hold protected health information that must be accessible — posting it isn't enough if a blind patient can't read it.",
      "The DOJ is actively enforcing — MedStar, UNC Health, and Springfield were all hit with consent decrees.",
      "Practices that accept Medicare/Medicaid have a hard federal deadline, not just lawsuit risk.",
    ],
    riskCallout: "You don't need to be a hospital system. Demand letters target dental offices, dermatology practices, and therapy clinics — any practice with a patient portal or online scheduling. The deadline applies to you too.",
    caseIndustryCodes: ["healthcare", "healthcare-beauty"],
    stats: [
      { value: "$440K", label: "MedStar Health consent decree" },
      { value: "$125K", label: "UNC Health settlement" },
      { value: "May 2026", label: "Federal compliance deadline" },
    ],
    concerns: [
      {
        title: "Patient portal must work end-to-end",
        description:
          "Scheduling, records, prescriptions, and bill pay must all work with screen readers and keyboard.",
        severity: "Screen reader: blocked",
      },
      {
        title: "Medical records can't be scanned PDFs",
        description:
          "Image-only PDFs are invisible to blind patients — documents need a text layer.",
        severity: "Documents: inaccessible",
      },
      {
        title: "Telehealth needs captions",
        description:
          "Video appointments must have live captions for deaf patients — your platform choice is your responsibility.",
        severity: "Captions: missing",
      },
      {
        title: "Prescription info must be accessible",
        description:
          "Dosing, drug interactions, and allergy info must be available in accessible formats on request.",
        severity: "Content: blocked",
      },
    ],
    accent: "#078250",
    icon: "Stethoscope",
    deadline: "2026-05-01",
    deadlineLabel: "Federal compliance deadline",
  },
  {
    slug: "education",
    name: "Higher Education",
    shortName: "Education",
    oneLiner: "Harvard and MIT. Captioning is now mandatory.",
    description:
      "One complaint can trigger a federal investigation into your entire institution — Harvard paid $1.5M+ in legal fees alone.",
    whyTargeted:
      "Free public lectures, MOOCs, and recorded classes are everywhere. Almost none had captions historically. A single complaint can trigger an OCR investigation into the entire institution.",
    whyTargetedPoints: [
      "Thousands of uncaptioned videos, podcasts, and lectures are easy targets — UC Berkeley pulled 20,000+ videos rather than caption them.",
      "A single student complaint triggers an OCR investigation into the entire institution, not just the one course.",
      "Faculty-uploaded PDFs, LMS widgets, and third-party tools all count — even if you didn't build them.",
    ],
    riskCallout: "Community colleges and small universities face the same OCR standards as Harvard. One student complaint about uncaptioned lecture videos can open an investigation covering your entire digital presence.",
    caseIndustryCodes: ["higher-education"],
    stats: [
      { value: "$1.5M+", label: "Harvard legal fees paid" },
      { value: "5 years", label: "NAD v. Harvard litigation length" },
      { value: "20,000+", label: "UC Berkeley videos pulled (not captioned)" },
    ],
    concerns: [
      {
        title: "Captions for every video and podcast",
        description:
          "Auto-generated YouTube captions aren't enough — courts have specifically rejected them.",
        severity: "Captions: fails",
      },
      {
        title: "Course materials and LMS accessibility",
        description:
          "Faculty-uploaded PDFs, Canvas widgets, and publisher tools must all be accessible.",
        severity: "Documents: inaccessible",
      },
      {
        title: "Library databases and journals",
        description:
          "Inaccessible database subscriptions may require you to provide alternative access.",
        severity: "Screen reader: blocked",
      },
      {
        title: "Online testing and proctoring",
        description:
          "Exam software must support screen readers and accommodations like extra time.",
        severity: "Keyboard: fails",
      },
    ],
    accent: "#A41034",
    icon: "GraduationCap",
  },
  {
    slug: "entertainment",
    name: "Entertainment & Media",
    shortName: "Entertainment",
    oneLiner: "Netflix, Fox News, Parkwood. Video and image-heavy sites.",
    description:
      "Image-heavy, video-driven sites have the worst accessibility scores — and Netflix proved that online-only businesses are fully subject to the ADA.",
    whyTargeted:
      "Beautiful, animated, image-driven sites usually fail every WCAG criterion. Streaming platforms have to caption everything. News sites have dynamic content with broken landmarks. Celebrity and lifestyle brands get press coverage when sued, multiplying the reputational cost.",
    whyTargetedPoints: [
      "Visual-first designs with animations and image galleries fail nearly every accessibility check by default.",
      "Uncaptioned video is one of the simplest violations to prove — and streaming platforms have massive catalogs of it.",
      "Getting sued makes headlines in entertainment, which makes you a higher-value target for plaintiff firms.",
    ],
    riskCallout: "Independent media companies and content creators face the same rules as Netflix. If your site serves video or image-heavy content to the public, you're exposed.",
    caseIndustryCodes: ["streaming-entertainment", "entertainment-media", "media-news"],
    stats: [
      { value: "$795K", label: "Netflix legal fees + monitoring costs" },
      { value: "100%", label: "of Netflix catalog now captioned (post-suit)" },
      { value: "3,500+", label: "ADA media/entertainment suits since 2018" },
    ],
    concerns: [
      {
        title: "Captions on all video content",
        description:
          "Every prerecorded video needs captions; live streams need real-time captioning.",
        severity: "Captions: missing",
      },
      {
        title: "Audio descriptions for visual storytelling",
        description:
          "Scenes that rely on visuals without dialogue need an audio-description track for blind viewers.",
        severity: "Audio desc: missing",
      },
      {
        title: "Image-driven design needs alt text",
        description:
          "Lifestyle brands use imagery instead of text — every meaningful image needs a description.",
        severity: "Alt text: missing",
      },
      {
        title: "Custom video players need keyboard support",
        description:
          "Non-standard video players must support keyboard controls and screen readers.",
        severity: "Keyboard: fails",
      },
    ],
    accent: "#E50914",
    icon: "Tv",
  },
  {
    slug: "financial",
    name: "Financial Services & Insurance",
    shortName: "Financial",
    oneLiner: "Anthem, Schwab, and the 2024 plaintiff-firm wave.",
    description:
      "Financial firms face lawsuits and regulatory scrutiny at the same time — the 2024 wave of demand letters is still ongoing.",
    whyTargeted:
      "High-value clients, regulated compliance cultures, and budgets to settle quickly. Financial sites are also often built on aging platforms with inaccessible CAPTCHAs, PDFs, and form-heavy account flows.",
    whyTargetedPoints: [
      "Firms have compliance budgets and settle quickly — making them high-value targets for plaintiff attorneys.",
      "Account-opening forms with CAPTCHAs, document uploads, and custom validation are almost always inaccessible.",
      "PDF statements and tax documents sent to clients are a simple violation to prove — and affect every customer.",
    ],
    riskCallout: "Independent advisors and small insurance agencies are in the same demand-letter pipeline as Schwab. If you have online forms, client portals, or PDF statements, you're exposed.",
    caseIndustryCodes: ["financial-services", "insurance", "accounting"],
    stats: [
      { value: "500+", label: "Financial ADA demand letters in 2024 alone" },
      { value: "$9.7M", label: "Anthem accessibility settlement" },
      { value: "$15K+", label: "AICPA exam-related damages paid" },
    ],
    concerns: [
      {
        title: "Account opening and KYC forms",
        description:
          "Compliance forms with CAPTCHAs and document uploads are the most-litigated paths.",
        severity: "Forms: inaccessible",
      },
      {
        title: "Trading platforms and ticker data",
        description:
          "Charts and real-time data need text alternatives; balance tables need proper headers.",
        severity: "Screen reader: blocked",
      },
      {
        title: "Statements and tax documents",
        description:
          "Inaccessible PDF statements and 1099s violate the ADA for every client who receives them.",
        severity: "Documents: inaccessible",
      },
      {
        title: "Licensure exams and CE testing",
        description:
          "Insurance licensing and securities exams must work with screen readers.",
        severity: "Keyboard: fails",
      },
    ],
    accent: "#015DF1",
    icon: "Landmark",
  },
  {
    slug: "government",
    name: "Government & Public Sector",
    shortName: "Government",
    oneLiner: "DOJ has gone after counties, agencies, and apps.",
    description:
      "The DOJ now requires all government websites to meet accessibility standards — with hard deadlines in 2026 and 2027.",
    whyTargeted:
      "Public-sector technology is often built on aging infrastructure. Election systems, benefits portals, and licensing platforms tend to have the worst accessibility. And government sites have an explicit legal mandate to be accessible.",
    whyTargetedPoints: [
      "Government sites run on aging infrastructure — election systems, benefits portals, and licensing platforms have the worst accessibility scores.",
      "There's an explicit legal mandate (Title II) — no gray area about whether the ADA applies to you.",
      "The DOJ has expanded enforcement to county and city level, including mobile apps and election sites.",
    ],
    riskCallout: "Small counties and city agencies face the same Title II requirements as federal departments. The DOJ settled with four Texas counties over inaccessible election websites alone.",
    caseIndustryCodes: ["government-public-sector"],
    stats: [
      { value: "Apr 2026", label: "Deadline for large government entities" },
      { value: "Apr 2027", label: "Deadline for small government entities" },
      { value: "4", label: "Texas counties settled with DOJ (elections)" },
    ],
    concerns: [
      {
        title: "Mobile apps and digital services",
        description:
          "Any government app for benefits, transit, ID, or licensing falls under Title II.",
        severity: "Mobile: inaccessible",
      },
      {
        title: "Election websites and voter info",
        description:
          "Polling locations, ballot info, and candidate pages must work with screen readers.",
        severity: "Screen reader: blocked",
      },
      {
        title: "Benefits portals",
        description:
          "If a blind applicant can't apply for benefits online, that's a Title II violation.",
        severity: "Forms: inaccessible",
      },
      {
        title: "Vendor software must comply too",
        description:
          "SaaS sold to government must meet Section 508 — procurement requirements are enforced.",
        severity: "Compliance: required",
      },
    ],
    accent: "#475569",
    icon: "Landmark",
    deadline: "2026-04-24",
    deadlineLabel: "Large entity compliance deadline",
  },
  {
    slug: "b2b",
    name: "B2B & SaaS",
    shortName: "B2B / SaaS",
    oneLiner: "Epic Systems, AICPA exam. Procurement-driven exposure.",
    description:
      "Your customers' compliance requirements become your problem — banks, hospitals, and governments can't buy inaccessible software.",
    whyTargeted:
      "Enterprise software is often the worst-built accessibility-wise — it ships features fast, accumulates technical debt, and was never designed with screen readers in mind. But it's increasingly required to be accessible by the customers buying it.",
    whyTargetedPoints: [
      "Enterprise software ships fast and accumulates accessibility debt — data grids, modals, and forms are almost never screen-reader friendly.",
      "Regulated customers (banks, hospitals, federal agencies) now require VPATs before signing — no VPAT, no deal.",
      "If a customer's disabled employee can't use your software, your customer faces an employment-discrimination case — and they'll come after you.",
    ],
    riskCallout: "Even small SaaS companies lose enterprise deals over this. One RFP rejection for missing a VPAT costs more than full remediation. And if your widget is embedded in a client's app, your failures become their failures.",
    caseIndustryCodes: ["other-b2b"],
    stats: [
      { value: "73%", label: "of enterprise RFPs now require a VPAT" },
      { value: "$15K+", label: "AICPA exam-related damages paid" },
      { value: "100%", label: "of federal procurement requires Section 508" },
    ],
    concerns: [
      {
        title: "VPATs are now table stakes",
        description:
          "Banks, hospitals, and federal agencies won't sign without a VPAT documenting your WCAG conformance.",
        severity: "Deal blocker",
      },
      {
        title: "Enterprise UIs need ARIA and keyboard",
        description:
          "Data grids, modal flows, and multi-step forms are the patterns most commonly inaccessible.",
        severity: "Keyboard: fails",
      },
      {
        title: "Embedded widgets and SDKs",
        description:
          "Your accessibility failures become your customer's failures — they'll hold you accountable.",
        severity: "Shared liability",
      },
      {
        title: "Internal tools used by disabled employees",
        description:
          "A blind employee who can't use your software triggers an employment-discrimination case for your customer.",
        severity: "Screen reader: blocked",
      },
    ],
    accent: "#4F46E5",
    icon: "Cpu",
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}

export function getIndustryForCaseCode(industryCode: string): Industry | undefined {
  return industries.find((i) => i.caseIndustryCodes.includes(industryCode))
}
