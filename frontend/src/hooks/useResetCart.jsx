import { useMutation, useQueryClient } from 'react-query';
import apiUrl from '../constants/apiUrl';

const useResetCart = () => {
  const queryClient = useQueryClient();

  const {
    mutate: reset,
    data,
    error,
    isLoading
  } = useMutation(
    async () => {
      const res = await fetch(apiUrl + 'api/user/cart/reset', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        method: 'POST'
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
        queryClient.invalidateQueries('user');
      }
    }
  );

  return { reset, data, error, isLoading };
};

export default useResetCart;
