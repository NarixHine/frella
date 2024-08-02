import Main from '@/components/main'
import getHandle, { checkIsEmbedding } from '@/utils/routing'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SSRFeed from '@/components/feed'
import Panel from '@/components/panel'
import Feed from '@/components/feed/feed'
import Profile from '@/components/profile/profile'
import Description from '@/components/description/description'
import { ReactNode } from 'react'
import { Button, Divider } from '@nextui-org/react'
import { BiLock } from 'react-icons/bi'
import { FaReact } from 'react-icons/fa'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getHandle() ? `${getHandle()} | Frella` : `Frella - Fragments of thoughts, in your cyberspace`,
  }
}

const profile = {
  src: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yazNtV2wxZWZpNU9xUkZIbE9NSzlJTjVMdXIifQ',
  name: 'Narix Hine',
  handle: 'hello'
}

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

  const Card = ({ title, description, children }: {
    title: string,
    description?: string,
    children?: ReactNode
  }) => (
    <div className={'flex items-center flex-col h-full border-default-900/10 bg-background/40 border-1 rounded-lg p-5'}>
      <div className='w-full'>
        <h1 className='text-2xl font-bold'>{title}</h1>
      </div>
      <div className='w-full'>
        <p className='text-balance my-1 opacity-80'>
          {description}
        </p>
      </div>
      {children && <div className='flex justify-center items-center p-3 h-full w-full'>
        {children}
      </div>}
    </div>
  )

  return <Main>
    <h1 className='font-extrabold text-balance text-center text-4xl md:text-5xl mt-16 mb-6 opacity-80 text-primary-900'>
      Fragments of thoughts,
      In your cyberspace
    </h1>
    <p className='text-center text-lg md:text-xl text-balance text-primary-900 opacity-70 mb-4'>
      Sometimes we don&apos;t need Twitter or a blog.
      All it takes is somewhere we can emit our mutters and record our moods.
    </p>

    <div className='flex'>
      <Button size='lg' color='primary' className='mx-auto' as={'a'} href='/sign-up'>
        Get Started
      </Button>
    </div>

    <div className='flex flex-col-reverse w-full mt-2 md:flex-row md:space-x-12 items-center'>
      <section className='flex w-full md:w-fit md:basis-3/5'>
        <div className='md:flex-1'></div>
        <Feed frellas={[{
          id: 'e78520c3-7fe4-4c0c-a3a3-60ad2634055a',
          content: '<p><code>hello world</code></p>',
          isPublic: true,
          isEditable: false,
          date: '2021-10-05',
          ...profile
        }]} more={false}></Feed>
      </section>
      <aside className='pt-5 basis-full md:basis-2/5 h-full flex-col flex'>
        <Profile {...profile} hideInstructions></Profile>
        <Description description='<p><strong>Creator of </strong><a target="_blank" rel="noopener noreferrer nofollow" href="https://frella.me/"><strong>Frella</strong></a><strong>.</strong></p><blockquote><p>Learner. Coder. Reader.</p></blockquote>' isPublic></Description>
      </aside>
    </div>

    <Divider className='my-6'></Divider>

    <div className='flex flex-col space-y-3 w-full'>
      <div className='flex space-y-3 flex-col md:flex-row md:space-x-3 md:space-y-0'>
        <div className='basis-1/3'>
          <Card title='No centralised feed.' description='Frella is not Twitter, so there is no social function.' />
        </div>
        <div className='basis-2/3'>
          <Card title='Dedicated subdomain.' description='Your content should not live under a subpath shared by others. Get your own domain. (custom domains coming soon)'>
            <p className='font-mono text-2xl'>[you].frella.me</p>
          </Card>
        </div>
      </div>

      <div className='flex space-y-3 flex-col md:flex-row md:space-x-3 md:space-y-0'>
        <div className='basis-2/3'>
          <Card title='Lock if you like.' description="If you don't share your subdomain with others, nobody will know it. You can make sure your content is private by locking them.">
            <Button isIconOnly size='lg' color='primary' variant='bordered' startContent={<BiLock></BiLock>}></Button>
          </Card>
        </div>
        <div className='basis-1/3'>
          <Card title='Share when you want.' description='But if you feel like sharing an interesting piece of frella with your friends, you can do it at anytime.'></Card>
        </div>
      </div>

      <div className='flex space-y-3 flex-col md:flex-row md:space-x-3 md:space-y-0'>
        <div className='basis-1/2'>
          <Card title='Embed on your website as a complementary feed.' description='If you have a blog, then publish your fleeting inspirations on Frella and embed a feed! Some ideas are too small to make for an article, but are splendid enough to be worth taking a note.'>
            <div className='rounded-lg overflow-clip w-full'>
              <SyntaxHighlighter language='html' style={atomOneDark} wrapLongLines>
                {`<iframe src="https://..."></iframe>`}
              </SyntaxHighlighter>
            </div>
          </Card>
        </div>
        <div className='basis-1/2'>
          <Card title='Integrate with Next.js or React.' description='Use a ready-made component. Customisable.'>
            <FaReact size={64} color='#61DBFB'></FaReact>
          </Card>
        </div>
      </div>
    </div>

    <Divider className='my-6'></Divider>

    <div className='flex space-x-3 w-full'>
      <div className='basis-1/2'>
        <Button
          color='primary'
          variant='flat'
          fullWidth
          as={'a'}
          href='https://hello.frella.me/frella/a22d3f48-e4c1-47f3-bfb0-71689fbb246e'
        >Read the introduction</Button>
      </div>
      <div className='basis-1/2'>
        <Button
          color='primary'
          as={'a'}
          fullWidth
          href='/sign-up'
        >Start recording</Button>
      </div>
    </div>
  </Main>
}
