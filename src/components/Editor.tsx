import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ToggleButton from "./ToggleButton"
import Placeholder from "@tiptap/extension-placeholder"

function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({placeholder: "Write here...",})
    ],
    
  })

  if (!editor) return null

  return (
    <div className="w-full flex items-center flex-col gap-2 p-2">
      <div className="flex gap-2">
        <ToggleButton onClick={() => editor.chain().focus().toggleBold().run()} className="font-bold">B</ToggleButton>
        <ToggleButton onClick={() => editor.chain().focus().toggleItalic().run()} className="italic">I</ToggleButton>
        <ToggleButton onClick={() => editor.chain().focus().toggleUnderline().run()} className="underline">U</ToggleButton>
      </div>
      <div className="w-full h-[calc(100vh-52px)] flex justify-center">
        <EditorContent editor={editor} className="w-1/2" />
      </div>
    </div>
  )
}

export default Editor