import { headers } from 'next/headers'

const getHost = async () => {
    const host = (await headers()).get('host')!
    const tokens = host.split('.')
    return tokens.length === 3 ? tokens[0].split('-')[0] : undefined
}

export default async function getHandle() {
    // return 'hello'
    return getHost()
}

export async function checkIsEmbedding() {
    // return true
    const host = (await headers()).get('host')!
    const tokens = host.split('.')
    return tokens.length === 3 ? tokens[0].endsWith('-embed') : false
}
