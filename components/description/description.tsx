'use client'

import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { LiaSave } from 'react-icons/lia'
import saveDescription, { toggleUserFeedVisibility } from './actions'
import { MdPublic, MdPublicOff } from 'react-icons/md'
import Tiptap from '../tiptap'

export default function Description({ description: initialDescription, isEditable, isPublic: initialIsPublic }: {
    description: string,
    isEditable: boolean,
    isPublic: boolean
}) {
    const [isPublic, setIsPublic] = useState(initialIsPublic)
    const [isEditing, setIsEditing] = useState(false)
    const [description, setDescription] = useState(initialDescription)

    return <div className='py-4'>
        {
            isEditing
                ? <Tiptap
                    isTight
                    content={description}
                    editable={isEditing}
                    onUpdate={({ editor }) => { setDescription(editor.getHTML()) }}
                ></Tiptap>
                : <article className='prose prose-p:my-0.5 prose-img:my-2 dark:prose-invert leading-normal' dangerouslySetInnerHTML={{ __html: description }}></article>
        }

        {isEditable && <Button
            onPress={() => {
                if (isEditing) {
                    saveDescription({ description })
                }
                setIsEditing(!isEditing)
            }}
            variant='light'
            size='sm'
            startContent={isEditing ? <LiaSave></LiaSave> : <CiEdit></CiEdit>}
            isIconOnly
            className='text-lg rounded'
        ></Button>}

        {isEditable && <Button
            onPress={async () => {
                await toggleUserFeedVisibility({ isPublic: !isPublic })
                setIsPublic(!isPublic)
            }}
            variant='light'
            size='sm'
            startContent={isPublic ? <MdPublic /> : <MdPublicOff />}
            isIconOnly
            className='text-lg rounded'
        ></Button>}
    </div>
}
