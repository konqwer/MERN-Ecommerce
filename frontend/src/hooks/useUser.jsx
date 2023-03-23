import { useQuery, useQueryClient } from 'react-query';

const useUser = () => {
  const {
    data: user,
    isLoading,
    error
  } = useQuery(
    'user',
    async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }
      const res = await fetch('http://localhost:4000/api/user/', {
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
      staleTime: 1000 * 60
    }
  );

  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.removeItem('token');
    queryClient.invalidateQueries('user');
  };
  return { user, isLoading, error, logout };
};

export default useUser;
