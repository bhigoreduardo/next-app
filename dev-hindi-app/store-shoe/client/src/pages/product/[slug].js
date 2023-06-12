import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { IoMdHeartEmpty } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { api } from "@/libs/api";
import { calculateDiscountRate } from "@/utils/helper";
import { addToCart } from "@/store/cartSlice";
import Wrapper from "@/widgets/Wrapper";
import ProductCarrousel from "@/components/ProductCarrousel";
import RelatedProducts from "@/widgets/RelatedProducts";

// const data = [
//   { id: 1, url: "/p1.png", name: "P1" },
//   { id: 2, url: "/p1.png", name: "P1" },
//   { id: 3, url: "/p1.png", name: "P1" },
//   { id: 4, url: "/p1.png", name: "P1" },
//   { id: 5, url: "/p1.png", name: "P1" },
//   { id: 6, url: "/p1.png", name: "P1" },
//   { id: 7, url: "/p1.png", name: "P1" },
// ];

const Product = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [notSelected, setNotSelected] = useState(false);

  const notify = () => {
    toast.success("Success, product add to cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const getProduct = async () => {
    setLoading(true);
    const { data } = await api.get(
      `/api/products?populate=*&filters[slug][$eq]=${slug}`
    );
    if (data.data?.length > 0) {
      setProduct(data.data[0]);
      getRelatedProducts();
    }
    setLoading(false);
  };
  const getRelatedProducts = async () => {
    const { data } = await api.get(
      `/api/products?populate=*&filters[slug][$ne]=${slug}`
    );
    setRelatedProducts(data.data);
  };
  useEffect(() => {
    getProduct();
  }, [slug]);
  return (
    <Wrapper>
      <>
        <ToastContainer />

        {loading ? (
          <div className="flex flex-col gap-5 justify-center items-center w-full h-full">
            <img src="/logo.svg" alt="Logo" width={150} />
            <span className="font-medium text-2xl">Loading...</span>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <ProductCarrousel images={product?.attributes?.images?.data} />
            </div>

            <div className="flex-[1] py-3">
              <h1 className="font-semibold text-[34px] leading-tight mb-2">
                {product?.attributes?.name}
              </h1>
              <p className="font-semibold text-lg mb-5">
                {product?.attributes?.subtitle}
              </p>
              <div className="flex items-center">
                <p className="text-lg mr-2">
                  &#8377;{product?.attributes?.price}
                </p>
                {product?.attributes?.original_price && (
                  <>
                    <p className="text-base line-through">
                      &#8377;{product?.attributes?.original_price}
                    </p>
                    <p className="text-base text-green-500 ml-auto">
                      {calculateDiscountRate(
                        product?.attributes?.price,
                        product?.attributes?.original_price
                      )}
                      &nbsp;% off
                    </p>
                  </>
                )}
              </div>

              <p className="font-medium text-md text-black/[0.5]">
                incl. of taxes
              </p>
              <p className="font-medium text-md text-black/[0.5] mb-20">{`(Also includes all applicable duties)`}</p>
              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  <div className="text-md font-semibold">Select Size</div>
                  <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                    Select Guide
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2" id="sizesGrid">
                  {product?.attributes?.sizes?.data?.length > 0 &&
                    product?.attributes?.sizes?.data.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setSelected(item.size);
                          setNotSelected(false);
                        }}
                        className={`border rounded-md text-center py-3 font-medium ${
                          item.enabled
                            ? "hover:border-black cursor-pointer"
                            : "cursor-not-allowed bg-black/[0.1] opacity-50"
                        } ${selected === item.size ? "border-black" : ""}`}
                      >
                        {item.size}
                      </div>
                    ))}
                  {/* <div className="border rounded-md text-center py-3 font-medium border-black">
                    XXL
                  </div>
                  {Array.from({ length: 6 }, (_, k) => k + 1).map((_, i) => (
                    <div
                      key={i}
                      className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer"
                    >
                      XXL
                    </div>
                  ))}
                  {Array.from({ length: 3 }, (_, k) => k + 1).map((_, i) => (
                    <div
                      key={i}
                      className="border rounded-md text-center py-3 font-medium cursor-not-allowed bg-black/[0.1] opacity-50"
                    >
                      XXL
                    </div>
                  ))} */}
                </div>

                {notSelected && (
                  <div className="text-red-600 mt-1">
                    Size selection is required
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!selected) {
                    setNotSelected(true);
                    document.getElementById("sizesGrid").scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                    });
                  } else {
                    dispatch(
                      addToCart({
                        ...product,
                        selected,
                      })
                    );
                    notify();
                  }
                }}
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              >
                Add to cart
              </button>

              <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                Whishlist
                <IoMdHeartEmpty size={20} />
              </button>

              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="markdown text-md mb-5">
                  <ReactMarkdown>
                    {product?.attributes?.description}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

        {relatedProducts?.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </>
    </Wrapper>
  );
};

export default Product;
