import { getXataClient } from '@/lib/xata'
import { auth } from '@clerk/nextjs/server'

const xata = getXataClient()

export async function getUserRec({ userId = auth().userId }: { userId?: string | null } = {}) {
    if (!userId) {
        throw new Error('Unauthorized')
    }

    const profile = await xata.db.users.select(['description', 'userId', 'isPublic']).filter({
        userId
    }).getFirst()
    if (profile) {
        return profile
    }
    else {
        return await xata.db.users.create({ userId }).catch(async ({ errors }) => {
            // for edge cases: e.g. duplication caused by racing conditions
            if (errors[0].message !== 'invalid record: column [userId]: is not unique') {
                throw new Error('Unknow error')
            }
            return await xata.db.users.select(['description', 'userId', 'isPublic']).filter({
                userId
            }).getFirstOrThrow()
        })
    }
}

export default async function authAndGetFrella({ id }: { id: string }) {
    const { userId } = auth()
    if (!userId) {
        throw new Error('Unauthorized')
    }

    const frella = await xata.db.frellas.select(['user.userId', 'content']).filter({ id }).getFirst()
    if (!frella || frella.user!.userId !== userId) {
        throw new Error('Unauthorized')
    }
    return frella
}
