import { useQuery } from 'react-query';
import apiUrl from '../constants/apiUrl';

const useProduct = productId => {
  const {
    data: product,
    isLoading,
    error
  } = useQuery(['products', productId], async () => {
    const res = await fetch(apiUrl + 'api/products/' + productId);
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
