import Link from "next/link";

import Wrapper from "@/widgets/Wrapper";

const Failed = () => {
  return (
    <Wrapper>
      <div className="flex flex-col max-w-[600px] rounded-lg p-5 border border-black mx-auto my-20">
        <p className="font-bold text-2xl">Payment failed!</p>
        <p className="text-base mt-5">
          For any product related query, drop an email to
        </p>
        <Link href="/" className="underline">
          shoeshopcontact@shop.com
        </Link>
        <Link href="/" className="font-bold mt-5">
          Continue Shopping
        </Link>
      </div>
    </Wrapper>
  );
};

export default Failed;
