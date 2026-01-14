import type { Metadata } from 'next'
import './globals.css'
import { cn } from '~/utils/cn'
import { Toaster } from '~/components/ui/sonner'
import { eremitageFont } from '~/fonts/eremitage'
import ScrollToTop from './_components/scroll-to-top'

export const metadata: Metadata = {
  title: 'Dominate',
  description: 'Dominate For Web Solution',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='light' style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <body className={cn('antialiased', eremitageFont.variable)} suppressHydrationWarning>
        <div className='bg-gray-100'>
            {children}
        </div>
        <ScrollToTop />
        <Toaster richColors theme='light' />
      </body>
    </html>
  )
}
