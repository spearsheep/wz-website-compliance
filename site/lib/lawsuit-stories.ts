/**
 * Plain-English, blog-style narratives for each lawsuit.
 * Written for someone with zero background in accessibility law.
 * Keyed by lawsuit slug. Two short paragraphs per case.
 */
export const lawsuitStories: Record<string, { hook: string; story: string[] }> = {
  "nfb-v-target": {
    hook: "The case that woke up every retailer in America.",
    story: [
      "In 2006, a blind college student named Bruce Sexton couldn't shop on Target.com. The site's images had no descriptions, so his screen-reading software just said \"image\" over and over. The checkout flow required a mouse he couldn't use. The National Federation of the Blind sued on behalf of every blind shopper in California.",
      "Target argued that the ADA only covered physical stores, not websites. The court disagreed. Target ended up paying $6 million to blind customers, another $3.7 million to the plaintiffs' lawyers, and rebuilt its entire website. It was the first time a major company had to pay millions because of an inaccessible site — and it set the rule every business has lived under ever since.",
    ],
  },

  "robles-v-dominos": {
    hook: "Domino's tried to argue the ADA didn't cover apps. The Supreme Court refused to hear them.",
    story: [
      "Guillermo Robles wanted to order a pizza. He's blind, and his screen reader couldn't navigate the Domino's website or app — he literally could not customize a pizza or check out. He sued in 2016. Domino's fought back, all the way up to the Supreme Court, arguing that the ADA never mentioned websites or apps, so it shouldn't apply.",
      "The 9th Circuit Court ruled against Domino's in 2019. The Supreme Court then refused to even hear the appeal — meaning the lower court's decision stood. After six years of fighting, Domino's settled. For every business with a website or app today, this is THE case that decides it: if customers use it, it must be accessible.",
    ],
  },

  "nad-v-netflix": {
    hook: "Netflix sold the same subscription to everyone but only let some people understand the shows.",
    story: [
      "In 2010, the National Association of the Deaf sued Netflix because most of its streaming catalog had no closed captions. Deaf customers were paying the same monthly fee as everyone else, but couldn't follow the dialogue in most shows. Netflix argued the ADA only applied to physical places — they were just a website, so it shouldn't count.",
      "A federal judge in Massachusetts disagreed in 2012, ruling that streaming services count as \"places of public accommodation\" under the law. Netflix paid $795,000 in legal fees and agreed to caption 100% of its catalog within two years. This was the first major ruling that pure online businesses — no physical store needed — fall under the ADA.",
    ],
  },

  "gil-v-winn-dixie": {
    hook: "First-ever website ADA case to go to trial. The grocery chain spent $250,000 fixing the site anyway.",
    story: [
      "Juan Carlos Gil is blind. He used the Winn-Dixie website to refill prescriptions and download digital coupons — except he couldn't, because the site didn't work with screen readers. In 2017, his case became the first website accessibility lawsuit ever to reach a full trial. The judge ruled for Gil.",
      "Four years later, an appeals court reversed that ruling on a technicality — but by then Winn-Dixie had already spent more than $250,000 rebuilding their site. The lesson became famous: even when you eventually \"win,\" defending an inaccessible website costs more than fixing it would have in the first place.",
    ],
  },

  "alcazar-v-fashion-nova": {
    hook: "The biggest disclosed web accessibility settlement in years — and the DOJ said it wasn't enough.",
    story: [
      "Fashion Nova, the fast-fashion brand built almost entirely online, was sued in 2020 by blind shoppers who couldn't browse or buy clothes on their site. Product images had no descriptions, navigation didn't work with screen readers. The case settled in October 2025 for $5.15 million — among the largest known settlements in this area.",
      "Then in early 2026, something unusual happened: the U.S. Department of Justice itself intervened, arguing that even the $5.15M settlement didn't do enough for blind customers. The DOJ said most of the money went to lawyers and the site fixes were vague. A judge set an evidentiary hearing for March 2026. The takeaway: federal regulators are watching settlements now, and \"good enough\" no longer is.",
    ],
  },

  "nad-v-harvard": {
    hook: "Harvard offered free online classes to the world. They couldn't be heard by deaf students.",
    story: [
      "For years, Harvard published thousands of hours of free lectures and online courses — on YouTube, edX, and podcasts. None of them had accurate captions. Deaf and hard-of-hearing students could see the slides, but couldn't follow what professors were saying. The National Association of the Deaf sued in 2015.",
      "Harvard fought it for five years. They argued that captioning everything would be expensive and unnecessary because the content was \"free\" and \"optional.\" The court disagreed. Harvard ended up paying over $1.5 million in legal fees alone and now has to caption all public-facing online content forever. Every business with a video library should pay attention.",
    ],
  },

  "nad-v-mit": {
    hook: "Harvard's twin case. Same outcome.",
    story: [
      "The same week the National Association of the Deaf sued Harvard, they sued MIT for the same problem: thousands of hours of free, public lectures and online courses with no usable captions. MIT made the same arguments — that captioning everything would be burdensome and the content was free, so users couldn't really demand accommodations.",
      "After five years of litigation, MIT signed a 2020 consent decree requiring them to caption all new public-facing online content and remediate the archive on a schedule. Together with the Harvard case, this established the captioning rules for every university, training-content publisher, and B2B SaaS with marketing videos.",
    ],
  },

  "doj-peapod-settlement": {
    hook: "Online grocery, no physical store — and the DOJ still required full WCAG compliance.",
    story: [
      "Peapod was one of the original online grocery delivery services. Customers ordered through the website or mobile app, and the company delivered. In 2014, the Department of Justice settled an enforcement action requiring Peapod to make its website and mobile app fully WCAG 2.0 AA accessible — including for blind shoppers, deaf users watching demo videos, and people with motor impairments.",
      "This settlement is the playbook DOJ has used ever since against online-only businesses. There's no physical store to point to and no \"we're just a website\" defense. The bigger lesson: digital-only businesses face the exact same compliance bar as any brick-and-mortar retailer.",
    ],
  },

  "doj-v-springfield-clinic": {
    hook: "A patient couldn't get to her own medical records. The DOJ forced the clinic to rebuild.",
    story: [
      "A visually impaired patient of Springfield Clinic in Illinois couldn't use the patient portal to access her medical records, schedule appointments, or read test results — the screen reader software couldn't navigate the site. She complained to the DOJ. The DOJ investigated and reached a 2024 settlement.",
      "The clinic paid $5,000 directly to the patient and was forced to make its website, patient portal (FollowMyHealth), records system (CIOX), and mobile apps fully WCAG 2.1 AA compliant. Healthcare digital accessibility is now an explicit DOJ enforcement priority — and the dollar amount isn't the point. The required engineering work is the real cost.",
    ],
  },

  "doj-tx-counties-election-websites": {
    hook: "Four Texas counties were told their election websites weren't accessible. The DOJ stepped in.",
    story: [
      "In 2024, the DOJ found that four Texas county governments — Colorado, Runnels, Smith, and Upton — had election websites that blind voters couldn't use to find polling locations, ballot information, or candidate details. The agency reached separate settlements with each county requiring full website accessibility under Title II of the ADA.",
      "This is important because it shows DOJ enforcement extends to government — not just business. Counties, cities, school districts, and state agencies are all subject to the same standards. If your business sells to or partners with the public sector, your software has to meet these rules too.",
    ],
  },

  "farmer-v-sweetgreen-2016": {
    hook: "Sweetgreen settled in 2016. Eight years later, they got sued for the exact same thing.",
    story: [
      "In 2016, a blind customer sued the salad chain Sweetgreen because the website wasn't usable with a screen reader. Sweetgreen settled and agreed to make their site WCAG 2.0 AA compliant. Most people assumed that was the end of it — they paid, they fixed it, done.",
      "It wasn't done. In January 2024, Sweetgreen was sued again in New York federal court for the exact same kinds of violations. The site had drifted out of compliance over the years as developers added features without thinking about accessibility. They settled again in May 2024. The lesson: a one-time fix is not enough. Without ongoing maintenance, you'll be sued twice for the same thing.",
    ],
  },

  "colak-v-sweetgreen-2024": {
    hook: "Sweetgreen's second lawsuit in eight years. Same violations. Different plaintiff.",
    story: [
      "Filed in January 2024 in federal court in New York, this case alleged that Sweetgreen's website had unlabeled buttons, broken pop-ups, missing image descriptions, and other failures that blocked blind users — eight years after the company had supposedly fixed all of this in a 2016 settlement.",
      "Sweetgreen settled again in May 2024. This case has become the textbook example of why accessibility is not a one-time project. Every new feature, every redesign, every third-party widget added to a site creates new ways to fail. Compliance has to be maintained the way security or uptime is maintained.",
    ],
  },

  "marett-v-five-guys": {
    hook: "A blind customer sued Five Guys because she couldn't add pickles to a burger.",
    story: [
      "Lucia Marett wanted to order a burger online from Five Guys. The website let everyone else customize their toppings — pickles, jalapeños, fries — but the customization tool was a custom dropdown that her screen reader couldn't open. She sued in 2017.",
      "Five Guys tried to get the case thrown out, arguing the website wasn't a \"place\" under the ADA. The judge in New York denied the motion, ruling that Five Guys' site was \"heavily integrated\" with its restaurants. The chain settled the same year and remediated. The case is now cited in nearly every restaurant accessibility lawsuit.",
    ],
  },

  "gorecki-v-hobby-lobby": {
    hook: "Hobby Lobby tried to argue courts shouldn't decide website accessibility cases. They lost in months.",
    story: [
      "In 2017, Hobby Lobby was sued because its e-commerce site wasn't usable with screen readers. The chain made a creative legal argument: courts shouldn't rule on website accessibility cases at all, because the DOJ hadn't yet issued formal regulations — the issue belongs to regulators first.",
      "A federal judge in California rejected the argument flat. The court held that Hobby Lobby's website is a \"public accommodation\" under the ADA — period — and plaintiffs don't have to wait for regulators to act. The case settled within months. Hobby Lobby rebuilt the site.",
    ],
  },

  "conner-v-parkwood-beyonce": {
    hook: "Beyoncé's website got sued. Even superstars aren't exempt.",
    story: [
      "In 2019, a blind Beyoncé fan named Mary Conner filed a class action against the singer's company, Parkwood Entertainment. The official Beyoncé website was heavily image-driven — tour dates, merchandise, news — and almost none of it worked with screen readers. Press picked it up because of the celebrity involvement, but the legal issues were identical to any other case.",
      "Parkwood settled and committed to making the site WCAG 2.0 AA compliant. The case became a useful reminder that entertainment, fashion, and lifestyle brands are subject to the exact same rules as retailers and restaurants — often more vulnerable, because heavily visual sites are usually the worst on accessibility.",
    ],
  },

  "rodriguez-v-barnes-noble": {
    hook: "Barnes & Noble settled in 2019. They got sued again in 2022.",
    story: [
      "Barnes & Noble's website was first sued for inaccessibility in 2019. Like other retailers, they settled and committed to fixes. Three years later, in 2022, another blind plaintiff sued them again for largely the same violations — screen reader incompatibility, missing image descriptions, broken keyboard navigation.",
      "The story is familiar by now: settle, half-fix it, drift out of compliance, get sued again. The plaintiff law firms watch each other's cases and know which companies have already paid once. Repeat targets get sued first because the second case is usually easier to settle than the first.",
    ],
  },

  "kitchenaid-whirlpool-2023": {
    hook: "Even a premium household brand isn't safe. KitchenAid got sued in 2023.",
    story: [
      "KitchenAid is owned by Whirlpool, a Fortune 500 company. Despite that backing, the brand's e-commerce site faced a class action in 2023 alleging blind shoppers couldn't browse appliances, read product details, or check specs because of screen-reader incompatibility and missing image descriptions.",
      "The case demonstrates a now-familiar pattern: plaintiff firms target known consumer brands where the website is the primary sales channel. The dollar amount the brand can spend on legal fees is much higher than the cost of just making the site accessible — but only if they do it before being sued.",
    ],
  },

  "walsh-v-dania": {
    hook: "A mid-size furniture chain tried to dodge the case. The court said no.",
    story: [
      "In 2024, mid-size furniture retailer Dania was sued in Illinois federal court because its website wasn't accessible. The company moved to dismiss the case, arguing it was too small to qualify and didn't have enough of a connection between the site and physical stores to trigger the ADA.",
      "The court rejected the motion. Retail websites of essentially any size are public accommodations subject to the ADA, regardless of whether there's a physical-store nexus. The case underscored that small and mid-market retailers can't hide behind size — plaintiff firms increasingly target them precisely because they have less budget to defend.",
    ],
  },

  "tribeca-v-accessibe": {
    hook: "A small dermatology practice paid for an \"accessibility widget.\" They got sued anyway.",
    story: [
      "Tribeca Skin Care, a small dermatology practice in New York, paid AccessiBe $490 a year for an accessibility widget — a third-party overlay tool that promised to make any website \"ADA compliant\" with a few lines of code. They got sued for ADA violations anyway. Then they sued AccessiBe for misrepresenting what the widget did.",
      "In 2025 the FTC fined AccessiBe $1 million for deceptive marketing. This case is the definitive proof that accessibility overlays don't work as a legal defense — the DOJ has warned about them, plaintiff firms target sites using them, and they don't fix the underlying inaccessible code. Real compliance requires real work.",
    ],
  },

  "burbon-v-fox-news": {
    hook: "Fox News's website got sued for being inaccessible. Media isn't exempt.",
    story: [
      "In 2018, a blind plaintiff filed a class action against Fox News for an inaccessible news website — broken keyboard navigation, dead links, no image descriptions. The case settled in 2019. Other plaintiffs filed similar cases against CNN, The New York Times, and other major news outlets around the same time.",
      "Content publishers and media companies often think \"we're just words on a page,\" but inaccessibility breaks news in the same ways it breaks shopping. The case made clear that any business with an audience — not just retailers — faces the same exposure.",
    ],
  },

  "access-now-v-blue-apron": {
    hook: "Blue Apron has no stores. The court still made them comply.",
    story: [
      "Blue Apron is an online-only meal kit subscription service — no physical retail stores anywhere. When the company was sued in 2017 by a blind subscriber, Blue Apron's defense was that it shouldn't qualify as a \"place of public accommodation\" because there was no physical place.",
      "The court refused to dismiss the case in 2017, ruling that excluding internet-only businesses from the ADA would \"run afoul of the purposes of the law.\" Blue Apron settled in 2018 and committed to making the site accessible. This case is a key precedent for the rule that SaaS, D2C subscription services, and other digital-native businesses must meet accessibility standards.",
    ],
  },

  "aicpa-nasba-cpa-exam-doj": {
    hook: "The accountants who certify other accountants couldn't certify blind ones.",
    story: [
      "Jane Doe, a blind candidate for the Uniform CPA Exam, requested screen-reader accessibility and additional time. The American Institute of CPAs and the National Association of State Boards of Accountancy — the two organizations that run the CPA exam — refused. She complained to the DOJ.",
      "The DOJ settled with both organizations in 2019. They paid $15,000 to the complainant, paid $1,000–$10,000 to other affected candidates, and rebuilt the exam to work with JAWS and ZoomText. The lesson is uncomfortable for B2B regulators: licensure, testing, and credentialing all fall under the ADA. If a profession's gatekeeper isn't accessible, the entire profession is closed to disabled candidates.",
    ],
  },

  "bone-v-unc-health-care": {
    hook: "Blind patients at a major hospital system couldn't read their own bills.",
    story: [
      "UNC Health Care is North Carolina's largest hospital system. Blind patients couldn't access medical records, billing statements, or appointment information — these were posted as scanned PDFs and inaccessible online forms. The National Federation of the Blind and Disability Rights NC sued in 2022.",
      "The case settled for $125,000 in damages to affected patients. In 2023, a federal court issued an injunction requiring UNC Health to make all patient-facing digital communications accessible. Hospitals everywhere are now on notice: \"we sent the PDF\" doesn't satisfy the ADA if blind patients can't read it.",
    ],
  },

  "doj-v-medstar-health": {
    hook: "DC and Maryland's largest hospital system paid $440,000 for digital accessibility failures.",
    story: [
      "MedStar Health operates dozens of hospitals across Washington DC and Maryland. The DOJ found that disabled patients faced barriers using MedStar's online portals, scheduling systems, and digital communications. In 2024, MedStar agreed to a consent decree paying $440,000 in compensation to affected individuals.",
      "Importantly, the decree required full WCAG 2.1 AA compliance across all MedStar's patient-facing digital systems. Healthcare systems are increasingly being held to the same standards as government — full digital accessibility, not just a website with a wheelchair logo. The financial penalty was modest. The engineering work was substantial.",
    ],
  },

  "doj-v-springfield-clinic-b2b": {
    hook: "The same Springfield Clinic case, viewed from the operator's side.",
    story: [
      "From the clinic's perspective, this DOJ enforcement action required deep, expensive engineering work — fixing the patient portal (FollowMyHealth), the records system (CIOX), all mobile apps, and the public website to meet WCAG 2.1 AA. The $5,000 paid to the patient was the smallest line item.",
      "For any healthcare operator, this case shows the real cost of an accessibility failure isn't the dollar settlement — it's the months of remediation work, the documentation requirements, the recurring monitoring, and the slow drag on every product launch going forward.",
    ],
  },

  "fowler-v-california-dept-insurance": {
    hook: "California's insurance exam was unusable by blind candidates.",
    story: [
      "Blind insurance agent candidates in California sued the state's Department of Insurance and its testing vendor PSI Services in 2022. The online licensing exam — required to sell insurance in California — wasn't compatible with screen readers. Candidates literally could not take the test.",
      "The 2024 settlement forced PSI to overhaul the exam software for full screen-reader compatibility. The case is part of a broader pattern: any high-stakes online test (CPA, bar exam, insurance, real estate, securities) must be accessible. If candidates can't take the test, the profession is effectively closed.",
    ],
  },

  "frazier-v-hca-holdings": {
    hook: "159 hospital websites. Zero of them accessible. One lawsuit.",
    story: [
      "HCA Holdings (now HCA Healthcare) operates over 150 hospitals across the US. In 2017, a single blind plaintiff sued the company for the simple reason that all 159 hospital websites lacked alt text and keyboard navigation — meaning blind patients across the entire HCA network couldn't use any of them.",
      "The case settled (terms private). It's a cautionary tale for any business operating multiple sites on a shared platform: a single template flaw becomes 150 separate violations the moment a plaintiff cares to file. Consistency cuts both ways.",
    ],
  },

  "mckenney-v-exact-care-pharmacy": {
    hook: "A pharmacy refused to send medication info in a format a blind patient could read.",
    story: [
      "Exact Care Pharmacy is an Ohio-based mail-order pharmacy. Blind patients receiving medication asked for instructions in accessible formats — Braille, large print, or a digital format compatible with screen readers. Exact Care refused. The National Federation of the Blind sued in December 2023.",
      "The case was still active as of late 2024. The core legal claim is straightforward: under the ADA, a business must provide effective communication to people with disabilities. If you're a pharmacy and your patient can't read the dosing instructions, that's a violation by itself.",
    ],
  },

  "morgan-lewis-financial-services-wave": {
    hook: "Plaintiff firms started flooding financial-services companies with demand letters in 2024.",
    story: [
      "In 2024, plaintiff firms including Carlson Lynch, KamberLaw, and Lee Litigation Group sent aggressive demand letters to financial services companies — Schwab, E-Trade, Wells Fargo, and many others — alleging website accessibility violations. The volume was unprecedented and clearly coordinated.",
      "Most of these resolve quietly with private settlements before reaching court. But the strategy reveals the new playing field: financial services and wealth management firms are the next major target, because they have high-value clients, regulated compliance cultures, and the budget to settle quickly. The wave is ongoing.",
    ],
  },

  "nash-hospitals-blind-patient": {
    hook: "A blind patient sued a North Carolina hospital and won.",
    story: [
      "A blind patient at Nash Hospitals in North Carolina couldn't access basic medical communications — bills, records, appointment confirmations — because they were sent in inaccessible formats. The patient sued in 2022. The hospital settled (terms private).",
      "This was part of a broader NFB campaign targeting North Carolina hospital systems for digital accessibility failures, alongside the UNC Health case. The takeaway for any healthcare provider: blind patients have the right to read their own medical information. \"We sent it to you\" isn't enough if you can't read what was sent.",
    ],
  },

  "nfb-v-epic-systems": {
    hook: "The biggest EHR vendor in America. Blind employees couldn't use it.",
    story: [
      "Epic Systems makes the electronic health records software that runs most US hospitals. Blind employees at hospitals using Epic couldn't operate the software with screen readers, effectively locking them out of nursing, billing, and administrative jobs. The National Federation of the Blind sued Epic directly.",
      "The federal judge dismissed the case in 2020 on a technicality — the court ruled that Epic, as a software vendor, couldn't be held directly liable for its hospital customers' employment decisions. But the case forced enormous attention on B2B SaaS accessibility. Any enterprise software vendor today must take accessibility seriously, because their hospital, bank, or insurer customers will demand it.",
    ],
  },

  "schwab-blind-clients-structured-negotiation": {
    hook: "Schwab clients didn't sue. They negotiated. The result was just as binding.",
    story: [
      "Four blind Charles Schwab clients found that schwab.com, the Schwab mobile app, and the Thinkorswim trading platform weren't accessible. Instead of filing a lawsuit, they used \"structured negotiation\" — a process where the parties resolve the issue cooperatively, usually with an enforceable agreement at the end.",
      "The 2024 outcome required Schwab to achieve full WCAG 2.2 AA compliance across all three platforms, with quarterly accessibility audits and public reporting. Structured negotiation is the under-the-radar way many big companies fix accessibility — fewer headlines, same legal teeth, often a cheaper outcome than a public lawsuit.",
    ],
  },

  "tenet-healthcare-american-blind-community": {
    hook: "A class action on behalf of all blind Americans against a major hospital chain.",
    story: [
      "In 2016, the American Blind Community filed a class action against Tenet Healthcare Corporation — one of the largest hospital chains in the US — on behalf of all blind Americans. The claim was simple: Tenet's hospital websites were inaccessible to screen reader users across the entire country.",
      "The parties settled shortly after filing. Terms were not disclosed publicly. The case is significant because it shows the size of the class plaintiff firms can assemble — when the violation affects every blind person who might be a patient, that's potentially millions of class members, and the settlement leverage is enormous.",
    ],
  },

  "wellpoint-anthem-structured-negotiation": {
    hook: "Anthem health insurance — sorted out with no lawsuit at all.",
    story: [
      "Two blind Anthem Blue Cross members, Mendelsohn and Chen, used structured negotiation to compel WellPoint (now Anthem) to make anthem.com, all their mobile apps, and all member materials WCAG 2.0 AA compliant by mid-2014. No litigation, no court, no public filings.",
      "The agreement was binding and enforceable, with confidential financial terms. This 2014 case is one of the earliest examples of a major insurance company being forced to remediate digital accessibility — and a reminder that lots of accessibility enforcement happens entirely outside the court system, invisible to the press.",
    ],
  },

  "doj-service-oklahoma-mobile-app": {
    hook: "Oklahoma's mobile ID app couldn't be used by a blind resident. The DOJ stepped in.",
    story: [
      "Service Oklahoma runs the state's digital services — including the OK Mobile ID App, which residents use for unemployment claims, commercial transactions, and REAL ID verification. A blind Oklahoma resident filed a complaint that the app didn't work with VoiceOver or TalkBack.",
      "The DOJ's 2024 settlement required the app to meet WCAG 2.1 AA. No monetary penalty, but a strict remediation timeline and ongoing reporting. The case extends DOJ enforcement to government mobile apps — which is increasingly where citizens access public services. If your business builds apps for the public sector, accessibility is now a procurement requirement.",
    ],
  },
}

export function getStoryForSlug(slug: string): { hook: string; story: string[] } | undefined {
  return lawsuitStories[slug]
}
