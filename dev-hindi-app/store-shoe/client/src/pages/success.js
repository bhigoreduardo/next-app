import Link from "next/link";

import Wrapper from "@/widgets/Wrapper";

const Success = () => {
  return (
    <Wrapper>
      <div className="flex flex-col max-w-[600px] rounded-lg p-5 border border-black mx-auto my-20">
        <p className="font-bold text-2xl">Thanks for shopping with us!</p>
        <p className="font-bold text-lg mt-2">
          Your order has been placed successfully.
        </p>
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

export default Success;
