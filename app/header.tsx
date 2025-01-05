import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import {
    NavbarBrand,
    NavbarContent,
    Navbar,
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { PiSignIn } from 'react-icons/pi'
import { pacifico } from '@/utils/fonts'

export default async function Header() {
    const { userId } = await auth()
    return <Navbar position='sticky' isBordered isBlurred>
        <NavbarBrand className={`${pacifico.className} text-xl space-x-2`}>
            <Link href={userId ? '/dashboard' : '/'} className='bg-gradient-to-r from-amber-500 tracking-normal to-pink-500 bg-clip-text text-transparent'>
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
