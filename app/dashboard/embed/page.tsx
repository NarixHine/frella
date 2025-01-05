import Embedder from '@/components/embedder'
import Main, { Article } from '@/components/main'
import getUserProfile from '@/components/profile/actions'
import { auth } from '@clerk/nextjs/server'
import { Metadata } from 'next'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export const metadata: Metadata = {
    title: 'Embed Frella',
    description: 'Embed Frella on your website',
}

const SNIPPET_1 = `'use client'

import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function Embedder() {
    const { data, isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: ['frella'],
        queryFn: async ({ pageParam }) => {
            const { frellas, cursor, more } = await fetch(\`/api/frellas/`

const SNIPPET_2 = `/\${pageParam}\`).then((res) => res.json())
            return { frellas, cursor, more }
        },
        initialPageParam: 'initial',
        getNextPageParam: ({ cursor }) => cursor,
    })
    const more = data?.pages[data.pages.length - 1].more
    const profileProps = {
        src: data?.pages[0].frellas[0]?.src,
        name: data?.pages[0].frellas[0]?.name,
        handle: data?.pages[0].frellas[0]?.handle,
    }

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const { current } = ref
        if (current)
            new IntersectionObserver((e) => {
                const { isIntersecting } = e[0]
                if (isIntersecting && !isLoading && more) {
                    fetchNextPage()
                }
            }).observe(current)
    }, [ref, isLoading, fetchNextPage, more])

    const frellas = data ? data.pages.map(({ frellas }) => frellas).flat().map((props) => ({
        ...props,
        ...profileProps,
    })) : []

    const Profile = () => <div className='flex items-center space-x-5'>
        <div>
            <img src={profileProps.src} className={'w-8 h-8 rounded-full'} />
        </div>
        <div className={'ml-1'}>
            <div className={'text-md font-semibold'}>{profileProps.name}</div>
            <div className={'text-xs font-mono'}>@{profileProps.handle}</div>
        </div>
    </div>

    return profileProps.src && <ul className='flex flex-col space-y-3 mx-auto max-w-[600px]'>
        {
            frellas.map((frella) => (
                <li key={frella.id} className='pt-5'>
                    <div className={'flex flex-col border-slate-900/10 bg-slate/30 border-1 rounded-lg p-5'}>
                        <Profile></Profile>
                        <article className='my-3 prose prose-blockquote:my-3 prose-h2:my-3 prose-p:my-2 prose-img:my-4 dark:prose-invert' dangerouslySetInnerHTML={{ __html: frella.content }}></article>
                    </div>
                </li>
            ))
        }
        <li className='pt-5'>
            <div ref={ref} className={'border-b-0 opacity-60 flex flex-col border-slate-900/10 bg-slate/30 border-1 rounded-lg p-5'}>
                <Profile></Profile>
                <div className={'w-full h-20 flex justify-center items-center'}>
                    <hr className='flex-1'></hr>
                    <div className='mx-3 opacity-30'>{more ? 'Loading ...' : 'The End'}</div>
                    <hr className='flex-1'></hr>
                </div>
            </div>
        </li>
    </ul>
}
`

export default async function EmbedPage() {
    const { userId } = await auth()
    const { handle } = await getUserProfile()
    const snippet = `${SNIPPET_1}${userId}${SNIPPET_2}`
    return <Main>
        <Article>
            <h1>
                Embed Frella on Your Website
            </h1>
            <p>
                To embed Frella, simply add the following HTML to your website:
            </p>
            <SyntaxHighlighter language='html' style={atomOneDark} customStyle={{
                maxWidth: '100%',
            }}>
                {`<iframe style="width: 100%; height: 600px;" src="https://${handle}-embed.${process.env.NEXT_PUBLIC_BASE_DOMAIN}/"></iframe>`}
            </SyntaxHighlighter>
            <p>
                Alternatively, copy & paste the following React component.
                <br></br>
                Make sure you have set up <code>@tanstack/react-query</code>, <code>Tailwind CSS</code> and <code>Tailwind Typography</code>.
            </p>
            <SyntaxHighlighter language='tsx' style={atomOneDark} customStyle={{
                maxWidth: '100%',
            }}>
                {snippet}
            </SyntaxHighlighter>
        </Article>
        <p>
            Preview:
        </p>
        <Embedder></Embedder>
    </Main>
}
