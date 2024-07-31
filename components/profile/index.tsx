import Profile from './profile'
import getUserProfile from './actions'

export default async function SSRProfile() {
    const profile = await getUserProfile()
    return <Profile {...profile}></Profile>
}
