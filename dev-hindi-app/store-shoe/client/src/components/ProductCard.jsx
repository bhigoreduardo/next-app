import Link from "next/link";

import { calculateDiscountRate } from "@/utils/helper";

const ProductCard = ({ attributes }) => {
  return (
    <Link
      href={`/product/${attributes?.slug}`}
      className="bg-white transform duration-200 overflow-hidden hover:scale-105 cursor-pointer"
    >
      <img src={attributes?.thumbnail?.data?.attributes?.url} alt="P1" />
      <div className="p-4 text-black/[0.9]">
        <h2 className="font-medium text-lg">{attributes?.name}</h2>
        <div className="flex items-center font-semibold text-black/[0.5]">
          <p className="text-lg mr-2">&#8377;{attributes?.price}</p>
          {attributes?.original_price && (
            <>
              <p className="text-base line-through">
                &#8377;{attributes?.original_price}
              </p>
              <p className="text-base text-green-500 ml-auto">
                {calculateDiscountRate(
                  attributes?.price,
                  attributes?.original_price
                )}
                &nbsp;% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
