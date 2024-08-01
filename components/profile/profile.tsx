import { Avatar, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import { RxExternalLink } from 'react-icons/rx'

export default function Profile({ src, handle, name, isLoading, isCompact, hideInstructions }: {
    src?: string
    name?: string | null
    handle?: string | null
    isLoading?: boolean
    isCompact?: boolean
    hideInstructions?: boolean
}) {
    return <>
        {
            !isCompact && !hideInstructions && <div className='opacity-40 mb-5 text-balance text-sm space-y-2'>
                <p>
                    Change your name, handle (numbers and letters only) & avatar in&nbsp;
                    <Link href={'/dashboard/profile'} className='text-nowrap'>
                        account settings <RxExternalLink className='inline'></RxExternalLink>
                    </Link>
                </p>
                <p>
                    Where your frellas are live:&nbsp;
                    <Link href={`https://${handle}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}/`} target='_blank' className='font-mono font-semibold text-nowrap'>
                        {handle}.{process.env.NEXT_PUBLIC_BASE_DOMAIN} <RxExternalLink className='inline'></RxExternalLink>
                    </Link>
                    <br></br>
                    For embedding:&nbsp;
                    <Link href={`https://${handle}-embed.${process.env.NEXT_PUBLIC_BASE_DOMAIN}/`} target='_blank' className='font-mono font-semibold text-nowrap'>
                        {handle}-embed.{process.env.NEXT_PUBLIC_BASE_DOMAIN} <RxExternalLink className='inline'></RxExternalLink>
                    </Link>
                </p>
            </div>
        }
        <div className='flex items-center space-x-5'>
            <div>
                <Skeleton isLoaded={!isLoading} className='rounded-full'>
                    <Avatar src={src} className={isCompact ? 'w-8 h-8' : 'w-20 h-20'} />
                </Skeleton>
            </div>
            <div className={isCompact ? 'ml-1' : 'ml-2 space-y-1'}>
                {
                    isLoading
                        ? <Skeleton isLoaded={Boolean(name)} className='rounded h-9 w-44 mb-2'></Skeleton>
                        : <h1 className={isCompact ? 'text-md font-semibold' : 'text-4xl font-bold text-primary-400 dark:text-primary-500'}>{name}</h1>
                }
                {
                    isLoading
                        ? <Skeleton isLoaded={Boolean(handle)} className='rounded h-5 w-20'></Skeleton>
                        : <p className={isCompact ? 'text-xs font-mono' : 'text-xl font-mono'}>@{handle}</p>
                }
            </div>
        </div>
    </>
}
