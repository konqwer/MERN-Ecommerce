import React from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import Button from '../UI/Button';

const Signup = () => {
  const { data, error, isLoading, signup } = useSignup();
  const submitHandler = async e => {
    e.preventDefault();
    const { email, password, confirmPassword } = e.target;
    signup({
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    });
  };
  return (
    <div className="flex h-full items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="flex w-[500px] flex-col gap-2 rounded-sm border border-slate-300 p-4"
      >
        <h1 className="mb-12 text-4xl font-bold first-letter:text-blue-600">
          Signup
        </h1>

        <label className="text-2xl font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="mb-6 border-b-4 border-slate-300 bg-transparent"
        />

        <label className="text-2xl font-semibold" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="mb-6 border-b-4 border-slate-300 bg-transparent"
        />

        <label className="text-2xl font-semibold" htmlFor="password">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          className="mb-6 border-b-4 border-slate-300 bg-transparent"
        />

        {error && (
          <div className="mb-6 rounded-sm border border-red-300 bg-red-200 p-2">
            {error.message}
          </div>
        )}
        <Button className="mb-2">Signup</Button>
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
