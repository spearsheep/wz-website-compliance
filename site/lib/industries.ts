export interface IndustryConcern {
  title: string
  description: string
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
  /** Hero description (1-2 sentences, plain English) */
  description: string
  /** Why this industry is targeted */
  whyTargeted: string
  /** Industry codes (from lawsuit JSON `industry` field) that belong here */
  caseIndustryCodes: string[]
  /** Stats specific to this industry */
  stats: IndustryStat[]
  /** Specific WCAG/compliance concerns for this industry */
  concerns: IndustryConcern[]
  /** Brand color */
  accent: string
  /** Lucide icon name */
  icon: "ShoppingBag" | "UtensilsCrossed" | "Stethoscope" | "GraduationCap" | "Tv" | "Landmark" | "Building2" | "Cpu"
}

export const industries: Industry[] = [
  {
    slug: "retail",
    name: "Retail & E-commerce",
    shortName: "Retail",
    oneLiner: "Most-sued sector. Target, Fashion Nova, Hobby Lobby.",
    description:
      "If you sell anything online, retail is your case law. The first major ADA web ruling was against Target in 2008. The single largest disclosed settlement in recent years was against Fashion Nova in 2025. Plaintiff firms know the Shopify and BigCommerce footprints by heart.",
    whyTargeted:
      "Product images without descriptions are an easy violation to allege. Checkout flows that depend on a mouse fail keyboard tests. And every state with strong consumer-protection laws (California, New York, Florida) has plaintiff firms specializing in retail.",
    caseIndustryCodes: [
      "retail-ecommerce",
      "retail-specialty",
      "retail-appliance-ecommerce",
      "retail-furniture",
    ],
    stats: [
      { value: "$11M+", label: "Combined retail settlements documented" },
      { value: "32%", label: "of ADA suits target Shopify stores" },
      { value: "Daily", label: "new demand letters in this sector" },
    ],
    concerns: [
      {
        title: "Product images need alt text",
        description:
          "Every product image must have a descriptive alt attribute. \"product-2391.jpg\" doesn't count. Screen readers should be able to tell a blind shopper what the item is.",
      },
      {
        title: "Checkout flow must work without a mouse",
        description:
          "Every step — cart, shipping, payment, review — needs to be completable with keyboard alone. Custom dropdowns are the #1 silent failure here.",
      },
      {
        title: "Cart total and stock updates need ARIA-live regions",
        description:
          "When inventory updates dynamically or a coupon applies, screen reader users should hear it announced — not have to discover it by re-reading the page.",
      },
      {
        title: "Filters and faceted search need accessible labels",
        description:
          "Size pickers, color swatches, and price sliders are usually custom-built. Without ARIA roles and keyboard handlers, they're invisible to assistive tech.",
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
      "Restaurants became a prime target the moment online ordering became standard. Domino's lost the appeal that defined ADA web law in 2019. Sweetgreen has been sued twice for the same violations, eight years apart.",
    whyTargeted:
      "Online ordering flows are full of custom controls — pizza toppings, salad ingredients, dietary modifications — that are almost always inaccessible. Loyalty programs and rewards apps add another vulnerable surface.",
    caseIndustryCodes: [
      "food-service",
      "food-delivery-ecommerce",
      "grocery-retail",
      "grocery-ecommerce",
    ],
    stats: [
      { value: "34.65%", label: "of 2025 ADA suits targeted restaurants" },
      { value: "Repeat", label: "Sweetgreen sued twice in 8 years" },
      { value: "$10K+", label: "Five Guys settlement (publicly disclosed)" },
    ],
    concerns: [
      {
        title: "Online ordering customization",
        description:
          "Pizza toppings, salad ingredients, allergen options — these are usually built as custom dropdowns with no ARIA semantics. They fail with screen readers and keyboard.",
      },
      {
        title: "Menus posted as images or PDFs",
        description:
          "A PDF menu with no text layer is invisible to blind customers. Image menus need full text alternatives.",
      },
      {
        title: "Reservation widgets from third parties",
        description:
          "OpenTable, Resy, SevenRooms embeds count. If they're not accessible, you're liable. \"It's our vendor's fault\" is not a defense.",
      },
      {
        title: "Loyalty apps must be accessible",
        description:
          "If you offer mobile-app exclusive deals, the app must work with VoiceOver and TalkBack — or you've created a different price for disabled customers.",
      },
    ],
    accent: "#EA580C",
    icon: "UtensilsCrossed",
  },
  {
    slug: "healthcare",
    name: "Healthcare & Pharmacy",
    shortName: "Healthcare",
    oneLiner: "May 2026 federal deadline. Plus active DOJ enforcement.",
    description:
      "Healthcare is under two pressures: HHS's Section 504 rule requires WCAG 2.1 AA by May 2026 for any provider accepting Medicare/Medicaid, and the DOJ has been actively enforcing against hospital systems (MedStar, Springfield, UNC Health).",
    whyTargeted:
      "Patient portals contain protected information that must reach the patient — not just be \"posted.\" Blind patients have a legal right to access their own medical records, billing, and prescription instructions in a format they can read.",
    caseIndustryCodes: ["healthcare", "healthcare-beauty"],
    stats: [
      { value: "May 2026", label: "HHS Section 504 deadline (large orgs)" },
      { value: "$440K", label: "MedStar Health consent decree" },
      { value: "$125K", label: "UNC Health settlement" },
    ],
    concerns: [
      {
        title: "Patient portals must work end-to-end",
        description:
          "Records, appointment scheduling, prescription refills, bill payment — every flow has to work with screen readers and keyboard. FollowMyHealth and Epic's MyChart are subject to the same standard.",
      },
      {
        title: "Medical records can't just be scanned PDFs",
        description:
          "If you email a patient their records as an image-only PDF, you've effectively denied access to a blind patient. PDFs must have a text layer and proper tagging.",
      },
      {
        title: "Telehealth captions and accessibility",
        description:
          "Video appointments need live captions for deaf patients. The platform you use (Doxy.me, Teladoc, etc.) must support this — it's your responsibility, not theirs.",
      },
      {
        title: "Pharmacy and prescription information",
        description:
          "Dosing instructions, drug interaction warnings, allergy info — must be available in accessible formats on request. Refusing is a Title III violation.",
      },
    ],
    accent: "#0DAB66",
    icon: "Stethoscope",
  },
  {
    slug: "education",
    name: "Higher Education",
    shortName: "Education",
    oneLiner: "Harvard and MIT. Captioning is now mandatory.",
    description:
      "The 2020 Harvard and MIT consent decrees established that universities must caption all public-facing online content. The OCR (Office for Civil Rights) and DOJ have enforced extensively against schools that publish lecture videos, podcasts, or course materials.",
    whyTargeted:
      "Free public lectures, MOOCs, and recorded classes are everywhere. Almost none had captions historically. A single complaint can trigger an OCR investigation into the entire institution.",
    caseIndustryCodes: ["higher-education"],
    stats: [
      { value: "$1.5M+", label: "Harvard legal fees paid" },
      { value: "5 years", label: "Length of NAD v. Harvard litigation" },
      { value: "20,000+", label: "UC Berkeley videos pulled rather than caption" },
    ],
    concerns: [
      {
        title: "Captions for every video and podcast",
        description:
          "All publicly-posted video and audio must have accurate captions. Auto-generated YouTube captions are not enough — \"craptions\" have been specifically called out by NAD.",
      },
      {
        title: "Course materials and LMS accessibility",
        description:
          "PDFs uploaded by faculty, Canvas/Blackboard widgets, third-party publisher tools — all must be accessible. Faculty training is part of the obligation.",
      },
      {
        title: "Library databases and journal access",
        description:
          "If your library subscribes to a database that isn't accessible, you may need to provide alternative access. Many database vendors are not WCAG-compliant.",
      },
      {
        title: "Online testing and proctoring",
        description:
          "Remote-proctored exams, exam software, and online testing platforms must support screen readers and accommodations like extra time.",
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
      "Netflix established that pure online businesses are subject to the ADA. Entertainment and media sites are particularly vulnerable because they're image- and video-heavy by nature, and almost always have the worst accessibility.",
    whyTargeted:
      "Beautiful, animated, image-driven sites usually fail every WCAG criterion. Streaming platforms have to caption everything. News sites have dynamic content with broken landmarks. Celebrity and lifestyle brands get press coverage when sued, multiplying the reputational cost.",
    caseIndustryCodes: ["streaming-entertainment", "entertainment-media", "media-news"],
    stats: [
      { value: "$795K", label: "Netflix legal fees + monitoring" },
      { value: "100%", label: "of Netflix catalog now captioned" },
      { value: "All", label: "video content needs captions + descriptions" },
    ],
    concerns: [
      {
        title: "Captions on all video content",
        description:
          "WCAG 1.2.2 requires captions on prerecorded content; 1.2.4 requires live captions. Streaming services with any uncaptioned content are exposed.",
      },
      {
        title: "Audio descriptions for visual storytelling",
        description:
          "If a scene's meaning depends on what's on screen (and there's no dialogue describing it), blind viewers need an audio-description track.",
      },
      {
        title: "Image-driven design needs alt text everywhere",
        description:
          "Celebrity, fashion, and lifestyle brands typically use heavy imagery instead of text. Each meaningful image needs alt text — \"hero-2.jpg\" is not enough.",
      },
      {
        title: "Custom video players must be keyboard-accessible",
        description:
          "If you've built your own video player (not YouTube/Vimeo embed), it must support keyboard controls and screen readers, including the captions/audio menu.",
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
      "Banks, brokerages, insurance carriers, and wealth managers face dual exposure: ADA lawsuits AND regulatory scrutiny from the SEC, CFPB, and state insurance departments. The 2024 wave of demand letters from Carlson Lynch and KamberLaw is still ongoing.",
    whyTargeted:
      "High-value clients, regulated compliance cultures, and budgets to settle quickly. Financial sites are also often built on aging platforms with inaccessible CAPTCHAs, PDFs, and form-heavy account flows.",
    caseIndustryCodes: ["financial-services", "insurance", "accounting"],
    stats: [
      { value: "WCAG 2.2", label: "Schwab agreement standard (newer than the norm)" },
      { value: "Active", label: "Wave of 2024 demand letters ongoing" },
      { value: "$15K+", label: "AICPA exam-related damages paid" },
    ],
    concerns: [
      {
        title: "Account opening and KYC forms",
        description:
          "Long compliance forms with custom validation, CAPTCHA, and document upload — almost always inaccessible to blind users. These are the most-litigated paths.",
      },
      {
        title: "Trading platforms and ticker data",
        description:
          "Charts and real-time data must have text alternatives. Tables of trades or balances need proper headers. Schwab's Thinkorswim is now contractually committed to WCAG 2.2 AA.",
      },
      {
        title: "Statements and tax documents",
        description:
          "Account statements and 1099s sent as inaccessible PDFs violate the ADA — even for clients who can otherwise read fine if you'd sent text.",
      },
      {
        title: "Licensure exams and CE testing",
        description:
          "Insurance licensing, securities exams, CFP testing — all need screen-reader compatibility. The CA Department of Insurance was forced to remediate in 2024.",
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
      "Government entities are subject to ADA Title II, with the DOJ's 2024 Final Rule explicitly requiring WCAG 2.1 AA. Enforcement has expanded from federal agencies to state, county, and city governments — including mobile apps and election websites.",
    whyTargeted:
      "Public-sector technology is often built on aging infrastructure. Election systems, benefits portals, and licensing platforms tend to have the worst accessibility. And government sites have an explicit legal mandate to be accessible.",
    caseIndustryCodes: ["government-public-sector"],
    stats: [
      { value: "WCAG 2.1 AA", label: "Required by DOJ 2024 Title II Final Rule" },
      { value: "Apr 2026", label: "Compliance deadline (large entities)" },
      { value: "Apr 2027", label: "Compliance deadline (small entities)" },
    ],
    concerns: [
      {
        title: "Mobile apps and digital services",
        description:
          "Service Oklahoma's mobile ID app was forced to remediate in 2024. Any state or county app for benefits, transit, ID, or licensing falls under the same rule.",
      },
      {
        title: "Election websites and voter information",
        description:
          "Polling locations, ballot info, candidate pages — must be accessible for screen readers. Four Texas counties were settled with by the DOJ on this exact issue.",
      },
      {
        title: "Benefits portals (unemployment, SNAP, Medicaid)",
        description:
          "These touch the most vulnerable users. If a blind applicant can't apply for unemployment benefits, that's a Title II violation triggering DOJ attention.",
      },
      {
        title: "Procurement: vendors must be compliant too",
        description:
          "If you sell SaaS to government, your software has to meet Section 508 and WCAG 2.1 AA. Procurement requirements are increasingly enforced.",
      },
    ],
    accent: "#475569",
    icon: "Landmark",
  },
  {
    slug: "b2b",
    name: "B2B & SaaS",
    shortName: "B2B / SaaS",
    oneLiner: "Epic Systems, AICPA exam. Procurement-driven exposure.",
    description:
      "B2B software faces ADA exposure through two routes: direct lawsuits from disabled employees of your customers (Epic Systems), and procurement requirements from regulated customers (banks, hospitals, governments) who can't legally buy inaccessible software.",
    whyTargeted:
      "Enterprise software is often the worst-built accessibility-wise — it ships features fast, accumulates technical debt, and was never designed with screen readers in mind. But it's increasingly required to be accessible by the customers buying it.",
    caseIndustryCodes: ["other-b2b"],
    stats: [
      { value: "Required", label: "Section 508 for federal procurement" },
      { value: "Growing", label: "Number of RFPs requiring WCAG VPATs" },
      { value: "$15K+", label: "AICPA exam-related damages paid" },
    ],
    concerns: [
      {
        title: "VPATs are now table stakes",
        description:
          "A Voluntary Product Accessibility Template documents how your software conforms to WCAG. Major customers (banks, hospitals, federal agencies) won't sign without one.",
      },
      {
        title: "Enterprise UIs (data tables, dashboards, forms)",
        description:
          "The patterns enterprise software is built on — data grids, modal flows, multi-step forms — are the patterns most commonly inaccessible. Each needs explicit ARIA and keyboard support.",
      },
      {
        title: "Embedded widgets and SDKs",
        description:
          "If your SDK is embedded in another company's app, your accessibility failures become their accessibility failures. Customers will hold you accountable.",
      },
      {
        title: "Internal admin tools used by disabled employees",
        description:
          "If a customer's blind employee can't operate your software, your customer faces an employment-discrimination case. They will demand you fix it.",
      },
    ],
    accent: "#6366F1",
    icon: "Cpu",
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}

export function getIndustryForCaseCode(industryCode: string): Industry | undefined {
  return industries.find((i) => i.caseIndustryCodes.includes(industryCode))
}
