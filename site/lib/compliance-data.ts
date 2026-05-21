export interface ComplianceRequirement {
  id: string
  category: string
  name: string
  plainEnglish: string
  legalText: string
  wcagCriterion: string
  wcagLevel: string
  jurisdictions: string[]
  lawsuits: {
    case: string
    year: number | string
    jurisdiction: string
    outcome: string
  }[]
  icon?: string
}

export const complianceData: ComplianceRequirement[] = [
  {
    id: "VISUAL-001",
    category: "Visual",
    name: "Color Contrast (Text)",
    plainEnglish:
      "Text on your website must be easy to read against its background. Small text needs a contrast ratio of at least 4.5:1, and large text (18pt or 14pt bold) needs at least 3:1. This helps people with low vision or color blindness read your content.",
    legalText:
      "WCAG 2.1 SC 1.4.3: 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for Large Text which requires at least 3:1.' Applied under ADA Title III (42 U.S.C. § 12181) and California Unruh Civil Rights Act (Cal. Civ. Code § 51).",
    wcagCriterion: "1.4.3",
    wcagLevel: "AA",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [
      {
        case: "Robles v. Domino's Pizza LLC",
        year: 2016,
        jurisdiction: "9th Circuit (California)",
        outcome:
          "9th Circuit ruled for plaintiff in 2019; ADA applies to websites. Domino's settled after Supreme Court denied certiorari. Color contrast was among cited barriers.",
      },
      {
        case: "Conner v. Beyoncé's website",
        year: 2019,
        jurisdiction: "S.D. New York",
        outcome:
          "Class action citing contrast violations and missing alt text. Settled out of court for undisclosed amount.",
      },
    ],
  },
  {
    id: "VISUAL-002",
    category: "Visual",
    name: "Non-Text Contrast (UI Components)",
    plainEnglish:
      "Buttons, icons, form input borders, and other interactive elements must have at least a 3:1 contrast ratio against their background. People with low vision need to be able to see and identify controls — not just read text.",
    legalText:
      "WCAG 2.1 SC 1.4.11: 'The visual presentation of User Interface Components and Graphical Objects have a contrast ratio of at least 3:1 against adjacent color(s).' Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "1.4.11",
    wcagLevel: "AA",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [
      {
        case: "NFB v. Target Corporation",
        year: 2006,
        jurisdiction: "N.D. California",
        outcome:
          "Landmark e-commerce case. Settled 2008 for $6M in damages plus $3.7M attorney's fees. Required full WCAG compliance including contrast.",
      },
    ],
  },
  {
    id: "VISUAL-003",
    category: "Visual",
    name: "Images — Alt Text",
    plainEnglish:
      "Every meaningful image must have a written description (alt text) so screen reader software used by blind users can describe it. Purely decorative images should be marked to skip. Without alt text, blind users get zero information from your images.",
    legalText:
      "WCAG 2.1 SC 1.1.1: 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.' Applied under ADA Title III (42 U.S.C. § 12181) and California Unruh Civil Rights Act (Cal. Civ. Code § 51).",
    wcagCriterion: "1.1.1",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [
      {
        case: "NFB v. Target Corporation",
        year: 2006,
        jurisdiction: "N.D. California",
        outcome:
          "Missing alt text was a primary violation. Settled for $9.7M total. Required alt text across all Target.com images.",
      },
      {
        case: "Conner v. Beyoncé's website",
        year: 2019,
        jurisdiction: "S.D. New York",
        outcome:
          "Missing alt text on images was the primary allegation. Settled out of court.",
      },
    ],
  },
  {
    id: "VISUAL-004",
    category: "Visual",
    name: "Video Captions (Prerecorded)",
    plainEnglish:
      "Any pre-recorded video with spoken audio must have synchronized captions. This is required for deaf and hard-of-hearing users. Auto-generated captions (YouTube's default) do not meet this standard — they must be accurate and reviewed.",
    legalText:
      "WCAG 2.1 SC 1.2.2: 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.' Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "1.2.2",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [
      {
        case: "NAD v. Netflix",
        year: 2012,
        jurisdiction: "D. Massachusetts",
        outcome:
          "Netflix settled in 2013 and agreed to caption 100% of streaming content by 2014. Paid $755,000.",
      },
      {
        case: "NAD v. Harvard University",
        year: 2015,
        jurisdiction: "D. Massachusetts",
        outcome:
          "Harvard and MIT required to caption all online course content. Harvard paid $1,575,000 in attorney's fees.",
      },
    ],
  },
  {
    id: "VISUAL-005",
    category: "Visual",
    name: "Audio Descriptions for Video",
    plainEnglish:
      "Pre-recorded videos must have audio descriptions — narration describing what's happening visually — so blind users can follow visual-only content like charts, demonstrations, or on-screen text. Think of it as a narrator for what the camera shows.",
    legalText:
      "WCAG 2.1 SC 1.2.5: 'Audio description is provided for all prerecorded video content in synchronized media.' Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "1.2.5",
    wcagLevel: "AA",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [],
  },
  {
    id: "VISUAL-006",
    category: "Visual",
    name: "Use of Color Alone",
    plainEnglish:
      "Never use color as the only way to convey information. For example, don't mark required form fields with just a red border — add a label like 'Required'. Colorblind users can't distinguish red from green. Always add a second signal (text, icon, pattern).",
    legalText:
      "WCAG 2.1 SC 1.4.1: 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.' Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "1.4.1",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [],
  },
  {
    id: "NAV-001",
    category: "Navigation",
    name: "Keyboard Navigation",
    plainEnglish:
      "Every function on your website must work using only a keyboard — Tab, Enter, arrow keys, spacebar — without requiring a mouse. This is essential for people with motor disabilities and blind users who rely on screen readers. If it can't be clicked, it can't be done.",
    legalText:
      "WCAG 2.1 SC 2.1.1: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement.' Applied under ADA Title III (42 U.S.C. § 12181) and California Unruh Civil Rights Act (Cal. Civ. Code § 51).",
    wcagCriterion: "2.1.1",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [
      {
        case: "Conner v. Beyoncé's website",
        year: 2019,
        jurisdiction: "S.D. New York",
        outcome: "Inability to use keyboard instead of mouse was a primary allegation. Settled out of court.",
      },
      {
        case: "Robles v. Domino's Pizza LLC",
        year: 2016,
        jurisdiction: "9th Circuit (California)",
        outcome: "Keyboard inaccessibility of ordering functionality was cited. Settled after Supreme Court denied certiorari.",
      },
    ],
  },
  {
    id: "NAV-002",
    category: "Navigation",
    name: "Skip Navigation Links",
    plainEnglish:
      "Websites must provide a 'Skip to main content' link at the very top of the page. This lets keyboard users bypass the navigation menu — without it, a user pressing Tab must go through every nav link on every page before reaching the actual content. This page has one — press Tab to see it.",
    legalText:
      "WCAG 2.1 SC 2.4.1: 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.' Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "2.4.1",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [
      {
        case: "NFB v. Target Corporation",
        year: 2006,
        jurisdiction: "N.D. California",
        outcome: "Missing skip links was among cited barriers. Part of $9.7M settlement.",
      },
    ],
  },
  {
    id: "NAV-003",
    category: "Navigation",
    name: "Focus Visible (Keyboard Indicator)",
    plainEnglish:
      "When users navigate with a keyboard, they must always be able to see which element has focus — usually shown as an outline or highlight around a button or link. Many designers remove this outline for aesthetics, which makes keyboard navigation nearly impossible for people who can't use a mouse.",
    legalText:
      "WCAG 2.1 SC 2.4.7: 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.' Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "2.4.7",
    wcagLevel: "AA",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [],
  },
  {
    id: "NAV-004",
    category: "Navigation",
    name: "Descriptive Link Text",
    plainEnglish:
      "Link text must describe where the link goes. Generic text like 'Click here' or 'Read more' is inaccessible — screen reader users navigate a list of all links on a page, and 'Click here' gives zero context. Links should read like 'Download the 2024 Compliance Report (PDF)'.",
    legalText:
      "WCAG 2.1 SC 2.4.4: 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.' Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "2.4.4",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [
      {
        case: "Hanyzkiewicz v. Hasbro Inc.",
        year: 2023,
        jurisdiction: "E.D. New York",
        outcome:
          "Missing descriptive links, alt text, and inaccessible forms cited. Filed under ADA, NY Human Rights Law, and NYC Human Rights Law.",
      },
    ],
  },
  {
    id: "FORMS-001",
    category: "Forms",
    name: "Form Field Labels",
    plainEnglish:
      "Every input field in a form must have a visible label that is programmatically connected to the field. Placeholder text that disappears when you type does NOT count as a label. Screen readers must be able to announce what each field asks for — otherwise blind users fill out forms blind.",
    legalText:
      "WCAG 2.1 SC 3.3.2: 'Labels or instructions are provided when content requires user input.' Combined with SC 1.3.1 Info and Relationships. Applied under ADA Title III (42 U.S.C. § 12181) and California Unruh Civil Rights Act (Cal. Civ. Code § 51).",
    wcagCriterion: "3.3.2",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [
      {
        case: "Robles v. Domino's Pizza LLC",
        year: 2016,
        jurisdiction: "9th Circuit (California)",
        outcome:
          "Inaccessible form fields on the ordering system were central to the complaint. 9th Circuit ruled for plaintiff in 2019.",
      },
    ],
  },
  {
    id: "FORMS-002",
    category: "Forms",
    name: "Error Identification",
    plainEnglish:
      "When a user submits a form and makes an error, the error must be identified in text — not just with a red border — and must describe what the problem is. Screen readers need to announce the error. 'Please fix the errors' is not enough; 'Email address is invalid' is.",
    legalText:
      "WCAG 2.1 SC 3.3.1: 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.' Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "3.3.1",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [],
  },
  {
    id: "STRUCTURE-001",
    category: "Structure",
    name: "Heading Structure",
    plainEnglish:
      "Pages must use headings (H1, H2, H3, etc.) in a logical hierarchy to organize content — not just for visual styling. Screen reader users navigate pages by jumping between headings, like a table of contents. Using H3 for font size while skipping H2 breaks this entirely.",
    legalText:
      "WCAG 2.1 SC 2.4.6: 'Headings and labels describe topic or purpose.' Combined with SC 1.3.1: structure and relationships must be programmatically determinable. Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "2.4.6",
    wcagLevel: "AA",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [],
  },
  {
    id: "STRUCTURE-002",
    category: "Structure",
    name: "Page Titles",
    plainEnglish:
      "Every page must have a unique, descriptive title (the text shown in the browser tab). 'Home | Jobs Junior Compliance' tells users exactly where they are. Identical titles like 'Welcome' on every page make navigation very difficult for screen reader users.",
    legalText:
      "WCAG 2.1 SC 2.4.2: 'Web pages have titles that describe topic or purpose.' Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "2.4.2",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [],
  },
  {
    id: "INTERACTIVE-001",
    category: "Interactive",
    name: "Dropdown Menus",
    plainEnglish:
      "Dropdown navigation menus must work entirely by keyboard. Users must open, navigate, and close dropdowns using Tab, arrow keys, and Enter/Space. Hover-only dropdowns that can't be activated by keyboard are among the most common accessibility violations.",
    legalText:
      "WCAG 2.1 SC 2.1.1 (Keyboard): All functionality operable through keyboard interface. SC 4.1.2: Name, role, value must be programmatically determined. Expanded/collapsed state communicated via aria-expanded. Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "2.1.1",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [
      {
        case: "Conner v. Beyoncé's website",
        year: 2019,
        jurisdiction: "S.D. New York",
        outcome: "Inaccessible dropdown menus explicitly named in lawsuit. Settled out of court.",
      },
    ],
  },
  {
    id: "INTERACTIVE-002",
    category: "Interactive",
    name: "Carousels and Slideshows",
    plainEnglish:
      "Image sliders and carousels are among the most commonly inaccessible components. They must: (1) be keyboard navigable, (2) have a pause button if they auto-play, (3) have descriptive labels per slide, and (4) announce slide changes to screen readers. Most third-party carousel plugins fail all four.",
    legalText:
      "WCAG 2.1 SC 2.2.2: 'For any moving, blinking or scrolling information that starts automatically, lasts more than 5 seconds, and is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it.' Combined with SC 2.1.1 (Keyboard) and SC 4.1.2 (Name, Role, Value).",
    wcagCriterion: "2.2.2",
    wcagLevel: "A",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [],
  },
  {
    id: "INTERACTIVE-003",
    category: "Interactive",
    name: "Tooltips and Hover Content",
    plainEnglish:
      "Content that appears on hover must also appear on keyboard focus, stay visible long enough to be read, be dismissible with Escape, and allow the user to hover over the tooltip itself. This page's compliance badges are built to meet all four requirements.",
    legalText:
      "WCAG 2.1 SC 1.4.13: 'Where receiving and then removing pointer hover or keyboard focus triggers additional content — the content is: Dismissible, Hoverable, and Persistent.' Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "1.4.13",
    wcagLevel: "AA",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [],
  },
  {
    id: "DOCS-001",
    category: "Documents",
    name: "PDF Accessibility",
    plainEnglish:
      "PDFs linked from your website — menus, brochures, forms, contracts — must be accessible. This means tagged PDF structure, selectable text (not a scanned image), alt text for images inside the PDF, and fillable forms that work with screen readers. A scan of a paper document is completely inaccessible.",
    legalText:
      "ADA Title III (42 U.S.C. § 12181) applied via court interpretation. Courts consistently hold that inaccessible PDFs constitute ADA violations. California Unruh Act allows $4,000 statutory damages per inaccessible document instance accessed.",
    wcagCriterion: "N/A (PDF Techniques)",
    wcagLevel: "AA",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [
      {
        case: "California Unruh Act cases",
        year: "2022–2024",
        jurisdiction: "California state courts",
        outcome:
          "Plaintiffs regularly cite inaccessible PDFs. California allows $4,000 per violation. Hundreds of businesses settle annually for $5,000–$20,000 plus attorney's fees.",
      },
    ],
  },
  {
    id: "MOBILE-001",
    category: "Mobile",
    name: "Touch Target Size",
    plainEnglish:
      "Buttons, links, and interactive controls on mobile must be at least 44×44 CSS pixels — roughly the size of a fingertip. Tiny buttons placed too close together cause errors for people with motor disabilities or tremors. This is one of the most commonly failed mobile requirements.",
    legalText:
      "WCAG 2.1 SC 2.5.5 (Level AAA): 'The size of the target for pointer inputs is at least 44 by 44 CSS pixels.' WCAG 2.2 SC 2.5.8 (Level AA): minimum 24×24 CSS pixels. Applied as best practice under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "2.5.5",
    wcagLevel: "AAA (2.5.5) / AA (WCAG 2.2)",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [],
  },
  {
    id: "MOBILE-002",
    category: "Mobile",
    name: "Pinch-to-Zoom",
    plainEnglish:
      "Your website must never disable mobile zoom. Many websites use a meta tag that blocks pinch-to-zoom — this makes the site unusable for people with low vision who need to enlarge content. Removing the restriction is a one-line fix, and it's one of the most common violations.",
    legalText:
      "WCAG 2.1 SC 1.4.4 (Resize Text): Text must be resizable to 200% without loss of content or functionality. The viewport meta tag must NOT include user-scalable=no or maximum-scale=1.0. Applied under ADA Title III (42 U.S.C. § 12181).",
    wcagCriterion: "1.4.4",
    wcagLevel: "AA",
    jurisdictions: ["Federal", "California", "New York", "Florida"],
    lawsuits: [],
  },
]

