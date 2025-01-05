'use server'

import authAndGetFrella, { getUserRec } from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import { getXataClient } from '@/lib/xata'
import { auth } from '@clerk/nextjs/server'
import { cookies as nextCookies } from 'next/headers'
import getHandle from '@/utils/routing'
import { track } from '@vercel/analytics/server'

const xata = getXataClient()

export default async function saveFrella({ id, content, isPublic, createNew }: { id: string, content: string, isPublic: boolean, createNew: boolean }) {
    if (createNew) {
        const user = await getUserRec()
        await xata.db.frellas.create({ id, content, user, isPublic })
        const cookies = await nextCookies()
        cookies.delete('new-frella')
        track('Frella created', {
            userId: (await auth()).userId,
        })
        revalidatePath('/dashboard')
    }
    else {
        const frella = await authAndGetFrella({ id })
        await frella.update({ content, isPublic })
        track('Frella updated', {
            userId: (await auth()).userId,
        })
    }
}

export async function restoreNewFrella() {
    const cookies = await nextCookies()
    const newFrella = cookies.get('new-frella')
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

export async function loadInitialFrellas({ userId }: { userId?: string | null } = {}) {
    const loggedInUserId = (await auth()).userId
    if (!userId) {
        userId = loggedInUserId
    }
    if (!userId) {
        throw new Error('User not found')
    }

    const { records, meta } = await xata.db.frellas.select(['user.userId', 'content', 'isPublic']).sort('xata.createdAt', 'desc').filter({
        'user.userId': userId,
        ...(await getHandle() ? { isPublic: true } : {})
    }).getPaginated({
        pagination: {
            size: 5
        }
    })
    const handle = await getHandle()
    return {
        frellas: records.map(({ id, content, isPublic, xata }) => ({
            id,
            content,
            isPublic,
            date: xata.createdAt.toDateString(),
            isEditable: !handle,
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
    const handle = await getHandle()
    return {
        frellas: records.map(({ id, content, isPublic, xata }) => ({
            id,
            content,
            isPublic,
            date: xata.createdAt.toDateString(),
            isEditable: !handle,
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

export async function retrieveFrella({ id }: { id: string }) {
    return await xata.db.frellas.select(['user.userId', 'content', 'isPublic']).filter({ id }).getFirstOrThrow()
}
