import { useMutation, useQueryClient } from 'react-query';
import apiUrl from '../constants/apiUrl';

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deletee,
    data,
    error,
    isLoading
  } = useMutation(
    async productId => {
      const res = await fetch(apiUrl + 'api/products/' + productId, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        method: 'DELETE'
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
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        queryClient.invalidateQueries('myProducts');
      }
    }
  );

  return { deletee, data, error, isLoading };
};

export default useDeleteProduct;
