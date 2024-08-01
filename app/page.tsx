import Main from '@/components/main'
import getHandle, { checkIsEmbedding } from '@/lib/routing'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Dashboard from './dashboard/page'
import SSRFeed from '@/components/feed'

export default function Home() {
  if (checkIsEmbedding()) {
    return <Main isCentered>
      <SSRFeed />
    </Main>
  }
  if (getHandle()) {
    return <Dashboard />
  }
  if (auth().userId) {
    redirect('/dashboard')
  }
  return <Main>

  </Main>
}
