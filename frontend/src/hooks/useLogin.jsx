import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import apiUrl from '../constants/apiUrl';

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    data,
    error,
    isLoading
  } = useMutation(
    async userData => {
      const res = await fetch(apiUrl + 'api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
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
      onSuccess: data => {
        localStorage.setItem('token', data.token);
        queryClient.invalidateQueries('user');
        navigate('/');
      }
    }
  );
  return {
    login,
    data,
    error,
    isLoading
  };
};

export default useLogin;
