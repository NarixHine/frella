import Panel from '@/components/panel'
import getHandle from '@/utils/routing'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Dashboard' }

export default function Dashboard() {
    if (getHandle()) {
        notFound()
    }
    return <Panel />
}
