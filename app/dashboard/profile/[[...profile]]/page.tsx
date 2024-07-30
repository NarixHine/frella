import Main from '@/components/main'
import { UserProfile } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Profile' }

export default function Page() {
    return <Main isCentered>
        <UserProfile path='/dashboard/profile' />
    </Main>
}
