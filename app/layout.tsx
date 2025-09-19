import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teamwork & Collaboration Presentation',
  description: 'A presentation about teamwork and collaboration in software development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}