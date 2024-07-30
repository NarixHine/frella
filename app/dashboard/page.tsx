import SSRDescription from '@/components/description'
import { DescriptionSkeleton } from '@/components/description'
import SSRFeed from '@/components/feed'
import Main from '@/components/main'
import SSRProfile from '@/components/profile'
import Profile from '@/components/profile/profile'
import { Suspense } from 'react'

export default function DashboardPage() {
    return <Main className='flex flex-col-reverse w-full md:flex-row md:space-x-12'>
        <section className='flex md:basis-3/5'>
            <div className='flex-1'></div>
            <SSRFeed></SSRFeed>
        </section>
        <section className='pt-5 md:basis-2/5 md:pt-20'>
            <Suspense fallback={<Profile isLoading></Profile>}>
                <SSRProfile></SSRProfile>
            </Suspense>
            <Suspense fallback={<DescriptionSkeleton></DescriptionSkeleton>}>
                <SSRDescription></SSRDescription>
            </Suspense>
        </section>
    </Main>
}
