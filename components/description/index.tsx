import Description from './description'
import { getUserRec } from '@/utils/auth'
import { Skeleton } from '@nextui-org/react'
import getHandle from '@/lib/routing'

export default async function SSRDescription() {
    const { description, isPublic } = await getUserRec({ userId: getHandle() })
    return <Description isPublic={isPublic} isEditable={!getHandle()} description={description ?? ''} />
}

export function DescriptionSkeleton() {
    return <div className='py-7 space-y-4'>
        <Skeleton className='h-2'></Skeleton>
        <Skeleton className='h-2'></Skeleton>
        <Skeleton className='h-2'></Skeleton>
    </div>
}
