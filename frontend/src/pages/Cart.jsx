import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import useCart from '../hooks/useCart';
import useResetCart from '../hooks/useResetCart';
import Button from '../UI/Button';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

const Cart = () => {
  const { cart, isLoading, error } = useCart();
  const { reset, data } = useResetCart();
  const navigate = useNavigate();

  if (data) {
    navigate('/');
  } else if (isLoading) {
    return <LoadingPage />;
  } else if (error) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-[500px] w-[500px] flex-col gap-2 border border-slate-300 p-2">
        <h1 className="text-4xl font-bold first-letter:text-blue-600">Cart</h1>
        <div className="flex grow flex-col gap-2 overflow-y-scroll">
          {cart.items.map(cartItem => (
            <CartItem key={cartItem.product._id} cartItem={cartItem} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold first-letter:text-blue-600">
            Total: ${cart.total}
          </h1>
          <Button onClick={reset}>Buy</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
