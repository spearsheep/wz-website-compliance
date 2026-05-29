# Pricing Evaluation — Website Compliance Services
Generated: 2026-05-26

## What This Is
A company-by-company assessment of whether our current dynamic pricing (audit / fix / rebuild)
is calibrated correctly for each business's actual revenue size and website complexity.

---

## 1. Industry Multiplier Gaps (Most Urgent Fix)

Three of our four target industries have **no specific pricing multiplier** in the quote engine.
Everything defaults to 1.0x. This underprices all three industries:

| Industry | Current | Recommended | Why |
|---|---|---|---|
| Hotels & Hospitality | 1x | 1.2x | Booking engines are high-revenue conversion surfaces; revenue risk of inaccessibility is direct (lost bookings). 20% uplift is justified. |
| Auto Dealerships | 1x | 1.25x | High-ticket transactions ($30K+ cars); CFPB scrutiny on digital credit applications; strong dealer margins. 25% uplift. |
| Senior Care / Assisted Living | 1x | 1.4x | ADA + state elder-care laws stack; elderly disabled users are a primary customer segment; emotionally sensitive — settlements tend to be larger. 40% uplift. |

**Impact**: Applying these multipliers would raise audit/fix/rebuild prices by 20–40% for
hotels, automotive, and senior care companies — making our quotes more appropriate for the risk
and revenue profile of these industries.

---

## 2. Flag Summary (Across All 35 Scanned Sites)

| Flag | Count | Meaning |
|---|---|---|
| `industry-multiplier-gap` | 25 | No specific multiplier set for this industry |
| `rebuild-overpriced-vs-market` | 15 | Our rebuild costs more than market — not competitive |
| `audit-underpriced-for-enterprise` | 13 | Large/enterprise company — our audit price is too low |
| `fix-exceeds-build-floor` | 1 | Fix ceiling > market build floor — rebuild is the stronger pitch |
| `audit-too-steep-for-smb` | 1 | Small business — our audit price may be too high |

---

## 3. Company-by-Company Breakdown

### Enterprise (>$500M revenue)

**Kimpton Hotels** (Hotels & Hospitality)
- Revenue: $600M–$1B est. | Score: 94 | Risk: LOW
- Audit: $1,300 (budget ceiling: $25,000)
- Fix: $2,500 | Rebuild: $11,200 | Market build: $16,500
- Multiplier: 1x → suggested 1.2x
- Flags: `audit-underpriced-for-enterprise`, `industry-multiplier-gap`
- Top issue: _Images missing descriptions_

**Schomp Automotive** (Auto Dealerships)
- Revenue: $500M–$900M est. | Score: 81 | Risk: MODERATE
- Audit: $500 (budget ceiling: $25,000)
- Fix: $2,900 | Rebuild: $8,000 | Market build: $4,500
- Multiplier: 1x → suggested 1.25x
- Flags: `audit-underpriced-for-enterprise`, `rebuild-overpriced-vs-market`, `industry-multiplier-gap`
- Top issue: _Page has no title_

**Serra Automotive** (Auto Dealerships)
- Revenue: $3B–$4B est. | Score: 80 | Risk: MODERATE
- Audit: $16,600 (budget ceiling: $25,000)
- Fix: $4,100 | Rebuild: $35,000 | Market build: $51,500
- Multiplier: 1x → suggested 1.25x
- Flags: `industry-multiplier-gap`
- Top issue: _Your text is too hard to read_

**Bergstrom Automotive** (Auto Dealerships)
- Revenue: $2B–$3B est. | Score: 90 | Risk: LOW
- Audit: $18,400 (budget ceiling: $25,000)
- Fix: $3,300 | Rebuild: $35,000 | Market build: $51,500
- Multiplier: 1x → suggested 1.25x
- Flags: `industry-multiplier-gap`
- Top issue: _Links blend into text_

