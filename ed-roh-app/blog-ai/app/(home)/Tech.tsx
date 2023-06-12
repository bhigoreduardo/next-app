import { Post } from "@prisma/client";

import Card from "app/(shared)/Card";

type Props = {
  techPosts: Array<Post>;
};

const Tech = ({ techPosts }: Props) => {
  return (
    <section className="my-3">
      <hr className="border-1" />

      <div className="flex items-center gap-3 mt-8">
        <div className="bg-accent-red text-wh-900 font-bold text-sm px-10 py-2">
          HOT
        </div>
        <p className="font-bold text-2xl">Latest News in Technology</p>
      </div>

      {/* FLEX */}
      {/* <div className="flex justify-between xs:flex-row flex-col gap-3 h-[600px]">
        <div className="basis-1/2 bg-wh-500"></div>
        <div className="basis-1/2 flex flex-col gap-3">
          <div className="bg-wh-500 basis-1/3"></div>
          <div className="bg-wh-500 basis-1/3"></div>
          <div className="bg-wh-500 basis-1/3"></div>
        </div>
      </div> */}

      {/* GRID */}
      <div className="grid sm:grid-cols-2 sm:grid-rows-3 grid-cols-1 grid-rows-1 gap-3 my-3">
        {/* LARGE CARD */}
        <Card
          post={techPosts[0]}
          imageHeight="h-96"
          isLongForm
          className="col-span-1 sm:row-span-3 row-span-1"
        />
        {/* SMALL CARDS */}
        <Card
          post={techPosts[1]}
          imageHeight="h-48"
          isSmallCard
          className="col-span-1 row-span-1 flex justify-between gap-3"
        />
        <Card
          post={techPosts[2]}
          imageHeight="h-48"
          isSmallCard
          className="col-span-1 row-span-1 flex justify-between gap-3"
        />
        <Card
          post={techPosts[3]}
          imageHeight="h-48"
          isSmallCard
          className="col-span-1 row-span-1 flex justify-between gap-3"
        />
      </div>
    </section>
  );
};

export default Tech;
