import { Post } from "@prisma/client";

import Card from "app/(shared)/Card";

type Props = {
  otherPosts: Array<Post>;
};

const Other = ({ otherPosts }: Props) => {
  return (
    <section className="my-3">
      <hr className="border-1" />

      <p className="font-bold text-2xl mt-8">Other Trending Posts</p>

      <div className="sm:grid sm:grid-cols-2 sm:grid-rows-2 gap-3 my-3">
        <Card post={otherPosts[0]} imageHeight="h-80" />
        <Card post={otherPosts[1]} imageHeight="h-80" />
        <Card post={otherPosts[2]} imageHeight="h-80" />
        <Card post={otherPosts[3]} imageHeight="h-80" />
      </div>
    </section>
  );
};

export default Other;