**Ken Garff Automotive** (Auto Dealerships)
- Revenue: $3B–$5B est. | Score: 83 | Risk: MODERATE
- Audit: $1,300 (budget ceiling: $25,000)
- Fix: $4,000 | Rebuild: $11,200 | Market build: $14,000
- Multiplier: 1x → suggested 1.25x
- Flags: `audit-underpriced-for-enterprise`, `industry-multiplier-gap`
- Top issue: _Screen reader markup is broken_

**Crown Automotive** (Auto Dealerships)
- Revenue: $800M–$1.5B est. | Score: 88 | Risk: MODERATE
- Audit: $15,700 (budget ceiling: $25,000)
- Fix: $3,200 | Rebuild: $35,000 | Market build: $51,500
- Multiplier: 1x → suggested 1.25x
- Flags: `industry-multiplier-gap`
- Top issue: _Your text is too hard to read_

**Joe Machens Dealerships** (Auto Dealerships)
- Revenue: $500M–$1B est. | Score: 95 | Risk: LOW
- Audit: $19,300 (budget ceiling: $25,000)
- Fix: $2,500 | Rebuild: $35,000 | Market build: $51,500
- Multiplier: 1x → suggested 1.25x
- Flags: `industry-multiplier-gap`
- Top issue: _Touch targets do not have sufficient size or spacing_

**Findlay Automotive** (Auto Dealerships)
- Revenue: $500M–$700M est. | Score: 94 | Risk: LOW
- Audit: $1,100 (budget ceiling: $25,000)
- Fix: $2,500 | Rebuild: $8,000 | Market build: $4,500
- Multiplier: 1x → suggested 1.25x
- Flags: `audit-underpriced-for-enterprise`, `rebuild-overpriced-vs-market`, `industry-multiplier-gap`
- Top issue: _Your text is too hard to read_

**Watermark Retirement Communities** (Senior Care / Assisted Living)
- Revenue: $500M–$700M est. | Score: 99 | Risk: LOW
- Audit: $22,900 (budget ceiling: $25,000)
- Fix: $2,100 | Rebuild: $35,000 | Market build: $56,500
- Multiplier: 1x → suggested 1.4x
- Flags: `industry-multiplier-gap`
- Top issue: _Heading structure is broken_

### Large ($100M–$500M)

**Auberge Resorts** (Hotels & Hospitality)
- Revenue: $150M–$250M est. | Score: 97 | Risk: LOW
- Audit: $1,300 (budget ceiling: $15,000)
- Fix: $2,400 | Rebuild: $11,200 | Market build: $16,500
- Multiplier: 1x → suggested 1.2x
- Flags: `audit-underpriced-for-enterprise`, `industry-multiplier-gap`
- Top issue: _Touch targets do not have sufficient size or spacing._

**Tasca Automotive** (Auto Dealerships)
- Revenue: $400M–$700M est. | Score: 90 | Risk: LOW
- Audit: $1,300 (budget ceiling: $15,000)
- Fix: $3,300 | Rebuild: $11,200 | Market build: $14,000
- Multiplier: 1x → suggested 1.25x
- Flags: `audit-underpriced-for-enterprise`, `industry-multiplier-gap`
- Top issue: _Your text is too hard to read_

**Sonida Senior Living** (Senior Care / Assisted Living)
- Revenue: $300M–$320M est. | Score: 86 | Risk: MODERATE
- Audit: $700 (budget ceiling: $15,000)
- Fix: $3,600 | Rebuild: $9,300 | Market build: $9,000
- Multiplier: 1x → suggested 1.4x
- Flags: `audit-underpriced-for-enterprise`, `industry-multiplier-gap`
- Top issue: _Touch targets do not have sufficient size or spacing._

**Milestone Retirement Communities** (Senior Care / Assisted Living)
- Revenue: $100M–$200M est. | Score: 90 | Risk: LOW
- Audit: $1,900 (budget ceiling: $15,000)
- Fix: $3,000 | Rebuild: $14,000 | Market build: $5,000
- Multiplier: 1x → suggested 1.4x
- Flags: `audit-underpriced-for-enterprise`, `rebuild-overpriced-vs-market`, `industry-multiplier-gap`
- Top issue: _Mystery links with no name_

