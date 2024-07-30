import { Metadata } from 'next'
import { SignUp } from '@clerk/nextjs'
import Main from '@/components/main'

export const metadata: Metadata = { title: 'Sign up' }

export default function Page() {
    return <Main isCentered>
        <SignUp path='/sign-up' />
    </Main>
}
