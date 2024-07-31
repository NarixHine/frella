'use client'

import { Button, ButtonGroup } from '@nextui-org/react'
import { useEditor, EditorContent, UseEditorOptions, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough } from 'react-icons/ai'
import { CiCircleList } from 'react-icons/ci'
import { IoIosCode } from 'react-icons/io'
import { PiCodeBlockLight } from 'react-icons/pi'
import { TbBlockquote } from 'react-icons/tb'

const Tiptap = ({ isTight, ...props }: UseEditorOptions & { isTight?: boolean }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: `prose ${isTight ? 'leading-normal' : ''} focus:outline-none ${isTight ? '' : 'my-4'} max-w-full`,
      },
    },
    immediatelyRender: false,
    ...props
  })

  return editor ? <div>
    <BubbleMenu editor={editor}>
      <ButtonGroup variant='light' className='bg-background border rounded-full overflow-clip'>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'shadow' : 'light'}
          startContent={<AiOutlineBold></AiOutlineBold>}
          isIconOnly
        ></Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'shadow' : 'light'}
          startContent={<AiOutlineItalic></AiOutlineItalic>}
          isIconOnly
        ></Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive('strike') ? 'shadow' : 'light'}
          startContent={<AiOutlineStrikethrough></AiOutlineStrikethrough>}
          isIconOnly
        ></Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive('blockquote') ? 'shadow' : 'light'}
          startContent={<TbBlockquote></TbBlockquote>}
          isIconOnly
        ></Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive('bulletList') ? 'shadow' : 'light'}
          startContent={<CiCircleList></CiCircleList>}
          isIconOnly
        ></Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          variant={editor.isActive('code') ? 'shadow' : 'light'}
          startContent={<IoIosCode></IoIosCode>}
          isIconOnly
        ></Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive('codeBlock') ? 'shadow' : 'light'}
          startContent={<PiCodeBlockLight></PiCodeBlockLight>}
          isIconOnly
        ></Button>
      </ButtonGroup>
    </BubbleMenu>
    <EditorContent editor={editor} />
  </div> : <div className='mt-[60px]' />
}

export default Tiptap
