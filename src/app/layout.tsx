import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'FUTURE FOCUS - Your All-in-One E-commerce Hub',
  description: 'Empowering Tomorrow, Today – Delivering cutting-edge innovation and seamless adaptability designed to evolve with your changing needs and shape a smarter, brighter future.',
  keywords: 'e-commerce, electronics, fashion, home, technology, shopping',
  authors: [{ name: 'FUTURE FOCUS' }],
  creator: 'FUTURE FOCUS',
  publisher: 'FUTURE FOCUS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'FUTURE FOCUS - Your All-in-One E-commerce Hub',
    description: 'Empowering Tomorrow, Today – Delivering cutting-edge innovation and seamless adaptability.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'FUTURE FOCUS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FUTURE FOCUS - Your All-in-One E-commerce Hub',
    description: 'Empowering Tomorrow, Today – Delivering cutting-edge innovation.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Montserrat:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00F0FF" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 font-inter">
        <Providers>
          <div className="relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-[-1]">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>
            
            {children}
            
            {/* Scroll to Top Button */}
            <button
              id="backToTopBtn"
              className="fixed bottom-20 right-6 z-50 hidden p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-all duration-300 hover:scale-110"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to Top"
            >
              <i className="fas fa-arrow-up"></i>
            </button>
            
            {/* Self-Service Logo */}
            <div className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25">
              F.F Self Service <i className="fas fa-robot ml-2"></i>
            </div>
          </div>
          
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}