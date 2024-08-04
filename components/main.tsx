'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { use100vh } from 'react-div-100vh'

export default function Main({ isCentered, fullHeight, ...props }: HTMLAttributes<HTMLDivElement> & {
    isCentered?: boolean,
    fullHeight?: boolean
}) {
    const height = use100vh()
    const offset = fullHeight ? 0 : 180
    return <main
        style={{
            minHeight: height ? height - offset : `calc(100vh - ${offset}px)`,
            maxWidth: 900,
            margin: '0 auto',
            padding: '1rem',
            ...(isCentered ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}),
        }}
        {...props}
    ></main>
}

export const Article = ({ children }: { children: ReactNode }) => <div className='prose dark:prose-invert pt-5 grid grid-cols-1 min-w-full'>
    <article>
        {children}
    </article>
</div>
