import { currentUser } from '@clerk/nextjs/server'
import Feed from './feed'
import { getXataClient } from '@/lib/xata'
import { loadInitialFrellas } from './actions'

const xata = getXataClient()

export default async function SSRFeed() {
    const user = await currentUser()
    const profile = {
        src: user?.imageUrl!,
        name: user?.fullName,
        handle: user?.username
    }

    const { frellas, cursor, more } = await loadInitialFrellas()

    return <Feed cursor={cursor} more={more} frellas={
        [{
            id: crypto.randomUUID(),
            content: ``,
            isEditable: true,
            isEditing: true,
            isPublic: true,
            ...profile
        }].concat(frellas.map((props) => ({
            ...props,
            ...profile,
        })))
    }></Feed>
}
