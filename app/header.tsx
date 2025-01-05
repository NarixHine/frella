import { ubuntu } from '@/utils/fonts'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import {
    NavbarBrand,
    NavbarContent,
    Navbar,
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { PiSignIn } from 'react-icons/pi'

export default function Header() {
    const { userId } = auth()
    return <Navbar position='sticky' isBordered isBlurred>
        <NavbarBrand className='space-x-2'>
            <Link
                className={`text-xl font-bold ${ubuntu.className}`}
                href={userId ? '/dashboard' : '/'}
            >
                Frella
            </Link>
        </NavbarBrand>
        <NavbarContent as={'div'} justify='end'>
            {
                userId
                    ? <UserButton userProfileUrl='/dashboard/profile'></UserButton>
                    : <Button as={Link} color='primary' variant='flat' isIconOnly href='/sign-in'>
                        <PiSignIn></PiSignIn>
                    </Button>
            }
        </NavbarContent>
    </Navbar>
}
