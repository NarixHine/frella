import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import Header from './header'
import { chinese, jost } from '@/utils/fonts'
import getHandle, { checkIsEmbedding } from '@/utils/routing'
import Footer from './footer'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: {
    default: 'Frella',
    template: '%s | Frella',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <html lang='en'>
    <body style={{ fontFamily: `${jost.style.fontFamily}, ${chinese.style.fontFamily}` }}>
      <Analytics></Analytics>
      <Providers>
        <div className={`flex flex-col w-full ${await checkIsEmbedding() ? '' : 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2D2E2F_1px,transparent_1px)] [background-size:20px_20px]'}`}>
          {!await getHandle() && <Header></Header>}
          {children}
          {!await getHandle() && <Footer></Footer>}
        </div>
      </Providers>
    </body>
  </html>
}
