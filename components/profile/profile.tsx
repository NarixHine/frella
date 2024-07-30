import { Avatar, Skeleton } from '@nextui-org/react'

export default function Profile({ src, handle, name, isLoading }: {
    src?: string
    name?: string | null
    handle?: string | null
    isLoading?: boolean
}) {
    return <div className='flex items-center space-x-5'>
        <div>
            <Skeleton isLoaded={!isLoading} className='rounded-full'>
                <Avatar src={src} className='w-20 h-20' />
            </Skeleton>
        </div>
        <div className='ml-2 space-y-1'>
            {
                isLoading
                    ? <Skeleton isLoaded={Boolean(name)} className='rounded h-9 w-44 mb-2'></Skeleton>
                    : <h1 className='text-4xl font-bold'>{name}</h1>
            }
            {
                isLoading
                    ? <Skeleton isLoaded={Boolean(handle)} className='rounded h-5 w-20'></Skeleton>
                    : <p className='text-xl font-mono'>@{handle}</p>
            }
        </div>
    </div>
}
