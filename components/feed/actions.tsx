'use server'

import authAndGetFrella, { getUserRec } from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import { getXataClient } from '@/lib/xata'
import { auth } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'

const xata = getXataClient()

export default async function saveFrella({ id, content, isPublic, createNew }: { id: string, content: string, isPublic: boolean, createNew: boolean }) {
    if (createNew) {
        const user = await getUserRec()
        await xata.db.frellas.create({ id, content, user, isPublic })
        cookies().delete('new-frella')
        revalidatePath('/dashboard')
    }
    else {
        const frella = await authAndGetFrella({ id })
        await frella.update({ content, isPublic })
    }
    revalidatePath('/dashboard')
}

export async function restoreNewFrella() {
    const newFrella = cookies().get('new-frella')
    if (newFrella && newFrella.value !== '') {
        return JSON.parse(newFrella.value)
    }
    return {
        content: ''
    }
}

export async function toggleFrellaVisibility({ id, isPublic }: { id: string, isPublic: boolean }) {
    const frella = await authAndGetFrella({ id })
    await frella.update({ isPublic })
}

export async function loadInitialFrellas({ userId = auth().userId }: { userId?: string | null } = {}) {
    if (!userId) {
        throw new Error('User not found')
    }

    // TODO: CHECK IF IS PUBLIC
    const { records, meta } = await xata.db.frellas.select(['user.userId', 'content', 'isPublic']).sort('xata.createdAt', 'desc').filter({
        'user.userId': userId
    }).getPaginated({
        pagination: {
            size: 5
        }
    })
    return {
        frellas: records.map(({ id, content, isPublic }) => ({
            id,
            content,
            isPublic,
            isEditable: true,
            isEditing: false,
        })),
        cursor: meta.page.cursor,
        more: meta.page.more
    }
}

export async function loadFrellas({ cursor }: { cursor?: string }) {
    const { records, meta } = await xata.db.frellas.getPaginated({
        pagination: {
            size: 5,
            after: cursor
        }
    })
    return {
        frellas: records.map(({ id, content, isPublic }) => ({
            id,
            content,
            isPublic,
            isEditable: true,
            isEditing: false,
        })),
        cursor: meta.page.cursor,
        more: meta.page.more
    }
}

export async function deleteFrella({ id }: { id: string }) {
    const frella = await authAndGetFrella({ id })
    await frella.delete()
}
