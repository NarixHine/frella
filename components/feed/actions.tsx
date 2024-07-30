'use server'

import authAndGetFrella, { getUserRec } from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import { getXataClient } from '@/lib/xata'
const xata = getXataClient()

export default async function saveFrella({ id, content, createNew }: { id: string, content: string, createNew: boolean }) {
    if (createNew) {
        const user = await getUserRec()
        await xata.db.frellas.create({ id, content, user })
        revalidatePath('/dashboard')
    }
    else {
        const frella = await authAndGetFrella({ id })
        await frella.update({ content })
    }
    revalidatePath('/dashboard')
}
