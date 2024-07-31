'use client'

import { ScrollShadow, Spinner } from '@nextui-org/react'
import Frella, { FrellaProps } from './frella'
import { useEffect, useRef, useState } from 'react'
import Profile from '../profile/profile'
import { useInfiniteQuery } from '@tanstack/react-query'
import { loadFrellas } from './actions'

export default function Feed({ frellas, more: initialMore, cursor }: { frellas: FrellaProps[], more: boolean, cursor?: string }) {
    const profileProps = {
        src: frellas[0].src,
        name: frellas[0].name,
        handle: frellas[0].handle,
    }

    const { data, isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: ['frella'],
        queryFn: async ({ pageParam }) => {
            const recs = await loadFrellas({ cursor: pageParam })
            setMore(recs.more)
            return recs
        },
        initialPageParam: cursor,
        getNextPageParam: ({ cursor }) => cursor,
        enabled: false
    })
    const [more, setMore] = useState(initialMore)

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const { current } = ref
        if (cursor && current)
            new IntersectionObserver((e) => {
                const { isIntersecting } = e[0]
                if (isIntersecting && !isLoading) {
                    fetchNextPage()
                }
            }).observe(current)
    }, [ref, cursor, isLoading, fetchNextPage])

    const loadedFrellas = data ? data.pages.map(({ frellas }) => frellas).flat().map((props) => ({
        ...props,
        ...profileProps,
    })) : []

    return <ul className='flex flex-col space-y-3 w-full'>
        <ScrollShadow>
            {
                frellas.concat(loadedFrellas).map((frella) => (
                    <li key={frella.id} className='pt-5'>
                        <Frella {...frella}></Frella>
                    </li>
                ))
            }
            {more && <li className='pt-5'>
                <div ref={ref} className={`border-b-0 opacity-60 flex flex-col border-default-900/10 bg-background/30 border-1 rounded-lg p-5`}>
                    <Profile
                        {...profileProps}
                        isCompact
                    ></Profile>
                    <div className='w-full h-40 flex justify-center items-center'>
                        <Spinner color='primary' className='block'></Spinner>
                    </div>
                </div>
            </li>}
        </ScrollShadow>
    </ul >
}
