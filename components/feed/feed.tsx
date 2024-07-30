import { ScrollShadow } from '@nextui-org/react'
import Frella, { FrellaProps } from './frella'

export default function Feed({ frellas }: { frellas: FrellaProps[] }) {
    return <ul className='flex flex-col space-y-3 w-full'>
        <ScrollShadow>
            {
                frellas.map((frella) => (
                    <li key={frella.id} className='pt-5'>
                        <Frella {...frella}></Frella>
                    </li>
                ))
            }
        </ScrollShadow>
    </ul>
}
