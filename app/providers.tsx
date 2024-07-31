'use client'

import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode, useState } from 'react'
import { ClerkProvider, GoogleOneTap } from '@clerk/nextjs'
import { useSystemColorMode } from 'react-use-system-color-mode'
import { dark } from '@clerk/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    const router = useRouter()
    const mode = useSystemColorMode()
    const [queryClient] = useState(() => new QueryClient())

    return <QueryClientProvider client={queryClient}>
        <ClerkProvider appearance={{ baseTheme: mode === 'dark' ? dark : undefined }}>
            <GoogleOneTap />
            <NextUIProvider navigate={router.push}>
                <NextThemesProvider attribute='class' enableSystem>
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </ClerkProvider>
    </QueryClientProvider>
}
