'use client'

import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { PiPencil, PiFloppyDisk, PiGlobe, PiGlobeX } from 'react-icons/pi'
import saveDescription, { toggleUserFeedVisibility } from './actions'
import Tiptap from '../tiptap'

export default function Description({ description: initialDescription, isEditable, isPublic: initialIsPublic }: {
    description: string,
    isEditable?: boolean,
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
                : <article className='prose prose-blockquote:my-2 prose-h1:my-2 prose-h2:my-2 prose-p:my-0.5 prose-img:my-2 dark:prose-invert leading-normal' dangerouslySetInnerHTML={{ __html: description }}></article>
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
            startContent={isEditing ? <PiFloppyDisk></PiFloppyDisk> : <PiPencil></PiPencil>}
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
            startContent={isPublic ? <PiGlobe /> : <PiGlobeX />}
            isIconOnly
            className='text-lg rounded'
        ></Button>}
    </div>
}
