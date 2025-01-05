import { headers } from 'next/headers'

export default async function getHandle() {
    // return 'hello'
    const host = await headers()
    const tokens = host.get('host')
    return tokens?.length === 3 ? tokens[0].split('-')[0] : undefined
}

export async function checkIsEmbedding() {
    // return true
    const host = await headers()
    const tokens = host.get('host')
    return tokens?.length === 3 ? tokens[0].endsWith('-embed') : false
}
