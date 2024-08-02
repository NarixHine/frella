import getUserProfile from '@/components/profile/actions'

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params
    return Response.json(await getUserProfile({ userId }), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    })
}
