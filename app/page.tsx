import Main from '@/components/main'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function Home() {
  if (auth().userId) {
    redirect('/dashboard')
  }
  return <Main>

  </Main>
}
