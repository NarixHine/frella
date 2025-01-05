import Description from './description'
import { getUserRec } from '@/utils/auth'
import { Skeleton } from '@nextui-org/skeleton'
import getHandle from '@/utils/routing'
import { getUserIdConfigToProceed } from '../profile/actions'

export default async function SSRDescription() {
    const { description, isPublic } = await getUserRec(await getUserIdConfigToProceed())
    return <Description isPublic={isPublic} isEditable={!getHandle()} description={description ?? ''} />
}

export function DescriptionSkeleton() {
    return <div className='py-7 space-y-4'>
        <Skeleton className='h-2'></Skeleton>
        <Skeleton className='h-2'></Skeleton>
        <Skeleton className='h-2'></Skeleton>
    </div>
}
