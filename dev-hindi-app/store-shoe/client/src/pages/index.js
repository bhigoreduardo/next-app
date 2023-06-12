import { useEffect, useState } from "react";

import { api } from "@/libs/api";
import Hero from "@/widgets/Hero";
import Wrapper from "@/widgets/Wrapper";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const { data } = await api.get("/api/products?populate=*");
    setProducts(data.data);
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <main>
      <Hero />
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </div>
        </div>

        {loading && (
          <div className="flex flex-col gap-5 justify-center items-center w-full h-full">
            <img src="/logo.svg" alt="Logo" width={150} />
            <span className="font-medium text-2xl">Loading...</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {/* {Array.from({ length: 6 }, (_, k) => k + 1).map((_, i) => (
            <ProductCard key={i} />
          ))} */}
          {products?.length > 0 &&
            products.map((item) => (
              <ProductCard key={item.id} attributes={item?.attributes} />
            ))}
        </div>
      </Wrapper>
    </main>
  );
}
