import Denial from '@/components/denial'
import { retrieveFrella } from '@/components/feed/actions'
import Frella from '@/components/feed/frella'
import Main from '@/components/main'
import getUserProfile from '@/components/profile/actions'

export default async function FrellaPage({ params }: {
    params: {
        id: string
    }
}) {
    const { id } = params
    const { content, user, isPublic } = await retrieveFrella({ id })
    const profile = await getUserProfile({ userId: user!.userId })
    return <Main>
        {
            isPublic
                ? <Frella id={id} content={content} isPublic isEditable={false} {...profile}></Frella>
                : <Denial></Denial>
        }
    </Main>
}
