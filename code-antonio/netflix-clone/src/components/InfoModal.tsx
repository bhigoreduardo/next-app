import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

import useModalStore from "@/hooks/useModalStore";
import useMovie from "@/hooks/useMovie";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";

type InfoModalProps = {
  visible?: boolean;
  onClose: any;
};

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const { movieId } = useModalStore();
  const { data = {} } = useMovie(movieId);

  const handleOnClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  }, [setIsVisible, onClose]);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="
    fixed inset-0
    flex justify-center items-center
    bg-black bg-opacity-80
    overflow-x-hidden overflow-y-auto
    transition duration-300
    z-50
  "
    >
      <div className="relative w-auto max-w-3xl mx-auto rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              src={data?.videoUrl}
              poster={data?.thumbnailUrl}
              autoPlay
              muted
              loop
              className="w-full h-full brightness-[60%] object-cover"
            ></video>
            <button
              type="button"
              onClick={handleOnClose}
              className="
                flex items-center justify-center
                absolute top-3 right-3
                h-10 w-10 rounded-full
                bg-black bg-opacity-70
                cursor-pointer
              "
            >
              <MdOutlineClose className="text-white w-6" />
            </button>
            <div className="absolute bottom-[10%] left-10">
              <p className="font-bold text-white text-3xl md:text-4xl lg:text-5xl h-full mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex flex-row items-center gap-2 mb-8">
              <p className="text-green-400 font-semibold text-lg">New</p>
              <p className="text-white text-lg">{data?.duration}</p>
              <p className="text-white text-lg">{data?.genre}</p>
            </div>

            <p className="text-white text-lg">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
