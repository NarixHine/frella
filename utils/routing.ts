import { headers } from 'next/headers'

const host = (await headers()).get('host')!
const tokens = host.split('.')

console.log(tokens)

export default async function getHandle() {
    // return 'hello'
    return tokens.length === 3 ? tokens[0].split('-')[0] : undefined
}

export async function checkIsEmbedding() {
    // return true
    return tokens.length === 3 ? tokens[0].endsWith('-embed') : false
}
