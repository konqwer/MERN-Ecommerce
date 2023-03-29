import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../constants/apiUrl';

const useAddProducts = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: add,
    data,
    error,
    isLoading
  } = useMutation(
    async productData => {
      const formData = new FormData();
      Object.entries(productData).forEach(entry => {
        formData.append(entry[0], entry[1]);
      });
      const res = await fetch(apiUrl + 'api/products/', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        method: 'POST',
        body: formData
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
        navigate('/');
      }
    }
  );

  return { add, data, error, isLoading };
};

export default useAddProducts;
