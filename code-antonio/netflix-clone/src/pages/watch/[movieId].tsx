import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

import useMovie from "@/hooks/useMovie";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data = {} } = useMovie(movieId as string);

  return (
    <section className="h-screen w-screen bg-black">
      <nav
        className="
        fixed
        flex flex-row items-center gap-8
        w-full p-4 bg-black bg-opacity-70
        z-10
      "
      >
        <button type="button" onClick={() => router.back()}>
          <AiOutlineArrowLeft className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        </button>
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>&nbsp;{data?.title}
        </p>
      </nav>
      <video
        className="h-screen w-screen"
        autoPlay
        controls
        src={data?.videoUrl}
      ></video>
    </section>
  );
};

export default Watch;
