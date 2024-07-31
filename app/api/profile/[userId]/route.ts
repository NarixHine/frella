import getUserProfile from '@/components/profile/actions'

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params
    return Response.json(await getUserProfile({ userId }))
}
