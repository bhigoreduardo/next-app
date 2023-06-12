import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Editor } from "@tiptap/react";

import { FormattedPost } from "@/app/@types/types";

type Props = {
  isEditable: boolean;
  handleIsEditable: (isEditable: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  tempTitle: string;
  setTempTitle: (tempTile: string) => void;
  tempContent: string;
  setTempContent: (tempContent: string) => void;
  post: FormattedPost;
  editor: Editor | null;
};

const CategoryAndEdit = ({
  isEditable,
  handleIsEditable,
  title,
  setTitle,
  tempTitle,
  setTempTitle,
  tempContent,
  setTempContent,
  post,
  editor,
}: Props) => {
  const handleEnableEdit = () => {
    handleIsEditable(true);
    setTempTitle(title);
    setTempContent(editor?.getHTML() || "");
  };
  const handleCancelEdit = () => {
    handleIsEditable(false);
    setTitle(tempTitle);
    editor?.commands.setContent(tempContent);
  };

  return (
    <div className="flex justify-between items-center">
      <h4 className="font-bold text-sm text-wh-900 bg-accent-orange py-2 px-5">
        {post?.category}
      </h4>

      <div className="my-3">
        {isEditable ? (
          <button type="button" onClick={handleCancelEdit}>
            <XMarkIcon className="w-6 h-6 text-accent-red" />
          </button>
        ) : (
          <button type="button" onClick={handleEnableEdit}>
            <PencilSquareIcon className="w-6 h-6 text-accent-red" />
          </button>
        )}
      </div>
    </div>
  );
};
export default CategoryAndEdit;
