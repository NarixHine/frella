import { auth } from '@clerk/nextjs/server'
import Description from './description'
import { getUserRec } from '@/utils/auth'
import { Skeleton } from '@nextui-org/react'

export default async function SSRDescription() {
    const { description, userId, isPublic } = await getUserRec()
    return <Description isPublic={isPublic} isEditable={userId === auth().userId} description={description ?? ''} />
}

export function DescriptionSkeleton() {
    return <div className='py-7 space-y-4'>
        <Skeleton className='h-2'></Skeleton>
        <Skeleton className='h-2'></Skeleton>
        <Skeleton className='h-2'></Skeleton>
    </div>
}
