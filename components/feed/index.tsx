import { currentUser } from '@clerk/nextjs/server'
import Feed from './feed'
import { loadInitialFrellas, restoreNewFrella } from './actions'
import { getUserRec } from '@/utils/auth'

export default async function SSRFeed() {
    const user = await currentUser()
    const { isPublic } = await getUserRec()
    const profile = {
        src: user?.imageUrl!,
        name: user?.fullName,
        handle: user?.username
    }

    const { frellas, cursor, more } = await loadInitialFrellas()

    return <Feed cursor={cursor} more={more} frellas={
        [{
            id: crypto.randomUUID(),
            ...(await restoreNewFrella()),
            isEditable: true,
            isEditing: true,
            isPublic,
            ...profile
        }].concat(frellas.map((props) => ({
            ...props,
            ...profile,
        })))
    }></Feed >
}
