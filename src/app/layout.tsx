import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sky data',
  description: 'Sky data',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <title>Viewership Dashboard</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className='bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md px-8 py-4 flex justify-between items-center rounded-b-2xl border-b border-gray-700'>
          {/* Left Navigation Links */}
          <div className='flex gap-6'>
            <Link
              href='/'
              className='text-blue-400 hover:text-pink-400 font-medium transition-colors hover:scale-105 duration-200'
            >
              Home
            </Link>
            <Link
              href='/analytics'
              className='text-blue-400 hover:text-pink-400 font-medium transition-colors duration-200  hover:scale-105'
            >
              Analytics
            </Link>
          </div>

          {/* Logo */}
          <img
            src='https://images.contentstack.io/v3/assets/bltdc2476c7b6b194dd/bltc5f8334a1e6d9c74/654cc103bb246f040a4dc4cd/Sky_Logo_Small.png'
            alt='Sky Logo'
            className='w-10 h-7 object-contain'
            loading='lazy'
          />
        </nav>

        {children}
      </body>
    </html>
  )
}
