import { Post } from "@prisma/client";

import Card from "app/(shared)/Card";

type Props = {
  travelPosts: Array<Post>;
};

const Travel = ({ travelPosts }: Props) => {
  return (
    <section className="my-3">
      <hr className="border-1" />

      <div className="flex items-center gap-3 mt-8">
        <div className="bg-accent-green text-wh-900 font-bold text-sm px-10 py-2">
          TRAVEL
        </div>
        <p className="font-bold text-2xl">New Travel Experiences</p>
      </div>

      <div className="flex sm:flex-row flex-col justify-between gap-3 my-3">
        <Card post={travelPosts[0]} imageHeight="h-80" className="basis-1/3" />
        <Card post={travelPosts[1]} imageHeight="h-80" className="basis-1/3" />
        <Card post={travelPosts[2]} imageHeight="h-80" className="basis-1/3" />
      </div>

      <Card
        post={travelPosts[3]}
        imageHeight="h-80"
        className="sm:flex sm:justify-between sm:items-center sm:gap-3"
      />
    </section>
  );
};

export default Travel;
