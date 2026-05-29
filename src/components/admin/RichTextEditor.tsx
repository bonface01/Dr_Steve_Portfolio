"use client";

import { Bold, Heading2, Italic, List, Quote, Type } from "lucide-react";
import { useEffect, useRef } from "react";

const actions = [
  { label: "Paragraph", icon: Type, command: "formatBlock", value: "p" },
  { label: "Heading", icon: Heading2, command: "formatBlock", value: "h2" },
  { label: "Bold", icon: Bold, command: "bold" },
  { label: "Italic", icon: Italic, command: "italic" },
  { label: "List", icon: List, command: "insertUnorderedList" },
  { label: "Quote", icon: Quote, command: "formatBlock", value: "blockquote" }
];

export function RichTextEditor({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  function run(command: string, option?: string) {
    document.execCommand(command, false, option);
    onChange(ref.current?.innerHTML ?? "");
  }

  return (
    <div className="rounded-[8px] border border-navy/10 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-navy/10 p-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            title={action.label}
            onClick={() => run(action.command, action.value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-navy transition hover:bg-surface"
          >
            <action.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(ref.current?.innerHTML ?? "")}
        className="prose prose-sm min-h-48 max-w-none p-4 outline-none"
      />
    </div>
  );
}
