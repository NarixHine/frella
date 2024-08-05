import Denial from '@/components/denial'
import { retrieveFrella } from '@/components/feed/actions'
import Frella from '@/components/feed/frella'
import Main from '@/components/main'
import getUserProfile from '@/components/profile/actions'
import { Metadata } from 'next'
import getHandle from '@/utils/routing'

export async function generateMetadata(
    { params }: {
        params: {
            id: string
        }
    },
): Promise<Metadata> {
    return {
        title: `@${getHandle()}`,
    }
}

export default async function FrellaPage({ params }: {
    params: {
        id: string
    }
}) {
    const { id } = params
    const { content, user, isPublic, xata } = await retrieveFrella({ id })
    const profile = await getUserProfile({ userId: user!.userId })
    return <Main>
        {
            isPublic
                ? <Frella id={id} content={content} date={xata.createdAt.toDateString()} isPublic isEditable={false} {...profile}></Frella>
                : <Denial></Denial>
        }
    </Main>
}
