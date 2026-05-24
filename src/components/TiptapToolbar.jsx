import React, { useCallback, useEffect, useState } from 'react';
import {
  Bold, Italic, Strikethrough, List, ListOrdered, Quote, Minus,
  Heading2, Heading3, RemoveFormatting, Underline, Code,
  AlignLeft, AlignCenter, AlignRight, Link2, Highlighter,
  Undo, Redo, CodeSquare, Table, Columns2, Rows2, Trash2
} from 'lucide-react';

// --- Helper: detect active mark (also checks storedMarks) ---
const isMarkActive = (editor, type, attrs = {}) => {
  if (!editor) return false;
  return (
    editor.isActive(type, attrs) ||
    !!editor.state.storedMarks?.find(mark => mark.type.name === type)
  );
};

// --- Helper: detect active node ---
const isNodeActive = (editor, type, attrs = {}) => {
  if (!editor) return false;
  return editor.isActive(type, attrs);
};

const ToolbarButton = React.memo(({ onClick, disabled, isActive, children, title }) => (
  <div className="relative">
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded transition-colors duration-200 group ${
        isActive ? "bg-teal-500 text-white" : "bg-gray-100 hover:bg-gray-200"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
      <div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-auto p-2 min-w-max bg-gray-800 text-white text-xs rounded-md shadow-lg 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        {title}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
      </div>
    </button>
  </div>
));

export const TiptapToolbar = ({ editor }) => {
  const [, setRender] = useState(0); // dummy state to force rerender

  // Force rerender on every transaction (selection change, toggle, etc.)
  useEffect(() => {
    if (!editor) return;

    const update = () => setRender(x => x + 1);
    editor.on('transaction', update);

    return () => {
      editor.off('transaction', update);
    };
  }, [editor]);

  if (!editor) return null;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="border border-gray-300 rounded-t-lg p-2 flex flex-wrap items-center gap-2 bg-white">
      {/* Undo / Redo */}
      <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <Undo size={18} />
      </ToolbarButton>
      <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <Redo size={18} />
      </ToolbarButton>

      <div className="border-l border-gray-300 h-6 mx-1"></div>

      {/* Marks */}
      <ToolbarButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} isActive={isMarkActive(editor, 'bold')}>
        <Bold size={18} />
      </ToolbarButton>
      <ToolbarButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={isMarkActive(editor, 'italic')}>
        <Italic size={18} />
      </ToolbarButton>
      <ToolbarButton title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={isMarkActive(editor, 'underline')}>
        <Underline size={18} />
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} isActive={isMarkActive(editor, 'strike')}>
        <Strikethrough size={18} />
      </ToolbarButton>
      <ToolbarButton title="Highlight" onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={isMarkActive(editor, 'highlight')}>
        <Highlighter size={18} />
      </ToolbarButton>
      <ToolbarButton title="Link" onClick={setLink} isActive={isMarkActive(editor, 'link')}>
        <Link2 size={18} />
      </ToolbarButton>

      <div className="border-l border-gray-300 h-6 mx-1"></div>

      {/* Headings */}
      <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={isNodeActive(editor, 'heading', { level: 2 })}>
        <Heading2 size={18} />
      </ToolbarButton>
      <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={isNodeActive(editor, 'heading', { level: 3 })}>
        <Heading3 size={18} />
      </ToolbarButton>

      <div className="border-l border-gray-300 h-6 mx-1"></div>

      {/* Alignments */}
      <ToolbarButton title="Align Left" onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })}>
        <AlignLeft size={18} />
      </ToolbarButton>
      <ToolbarButton title="Align Center" onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })}>
        <AlignCenter size={18} />
      </ToolbarButton>
      <ToolbarButton title="Align Right" onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })}>
        <AlignRight size={18} />
      </ToolbarButton>

      <div className="border-l border-gray-300 h-6 mx-1"></div>

      {/* Lists */}
      <ToolbarButton title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={isNodeActive(editor, 'bulletList')}>
        <List size={18} />
      </ToolbarButton>
      <ToolbarButton title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={isNodeActive(editor, 'orderedList')}>
        <ListOrdered size={18} />
      </ToolbarButton>
      <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={isNodeActive(editor, 'blockquote')}>
        <Quote size={18} />
      </ToolbarButton>

      <div className="border-l border-gray-300 h-6 mx-1"></div>

      {/* Code / Clear */}
      <ToolbarButton title="Code" onClick={() => editor.chain().focus().toggleCode().run()} isActive={isMarkActive(editor, 'code')}>
        <Code size={18} />
      </ToolbarButton>
      <ToolbarButton title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={isNodeActive(editor, 'codeBlock')}>
        <CodeSquare size={18} />
      </ToolbarButton>
      <ToolbarButton title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={18} />
      </ToolbarButton>
      <ToolbarButton title="Clear Format" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
        <RemoveFormatting size={18} />
      </ToolbarButton>

      <div className="border-l border-gray-300 h-6 mx-1"></div>

      {/* Table — insert */}
      <ToolbarButton
        title="Insert Table"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        isActive={isNodeActive(editor, 'table')}
      >
        <Table size={18} />
      </ToolbarButton>

      {/* Table — contextual controls (only when cursor is inside a table) */}
      {editor.isActive('table') && (
        <>
          <ToolbarButton title="Add Column After" onClick={() => editor.chain().focus().addColumnAfter().run()}>
            <Columns2 size={18} />
          </ToolbarButton>
          <ToolbarButton title="Delete Column" onClick={() => editor.chain().focus().deleteColumn().run()}>
            <span className="text-xs font-bold text-red-500">-C</span>
          </ToolbarButton>
          <ToolbarButton title="Add Row After" onClick={() => editor.chain().focus().addRowAfter().run()}>
            <Rows2 size={18} />
          </ToolbarButton>
          <ToolbarButton title="Delete Row" onClick={() => editor.chain().focus().deleteRow().run()}>
            <span className="text-xs font-bold text-red-500">-R</span>
          </ToolbarButton>
          <ToolbarButton title="Delete Table" onClick={() => editor.chain().focus().deleteTable().run()}>
            <Trash2 size={16} className="text-red-500" />
          </ToolbarButton>
        </>
      )}
    </div>
  );
};
