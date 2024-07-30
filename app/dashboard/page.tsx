import SSRDescription from '@/components/description'
import { DescriptionSkeleton } from '@/components/description'
import Main from '@/components/main'
import SSRProfile from '@/components/profile'
import Profile from '@/components/profile/profile'
import { Suspense } from 'react'

export default function DashboardPage() {
    return <Main className='flex flex-col md:flex-row'>
        <section className='md:basis-3/5'>

        </section>
        <section className='px-5 pt-5 md:basis-2/5 md:pt-20'>
            <Suspense fallback={<Profile isLoading></Profile>}>
                <SSRProfile></SSRProfile>
            </Suspense>
            <Suspense fallback={<DescriptionSkeleton></DescriptionSkeleton>}>
                <SSRDescription></SSRDescription>
            </Suspense>
        </section>
    </Main>
}
