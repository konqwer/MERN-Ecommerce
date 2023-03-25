import React, { useEffect, useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductItem from '../components/ProductItem';
import PageController from '../components/PageController';

const Products = () => {
  const [page, setPage] = useState(1);
  const { products, maxPages, isLoading, error, isFetching } =
    useProducts(page);

  console.log(products, isFetching);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid grow grid-cols-[repeat(auto-fill,minmax(150px,1fr))] content-start gap-2">
        {!isFetching &&
          products.map(product => <ProductItem product={product} />)}
      </div>
      <PageController page={page} maxPages={maxPages} onSetPage={setPage} />
    </div>
  );
};

export default Products;
