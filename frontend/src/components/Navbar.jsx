import React from 'react';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Button from '../UI/Button';

const Navbar = () => {
  const { user, logout } = useUser();

  console.log(user);
  return (
    <div className="border-b border-slate-300">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between p-2">
        <Link
          to="/"
          className="text-4xl font-semibold first-letter:text-blue-600"
        >
          EcomShop
        </Link>
        {user ? (
          <div className="flex items-center">
            <Button onClick={logout} className="bg-red-300">
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
