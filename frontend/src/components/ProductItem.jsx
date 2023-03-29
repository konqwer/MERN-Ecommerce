import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../constants/apiUrl';
import usePatchCart from '../hooks/usePatchCart';
import Image from '../UI/Image';

const ProductItem = ({ product }) => {
  const { patch } = usePatchCart();
  const navigate = useNavigate();

  return (
    <div
      onClick={e => navigate('/' + product._id)}
      className="h-min overflow-hidden rounded-sm border border-slate-300"
    >
      <Image className="w-full" src={apiUrl + 'images/' + product.image} />
      <div className="flex items-center justify-between p-2">
        <div className="overflow-hidden">
          <h1 className="text-2-rows text-xl font-semibold">{product.name}</h1>
          <h1 className="overflow-hidden overflow-ellipsis">
            ${product.price}
          </h1>
        </div>
        <div>
          <button
            className="hover:animate-wiggle hover:text-green-600"
            onClick={e => {
              e.stopPropagation();
              patch({ productId: product._id });
            }}
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
