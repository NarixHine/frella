import { clerkClient } from '@clerk/nextjs/server'
import Feed from './feed'
import { loadInitialFrellas, restoreNewFrella } from './actions'
import { getUserRec } from '@/utils/auth'
import getHandle from '@/utils/routing'
import Denial from '../denial'
import { getUserFromHandle } from '../profile/actions'

export default async function SSRFeed() {
    const handle = getHandle()
    const { isPublic, userId } = await getUserRec(handle ? { userId: (await getUserFromHandle({ handle })).id } : {})
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
