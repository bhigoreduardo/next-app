import Link from "next/link";
import Image from "next/image";

import SocialLinks from "./SocialLinks";
import Ad1 from "/public/assets/ad-1.jpg";

const Navbar = () => {
  return (
    <header className="mb-5">
      <nav className="flex items-center justify-between w-full bg-wh-900 text-wh-10 px-10 py-4">
        <div className="sm:block hidden">
          <SocialLinks />
        </div>
        <div className="flex items-center justify-between gap-8">
          <Link href="/">Home</Link>
          <Link href="/">Trending</Link>
          <Link href="/">About</Link>
        </div>
        <div>Sign In</div>
      </nav>

      <div className="flex justify-between flex-col sm:flex-row gap-8 px-10 py-4">
        <div className="sm:basis-2/3">
          <h1 className="font-bold text-3xl md:text-5xl">BLOG OF THE FUTURE</h1>
          <p className="text-sm mt-3">
            Blog dedicated towards AI and generation and job automation
          </p>
        </div>
        <div className="sm:basis-full w-auto h-32 relative bg-wh-500">
          <Image
            fill
            src={Ad1}
            alt="Advert"
            placeholder="blur"
            sizes="(max-width: 480px) 100vw,
                  (max-width: 768px) 75vw,
                  (max-width: 1060px) 50vw,
                  33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <hr className="border-1 mx-10" />
    </header>
  );
};
export default Navbar;
