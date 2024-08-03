'use client'

import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function Embedder() {
    const { data, isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: ['frella'],
        queryFn: async ({ pageParam }) => {
            const { frellas, cursor, more } = await fetch(`/api/frellas/user_2k3mWhoQ4iCNwkmnzcTDrJ1JPfA/${pageParam}`).then((res) => res.json())
            console.log({ frellas })
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

    return profileProps.src && <ul className='flex flex-col space-y-3 w-full'>
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
            <div ref={ref} className={`border-b-0 opacity-60 flex flex-col border-slate-900/10 bg-slate/30 border-1 rounded-lg p-5`}>
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
