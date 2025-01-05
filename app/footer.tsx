import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { PiEnvelope, PiTwitterLogo } from 'react-icons/pi'

export default function Footer() {
    return <footer className='font-mono max-w-96 w-4/5 my-4 opacity-50 mx-auto'>
        <div className={`w-full`}>
            <div className='flex w-full space-x-1 mb-1'>
                <Button size='sm' variant='solid' radius='sm' href='/posts/recover-the-fragments-in-our-lives' as={Link} className='h-5 bg-primary-200/30 text-primary-800 basis-2/3'>“Recover the Fragments”</Button>
                <Button size='sm' variant='solid' radius='sm' href={'https://hello.frella.me/'} as={Link} target='_blank' className='h-5 bg-primary-100/70 text-primary-700 basis-1/3'>Demo</Button>
            </div>
            <div className='w-full'>
                <Button size='sm' variant='solid' radius='sm' href={'/posts/complementary-feed'} as={Link} className='h-5 bg-primary-50/80 text-primary-600 w-full'>Integrate Frella with your website</Button>
            </div>
            <div className='flex mx-auto w-fit'>
                <Button
                    size='sm'
                    variant='light'
                    radius='full'
                    href='mailto:hello@frella.me'
                    isIconOnly
                    startContent={<PiEnvelope></PiEnvelope>}
                    as={Link}
                    className='text-lg text-primary'
                ></Button>
                <Button
                    size='sm'
                    variant='light'
                    radius='full'
                    href='https://twitter.com/leximory'
                    isIconOnly
                    startContent={<PiTwitterLogo></PiTwitterLogo>}
                    as={Link}
                    className='text-lg text-primary'
                ></Button>
            </div>
        </div>
    </footer>
}
