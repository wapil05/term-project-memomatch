import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// These styles apply to every route in the application
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Memo Match',
  description: 'Revive your childhood memories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/next.svg" />   
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}