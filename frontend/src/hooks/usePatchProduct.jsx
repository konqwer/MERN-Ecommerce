import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../constants/apiUrl';

const usePatchProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: patch,
    data,
    error,
    isLoading
  } = useMutation(
    async ({ productId, productData }) => {
      const formData = new FormData();
      Object.entries(productData).forEach(entry => {
        formData.append(entry[0], entry[1]);
      });
      const res = await fetch(apiUrl + 'api/products/' + productId, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        method: 'PATCH',
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
        navigate('/myProducts');
      }
    }
  );

  return { patch, data, error, isLoading };
};

export default usePatchProduct;
