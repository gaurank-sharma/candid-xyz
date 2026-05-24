// import React, { useEffect } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { TiptapToolbar } from './TiptapToolbar';


// import Underline from '@tiptap/extension-underline';
// import Link from '@tiptap/extension-link';
// import Highlight from '@tiptap/extension-highlight';
// import TextAlign from '@tiptap/extension-text-align';

// // This is the main Tiptap editor component
// const TiptapEditor = ({ value, onChange, placeholder }) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: { levels: [1, 2, 3] },
//       }),
//       // --- FIX: Add the imported extensions to this array ---
//       Underline,
//       Highlight,
//       TextAlign.configure({
//         types: ['heading', 'paragraph'],
//       }),
//       Link.configure({
//         openOnClick: false,
//         autolink: true,
//       }),
//     ],
//     content: value, // only used on mount
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//     editorProps: {
//       attributes: {
//         class: "prose max-w-none p-4 border border-t-0 border-gray-300 rounded-b-lg min-h-[150px] focus:outline-none",
//       },
//     },
//   });

//   // ✅ Update editor when `value` changes externally
//   useEffect(() => {
//     if (editor && value !== editor.getHTML()) {
//       editor.commands.setContent(value, false);
//     }
//   }, [value, editor]);

//   return (
//     <div>
//       <TiptapToolbar editor={editor} />
//       <EditorContent editor={editor} placeholder={placeholder} />
//     </div>
//   );
// };

// export default TiptapEditor;




import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TiptapToolbar } from './TiptapToolbar';

// Extension Imports
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table';

const TiptapEditor = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: false }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: [
          "prose max-w-none p-4 border border-t-0 border-gray-300 rounded-b-lg min-h-[150px] focus:outline-none",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
          "[&_table]:w-full [&_table]:border-collapse [&_table]:my-3 [&_table]:text-sm",
          "[&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-50 [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-left [&_th]:text-gray-800",
          "[&_td]:border [&_td]:border-gray-200 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:text-gray-700",
        ].join(" "),
      },
    },
  });

  // Update editor content if the `value` prop changes externally (e.g., from a database fetch)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <div className="w-full">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
};

export default TiptapEditor;