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
    const frellas = await xata.db.frellas.select(['user.userId', 'content']).sort('xata.createdAt', 'desc').filter({
        'user.userId': user?.id
    }).getPaginated({
        pagination: {
            size: 5
        }
    })
    return <Feed frellas={[{
        id: crypto.randomUUID(),
        content: '',
        isEditable: true,
        isEditing: true,
        ...profile
    }].concat(frellas.records.map(({ id, content }) => ({
        id,
        content,
        ...profile,
        isEditable: true,
        isEditing: false
    })))}></Feed>
}
