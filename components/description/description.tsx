'use client'

import { Button, Textarea } from '@nextui-org/react'
import { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { LiaSave } from 'react-icons/lia'
import save from './actions'

export default function Description({ description: initialDescription, isEditable }: {
    description: string,
    isEditable: boolean,
}) {
    const [isEditing, setIsEditing] = useState(false)
    const [description, setDescription] = useState(initialDescription)
    return <div className='py-4'>
        {
            isEditing
                ? <Textarea
                    value={description}
                    onValueChange={setDescription}
                    className='w-full mb-1'
                    minRows={3}
                    maxRows={10}
                ></Textarea>
                : <p className='mb-2'>
                    {description}
                </p>
        }
        {isEditable && <Button
            onClick={() => {
                if (isEditing) {
                    save({ description })
                }
                setIsEditing(!isEditing)
            }}
            variant='light'
            size='sm'
            startContent={isEditing ? <LiaSave></LiaSave> : <CiEdit></CiEdit>}
            isIconOnly
            className='text-lg rounded'
        ></Button>}
    </div>
}
