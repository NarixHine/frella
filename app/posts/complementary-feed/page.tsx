import Main from '@/components/main'
import { Metadata } from 'next'
import Image from 'next/image'
import Step2 from './step2.png'
import Embedder from '@/components/embedder'

export const metadata: Metadata = {
    title: 'Add a realtime microblogging feed to your website'
}

export default function Post() {
    return <Main>
        <article className='prose pt-5'>
            <h1>
                Add a realtime microblogging feed to your website
            </h1>
            <p>Now you already have a website. Or a blog. But it is probably statically generated and stored in a GitHub repo, e.g. a <a target="_blank" rel="noopener noreferrer nofollow" href="https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation">Next.js SSG</a> site, or maybe the updates of your blog posts are done with an unwieldy editor that really doesn’t make people feel like using it very often. And sometimes <strong>an idea is too small for a full-length blog post, too large to squeeze into a 280-letter tweet, but too interesting to neglect. </strong>What should you do?</p><p>The good news is, there is a way you can <strong>easily embed a real-time complementary feed</strong> into your website. And you can publish your thoughts at any time.</p><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://frella.me/">Frella</a> makes it convenient and comfortable for you to put up updates, and at the same time keeps the UI lightweight, customisable and non-intrusive. It offers <code>&lt;iframe /&gt;</code> embedding functionality for any kind of website, and also a ready-made component for React or Next.js applications.</p><p>Here’s how to integrate it.</p>
            <ol>
                <li><p><strong>First, </strong><a target="_blank" rel="noopener noreferrer nofollow" href="https://frella.me/dashboard"><strong>register an account</strong></a><strong> on Frella.</strong> Make sure you have filled in your username, which will be your handle and subdomain, and a display name.</p></li>
                <li><p><strong>Next, Send your first microblog post.</strong></p></li>
                <Image src={Step2} alt='Step 2'></Image>
                <li><p><strong>Finally, </strong><a target="_blank" rel="noopener noreferrer nofollow" href="https://frella.me/dashboard/embed"><strong>Grab your embedding code</strong></a><strong>.</strong> Copy and paste the HTML code or the React component automatically generated for you depending on your needs.</p></li>
            </ol>
            <p>It will look like this:</p>
            <Embedder></Embedder>
            <p>And that’s it. Happy microblogging!</p>
        </article>
    </Main>
}
