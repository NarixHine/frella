import Main from '@/components/main'
import { UserProfile } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Profile' }

export default function Page() {
    return <Main isCentered className='opacity-80'>
        <UserProfile path='/dashboard/profile' />
    </Main>
}