**Frontier Senior Living** (Senior Care / Assisted Living)
- Revenue: $200M–$400M est. | Score: 75 | Risk: HIGH
- Audit: $2,200 (budget ceiling: $15,000)
- Fix: $3,800 | Rebuild: $13,800 | Market build: $5,000
- Multiplier: 1x → suggested 1.4x
- Flags: `audit-underpriced-for-enterprise`, `fix-exceeds-build-floor`, `rebuild-overpriced-vs-market`, `industry-multiplier-gap`
- Top issue: _Screen reader markup is broken_

**The Springs Living** (Senior Care / Assisted Living)
- Revenue: $100M–$150M est. | Score: 90 | Risk: LOW
- Audit: $600 (budget ceiling: $15,000)
- Fix: $2,900 | Rebuild: $8,500 | Market build: $5,000
- Multiplier: 1x → suggested 1.4x
- Flags: `audit-underpriced-for-enterprise`, `rebuild-overpriced-vs-market`, `industry-multiplier-gap`
- Top issue: _Your text is too hard to read_

**Senior Resource Group** (Senior Care / Assisted Living)
- Revenue: $150M–$250M est. | Score: 92 | Risk: LOW
- Audit: $3,600 (budget ceiling: $15,000)
- Fix: $3,300 | Rebuild: $22,200 | Market build: $5,000
- Multiplier: 1x → suggested 1.4x
- Flags: `audit-underpriced-for-enterprise`, `rebuild-overpriced-vs-market`, `industry-multiplier-gap`
- Top issue: _Touch targets do not have sufficient size or spacing._

**Bombas** (Mid-Market E-Commerce (DTC))
- Revenue: $300M–$350M est. | Score: 82 | Risk: MODERATE
- Audit: $1,300 (budget ceiling: $15,000)
- Fix: $3,400 | Rebuild: $11,200 | Market build: $17,000
- Multiplier: 1x → suggested 1x
- Flags: `audit-underpriced-for-enterprise`
- Top issue: _Images missing descriptions_

**Brooklinen** (Mid-Market E-Commerce (DTC))
- Revenue: $180M–$220M est. | Score: 94 | Risk: LOW
- Audit: $2,000 (budget ceiling: $15,000)
- Fix: $2,800 | Rebuild: $13,900 | Market build: $5,500
- Multiplier: 1x → suggested 1x
- Flags: `audit-underpriced-for-enterprise`, `rebuild-overpriced-vs-market`
- Top issue: _Images missing descriptions_

### Mid-Large ($50M–$100M)

**Proper Hotels** (Hotels & Hospitality)
- Revenue: $50M–$80M est. | Score: 80 | Risk: MODERATE
- Audit: $500 (budget ceiling: $8,000)
- Fix: $2,900 | Rebuild: $8,000 | Market build: $5,500
- Multiplier: 1x → suggested 1.2x
- Flags: `rebuild-overpriced-vs-market`, `industry-multiplier-gap`
- Top issue: _Page has no title_

**Ace Hotel** (Hotels & Hospitality)
- Revenue: $80M–$150M est. | Score: 92 | Risk: LOW
- Audit: $1,300 (budget ceiling: $8,000)
- Fix: $2,400 | Rebuild: $11,200 | Market build: $16,500
- Multiplier: 1x → suggested 1.2x
- Flags: `industry-multiplier-gap`
- Top issue: _Screen reader markup is broken_

**American Senior Living** (Senior Care / Assisted Living)
- Revenue: $50M–$150M est. | Score: 100 | Risk: LOW
- Audit: $500 (budget ceiling: $8,000)
- Fix: $2,000 | Rebuild: $8,000 | Market build: $5,000
- Multiplier: 1x → suggested 1.4x
- Flags: `rebuild-overpriced-vs-market`, `industry-multiplier-gap`

**Caraway** (Mid-Market E-Commerce (DTC))
- Revenue: $50M–$100M est. | Score: 85 | Risk: MODERATE
- Audit: $1,300 (budget ceiling: $8,000)
- Fix: $3,300 | Rebuild: $11,200 | Market build: $17,000
- Multiplier: 1x → suggested 1x
- Flags: none
- Top issue: _Images missing descriptions_

