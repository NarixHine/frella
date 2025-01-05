'use client'

import Denial from '@/components/denial'
import Main from '@/components/main'
import { Button } from '@nextui-org/button'

export default function NotFound({
    reset,
}: {
    reset: () => void
}) {
    return <Main isCentered>
        <Denial message={<div className='flex flex-col space-y-3'>
            <p>
                An error has occurred.
            </p>
            <Button
                color='primary'
                variant='flat'
                onClick={reset}
            >
                Try again
            </Button>
        </div>} />
    </Main>
}
