'use client'

import { useState } from 'react'
import Profile from '../profile/profile'
import { Button, Divider } from '@nextui-org/react'
import { CiEdit } from 'react-icons/ci'
import { LiaSave } from 'react-icons/lia'
import saveFrella, { deleteFrella, toggleFrellaVisibility } from './actions'
import { IoMdLink } from 'react-icons/io'
import { MdOutlinePublish, MdPublic, MdPublicOff } from 'react-icons/md'
import Tiptap from '../tiptap'
import { useDebounce } from 'use-debounce'
import Cookies from 'js-cookie'
import { RiDeleteBinLine } from 'react-icons/ri'

export type FrellaProps = {
    id: string
    src: string
    name: string | null | undefined
    handle: string | null | undefined
    content: string
    isPublic: boolean
    date?: string
    isEditable?: boolean
    isEditing?: boolean
}

export default function Frella({
    id,
    date,
    isPublic: initialIsPublic,
    content: initialContent,
    isEditable = true,
    isEditing: initialIsEditing = false,
    ...profileProps
}: Readonly<FrellaProps>) {
    const isCreatingNew = initialIsEditing
    const isDeletable = isEditable && !isCreatingNew

    const [isEditing, setIsEditing] = useState(initialIsEditing)
    const [isPublic, setIsPublic] = useState(initialIsPublic)
    const [content, setContent] = useState(initialContent)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [save] = useDebounce(({ content }: { content: string }) => {
        Cookies.set('new-frella', JSON.stringify({ content }))
    }, 1000)

    return !isDeleted && <div className={'flex flex-col border-default-900/10 bg-background/30 border-1 rounded-lg p-5'}>
        <Profile {...profileProps} isCompact></Profile>
        {
            isEditing
                ? <Tiptap
                    autofocus={isCreatingNew}
                    content={content}
                    editable={isEditing}
                    onUpdate={({ editor }) => {
                        setContent(editor.getHTML())
                        if (isCreatingNew)
                            save({ content: editor.getHTML() })
                    }}
                ></Tiptap>
                : <article className='my-2 prose prose-blockquote:my-3 prose-h1:my-3 prose-h2:my-3 prose-p:my-2 prose-img:my-4 dark:prose-invert' dangerouslySetInnerHTML={{ __html: content }}></article>
        }

        <div className='flex space-x-1 items-center'>
            {isEditable && <Button
                onPress={async () => {
                    if (isEditing) {
                        setIsSaving(true)
                        await saveFrella({ content, id, isPublic, createNew: isCreatingNew })
                        setIsSaving(false)
                    }
                    setIsEditing(!isEditing)
                }}
                isLoading={isSaving}
                variant='light'
                size='sm'
                startContent={!isSaving && (isEditing ? (isCreatingNew ? <MdOutlinePublish></MdOutlinePublish> : <LiaSave></LiaSave>) : <CiEdit></CiEdit>)}
                isIconOnly
                className='text-lg rounded'
            ></Button>}

            {isEditable && <Button
                onPress={async () => {
                    if (!isCreatingNew) {
                        setIsSaving(true)
                        await toggleFrellaVisibility({ id, isPublic: !isPublic })
                        setIsSaving(false)
                    }
                    setIsPublic(!isPublic)
                }}
                isLoading={isSaving}
                variant='light'
                size='sm'
                startContent={!isSaving && (isPublic ? <MdPublic /> : <MdPublicOff />)}
                isIconOnly
                className='text-lg rounded'
            ></Button>}

            {isPublic && <Button
                onPress={() => {
                    navigator.clipboard.writeText(`https://${profileProps.handle}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}/frella/${id}`)
                }}
                variant='light'
                size='sm'
                startContent={<IoMdLink></IoMdLink>}
                isIconOnly
                className='text-lg rounded'
            ></Button>}

            {isDeletable && <Divider orientation='vertical' className='w-[1px] h-6'></Divider>}

            {isDeletable && <Button
                onPress={async () => {
                    await deleteFrella({ id })
                    setIsDeleted(true)
                }}
                variant='light'
                size='sm'
                startContent={<RiDeleteBinLine></RiDeleteBinLine>}
                isIconOnly
                className='text-lg rounded'
            ></Button>}

            <div className='flex-1'></div>

            <time className='font-mono text-sm'>
                {date}
            </time>
        </div>
    </div>
}
