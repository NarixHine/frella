'use server'

import authAndGetFrella, { getUserRec } from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import { getXataClient } from '@/lib/xata'

const xata = getXataClient()

export default async function saveFrella({ id, content, isPublic, createNew }: { id: string, content: string, isPublic: boolean, createNew: boolean }) {
    if (createNew) {
        const user = await getUserRec()
        await xata.db.frellas.create({ id, content, user, isPublic })
        revalidatePath('/dashboard')
    }
    else {
        const frella = await authAndGetFrella({ id })
        await frella.update({ content, isPublic })
    }
    revalidatePath('/dashboard')
}

export async function toggleFrellaVisibility({ id, isPublic }: { id: string, isPublic: boolean }) {
    const frella = await authAndGetFrella({ id })
    await frella.update({ isPublic })
}

export async function loadFrellas({ cursor }: { cursor?: string }) {
    const pagination = await xata.db.frellas.getPaginated({
        pagination: {
            size: 5,
            after: cursor
        }
    })
    return {
        frellas: pagination.records.map(({ id, content, isPublic }) => ({
            id,
            content,
            isPublic,
            isEditable: true,
            isEditing: false,
        })),
        cursor: pagination.meta.page.cursor,
        more: pagination.meta.page.more
    }
}

export async function deleteFrella({ id }: { id: string }) {
    const frella = await authAndGetFrella({ id })
    await frella.delete()
}
