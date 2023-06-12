import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { api } from "@/libs/api";
import Wrapper from "@/widgets/Wrapper";
import ProductCard from "@/components/ProductCard";

const Category = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [pageIndex, setPageIndex] = useState(1);
  const [category, setCategory] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const maxResult = 2;

  const getCategory = async () => {
    const { data } = await api.get(
      `/api/categories?filters[slug][$eq]=${slug}`
    );
    setCategory(data?.data[0]);
  };
  const getProducts = async () => {
    setLoading(true);
    const { data } = await api.get(
      `/api/products?populate=*&filters[category][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`
    );
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    if (slug) {
      setPageIndex(1);
      getProducts();
      getCategory();
    }
  }, [slug]);
  useEffect(() => {
    getProducts();
  }, [pageIndex]);
  return (
    <Wrapper>
      <div className="font-semibold text-[28px] md:text-[34px] text-center leading-tight max-w-[800px] mx-auto mt-8 md:mt-0 mb-5">
        Category: {category?.attributes?.name}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
        {data?.data?.length > 0 &&
          !loading &&
          data?.data?.map((item) => (
            <ProductCard key={item.id} attributes={item.attributes} />
          ))}
        {/* {Array.from({ length: 6 }, (_, k) => k + 1).map((_, i) => (
          <ProductCard key={i} />
        ))} */}
      </div>

      {data?.meta?.pagination?.total > maxResult && (
        <div className="flex gap-3 items-center justify-center my-16">
          <button
            type="button"
            className="text-white disabled:bg-gray-200 disabled:text-gray-500 rounded py-2 px-4 bg-black"
            disabled={pageIndex === 1}
            onClick={() => setPageIndex((prevState) => --prevState)}
          >
            Previous
          </button>

          <span className="font-bold">
            {`${pageIndex} of ${data?.meta?.pagination?.pageCount}`}
          </span>

          <button
            type="button"
            className="text-white disabled:bg-gray-200 disabled:text-gray-500 rounded py-2 px-4 bg-black"
            disabled={pageIndex === data?.meta?.pagination?.pageCount}
            onClick={() => setPageIndex((prevState) => ++prevState)}
          >
            Next
          </button>
        </div>
      )}

      {loading && (
        <div className="absolute top-0 left-0 flex flex-col gap-5 justify-center items-center w-full h-full bg-white/[0.5]">
          <img src="/logo.svg" alt="Logo" width={150} />
          <span className="font-medium text-2xl">Loading...</span>
        </div>
      )}
    </Wrapper>
  );
};

export default Category;
