import Link from "next/link";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

import Wrapper from "./Wrapper";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-14 pb-3">
      <Wrapper>
        <div className="flex justify-between gap-[50px] flex-row flex-wrap">
          <div className="flex flex-col gap-3">
            <Link href="/store" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Find a store
            </Link>
            <Link href="/partner" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Become a partner
            </Link>
            <Link href="/login" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Sign up for email
            </Link>
            <Link href="/feedback" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Send us feedback
            </Link>
            <Link href="/discount" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Student discount
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/help" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Get help
            </Link>
            <Link href="/orders" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Order Status
            </Link>
            <Link href="/delivery" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Delivery
            </Link>
            <Link href="/returns" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Returns
            </Link>
            <Link href="/payments" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Payment Options
            </Link>
            <Link href="/contact" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Contact Us
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/about" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              About us
            </Link>
            <Link href="/news" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              News
            </Link>
            <Link href="/careers" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Careers
            </Link>
            <Link href="/investors" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Investors
            </Link>
            <Link href="/sustainability" className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Sustainability
            </Link>
          </div>

          <div className="flex gap-3">
            <div
              onClick={() =>
                window.open("https://facebook.com", "_blank")
              }
              className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
            >
              <FaFacebookF size={20} />
            </div>
            <Link
              href="https://twitter.com"
              className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
            >
              <FaTwitter size={20} />
            </Link>
            <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
              <FaYoutube size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
              <FaInstagram size={20} />
            </div>
          </div>
        </div>

      </Wrapper>

      <Wrapper className="flex justify-between gap-[10px flex-col md:flex-row mt-10">
        <div className="text-[12px] text-white/[0.5] text-center md:text-left hover:text-white cursor-pointer">
          © 2023 Nike, Inc. All Rights Reserved
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          <Link href="/guides" className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Guides
          </Link>
          <Link href="/terms-sale" className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Terms of Sale
          </Link>
          <Link href="/terms-use" className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Terms of Use
          </Link>
          <Link href="/policy" className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Privacy Policy
          </Link>
        </div>
      </Wrapper>
    </footer>
  )
}

export default Footer