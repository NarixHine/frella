import getHandle from '@/utils/routing'
import { auth, clerkClient } from '@clerk/nextjs/server'

export default async function getUserProfile({ userId }: {
    userId?: string | null
} = {}) {
    const loggedInUserId = (await auth()).userId
    if (!userId) {
        userId = loggedInUserId
    }
    if (!userId) {
        throw new Error('userId is required')
    }

    const user = await (await clerkClient()).users.getUser(userId)
    return {
        src: user.imageUrl,
        name: user.fullName,
        handle: user.username
    }
}

export async function getUserFromHandle({ handle }: {
    handle: string
}) {
    const { data } = await (await clerkClient()).users.getUserList({ username: [handle] })
    const [user] = data
    return {
        id: user.id,
        src: user.imageUrl,
        name: user.fullName,
        handle: user.username,
    }
}

export async function getUserIdConfigToProceed() {
    const handle = await getHandle()
    return handle ? { userId: (await getUserFromHandle({ handle })).id } : undefined
}
