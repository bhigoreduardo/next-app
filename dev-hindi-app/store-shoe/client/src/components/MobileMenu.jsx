import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

import { data, subMenuData } from "@/utils/data";

const MobileMenu = ({ showCatMenu, setShowCatMenu, categories }) => {
  return (
    <ul className="absolute top-[80px] left-0 md:hidden flex flex-col items-center gap-8 w-full h-[calc(100vh-50px)] font-medium text-black bg-white border-t">
      {data?.length > 0 &&
        data.map((item) => (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="relative flex flex-col gap-3 items-center py-4 px-5 border-b cursor-pointer"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex items-center gap-4">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>

                {showCatMenu && (
                  <ul className="bg-black/[0.05] sm:w-screen max-w-[350px] py-4 px-5">
                    {categories?.length > 0 &&
                      categories.map((value) => (
                        <li
                          key={value.id}
                          className="py-4 px-8 w-full h-12 rounded-md border-b"
                          onClick={() => setShowCatMenu(false)}
                        >
                          <Link
                            href={`/category/${value?.attributes?.slug}`}
                            className="flex items-center justify-between"
                          >
                            {value?.attributes?.name}
                            <span className="text-sm opacity-50">
                              {value?.attributes?.products?.data?.length}
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ) : (
              <li className="py-4 px-5 border-b cursor-pointer">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        ))}
    </ul>
  );
};

export default MobileMenu;
