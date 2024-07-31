'use client'

import { useState } from 'react'
import Profile from '../profile/profile'
import { Button, Textarea } from '@nextui-org/react'
import { CiEdit } from 'react-icons/ci'
import { LiaSave } from 'react-icons/lia'
import saveFrella, { deleteFrella, toggleFrellaVisibility } from './actions'
import { IoMdLink } from 'react-icons/io'
import { MdDeleteOutline, MdPublic, MdPublicOff } from 'react-icons/md'
import Tiptap from '../tiptap'

export type FrellaProps = {
    id: string
    src: string
    name: string | null | undefined
    handle: string | null | undefined
    content: string
    isPublic: boolean
    isEditable?: boolean
    isEditing?: boolean
}

export default function Frella({
    id,
    isPublic: initialIsPublic,
    content: initialContent,
    isEditable = true,
    isEditing: initialIsEditing = false,
    ...profileProps
}: Readonly<FrellaProps>) {
    const createNew = initialIsEditing

    const [isEditing, setIsEditing] = useState(initialIsEditing)
    const [isPublic, setIsPublic] = useState(initialIsPublic)
    const [content, setContent] = useState(initialContent)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    return !isDeleted && <div className={'flex flex-col border-default-900/10 bg-background/30 border-1 rounded-lg p-5'}>
        <Profile {...profileProps} isCompact></Profile>
        {
            isEditing
                ? <Tiptap
                    autofocus={createNew}
                    content={content}
                    editable={isEditing}
                    onUpdate={({ editor }) => { setContent(editor.getHTML()) }}
                ></Tiptap>
                : <article className='my-4 prose' dangerouslySetInnerHTML={{ __html: content }}></article>
        }

        <div className='flex space-x-1'>
            {isEditable && <Button
                onClick={async () => {
                    if (isEditing) {
                        setIsSaving(true)
                        await saveFrella({ content, id, isPublic, createNew })
                        setIsSaving(false)
                    }
                    setIsEditing(!isEditing)
                }}
                isLoading={isSaving}
                variant='light'
                size='sm'
                startContent={!isSaving && (isEditing ? <LiaSave></LiaSave> : <CiEdit></CiEdit>)}
                isIconOnly
                className='text-lg rounded'
            ></Button>}

            {isPublic && <Button
                onClick={() => {
                    navigator.clipboard.writeText(`https://${profileProps.handle}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}/${id}`)
                }}
                variant='light'
                size='sm'
                startContent={<IoMdLink></IoMdLink>}
                isIconOnly
                className='text-lg rounded'
            ></Button>}

            {isEditable && <Button
                onClick={async () => {
                    if (!createNew)
                        await toggleFrellaVisibility({ id, isPublic: !isPublic })
                    setIsPublic(!isPublic)
                }}
                variant='light'
                size='sm'
                startContent={isPublic ? <MdPublic /> : <MdPublicOff />}
                isIconOnly
                className='text-lg rounded'
            ></Button>}

            {isEditable && !createNew && <Button
                onClick={async () => {
                    await deleteFrella({ id })
                    setIsDeleted(true)
                }}
                variant='light'
                size='sm'
                startContent={<MdDeleteOutline></MdDeleteOutline>}
                isIconOnly
                className='text-lg rounded'
            ></Button>}
        </div>
    </div>
}
