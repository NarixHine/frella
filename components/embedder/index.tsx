'use client'

import { useEffect, useRef } from 'react'
import Profile from '../profile/profile'
import { useInfiniteQuery } from '@tanstack/react-query'
import { IoMdLink } from 'react-icons/io'

export default function Embedder() {
    const { data, isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: ['frella'],
        queryFn: async ({ pageParam }) => {
            const { frellas, cursor, more } = await fetch(`https://frella.me/api/frellas/user_2k3mWhoQ4iCNwkmnzcTDrJ1JPfA/${pageParam}`).then((res) => res.json())
            console.log(frellas, cursor, more)
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

    return profileProps.src && <ul className='flex flex-col space-y-3 w-full'>
        {
            frellas.map((frella) => (
                <li key={frella.id} className='pt-5'>
                    <div className={'flex flex-col border-default-900/10 bg-background/30 border-1 rounded-lg p-5'}>
                        <Profile {...profileProps} isCompact></Profile>
                        <article className='my-3 prose prose-blockquote:my-3 prose-p:my-2 prose-img:my-4 dark:prose-invert' dangerouslySetInnerHTML={{ __html: frella.content }}></article>
                    </div>
                </li>
            ))
        }
        <li className='pt-5'>
            <div ref={ref} className={`border-b-0 opacity-60 flex flex-col border-default-900/10 bg-background/30 border-1 rounded-lg p-5`}>
                <Profile
                    {...profileProps}
                    isCompact
                ></Profile>
                <div className={'w-full h-20 flex justify-center items-center'}>
                    {
                        <>
                            <hr className='flex-1'></hr>
                            <div className='mx-3 opacity-30'>{more ? 'Loading ...' : 'The End'}</div>
                            <hr className='flex-1'></hr>
                        </>
                    }
                </div>
            </div>
        </li>
    </ul>
}
