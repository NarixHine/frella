import { auth, clerkClient } from '@clerk/nextjs/server'

export default async function getUserProfile({ userId = auth().userId }: {
    userId?: string | null
} = {}) {
    if (!userId) {
        throw new Error('userId is required')
    }

    const user = await clerkClient.users.getUser(userId)
    return {
        src: user.imageUrl,
        name: user.fullName,
        handle: user.username
    }
}
