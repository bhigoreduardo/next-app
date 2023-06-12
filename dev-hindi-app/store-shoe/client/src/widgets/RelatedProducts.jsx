import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ProductCard from "@/components/ProductCard";

const RelatedProducts = ({ products }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
      <div className="font-bold text-2xl mb-5">You Might Also Like</div>
      <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"
      >
        {products?.length > 0 &&
          products.map((item) => (
            <ProductCard key={item.id} attributes={item?.attributes} />
          ))}
        {/* {Array.from({ length: 6 }, (_, k) => k + 1).map((_, i) => (
          <ProductCard key={i} />
        ))} */}
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
