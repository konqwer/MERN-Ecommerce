import React from 'react';
import { useParams } from 'react-router-dom';
import apiUrl from '../constants/apiUrl';
import usePatchCart from '../hooks/usePatchCart';
import useProduct from '../hooks/useProduct';
import Button from '../UI/Button';
import Image from '../UI/Image';
import LoadingPage from './LoadingPage';
import Page404 from './Page404';

const Product = () => {
  const { productId } = useParams();
  const { product, isLoading, error } = useProduct(productId);
  const { patch } = usePatchCart();

  if (isLoading) {
    return <LoadingPage />;
  } else if (error) {
    return <Page404 />;
  }
  console.log(apiUrl + 'images/' + product.image);
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-[800px] items-start gap-6 overflow-hidden rounded-sm border border-slate-300 p-4">
        <div className="w-1/2">
          <Image className="w-full" src={apiUrl + 'images/' + product.image} />
        </div>
        <div className="flex w-1/2 flex-col p-2">
          <h1 className="mb-4 text-4xl font-semibold ">{product.name}</h1>
          <h1 className="mb-6 text-2xl">${product.price}</h1>
          <p className="mb-6 break-words text-xl">{product.description}</p>

          <Button
            onClick={() => patch({ productId: product._id })}
            className="self-end justify-self-end"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
