'use server'

import { getUserRec } from '@/utils/auth'
import { revalidatePath } from 'next/cache'

export default async function save({ description }: {
    description: string
}) {
    const user = await getUserRec()
    await user.update({ description })
    revalidatePath('/dashboard')
}