export const jurisdictionData = [
  {
    name: "California",
    flag: "🏖️",
    law: "Unruh Civil Rights Act",
    citation: "Cal. Civ. Code § 51",
    damage: "$4,000",
    damageNote: "per violation",
    detail: "Any ADA violation automatically triggers Unruh Act liability. The $4,000 minimum per affected visit makes California the highest-volume state for web accessibility lawsuits — by far.",
    severity: "highest",
    color: "#ef4444",
  },
  {
    name: "New York City",
    flag: "🗽",
    law: "NYC Human Rights Law",
    citation: "NYC Admin. Code § 8-107",
    damage: "$125,000",
    damageNote: "per complaint",
    detail: "The most expansive anti-discrimination law in the US. Applies to any business with NYC customers — even if you're based elsewhere. Civil penalties up to $125,000.",
    severity: "high",
    color: "#f59e0b",
  },
  {
    name: "Florida",
    flag: "🌴",
    law: "ADA Title III (11th Circuit)",
    citation: "Gil v. Winn-Dixie (2021)",
    damage: "Injunctive + fees",
    damageNote: "nexus required",
    detail: "The 11th Circuit (FL/GA/AL) requires a 'nexus' between the website and a physical location. Businesses without physical locations have more protection here — but brick-and-mortar businesses are still exposed.",
    severity: "medium",
    color: "#3b82f6",
  },
  {
    name: "Federal (All States)",
    flag: "🇺🇸",
    law: "ADA Title III",
    citation: "42 U.S.C. § 12181",
    damage: "Injunctive + fees",
    damageNote: "attorney's fees $50K–$200K+",
    detail: "No monetary damages for private suits — but attorney's fees alone run $50,000–$200,000+. WCAG 2.1 AA is the de facto standard courts apply nationwide.",
    severity: "low",
    color: "#6366f1",
  },
]

