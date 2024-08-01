'use server'

import { getUserRec } from '@/utils/auth'
import { revalidatePath } from 'next/cache'

export default async function saveDescription({ description }: {
    description: string
}) {
    const user = await getUserRec()
    await user.update({ description })
    revalidatePath('/dashboard')
}

export async function toggleUserFeedVisibility({ isPublic }: { isPublic: boolean }) {
    const user = await getUserRec()
    await user.update({ isPublic })
    revalidatePath('/dashboard')
}
