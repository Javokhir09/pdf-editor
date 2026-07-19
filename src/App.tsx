import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState } from "react"

function App() {
  const [content, setContent] = useState<string>("")

  const editor = useEditor({
    extensions: [StarterKit],
    content: content
  })

  return (
    <>
      <EditorContent editor={editor} placeholder="Write here..." />
    </>
  )
}

export default App
