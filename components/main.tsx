'use client'

import { HTMLAttributes } from 'react'
import { use100vh } from 'react-div-100vh'

export default function Main({ isCentered, ...props }: HTMLAttributes<HTMLDivElement> & { isCentered?: boolean }) {
    const height = use100vh()
    return <main
        style={{
            minHeight: height ? height - 80 : 'calc(100vh - 80px)',
            maxWidth: 900,
            margin: '0 auto',
            padding: '1rem',
            ...(isCentered ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}),
        }}
        {...props}
    ></main>
}
