import { useMutation, useQueryClient } from 'react-query';

const useSignup = () => {
  const queryClient = useQueryClient();
  const {
    mutate: signup,
    data,
    error,
    isLoading
  } = useMutation(
    async userData => {
      if (userData.password !== userData.confirmPassword) {
        throw Error('Passwords must match');
      }
      delete userData.confirmPassword;
      const res = await fetch('http://localhost:4000/api/user/signup', {
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
    signup,
    data,
    error,
    isLoading
  };
};

export default useSignup;
