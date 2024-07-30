'use client'

import { useState } from 'react'
import Profile from '../profile/profile'
import { Button, Textarea } from '@nextui-org/react'
import { CiEdit } from 'react-icons/ci'
import { LiaSave } from 'react-icons/lia'
import saveFrella from './actions'

export type FrellaProps = {
    id: string
    src: string
    name: string | null | undefined
    handle: string | null | undefined
    content: string
    isEditable: boolean
    isEditing: boolean
}

export default function Frella({
    id,
    content: initialContent,
    isEditing: initialIsEditing,
    ...profileProps
}: Readonly<FrellaProps>) {
    const [isEditing, setIsEditing] = useState(initialIsEditing)
    const [content, setContent] = useState(initialContent)

    return <div className='flex flex-col border-default-900/10 bg-background/30 border-1 rounded-lg p-5'>
        <Profile {...profileProps} isCompact></Profile>
        {isEditing
            ? <Textarea
                placeholder='Enter some frella ...'
                value={content}
                onValueChange={setContent}
                className='w-full my-1'
                minRows={2}
                maxRows={15}
            ></Textarea>
            : <article className='mt-2'>
                {content}
            </article>}
        <Button
            onClick={() => {
                if (isEditing) {
                    saveFrella({ content, id, createNew: initialIsEditing })
                }
                setIsEditing(!isEditing)
            }}
            variant='light'
            size='sm'
            startContent={isEditing ? <LiaSave></LiaSave> : <CiEdit></CiEdit>}
            isIconOnly
            className='text-lg rounded'
        ></Button>
    </div>
}
