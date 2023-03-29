import React, { useState } from 'react';
import PageController from '../components/PageController';
import useMyProducts from '../hooks/useMyProducts';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import NoProductsFoundPage from './NoProductsFoundPage';
import MyProductItem from '../components/MyProductItem';
import ErrorPage from './ErrorPage';

const MyProducts = () => {
  const [page, setPage] = useState(1);
  const { products, maxPages, isLoading, error } = useMyProducts(page);
  if (isLoading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage error={error.message} />;
  }

  const ProductsComponent =
    products.length > 0 ? (
      <>
        <div className="grid grow grid-cols-[repeat(auto-fill,minmax(150px,1fr))] content-start gap-2">
          {products.map(product => (
            <MyProductItem key={product.name} product={product} />
          ))}
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
        <h1 className="text-3xl font-bold first-letter:text-blue-600">
          Your products
        </h1>
        <Link to="/addProduct">
          <Button>Add product</Button>
        </Link>
      </div>
      {ProductsComponent}
    </div>
  );
};

export default MyProducts;
