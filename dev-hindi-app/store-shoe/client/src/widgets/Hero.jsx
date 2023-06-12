import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BiArrowFromRight, BiArrowFromLeft } from "react-icons/bi";

import Wrapper from "./Wrapper";

const Hero = () => {
  return (
    <Wrapper className="relative">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div onClick={clickHandler} className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] flex items-center justify-center md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 cursor-pointer hover:opacity-90">
            <BiArrowFromRight className="text-[20px] text-sm md:text-lg text-white" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div onClick={clickHandler} className="absolute right-[0] bottom-0 w-[30px] flex items-center justify-center md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 cursor-pointer hover:opacity-90">
            <BiArrowFromLeft className="text-[20px] text-sm md:text-lg text-white" />
          </div>
        )}
      >
        <Link href="/" className="cursor-pointer">
          <img src="/slide-1.png" alt="Slide 1" className="aspect-[16/10] md:aspect-auto object-cover" />
          <div className="absolute bottom-[25px] md:bottom-[75px] left-0 font-oswald font-medium text-[15px] md:text-[30px] uppercase text-black/[0.9] px-[15px] md:px-[40px] py-[10px] md:py-[25px] bg-white hover:opacity-90">
            Shop Now
          </div>
        </Link>
        <Link href="/" className="cursor-pointer">
          <img src="/slide-2.png" alt="Slide 2" className="aspect-[16/10] md:aspect-auto object-cover" />
          <div className="absolute bottom-[25px] md:bottom-[75px] left-0 font-oswald font-medium text-[15px] md:text-[30px] uppercase text-black/[0.9] px-[15px] md:px-[40px] py-[10px] md:py-[25px] bg-white hover:opacity-90">
            Shop Now
          </div>
        </Link>
        <Link href="/" className="cursor-pointer">
          <img src="/slide-3.png" alt="Slide 3" className="aspect-[16/10] md:aspect-auto object-cover" />
          <div className="absolute bottom-[25px] md:bottom-[75px] left-0 font-oswald font-medium text-[15px] md:text-[30px] uppercase text-black/[0.9] px-[15px] md:px-[40px] py-[10px] md:py-[25px] bg-white hover:opacity-90">
            Shop Now
          </div>
        </Link>
      </Carousel>
    </Wrapper>
  );
};

export default Hero;
