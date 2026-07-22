import { TextStyle } from "@tiptap/extension-text-style";

export const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize?.replace('px', ''),
        renderHTML: (attrs) => {
          if (!attrs.fontSize) return {}
          return { style: `font-size: ${attrs.fontSize}px` }
        }
      }
    }
  }
})