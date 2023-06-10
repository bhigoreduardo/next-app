import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

import { data } from "@/utils/data";

const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data?.length > 0 &&
        data.map((item) => (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="relative flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />

                {showCatMenu && (
                  <ul className="absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black bg-white shadow-lg">
                    {categories?.length > 0 &&
                      categories.map((value) => (
                        <li
                          key={value.id}
                          className="px-3 hover:bg-black/[0.03] rounded-md"
                        >
                          <Link
                            href={`/category/${value?.attributes?.slug}`}
                            className="flex justify-between items-center h-12"
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
              <li className="cursor-pointer">
                <Link href={item.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        ))}
    </ul>
  );
};

export default Menu;
