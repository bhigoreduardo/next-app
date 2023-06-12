"use client";
import { useState } from "react";
import { Editor, EditorContent } from "@tiptap/react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

import EditorMenuBar from "./EditorMenuBar";

type Props = {
  isEditable: boolean;
  title: string;
  setContent: (content: string) => void;
  contentError: string;
  editor: Editor | null;
};

const Article = ({
  isEditable,
  title,
  setContent,
  contentError,
  editor,
}: Props) => {
  const [role, setRole] = useState<string>("I am a helpful assistant.");

  if (!editor) return null;

  const postAiContent = async () => {
    editor.chain().focus().setContent("Generating Ai Content. Please Wait...");

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/openai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        role: role,
      }),
    });
    const data = await response.json();

    editor.chain().focus().setContent(data.content).run();
    setContent(data.content);
  };

  return (
    <article className="text-wh-500 leading-5">
      {isEditable && (
        <div className="border-2-rounded-md bg-wh-50 p-3 my-3">
          <h4>Generate AI Content</h4>
          <p className="my-1 text-xs">What type of writer do you want?</p>
          <div className="flex gap-5 justify-between">
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
              className="border-2 roundend-md bg-wh-50 px-3 py-1 w-full"
            />
            <button type="button" onClick={postAiContent}>
              <RocketLaunchIcon className="w-8 h-8 text-accent-orange hover:text-wh-300" />
            </button>
          </div>
        </div>
      )}

      <div
        className={
          isEditable ? "border-2 rounded-md bg-wh-50 p-3" : "w-full max-w-full"
        }
      >
        {isEditable && (
          <>
            <EditorMenuBar editor={editor} />
            <hr className="border-1 my-3" />
          </>
        )}
        <EditorContent editor={editor} />
      </div>
      {contentError && <p className="my-3 text-red-600">{contentError}</p>}
    </article>
  );
};

export default Article;