export const lawsuitCases = [
  {
    name: "NFB v. Target",
    company: "Target",
    year: 2006,
    settled: 2008,
    amount: "$9.7M",
    amountDetail: "$6M damages + $3.7M attorney's fees",
    violations: ["Missing alt text on images", "No skip navigation links", "Inaccessible checkout forms"],
    jurisdiction: "N.D. California",
    law: "ADA Title III + California Unruh Act",
    significance: "First landmark e-commerce ADA case. Established that retailers with both physical and digital presence must make their websites accessible.",
  },
  {
    name: "NAD v. Netflix",
    company: "Netflix",
    year: 2012,
    settled: 2013,
    amount: "$755K",
    amountDetail: "Plus commitment to caption 100% of content by 2014",
    violations: ["No synchronized captions on streaming content"],
    jurisdiction: "D. Massachusetts",
    law: "ADA Title III",
    significance: "Established that streaming services are subject to ADA Title III. Led to Netflix's industry-leading captioning standards.",
  },
  {
    name: "Robles v. Domino's",
    company: "Domino's Pizza",
    year: 2016,
    settled: 2022,
    amount: "Settled (undisclosed)",
    amountDetail: "Supreme Court denied certiorari in 2019",
    violations: ["Inaccessible ordering forms", "Keyboard navigation failures", "Screen reader incompatibility"],
    jurisdiction: "9th Circuit (California)",
    law: "ADA Title III + California Unruh Act",
    significance: "Most-cited web accessibility case. 9th Circuit confirmed ADA applies to websites and apps connected to a physical place of business.",
  },
]

export const categories = [
  { id: "Visual", label: "Visual", icon: "Eye", count: 6 },
  { id: "Navigation", label: "Navigation", icon: "Navigation", count: 4 },
  { id: "Forms", label: "Forms", icon: "FileText", count: 2 },
  { id: "Structure", label: "Structure", icon: "Layers", count: 2 },
  { id: "Interactive", label: "Interactive", icon: "MousePointer", count: 3 },
  { id: "Documents", label: "Documents", icon: "File", count: 1 },
  { id: "Mobile", label: "Mobile", icon: "Smartphone", count: 2 },
]
