import { currentUser } from '@clerk/nextjs/server'
import Feed from './feed'
import { getXataClient } from '@/lib/xata'

const xata = getXataClient()

export default async function SSRFeed() {
    const user = await currentUser()
    const profile = {
        src: user?.imageUrl!,
        name: user?.fullName,
        handle: user?.username
    }

    // TODO: CHECK IF IS PUBLIC
    const frellas = await xata.db.frellas.select(['user.userId', 'content', 'isPublic']).sort('xata.createdAt', 'desc').filter({
        'user.userId': user?.id
    }).getPaginated({
        pagination: {
            size: 5
        }
    })

    const { cursor, more } = frellas.meta.page

    return <Feed cursor={cursor} more={more} frellas={
        [{
            id: crypto.randomUUID(),
            content: ``,
            isEditable: true,
            isEditing: true,
            isPublic: true,
            ...profile
        }].concat(frellas.records.map(({ id, content, isPublic }) => ({
            id,
            content,
            isPublic,
            isEditable: true,
            isEditing: false,
            ...profile,
        })))
    }></Feed>
}
