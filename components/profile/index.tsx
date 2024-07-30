import { currentUser } from '@clerk/nextjs/server'
import Profile from './profile'

export default async function SSRProfile() {
    const user = await currentUser()
    return <Profile src={user?.imageUrl!} name={user?.fullName!} handle={user?.username!}></Profile>
}
