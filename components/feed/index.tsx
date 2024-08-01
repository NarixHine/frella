import { clerkClient, currentUser } from '@clerk/nextjs/server'
import Feed from './feed'
import { loadInitialFrellas, restoreNewFrella } from './actions'
import { getUserRec } from '@/utils/auth'
import getHandle from '@/lib/routing'
import Denial from '../denial'

export default async function SSRFeed() {
    const { isPublic, userId } = await getUserRec({ userId: getHandle() })
    const user = await clerkClient.users.getUser(userId!)
    const profile = {
        src: user?.imageUrl!,
        name: user?.fullName,
        handle: user?.username
    }

    const { frellas, cursor, more } = await loadInitialFrellas()

    return isPublic || !getHandle() ? <Feed cursor={cursor} more={more} frellas={
        (getHandle() ? [] : [{
            id: crypto.randomUUID(),
            ...(await restoreNewFrella()),
            isEditable: true,
            isEditing: true,
            isPublic,
            ...profile
        }]).concat(frellas.map((props) => ({
            ...props,
            ...profile,
        })))
    }></Feed> : <div className='flex justify-center items-center w-full'><Denial></Denial></div>
}
