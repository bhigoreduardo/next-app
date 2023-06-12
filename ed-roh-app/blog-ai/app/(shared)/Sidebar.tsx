import Image from "next/image";

import SocialLinks from "./SocialLinks";
import Subscribe from "./Subscribe";
import Ad2 from "/public/assets/ad-2.png";
import AboutProfile from "/public/assets/about-profile.jpg";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <section className="my-3">
      <h4 className="bg-wh-900 py-3 px-5 text-wh-50 text-xs font-bold text-center">
        Subscribe and Follow
      </h4>

      <div className="my-5 mx-5">
        <SocialLinks isDark />
      </div>

      <Subscribe />

      <Image
        src={Ad2}
        alt="Advert 2"
        placeholder="blur"
        width={500}
        height={1000}
        className="my-3"
      />

      <h4 className="bg-wh-900 py-3 px-5 text-wh-50 text-xs font-bold text-center">
        About the Blog
      </h4>

      <Image
        src={AboutProfile}
        alt="Profile"
        placeholder="blur"
        style={{
          width: "500px",
          height: "250px",
          objectFit: "cover",
          marginTop: 12,
        }}
      />

      <h4 className="font-bold text-center text-wh-500 my-3">
        Geoffrey Epstein
      </h4>

      <p className="text-wh-500 text-center text-sm">
        Sit diam vel lacus tortor molestie amet tincidunt. Amet amet arcu sed
        facilisi
      </p>
    </section>
  );
};

export default Sidebar;
