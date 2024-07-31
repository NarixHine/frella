import { getXataClient } from '@/lib/xata'

const xata = getXataClient()

export async function GET(req: Request, { params }: {
    params: {
        userId: string
        offset: string
    }
}) {
    // TODO: CHECK IF IS PUBLIC
    const { userId, offset } = params
    const { records, meta } = await xata.db.frellas.select(['user.userId', 'content', 'isPublic']).sort('xata.createdAt', 'desc').filter({
        'user.userId': userId
    }).getPaginated({
        pagination: {
            size: 5,
            offset: parseInt(offset)
        }
    })
    return Response.json({
        frellas: records.map(({ id, content, isPublic }) => ({
            id,
            content,
            isPublic,
        })),
        cursor: meta.page.cursor,
        more: meta.page.more
    })
}
