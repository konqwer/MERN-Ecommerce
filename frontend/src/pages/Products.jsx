import React, { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductItem from '../components/ProductItem';
import PageController from '../components/PageController';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import NoProductsFoundPage from './NoProductsFoundPage';

const Products = () => {
  const [page, setPage] = useState(1);
  const { products, maxPages, isLoading, error } = useProducts(page);

  if (isLoading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage error={error.message} />;
  } else if (!isLoading && products.length === 0) {
    return <NoProductsFoundPage />;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid grow grid-cols-[repeat(auto-fill,minmax(150px,1fr))] content-start gap-2">
        {products.map(product => (
          <ProductItem key={product.name} product={product} />
        ))}
      </div>
      {maxPages > 1 && (
        <PageController page={page} maxPages={maxPages} onSetPage={setPage} />
      )}
    </div>
  );
};

export default Products;
