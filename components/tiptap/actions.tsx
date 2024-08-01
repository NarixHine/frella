'use server'

import { getXataClient } from '@/lib/xata'
import { getUserRec } from '@/utils/auth'
import { auth } from '@clerk/nextjs/server'

const xata = getXataClient()

export async function uploadImage({ base64Content, mediaType }: { base64Content: string, mediaType: string }) {
    const { userId } = auth()
    if (!userId) {
        throw new Error('Unauthorized')
    }
    const { id } = await getUserRec()
    const record = await xata.db.images.create({
        user: id,
        src: {
            mediaType,
            base64Content,
        }
    })
    return record.src!.url!
}
