import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI YouTube Shorts Generator',
  description: 'Automatically generate YouTube Shorts with AI',
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
