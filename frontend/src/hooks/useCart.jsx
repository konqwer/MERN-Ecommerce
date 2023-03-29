import { useQuery, useQueryClient } from 'react-query';
import apiUrl from '../constants/apiUrl';

const useCart = () => {
  const queryClient = useQueryClient();

  const {
    data: cart,
    isLoading,
    error
  } = useQuery(
    'cart',
    async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }
      const res = await fetch(apiUrl + 'api/user/cart', {
        headers: {
          Authorization: 'Bearer ' + token
        }
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
      onSuccess: () => queryClient.invalidateQueries('user')
    }
  );

  return { cart, isLoading, error };
};

export default useCart;
