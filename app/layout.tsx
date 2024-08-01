import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import Header from './header'
import { inter } from '@/utils/fonts'

export const metadata: Metadata = {
  title: {
    default: 'Frella',
    template: '%s | Frella',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <html lang='en'>
    <body className={inter.className}>
      <Providers>
        <div className='flex flex-col w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2D2E2F_1px,transparent_1px)] [background-size:20px_20px]'>
          <Header></Header>
          {children}
        </div>
      </Providers>
    </body>
  </html>
}
