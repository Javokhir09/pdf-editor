import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export const CaretSize = Extension.create({
  name: 'caretSize',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('caretSize'),
        props: {
          decorations: (state) => {
            const { selection, storedMarks, doc } = state
            if (!selection.empty) return null

            const marks = storedMarks ?? selection.$from.marks()
            const fontSizeMark = marks.find(m => m.type.name === 'textStyle' && m.attrs.fontSize)
            if (!fontSizeMark) return null

            const pos = selection.from
            const node = doc.nodeAt(pos)

            const parent = selection.$from.parent
            if (parent.content.size > 0) return null

            const widget = document.createElement('span')
            widget.style.fontSize = `${fontSizeMark.attrs.fontSize}px`
            widget.style.display = 'inline-block'
            widget.textContent = '\u200b'

            return DecorationSet.create(doc, [
              Decoration.widget(pos, widget, { side: 0 }),
            ])
          },
        },
      }),
    ]
  },
})