import React, { useEffect, useState } from 'react';
import apiUrl from '../constants/apiUrl';
import usePatchCart from '../hooks/usePatchCart';
import useProduct from '../hooks/useProduct';
import useUser from '../hooks/useUser';
import Button from '../UI/Button';
import Image from '../UI/Image';

const CartItem = ({ cartItem }) => {
  console.log(cartItem);
  const { patch } = usePatchCart();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem]);
  return (
    <div className="rounded-sm border border-slate-300 p-1 text-lg">
      <div className="mb-2 flex w-full items-center gap-2">
        <div className="w-16">
          <Image
            className="w-full"
            src={apiUrl + 'images/' + cartItem.product.image}
          />
        </div>

        <div>
          <h1 className="font-semibold">{cartItem.product.name}</h1>
          <h1>${(cartItem.product.price * cartItem.quantity).toFixed(2)}</h1>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex rounded-full border border-slate-300">
          <button
            className="w-8"
            onClick={() =>
              patch({ productId: cartItem.product._id, quantity: -1 })
            }
          >
            -
          </button>
          <form
            onSubmit={e => {
              e.preventDefault();
              patch({
                productId: cartItem.product._id,
                quantity: quantity - cartItem.quantity
              });
            }}
          >
            <input
              onChange={e => setQuantity(e.target.value)}
              value={quantity}
              className="w-8 text-center"
            />
          </form>
          <button
            className="w-8"
            onClick={() => patch({ productId: cartItem.product._id })}
          >
            +
          </button>
        </div>

        <button
          onClick={() =>
            patch({
              productId: cartItem.productId,
              quantity: -cartItem.quantity
            })
          }
          className="hover:animate-wiggle hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
