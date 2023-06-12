import Image from "next/image";
import Discord from "/public/assets/social_discord.png";
import Facebook from "/public/assets/social_facebook.png";
import Instagram from "/public/assets/social_instagram.png";
import Pinterest from "/public/assets/social_pinterest.png";
import Twitter from "/public/assets/social_twitter.png";

type props = {
  isDark?: boolean;
};

const SocialLinks = ({ isDark }: props) => {
  return (
    <div className="flex items-center justify-center gap-8">
      <a href="https://discord.com" target="_blank" rel="noreferrer">
        <Image
          src={Discord}
          alt="Discord"
          width={20}
          height={20}
          className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
        />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noreferrer">
        <Image
          src={Facebook}
          alt="Facebook"
          width={20}
          height={20}
          className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
        />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        <Image
          src={Instagram}
          alt="Instagram"
          width={20}
          height={20}
          className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
        />
      </a>
      <a href="https://pinterest.com" target="_blank" rel="noreferrer">
        <Image
          src={Pinterest}
          alt="Pinterest"
          width={20}
          height={20}
          className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
        />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noreferrer">
        <Image
          src={Twitter}
          alt="Twitter"
          width={20}
          height={20}
          className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
        />
      </a>
    </div>
  );
};
export default SocialLinks;
