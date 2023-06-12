import { Post as PostType } from "@prisma/client";

import { prisma } from "@/app/api/client";
import { FormattedPost } from "@/app/@types/types";
import Sidebar from "@/app/(shared)/Sidebar";
import Content from "./Content";

type Props = {
  params: { id: string };
};

export const revalidate = 60;

async function getPost(id: string) {
  const post: PostType | null = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) return null;

  return {
    ...post,
    createdAt: post?.createdAt.toISOString(),
    updatedAt: post?.updatedAt.toISOString(),
  };
}

const page = async ({ params }: Props) => {
  const { id } = params;
  const post: FormattedPost | null = await getPost(id);

  if (!post) return <div>Post Not Found</div>;

  return (
    <main className="px-10 leading-7">
      <div className="md:flex md:gap-10 mb-5">
        <div className="basis-3/4">
          <Content post={post} />
        </div>
        <div className="basis-1/4">
          <Sidebar />
        </div>
      </div>
    </main>
  );
};

export default page;
