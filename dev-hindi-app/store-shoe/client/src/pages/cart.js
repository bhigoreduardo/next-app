import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

import { api } from "@/libs/api";
import Wrapper from "@/widgets/Wrapper";
import CartItem from "@/components/CartItem";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const stripePromise = loadStripe(
    process.env.NEXT_STRIPE_PUBLIC_KEY
  );

  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const response = await api.post("/api/orders", {
        products: items,
      });

      await stripe.redirectToCheckout({
        sessionId: response.data.stripeSession.id,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="font-semibold text-[28px] md:text-[34px] leading-tight text-center max-w-[800px] mx-auto mt-8 md:mt-0 mb-5">
        Shopping Cart
      </div>

      {items?.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          <div className="flex-[2]">
            <div className="font-bold text-lg">Cart Items</div>
            {items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            {/* {Array.from({ length: 5 }, (_, k) => k + 1).map((_, i) => (
              <CartItem key={i} />
            ))} */}
          </div>

          <div className="flex-[1]">
            <div className="font-bold text-lg">Summary</div>

            <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
              <div className="flex justify-between">
                <div className="font-medium text-md md:text-lg text-black uppercase">
                  Subtotal
                </div>
                <div className="font-medium text-md md:text-lg text-black">
                  &#8377;
                  {items?.length > 0 &&
                    items.reduce((acc, cur) => acc + cur.amount, 0)}
                </div>
              </div>

              <div className="text-sm md:text-md py-5 border-t mt-5">
                The subtotal reflects the total price of your order, including
                duties and taxes, before any applicable discounts. It does not
                include delivery costs and international transaction fees.
              </div>

              <button
                onClick={handlePayment}
                className="flex items-center gap-2 justify-center font-medium text-white text-lg w-full py-4 rounded-full bg-black transition-transform active:scale-95 mb-3 hover:opacity-75"
              >
                Checkout
                {loading && <img src="/spinner.svg" />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center pb-[50px]">
          <img
            src="/empty-cart.jpg"
            alt="Empty cart"
            height={300}
            width={300}
          />
          <span className="font-bold text-xl">Your cart is empty</span>
          <span className="text-center mt-4">
            Looks like you have not added anything in your cart.
            <br />
            Go ahead and explore top categories.
          </span>
          <Link
            href="/"
            className="font-medium text-lg text-white py-4 px-8 rounded-full bg-black transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;
