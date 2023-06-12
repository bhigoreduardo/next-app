import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

import { updateCart, removeFromCart } from "@/store/cartSlice";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const handleCartItem = (event) => {
    const key = event.target.name;
    const value = /^[-]?\d+$/.test(event.target.value)
      ? parseInt(event.target.value)
      : event.target.value;
    const payload = { key, value, id: props?.id };
    console.log(payload);
    dispatch(updateCart(payload));
  };
  return (
    <div className="flex gap-3 md:gap-5 py-5 border-b">
      <div className="aspect-square w-[50px] md:w-[120px]">
        <img
          src={props?.attributes?.thumbnail?.data?.attributes?.url}
          alt="P1"
          height={120}
          width={120}
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <h2 className="font-semibold text-lg md:text-2xl text-black/[0.8]">
            {props?.attributes?.name}
          </h2>
          <p className="font-medium text-sm md:text-md text-black/[0.5]">
            {props?.attributes?.subtitle}
          </p>
          <p className="font-bold text-sm md:text-md text-black/[0.5] mt-2">
            MRP : &#8377;{props?.attributes?.price}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-sm md:text-md text-black/[0.5]">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                className="hover:text-black"
                name="selected"
                onChange={handleCartItem}
              >
                {props?.attributes?.sizes?.data?.map((item, i) => (
                  <option
                    key={i}
                    disabled={!item.enabled}
                    selected={item.size === props?.selected}
                  >
                    {item.size}
                  </option>
                ))}
                {/* {Array.from({ length: 5 }, (_, k) => k + 1).map((_, i) => (
                  <option key={i} value="XXL">
                    XXL
                  </option>
                ))} */}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="hover:text-black"
                name="quantity"
                onChange={handleCartItem}
              >
                {Array.from({ length: 10 }, (_, k) => k + 1).map((item) => (
                  <option
                    key={item}
                    value={item}
                    selected={item === props?.quantity}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <RiDeleteBin6Line
            onClick={() => dispatch(removeFromCart({ id: props?.id }))}
            className="text-[16px] md:text-[20px] text-black/[0.5] hover:text-black cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
