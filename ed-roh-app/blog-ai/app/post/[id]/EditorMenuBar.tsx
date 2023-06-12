import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

const EditorMenuBar = ({ editor }: Props) => {
  if (!editor) return null;

  return (
    <div className="flex items-center flex-wrap gap-4">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${
          editor.isActive("heading", { level: 1 }) ??
          "bg-wh-500 text-wh-50 rounded-md"
        } p-1 uppercase`}
      >
        h<span className="text-xs">1</span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${
          editor.isActive("heading", { level: 2 }) ??
          "bg-wh-500 text-wh-50 rounded-md"
        } p-1 uppercase`}
      >
        h<span className="text-xs">2</span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 3 }) ??
          "bg-wh-500 text-wh-50 rounded-md"
        } p-1 uppercase`}
      >
        h<span className="text-xs">3</span>
      </button>

      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${
          editor.isActive("heading", { level: 4 }) ??
          "bg-wh-500 text-wh-50 rounded-md"
        } p-1 uppercase`}
      >
        h<span className="text-xs">4</span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`${
          editor.isActive("heading", { level: 5 }) ??
          "bg-wh-500 text-wh-50 rounded-md"
        } p-1 uppercase`}
      >
        h<span className="text-xs">5</span>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`${
          editor.isActive("heading", { level: 6 }) ??
          "bg-wh-500 text-wh-50 rounded-md"
        } p-1 uppercase`}
      >
        h<span className="text-xs">6</span>
      </button> */}

      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${
          editor.isActive("paragraph", { level: 1 }) ??
          "bg-wh-500 text-wh-50 rounded-md"
        } p-1`}
      >
        paragraph
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold", { level: 1 }) ??
          "bg-wh-500 text-wh-50 rounded-md"
        } p-1 uppercase`}
      >
        <b>b</b>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic", { level: 1 }) ??
          "bg-wh-500 text-wh-50 rounded-md"
        } p-1 uppercase`}
      >
        <i>i</i>
      </button>

      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike") ?? "bg-wh-500 text-wh-50 rounded-md"
        } p-1`}
      >
        strike
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`${
          editor.isActive("code") ?? "bg-wh-500 text-wh-50 rounded-md"
        } p-1`}
      >
        code
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button> */}
    </div>
  );
};

export default EditorMenuBar;
