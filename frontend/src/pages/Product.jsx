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
  const { productName } = useParams();
  const { product, isLoading, error } = useProduct(productName);
  const { patch } = usePatchCart();

  console.log(product, isLoading, error);
  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    return <Page404 />;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-[800px] items-start gap-6 rounded-sm border border-slate-300 p-4">
        <div className="w-1/2">
          <Image className="w-full" src={apiUrl + 'images/' + product.image} />
        </div>
        <div className="flex flex-col p-2">
          <h1 className="mb-4 text-4xl font-semibold ">{product.name}</h1>
          <h1 className="mb-6 text-2xl">${product.price}</h1>
          <h1 className="mb-6 text-xl">
            Description: <br />
            {product.description}
          </h1>

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
