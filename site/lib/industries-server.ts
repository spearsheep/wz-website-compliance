import { getAllLawsuits, type Lawsuit } from "@/lib/lawsuits"
import { getIndustryBySlug } from "@/lib/industries"

export function getCasesForIndustry(industrySlug: string): Lawsuit[] {
  const industry = getIndustryBySlug(industrySlug)
  if (!industry) return []
  return getAllLawsuits().filter((l) => industry.caseIndustryCodes.includes(l.industry))
}
