import { useQuery } from 'react-query';

const useProduct = productId => {
  const {
    data: product,
    isLoading,
    error
  } = useQuery(['products', productId], async () => {
    const res = await fetch('http://localhost:4000/api/products/' + productId);
    const json = await res.json();
    if (!res.ok) {
      throw Error(json.message);
    }
    if (res.ok) {
      return json;
    }
  });

  return { product, isLoading, error };
};

export default useProduct;
