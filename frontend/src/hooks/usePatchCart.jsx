import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const usePatchCart = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: patch,
    data,
    error,
    isLoading
  } = useMutation(
    async ({ productId, quantity = 1 }) => {
      const res = await fetch(
        'http://localhost:4000/api/user/cart/' +
          productId +
          '?quantity=' +
          quantity,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
          method: 'PATCH'
        }
      );
      const json = await res.json();
      if (!res.ok) {
        navigate('/login');
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

  return { patch, data, error, isLoading };
};

export default usePatchCart;