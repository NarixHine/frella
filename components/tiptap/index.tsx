'use client'

import { Button, ButtonGroup } from '@nextui-org/react'
import { useEditor, EditorContent, UseEditorOptions, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough } from 'react-icons/ai'
import { CiCircleList } from 'react-icons/ci'
import { IoIosCode } from 'react-icons/io'
import { PiCodeBlockLight } from 'react-icons/pi'
import Link from '@tiptap/extension-link'
import { TbBlockquote } from 'react-icons/tb'
import { MdOutlineAddLink } from 'react-icons/md'
import { useCallback } from 'react'
import Image from '@tiptap/extension-image'
import FileHandler from '@tiptap-pro/extension-file-handler'
import { uploadImage } from './actions'
import { RxHeading } from 'react-icons/rx'

const Tiptap = ({ isTight, ...props }: UseEditorOptions & { isTight?: boolean }) => {
  const handleImageUpload = (file: File, callback: (src: string) => void) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = async () => {
      const base64Content = (fileReader.result as string).split(',')[1]
      const src = await uploadImage({ base64Content, mediaType: file.type })
      callback(src)
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      FileHandler.configure({

        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],

        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            handleImageUpload(file, src => {
              currentEditor.chain().focus().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src,
                },
              }).run()
            })
          })
        },

        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            if (htmlContent) {
              return false
            }
            handleImageUpload(file, src => {
              currentEditor.chain().focus().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src,
                },
              }).run()
            })
          })

        },
      }),],
    editorProps: {
      attributes: {
        class: `prose ${isTight ? ' prose-blockquote:my-2 prose-h1:my-2 prose-h2:my-2 prose-p:my-0.5 prose-img:my-2' : 'prose-blockquote:my-3 prose-h1:my-3 prose-h2:my-3 prose-p:my-2 prose-img:my-4'} dark:prose-invert ${isTight ? 'leading-normal' : ''} focus:outline-none ${isTight ? '' : 'my-4'} max-w-full`,
      },
    },
    immediatelyRender: false,
    ...props
  })

  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)
      if (url === null) {
        return
      }
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink()
          .run()

        return
      }
      editor.chain().focus().extendMarkRange('link').setLink({ href: url })
        .run()
    }
  }, [editor])

  return editor ? <div>
    <BubbleMenu editor={editor}>
      <ButtonGroup variant='light' className='bg-background border rounded-full overflow-clip'>
        <Button
          onPress={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          variant={editor.isActive('heading', { level: 2 }) ? 'shadow' : 'light'}
          startContent={<RxHeading></RxHeading>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'shadow' : 'light'}
          startContent={<AiOutlineBold></AiOutlineBold>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'shadow' : 'light'}
          startContent={<AiOutlineItalic></AiOutlineItalic>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive('strike') ? 'shadow' : 'light'}
          startContent={<AiOutlineStrikethrough></AiOutlineStrikethrough>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive('blockquote') ? 'shadow' : 'light'}
          startContent={<TbBlockquote></TbBlockquote>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive('bulletList') ? 'shadow' : 'light'}
          startContent={<CiCircleList></CiCircleList>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleCode().run()}
          variant={editor.isActive('code') ? 'shadow' : 'light'}
          startContent={<IoIosCode></IoIosCode>}
          isIconOnly
        ></Button>
        <Button
          onPress={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive('codeBlock') ? 'shadow' : 'light'}
          startContent={<PiCodeBlockLight></PiCodeBlockLight>}
          isIconOnly
        ></Button>
        <Button
          onPress={setLink}
          variant={editor.isActive('link') ? 'shadow' : 'light'}
          startContent={<MdOutlineAddLink></MdOutlineAddLink>}
          isIconOnly
        ></Button>
      </ButtonGroup>
    </BubbleMenu>
    <EditorContent editor={editor} />
  </div> : <div className='mt-[60px]' />
}


export default Tiptap
