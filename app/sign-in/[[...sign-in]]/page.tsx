import { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'
import Main from '@/components/main'

export const metadata: Metadata = { title: 'Sign in' }

export default function Page() {
    return <Main isCentered className='opacity-80'>
        <SignIn path='/sign-in' />
    </Main>
}
