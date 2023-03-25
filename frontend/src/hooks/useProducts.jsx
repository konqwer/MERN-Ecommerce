import { useQuery } from 'react-query';

const useProducts = page => {
  const { data, isLoading, error, isFetching } = useQuery(
    ['products', { page }],
    async () => {
      const res = await fetch(
        'http://localhost:4000/api/products/?page=' + page
      );
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

export default useProducts;
