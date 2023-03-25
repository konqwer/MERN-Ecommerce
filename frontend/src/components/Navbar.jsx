import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Button from '../UI/Button';

const Navbar = () => {
  const { user, logout } = useUser();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(0);
    setTimeout(
      () =>
        setCartCount(
          user &&
            user.cart.items.reduce((prev, item) => (prev += item.quantity), 0)
        ),
      0
    );
  }, [user]);

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
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              {user && cartCount ? (
                <h1
                  className={`absolute -top-2 -right-3 animate-wiggle rounded-full bg-blue-600 px-[30%] text-sm text-white`}
                >
                  {cartCount}
                </h1>
              ) : null}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
            <Link to="/addProduct">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Link>
            <Button onClick={logout} className="bg-red-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
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
