import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  post: Post;
  imageHeight: string;
  isSmallCard?: boolean;
  isLongForm?: boolean;
};

const Card = ({
  className,
  post,
  imageHeight,
  isSmallCard,
  isLongForm,
}: Props) => {
  const { id, title, author, createdAt, image, snippet } = post || {};

  const date = new Date(createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formattedDate = date.toLocaleDateString("pt-BR", options);

  return (
    <div className={className}>
      <Link
        href={`${process.env.NEXT_PUBLIC_URL}/post/${id}`}
        className="basis-full hover:opacity-70"
      >
        <div className={`relative w-auto mb-3 ${imageHeight}`}>
          <Image
            fill
            src={image}
            alt={title}
            sizes="(max-width: 480px) 100vw,
                  (max-width: 768px) 75vw,
                  (max-width: 1060px) 50vw,
                  33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>

      <div className="basis-full">
        <Link href={`${process.env.NEXT_PUBLIC_URL}/post/${id}`}>
          <h4
            className={`font-bold hover:text-accent-green ${
              isSmallCard ? "text-base line-clamp-2" : "text-lg"
            }`}
          >
            {title}
          </h4>
        </Link>

        <div className={`${isSmallCard ? "my-2" : "flex my-3 gap-3"}`}>
          <h5 className="font-bold text-xs">{author}</h5>
          <h5 className="text-wh-300 text-xs">{formattedDate}</h5>
        </div>

        <p
          className={`text-wh-500 ${
            isLongForm ? "line-clamp-5" : "line-clamp-3"
          }`}
        >
          {snippet}
        </p>
      </div>
    </div>
  );
};

export default Card;
