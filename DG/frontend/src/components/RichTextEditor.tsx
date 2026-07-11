import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder = "Write your note here..." }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: true }),
      Placeholder.configure({ placeholder })
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  if (!editor) return null

  const addImageFromUrl = () => {
    const url = window.prompt('Enter image URL:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      editor.chain().focus().setImage({ src: event.target?.result as string }).run()
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="border border-outline-variant/40 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-outline-variant/20 bg-surface-container-low/50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded-md transition-colors ${editor.isActive('bold') ? 'bg-primary text-white' : 'hover:bg-surface-container-low'}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded-md transition-colors ${editor.isActive('italic') ? 'bg-primary text-white' : 'hover:bg-surface-container-low'}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded-md transition-colors ${editor.isActive('bulletList') ? 'bg-primary text-white' : 'hover:bg-surface-container-low'}`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded-md transition-colors ${editor.isActive('orderedList') ? 'bg-primary text-white' : 'hover:bg-surface-container-low'}`}
        >
          Numbered List
        </button>
        <button
          onClick={addImageFromUrl}
          className="px-3 py-1 rounded-md hover:bg-surface-container-low"
        >
          🖼️ Add Image URL
        </button>
        <label className="px-3 py-1 rounded-md hover:bg-surface-container-low cursor-pointer">
          📤 Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="prose prose-invert max-w-none p-4 min-h-[200px] focus:outline-none" />
    </div>
  )
}