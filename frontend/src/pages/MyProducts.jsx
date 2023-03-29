import React, { useState } from 'react';
import ProductItem from '../components/ProductItem';
import PageController from '../components/PageController';
import useMyProducts from '../hooks/useMyProducts';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import NoProductsFoundPage from './NoProductsFoundPage';

const MyProducts = () => {
  const [page, setPage] = useState(1);
  const { products, maxPages, isLoading, error, isFetching } =
    useMyProducts(page);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage />;
  }

  console.log(products);
  const ProductsComponent =
    products.length > 0 ? (
      <>
        <div className="grid grow grid-cols-[repeat(auto-fill,minmax(150px,1fr))] content-start gap-2">
          {!isFetching &&
            products.map(product => <ProductItem product={product} />)}
        </div>
        {maxPages > 1 && (
          <PageController page={page} maxPages={maxPages} onSetPage={setPage} />
        )}
      </>
    ) : (
      <NoProductsFoundPage />
    );

  return (
    <div className="flex h-full w-full flex-col">
      <div className="my-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your products</h1>
        <Link to="/addProduct">
          <Button>Add product</Button>
        </Link>
      </div>
      {ProductsComponent}
    </div>
  );
};

export default MyProducts;
