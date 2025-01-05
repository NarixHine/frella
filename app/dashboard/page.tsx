import Panel from '@/components/panel'
import getHandle from '@/utils/routing'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function Dashboard() {
    if (await getHandle()) {
        notFound()
    }
    return <Panel />
}
