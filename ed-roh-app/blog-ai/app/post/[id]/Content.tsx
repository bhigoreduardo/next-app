"use client";
import { useState } from "react";
import Image from "next/image";
import { useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { FormattedPost } from "@/app/@types/types";
import CategoryAndEdit from "./CategoryAndEdit";
import SocialLinks from "@/app/(shared)/SocialLinks";
import Article from "./Article";

type Props = {
  post: FormattedPost;
};

const Content = ({ post }: Props) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(post?.title);
  const [titleError, setTitleError] = useState("");
  const [tempTitle, setTempTitle] = useState<string>(post?.title);

  const [content, setContent] = useState<string>(post?.content);
  const [contentError, setContentError] = useState("");
  const [tempContent, setTempContent] = useState<string>(post?.content);

  const date = new Date(post?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formattedDate = date.toLocaleDateString("pt-BR", options);

  const handleIsEditable = (bool: boolean) => {
    setIsEditable(bool);
    editor?.setEditable(bool);
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (title) setTitleError("");
    setTitle(e.target.value);
  };
  const handleChangeContent = ({ editor }: any) => {
    if (!(editor as Editor).isEmpty) setContentError("");
    setContent((editor as Editor).getHTML());
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") setTitleError("This field is required");
    if (editor?.isEmpty) setContentError("This field is required");
    if (title === "" || editor?.isEmpty) return null;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/post/${post?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      }
    );
    const data = await response.json();

    handleIsEditable(false);
    setTempTitle("");
    setTempContent("");

    setTitle(data.title);
    setContent(data.content);
    editor?.commands.setContent(data.content);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: isEditable,
    onUpdate: handleChangeContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm xl:prose-2xl leading-8 focus:outline-none w-full max-w-full",
      },
    },
  });

  return (
    <div className="prose w-full max-w-full my-3">
      <h5 className="text-wh-300">{`Home > ${post?.category} > ${post?.title}`}</h5>

      <CategoryAndEdit
        isEditable={isEditable}
        handleIsEditable={handleIsEditable}
        title={title}
        setTitle={setTitle}
        tempTitle={tempTitle}
        setTempTitle={setTempTitle}
        tempContent={tempContent}
        setTempContent={setTempContent}
        post={post}
        editor={editor}
      />

      <form onSubmit={handleSubmit}>
        {isEditable ? (
          <>
            <textarea
              placeholder="Title"
              onChange={handleChangeTitle}
              value={title}
              className="border-2 rounded-md bg-wh-50 p-3 w-full"
            ></textarea>
            {titleError && <p className="my-2 text-red-600">{titleError}</p>}
          </>
        ) : (
          <h3 className="font-bold text-3xl my-3">{title}</h3>
        )}

        <div className="flex gap-3">
          <h5 className="font-semibold text-xs">By {post?.author}</h5>
          <h6 className="text-xs text-wh-300">{formattedDate}</h6>
        </div>

        <div className="relative w-auto mb-16 h-96">
          <Image
            fill
            src={post?.image}
            alt={post?.title}
            sizes="(max-width: 480px) 100vw,
                  (max-width: 768px) 85vw,
                  (max-width: 1060px) 75vw,
                  60vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <Article
          isEditable={isEditable}
          title={title}
          setContent={setContent}
          contentError={contentError}
          editor={editor}
        />

        {isEditable && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="font-semibold text-wh-10 bg-accent-red px-5 py-2 hover:bg-wh-500 uppercase"
            >
              Submit
            </button>
          </div>
        )}
      </form>

      <div className="md:block hidden my-3">
        <SocialLinks isDark />
      </div>
    </div>
  );
};

export default Content;
