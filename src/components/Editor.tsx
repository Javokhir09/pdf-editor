import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "Hello, World!"
  })

  if (!editor) return null

  return (
    <div>
      <div className="tools">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          U
        </button>
      </div>
      <div className="editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default Editor