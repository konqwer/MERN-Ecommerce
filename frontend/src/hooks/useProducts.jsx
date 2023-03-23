import { useQuery } from 'react-query';

const useProducts = () => {
  const {
    data: products,
    isLoading,
    error
  } = useQuery('products', async () => {});
};

export default useProducts;
