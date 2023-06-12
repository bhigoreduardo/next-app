import { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { BiMenuAltRight } from "react-icons/bi";

import { api } from "@/libs/api";
import Wrapper from "./Wrapper";
import Menu from "@/components/Menu";
import MobileMenu from "@/components/MobileMenu";
import { useSelector } from "react-redux";

const Header = () => {
  const { items } = useSelector((state) => state.cart);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState([]);

  const toggleHeader = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !openMobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };
  const getCategories = async () => {
    const { data } = await api.get("/api/categories?populate=*");
    setCategories(data.data);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleHeader);

    return () => {
      window.removeEventListener("scroll", toggleHeader);
    };
  }, [lastScrollY]);
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <header
      className={`sticky top-0 w-full h-[80px] bg-white z-20 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="flex items-center justify-between h-full">
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="w-[40px] md:w-[60px]" />
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {openMobileMenu && (
          <MobileMenu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          <Link
            href="/favorite"
            className="relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer hover:bg-black/[0.05]"
          >
            <IoMdHeartEmpty className="text-[24px]" />
            <span className="absolute top-0 left-6 flex items-center justify-center h-[20px] min-w-[20px] text-[12px] text-white bg-red-600 rounded-full">
              51
            </span>
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer hover:bg-black/[0.05]"
          >
            <BsCart className="text-[24px]" />
            <span className="absolute top-0 left-6 flex items-center justify-center h-[20px] min-w-[20px] text-[12px] text-white bg-red-600 rounded-full">
              {items?.length ?? 0}
            </span>
          </Link>

          <div
            className="md:hidden flex items-center justify-center w-12 h-12 rounded-full cursor-pointer hover:bg-black/[0.05]"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          >
            {openMobileMenu ? (
              <VscChromeClose className="text-[24px]" />
            ) : (
              <BiMenuAltRight className="text-[24px]" />
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
