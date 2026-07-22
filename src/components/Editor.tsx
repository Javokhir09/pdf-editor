import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToggleButton from "./ToggleButton";
import Placeholder from "@tiptap/extension-placeholder";
import Button from "./Button";
import { DownloadIcon, ItalicIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import html2pdf from 'html2pdf.js'
import { FontSize } from "../extensions/FontSize";

function Editor() {
  const colors = ['black', 'red', 'green', 'orange', 'blue', 'pink', 'magenta']
  // const [fontSize, setFontSize] = useState<number>(16);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontSize,
      Color,
      Placeholder.configure({ placeholder: "Write here..." }),
    ],
  });

  const editorState = useEditorState({
    editor,
    selector: ctx => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isUnderline: ctx.editor.isActive('underline'),
      fontSize: ctx.editor.getAttributes('textStyle').fontSize ?? '16',
    })
  })

  const setFontSize = (size: string) => {
    editor.chain().focus().setMark('textStyle', { fontSize: size }).run()
  }

  if (!editor) return null;


  const exportToPDF = () => {
    const content = document.querySelector<HTMLElement>('.ProseMirror') // Tiptap's content div
    if (!content) return

    html2pdf()
      .set({
        margin: 10,
        filename: 'document.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(content)
      .save()
  }

  return (
    <div className="w-full flex items-center flex-col gap-2 p-2">
      <div className="flex gap-2">
        <ToggleButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          pressed={editorState?.isBold ?? false}
          className="font-bold"
        >
          B
        </ToggleButton>
        <ToggleButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          pressed={editorState?.isItalic ?? false}
          className="flex justify-center items-center"
        >
          <ItalicIcon size={18} />
        </ToggleButton>
        <ToggleButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          pressed={editorState?.isUnderline ?? false}
          className="underline"
        >
          U
        </ToggleButton>

        <div className="bg-black/40 w-px h-8"></div>

        <select
          value={editorState?.fontSize ?? '16'}
          onChange={(e) => setFontSize(e.target.value)}
          className="border border-black/40 h-8 cursor-pointer"
        >
          {[10, 12, 14, 16, 18, 20, 24, 28, 32, 40].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        {/* <Button className="flex justify-center items-center" onClick={() => setFontSize(fontSize+1)}>
          <PlusIcon size={18} />
        </Button>
        <Button className="flex justify-center items-center" onClick={() => setFontSize(fontSize-1)}>
          <MinusIcon size={18} />
        </Button> */}

        <div className="bg-black/40 w-px h-8"></div>

        <div className="flex gap-1 items-center">
          {colors.map((color) => (
            <button
              key={color}
              className="size-6 rounded-full cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => editor.chain().focus().setColor(color).run()}
            />
          ))}
        </div>

        <div className="bg-black/40 w-px h-8"></div>

        <Button onClick={() => exportToPDF()} className="w-fit flex items-center px-2 gap-2">Export <DownloadIcon size={18} /></Button>
      </div>
      
      <div className="w-1/2 border border-black/40">
        <EditorContent
          editor={editor}
          className={`w-full`}
          // style={{ fontSize: `${fontSize}px` }}
        />
      </div>
    </div>
  );
}

export default Editor;
