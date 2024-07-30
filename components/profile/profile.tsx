import { Avatar, Skeleton } from '@nextui-org/react'

export default function Profile({ src, handle, name, isLoading, isCompact }: {
    src?: string
    name?: string | null
    handle?: string | null
    isLoading?: boolean
    isCompact?: boolean
}) {
    return <div className='flex items-center space-x-5'>
        <div>
            <Skeleton isLoaded={!isLoading} className='rounded-full'>
                <Avatar src={src} className={isCompact ? 'w-8 h-8' : 'w-20 h-20'} />
            </Skeleton>
        </div>
        <div className={isCompact ? 'ml-1' : 'ml-2 space-y-1'}>
            {
                isLoading
                    ? <Skeleton isLoaded={Boolean(name)} className='rounded h-9 w-44 mb-2'></Skeleton>
                    : <h1 className={isCompact ? 'text-md font-semibold' : 'text-4xl font-bold'}>{name}</h1>
            }
            {
                isLoading
                    ? <Skeleton isLoaded={Boolean(handle)} className='rounded h-5 w-20'></Skeleton>
                    : <p className={isCompact ? 'text-xs font-mono' : 'text-xl font-mono'}>@{handle}</p>
            }
        </div>
    </div>
}
