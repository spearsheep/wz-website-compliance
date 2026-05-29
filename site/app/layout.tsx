import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { SkipNav } from "@/components/layout/SkipNav"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://justcompliant.net"),
  title: {
    default: "JustCompliant — ADA Web Accessibility",
    template: "%s | JustCompliant",
  },
  description:
    "Audit, fix, and maintain your website's ADA accessibility compliance. Protect your business from lawsuits under WCAG 2.1, ADA Title III, California Unruh Act, and New York Human Rights Law.",
  keywords: [
    "ADA compliance",
    "WCAG 2.1",
    "web accessibility",
    "accessibility audit",
    "ADA lawsuit",
    "California Unruh Act",
    "website accessibility",
  ],
  authors: [{ name: "JustCompliant" }],
  creator: "JustCompliant",
  publisher: "JustCompliant",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "JustCompliant — ADA Web Accessibility",
    description:
      "ADA web accessibility audits, remediation, and ongoing compliance for US businesses. Built to WCAG 2.1 AA.",
    siteName: "JustCompliant",
  },
  twitter: {
    card: "summary_large_image",
    title: "JustCompliant",
    description:
      "ADA web accessibility audits, remediation, and ongoing compliance.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "JustCompliant",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://justcompliant.net",
  description:
    "ADA and WCAG 2.1 web accessibility consulting — audits, remediation, and ongoing compliance monitoring for US businesses.",
  areaServed: { "@type": "Country", name: "United States" },
  serviceType: [
    "Web accessibility audit",
    "ADA compliance remediation",
    "WCAG 2.1 AA implementation",
    "Accessibility maintenance",
  ],
  knowsAbout: [
    "ADA Title III",
    "WCAG 2.1 Level AA",
    "California Unruh Civil Rights Act",
    "New York City Human Rights Law",
    "Section 508",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SkipNav />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
