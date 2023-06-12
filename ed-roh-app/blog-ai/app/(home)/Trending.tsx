import Image from "next/image";
import Link from "next/link";
import { Post } from "@prisma/client";

type TradingCardProps = {
  className?: string;
  post: Post;
};

const TrendingCard = ({ className, post }: TradingCardProps) => {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}
      className={`${className} relative w-full hover:opacity-70`}
    >
      <div className="w-full h-full z-0">
        <Image
          fill
          src={post?.image}
          alt={post?.title}
          placeholder="blur"
          sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="absolute z-1 top-0 left-0 w-full h-full bg-gradient-gradual"></div>
      <div className="absolute bottom-0 left-0 p-3">
        <h4 className="font-semibold text wh-500 bg-accent-orange inline-block px-5 py-1">
          {post?.category}
        </h4>
        <div className="text-wh-100 mt-2">{post?.title}</div>
      </div>
    </Link>
  );
};

type Props = {
  trendingPosts: Array<Post>;
};

const Trending = ({ trendingPosts }: Props) => {
  return (
    <section className="my-3">
      <div className="flex items-center gap-3">
        <div className="bg-wh-900 text-wh-10 font-bold text-sm px-10 py-2">
          TRENDING
        </div>
        <p className="text-sm">
          Nunc enim lobortis quam risus et feugiat nibh eu ornare. Molestie sit
          nulla dolor diam turpis.
        </p>
      </div>

      {/* FLEX */}
      {/* <div className="flex flex-col sm:flex-row justify-between gap-3 my-3 h-[600px]">
        <div className="basis-1/2 bg-wh-500"></div>
        <div className="basis-1/2 flex flex-col gap-3">
          <div className="basis-1/2 bg-wh-500"></div>
          <div className="basis-1/2 flex gap-3">
            <div className="basis-1/2 bg-wh-500"></div>
            <div className="basis-1/2 bg-wh-500"></div>
          </div>
        </div>
      </div> */}

      {/* GRID */}
      <div className="grid sm:grid-cols-4 sm:grid-rows-2 gap-3 my-3 sm:h-[600px] grid-cols-1 grid-rows-4">
        <TrendingCard
          post={trendingPosts[0]}
          className="sm:col-span-2 sm:row-span-2 bg-wh-500 h-96 sm:h-auto"
        />
        <TrendingCard
          post={trendingPosts[1]}
          className="sm:col-span-2 sm:row-span-1 bg-wh-500 h-96 sm:h-auto"
        />
        <TrendingCard
          post={trendingPosts[2]}
          className="sm:col-span-1 sm:row-span-1 bg-wh-500 h-96 sm:h-auto"
        />
        <TrendingCard
          post={trendingPosts[3]}
          className="sm:col-span-1 sm:row-span-1 bg-wh-500 h-96 sm:h-auto"
        />
      </div>

      <p className="text-sm">
        Id cursus purus adipiscing ipsum pretium. Scelerisque suspendisse
        pharetra ultrices mauris ut lacus sagittis pharetra dictum. Congue
        viverra in aliquam feugiat pellentesque.
      </p>
    </section>
  );
};

export default Trending;
