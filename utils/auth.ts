import { getXataClient } from '@/lib/xata'
import { auth } from '@clerk/nextjs/server'

const xata = getXataClient()

export async function getUserRec({ userId = auth().userId }: { userId?: string | null } = {}) {
    const profile = await xata.db.users.select(['description', 'userId']).filter({
        userId
    }).getFirst()
    if (profile) {
        return profile
    }
    else {
        return xata.db.users.create({ userId })
    }
}
