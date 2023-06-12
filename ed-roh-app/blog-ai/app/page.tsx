import { Post } from "@prisma/client";
import { prisma } from "./api/client";

import Trending from "./(home)/Trending";
import Tech from "./(home)/Tech";
import Travel from "./(home)/Travel";
import Other from "./(home)/Other";
import Subscribe from "./(shared)/Subscribe";
import Sidebar from "./(shared)/Sidebar";

async function getPosts() {
  const posts = await prisma.post.findMany({});

  const formattedPosts = await Promise.all(
    posts.map(async (item) => {
      const imageModule = require(`../public${item.image}`);
      return {
        ...item,
        image: imageModule,
      };
    })
  );

  return formattedPosts;
}

export default async function Home() {
  const posts = await getPosts();

  const formatPosts = () => {
    const trendingPosts: Array<Post> = [];
    const techPosts: Array<Post> = [];
    const travelPosts: Array<Post> = [];
    const otherPosts: Array<Post> = [];

    posts.forEach((item: Post, i: number) => {
      if (item.category === "Business") trendingPosts.push(item);
      else if (item.category === "Tech") techPosts.push(item);
      else if (item.category === "Travel") travelPosts.push(item);
      else if (item.category === "Interior Design") otherPosts.push(item);
    });

    return [trendingPosts, techPosts, travelPosts, otherPosts];
  };

  const [trendingPosts, techPosts, travelPosts, otherPosts] = formatPosts();

  return (
    <main className="px-10 py-4 leading-7">
      <Trending trendingPosts={trendingPosts} />
      <div className="md:flex gap-5 mb-5">
        <div className="basis-3/4">
          <Tech techPosts={techPosts} />
          <Travel travelPosts={travelPosts} />
          <Other otherPosts={otherPosts} />
          <div className="md:block hidden">
            <Subscribe />
          </div>
        </div>
        <div className="basis-1/4">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
