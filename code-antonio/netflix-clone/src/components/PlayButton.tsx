import { useRouter } from "next/router";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

type PlayButtonProps = {
  movieId: string;
};

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
        flex justify-center items-center
        w-6 h-6 lg:w-10 lg:h-10
        bg-white rounded-full
        transition hover:bg-neutral-300
        cursor-pointer
      "
    >
      <BsFillPlayFill size={20} />
    </button>
  );
};

export default PlayButton;
