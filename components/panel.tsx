import SSRDescription from '@/components/description'
import { DescriptionSkeleton } from '@/components/description'
import SSRFeed from '@/components/feed'
import Main from '@/components/main'
import SSRProfile from '@/components/profile'
import Profile from '@/components/profile/profile'
import getHandle from '@/utils/routing'
import { Suspense } from 'react'

export default function Panel() {
    return <Main className='flex flex-col-reverse w-full md:flex-row md:space-x-12' fullHeight={Boolean(getHandle())}>
        <section className='flex md:basis-3/5'>
            <div className='flex-1'></div>
            <SSRFeed></SSRFeed>
        </section>

        <aside className='pt-5 md:basis-2/5 md:pt-20 h-full flex-col flex'>
            <Suspense fallback={<Profile isLoading></Profile>}>
                <SSRProfile></SSRProfile>
            </Suspense>
            <Suspense fallback={<DescriptionSkeleton></DescriptionSkeleton>}>
                <SSRDescription></SSRDescription>
            </Suspense>
        </aside>
    </Main>
}