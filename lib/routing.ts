import { headers } from 'next/headers'

export default function getHandle() {
    // return 'user_2jx7jrdNmzoFoCmWbzM6w4sEeuX'
    const host = headers().get('host')
    const tokens = host?.split('.')
    return tokens?.length === 3 ? tokens[0].split('-')[0] : undefined
}

export function checkIsEmbedding() {
    // return true
    const host = headers().get('host')
    const tokens = host?.split('.')
    return tokens?.length === 3 ? tokens[0].endsWith('-embed') : false
}
