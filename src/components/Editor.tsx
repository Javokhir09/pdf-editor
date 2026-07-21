import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToggleButton from "./ToggleButton";
import Placeholder from "@tiptap/extension-placeholder";
import Button from "./Button";
import { ItalicIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

function Editor() {
  const [fontSize, setFontSize] = useState<number>(16);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write here..." }),
    ],
  });

  const editorState = useEditorState({
    editor,
    selector: ctx => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isUnderline: ctx.editor.isActive('underline'),
    })
  })

  if (!editor) return null;

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
        <Button className="flex justify-center items-center" onClick={() => setFontSize(fontSize+1)}>
          <PlusIcon size={18} />
        </Button>
        <input
          type="number"
          id="font-size"
          name="font-size"
          className="w-8 text-center border border-black/40 outline-none"
          min={1}
          max={96}
          value={fontSize}
        />
        <Button className="flex justify-center items-center" onClick={() => setFontSize(fontSize-1)}>
          <MinusIcon size={18} />
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className={`w-1/2 text-[${fontSize}px]`}
        style={{ fontSize: `${fontSize}px` }}
      />
    </div>
  );
}

export default Editor;
