'use client'

import { Divider, ScrollShadow, Spinner } from '@nextui-org/react'
import Frella, { FrellaProps } from './frella'
import { useEffect, useRef } from 'react'
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
            return recs
        },
        initialPageParam: cursor,
        getNextPageParam: ({ cursor }) => cursor,
        enabled: false
    })
    const more = data ? data.pages[data.pages.length - 1].more : initialMore

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
            {initialMore && <li className='pt-5'>
                <div ref={ref} className={`border-b-0 opacity-60 flex flex-col border-default-900/10 bg-background/30 border-1 rounded-lg p-5`}>
                    <Profile
                        {...profileProps}
                        isCompact
                    ></Profile>
                    <div className={'w-full h-20 flex justify-center items-center'}>
                        {
                            more
                                ? <Spinner color='primary' className='block'></Spinner>
                                : <>
                                    <Divider className='flex-1'></Divider>
                                    <div className='mx-3 opacity-30'>The End</div>
                                    <Divider className='flex-1'></Divider>
                                </>
                        }
                    </div>
                </div>
            </li>}
        </ScrollShadow>
    </ul >
}
