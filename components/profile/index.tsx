import Profile from './profile'
import getUserProfile, { getUserFromHandle } from './actions'
import getHandle from '@/utils/routing'

export default async function SSRProfile() {
    const handle = await getHandle()
    const profile = handle ? await getUserFromHandle({ handle }) : await getUserProfile()
    return <Profile {...profile} hideInstructions={typeof handle === 'string'}></Profile>
}

