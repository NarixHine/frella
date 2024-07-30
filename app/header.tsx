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
import { AiOutlineLogin } from 'react-icons/ai'

export default function Header() {
    const { userId } = auth()
    return <Navbar position='sticky' isBordered className='bg-transparent'>
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
                    : <Button as={Link} isIconOnly variant='flat' href='/sign-in'>
                        <AiOutlineLogin></AiOutlineLogin>
                    </Button>
            }
        </NavbarContent>
    </Navbar>
}
