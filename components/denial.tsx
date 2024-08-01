export default function Denial({ notFound }: {
    notFound?: boolean
}) {
    return (
        <div className={'flex justify-center min-h-60 items-center border-default-900/10 bg-background/30 border-1 rounded-lg p-10 font-semibold text-2xl'}>
            {
                notFound
                    ? <p className='text-balance'>
                        Sorry,
                        <br></br>
                        the page you are looking for does not exist.
                    </p>
                    : <p className='text-balance'>
                        Sorry,
                        <br></br>
                        but this page is private.
                    </p>
            }
        </div>
    )
}