### Mid ($20M–$50M)

**Lark Hotels** (Hotels & Hospitality)
- Revenue: $30M–$50M est. | Score: 86 | Risk: MODERATE
- Audit: $1,300 (budget ceiling: $4,000)
- Fix: $2,900 | Rebuild: $11,200 | Market build: $16,500
- Multiplier: 1x → suggested 1.2x
- Flags: `industry-multiplier-gap`
- Top issue: _Your text is too hard to read_

**The Driskill Austin** (Hotels & Hospitality)
- Revenue: $20M–$35M est. | Score: 73 | Risk: HIGH
- Audit: $1,300 (budget ceiling: $4,000)
- Fix: $4,400 | Rebuild: $11,200 | Market build: $16,500
- Multiplier: 1x → suggested 1.2x
- Flags: `industry-multiplier-gap`
- Top issue: _Screen reader markup is broken_

**Wythe Hotel** (Hotels & Hospitality)
- Revenue: $20M–$30M est. | Score: 98 | Risk: LOW
- Audit: $3,700 (budget ceiling: $4,000)
- Fix: $2,100 | Rebuild: $27,000 | Market build: $41,500
- Multiplier: 1x → suggested 1.2x
- Flags: `industry-multiplier-gap`
- Top issue: _Heading structure is broken_

**Manduka** (Mid-Market E-Commerce (DTC))
- Revenue: $20M–$40M est. | Score: 92 | Risk: LOW
- Audit: $1,300 (budget ceiling: $4,000)
- Fix: $2,700 | Rebuild: $11,200 | Market build: $17,000
- Multiplier: 1x → suggested 1x
- Flags: none
- Top issue: _Screen reader markup is broken_

**Outdoor Voices** (Mid-Market E-Commerce (DTC))
- Revenue: $30M–$50M est. | Score: 97 | Risk: LOW
- Audit: $1,800 (budget ceiling: $4,000)
- Fix: $2,400 | Rebuild: $12,200 | Market build: $10,000
- Multiplier: 1x → suggested 1x
- Flags: `rebuild-overpriced-vs-market`
- Top issue: _Mystery links with no name_

**Four Sigmatic** (Mid-Market E-Commerce (DTC))
- Revenue: $30M–$65M est. | Score: 90 | Risk: LOW
- Audit: $1,300 (budget ceiling: $4,000)
- Fix: $3,200 | Rebuild: $11,200 | Market build: $17,000
- Multiplier: 1x → suggested 1x
- Flags: none
- Top issue: _Screen reader markup is broken_

**Pela Case** (Mid-Market E-Commerce (DTC))
- Revenue: $25M–$60M est. | Score: 88 | Risk: MODERATE
- Audit: $13,900 (budget ceiling: $4,000)
- Fix: $3,400 | Rebuild: $35,000 | Market build: $28,000
- Multiplier: 1x → suggested 1x
- Flags: `rebuild-overpriced-vs-market`
- Top issue: _Your text is too hard to read_

### Small-Mid ($5M–$20M)

**Arlo Hotels** (Hotels & Hospitality)
- Revenue: $15M–$30M est. | Score: 97 | Risk: LOW
- Audit: $1,300 (budget ceiling: $2,500)
- Fix: $2,400 | Rebuild: $11,200 | Market build: $16,500
- Multiplier: 1x → suggested 1.2x
- Flags: `industry-multiplier-gap`
- Top issue: _Touch targets do not have sufficient size or spacing._

**The Dean Collection** (Hotels & Hospitality)
- Revenue: $8M–$15M est. | Score: 81 | Risk: MODERATE
- Audit: $500 (budget ceiling: $2,500)
- Fix: $2,900 | Rebuild: $8,000 | Market build: $5,500
- Multiplier: 1x → suggested 1.2x
- Flags: `rebuild-overpriced-vs-market`, `industry-multiplier-gap`
- Top issue: _Page has no title_

