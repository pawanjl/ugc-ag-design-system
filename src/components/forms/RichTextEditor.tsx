import * as React from "react";
import { AnimatedFormGroup } from "./AnimatedFormGroup";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  label?: string;
  error?: string;
  description?: string;
  wrapperClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  label,
  error,
  description,
  wrapperClassName,
  value,
  onChange,
  placeholder = "Write something...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[150px] p-4",
          error ? "prose-p:text-destructive" : ""
        ),
      },
    },
  });

  return (
    <AnimatedFormGroup
      label={label}
      error={error}
      description={description}
      className={wrapperClassName}
    >
      <div 
        className={cn(
          "border rounded-xl mt-2 overflow-hidden transition-all duration-300",
          editor?.isFocused ? "ring-2 ring-primary ring-offset-2 border-primary" : "border-input",
          error ? "border-destructive ring-destructive" : ""
        )}
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-1 border-b bg-muted/20">
          <Toggle
            size="sm"
            pressed={editor?.isActive('bold')}
            onPressedChange={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive('italic')}
            onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <div className="w-px h-4 bg-border mx-1" />
          <Toggle
            size="sm"
            pressed={editor?.isActive('bulletList')}
            onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive('orderedList')}
            onPressedChange={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive('blockquote')}
            onPressedChange={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </Toggle>
          <div className="w-px h-4 bg-border mx-1 flex-1" />
          <Toggle
            size="sm"
            pressed={false}
            onPressedChange={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={false}
            onPressedChange={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </Toggle>
        </div>

        {/* Editor Area */}
        <div className="bg-background cursor-text" onClick={() => editor?.commands.focus()}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </AnimatedFormGroup>
  );
}
