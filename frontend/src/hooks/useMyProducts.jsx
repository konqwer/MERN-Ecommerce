import { useQuery } from 'react-query';
import apiUrl from '../constants/apiUrl';

const useMyProducts = page => {
  const { data, isLoading, error, isFetching } = useQuery(
    ['myProducts', { page }],
    async () => {
      const res = await fetch(apiUrl + 'api/products/my?page=' + page, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      const json = await res.json();
      if (!res.ok) {
        throw Error(json.message);
      }
      if (res.ok) {
        return json;
      }
    },
    {
      keepPreviousData: true
    }
  );

  const { products, maxPages } = data || {};
  return { products, maxPages, isLoading, error, isFetching };
};

export default useMyProducts;
