import getUserProfile from '@/components/profile/actions'
import { getXataClient } from '@/lib/xata'

const xata = getXataClient()

export async function GET(req: Request, { params }: {
    params: Promise<{
        userId: string
        cursor: string
    }>
}) {
    const { userId, cursor } = await params
    const { src, handle, name } = await getUserProfile({ userId })
    const { records, meta } = await xata.db.frellas.select(['user.userId', 'content', 'isPublic']).sort('xata.createdAt', 'desc').filter({
        'user.userId': userId,
        'user.isPublic': true,
        isPublic: true,
    }).getPaginated({
        pagination: {
            size: 5,
            after: cursor === 'initial' ? undefined : cursor
        }
    })
    return Response.json({
        frellas: records.map(({ id, content, isPublic, xata }) => ({
            id,
            content,
            isPublic,
            src,
            handle,
            name,
            date: xata.createdAt.toDateString(),
        })),
        cursor: meta.page.cursor,
        more: meta.page.more,
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    })
}
