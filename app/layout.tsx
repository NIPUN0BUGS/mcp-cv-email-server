import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MCP CV Chat Playground - Upload & Chat with Your Resume',
  description: 'Upload your CV and chat with it using Model Context Protocol. Ask questions about your experience, skills, education, and more. Built with Next.js.',
  keywords: 'CV chat, resume parser, Model Context Protocol, MCP, Next.js, AI chat',
  authors: [{ name: 'MCP CV Chat' }],
  openGraph: {
    title: 'MCP CV Chat Playground',
    description: 'Upload your CV and chat with it using Model Context Protocol',
    type: 'website',
  },
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