**Concord Senior Living** (Senior Care / Assisted Living)
- Revenue: $5M–$20M est. | Score: 79 | Risk: HIGH
- Audit: $500 (budget ceiling: $2,500)
- Fix: $2,900 | Rebuild: $8,200 | Market build: $5,000
- Multiplier: 1x → suggested 1.4x
- Flags: `rebuild-overpriced-vs-market`, `industry-multiplier-gap`
- Top issue: _Your text is too hard to read_

**Branch Furniture** (Mid-Market E-Commerce (DTC))
- Revenue: $15M–$30M est. | Score: 90 | Risk: LOW
- Audit: $1,300 (budget ceiling: $2,500)
- Fix: $2,400 | Rebuild: $11,200 | Market build: $17,000
- Multiplier: 1x → suggested 1x
- Flags: none
- Top issue: _Your text is too hard to read_

**Beardbrand** (Mid-Market E-Commerce (DTC))
- Revenue: $5M–$15M est. | Score: 100 | Risk: LOW
- Audit: $6,500 (budget ceiling: $2,500)
- Fix: $2,300 | Rebuild: $35,000 | Market build: $5,500
- Multiplier: 1x → suggested 1x
- Flags: `audit-too-steep-for-smb`, `rebuild-overpriced-vs-market`
- Top issue: _Screen reader markup is broken_

**Ekster** (Mid-Market E-Commerce (DTC))
- Revenue: $15M–$25M est. | Score: 91 | Risk: LOW
- Audit: $14,800 (budget ceiling: $2,500)
- Fix: $2,700 | Rebuild: $35,000 | Market build: $28,000
- Multiplier: 1x → suggested 1x
- Flags: `rebuild-overpriced-vs-market`
- Top issue: _Screen reader markup is broken_

---

## 4. Key Strategic Recommendations

### A. Implement Industry Multipliers Immediately
The quote engine needs multipliers for hotel (1.2x), automotive (1.25x), and senior-care (1.4x).
These three industries are 75% of our current target list. Leaving them at 1.0x means every
quote we generate is 20–40% below where it should be.

### B. Revenue-Tiered Audit Pricing
Our current audit pricing is complexity-based only (site size × widget count). It ignores
company revenue. A $3B dealership (Serra Automotive) and a boutique hotel ($15M, Arlo Hotels)
currently get similar audit quotes if their sites have similar complexity. That's wrong.

**Recommendation**: Add a revenue-tier override cap and floor:
- Enterprise (>$500M): Audit floor $8K, Fix floor $10K
- Large ($100M–$500M): Audit floor $5K
- Mid ($20M–$100M): No change (current engine is reasonable)
- SMB (<$20M): Audit ceiling $2,500 to keep it accessible

### C. Flagship Pitch: "Fix vs. Rebuild" Decision
Several sites (notably in auto dealerships) have fix quotes that exceed the market floor for
a brand-new website. These are the strongest "rebuild" candidates. Frame the pitch as:
"You could pay X to patch a broken site, or Y to get a fully compliant, modern site."
Companies in this bucket: Frontier Senior Living.

### D. Target Priority by Score + Revenue
Best prospects = HIGH violation count + MID revenue ($20M–$100M). These companies have:
- Clear, demonstrable problems (strong sales evidence)
- Budget to act (not broke, not enterprise with slow procurement)
- Decision-maker is the owner or regional VP (not a 6-month RFP process)

Top prospects by this criteria:
- **The Driskill Austin** (Hotels & Hospitality): score 73, $20M–$35M est.
- **Concord Senior Living** (Senior Care / Assisted Living): score 79, $5M–$20M est.
- **Proper Hotels** (Hotels & Hospitality): score 80, $50M–$80M est.
- **The Dean Collection** (Hotels & Hospitality): score 81, $8M–$15M est.
- **Caraway** (Mid-Market E-Commerce (DTC)): score 85, $50M–$100M est.
- **Lark Hotels** (Hotels & Hospitality): score 86, $30M–$50M est.
- **Pela Case** (Mid-Market E-Commerce (DTC)): score 88, $25M–$60M est.
