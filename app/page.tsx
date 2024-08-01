import Main from '@/components/main'
import getHandle, { checkIsEmbedding } from '@/utils/routing'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SSRFeed from '@/components/feed'
import Panel from '@/components/panel'

export default function Home() {
  if (checkIsEmbedding()) {
    return <Main fullHeight>
      <SSRFeed />
    </Main>
  }
  else if (getHandle()) {
    return <Panel />
  }
  else if (auth().userId) {
    redirect('/dashboard')
  }
  return <Main>

  </Main>
}
