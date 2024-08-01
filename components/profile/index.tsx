import Profile from './profile'
import getUserProfile from './actions'
import getHandle from '@/lib/routing'

export default async function SSRProfile() {
    const profile = await getUserProfile({ userId: getHandle() })
    return <Profile {...profile} hideInstructions={typeof getHandle() === 'string'}></Profile>
}
